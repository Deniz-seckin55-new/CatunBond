import { Redis } from '@upstash/redis';

// Initialize Redis using credentials from environment variables
const redis = new Redis({
  url: process.env.REDIS_URL_HTTPS!,
  token: process.env.REDIS_TOKEN!,
});

export default redis;