import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

const BLACKLIST_API_URL = "https://api.abuseipdb.com/api/v2/blacklist";
const API_KEY = "db478cdf11657f460ea9a7c4ef0c33435cdfdb1a18bb43115d02ca29cbcd97f4c7fb5f655e99c24e";

let cachedBlacklist = new Set<string>(); // Cached blacklist
let lastBlacklistFetch = 0;

async function fetchBlacklist(): Promise<Set<string>> {
  const now = Date.now();
  if (now - lastBlacklistFetch < 10 * 60 * 1000) {
    return cachedBlacklist;
  }
  lastBlacklistFetch = now;
  try {
    const res = await fetch(BLACKLIST_API_URL, {
      headers: { "Key": API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch blacklist");
    const data = await res.json();
    cachedBlacklist = new Set(data.ips);
    console.log("Blacklist updated:", cachedBlacklist.size, "IPs");
  } catch (err) {
    console.error("Blacklist fetch error:", err);
  }
  return cachedBlacklist;
}

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // return custommiddleware(request);
})

const rateLimitStore = new Map<string, { lastRequestTime: number; requestCount: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 1000; // Max 1000 requests per IP

const blockedUserAgents = ["curl", "python", "wget", "bot"];

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http:;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: *.googleusercontent.com *.google.com;
  font-src 'self' data: *.gstatic.com;
  frame-src 'self' *.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  connect-src 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

export async function custommiddleware(req: NextResponse) {
  const clientIp = (req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('true-client-ip')) ?? 'unknown';
  const currentTime = Date.now();
  const rateLimitRecord = rateLimitStore.get(clientIp);

  const userAgent = req.headers.get("user-agent") || "";

  if (blockedUserAgents.some(bot => userAgent.toLowerCase().includes(bot))) {
    return new NextResponse("Forbidden: Automated Bot Detected", { status: 403 });
  }

  const blacklist = await fetchBlacklist();
  if (blacklist.has(clientIp)) {
    return new NextResponse("Forbidden: IP Blacklisted", { status: 403 });
  }

  if (rateLimitRecord) {
    const elapsedTime = currentTime - rateLimitRecord.lastRequestTime;

    if (elapsedTime < RATE_LIMIT_WINDOW_MS) {
      rateLimitRecord.requestCount += 1;

      if (rateLimitRecord.requestCount > RATE_LIMIT_MAX_REQUESTS) {
        return new NextResponse(
          JSON.stringify({ error: `Too many requests. Please try again later.` }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      rateLimitRecord.lastRequestTime = currentTime;
      rateLimitRecord.requestCount = 1;
    }
  } else {
    rateLimitStore.set(clientIp, {
      lastRequestTime: currentTime,
      requestCount: 1,
    });
  }

  const reqHeaders = new Headers(req.headers)
  reqHeaders.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )

  reqHeaders.set('X-Content-Type-Options', 'nosniff');
  reqHeaders.set('X-Frame-Options', 'DENY');
  reqHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  reqHeaders.set('X-XSS-Protection', '1; mode=block');

  return NextResponse.next({
    headers: reqHeaders,
    request: {
      headers: reqHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};