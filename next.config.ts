import type { NextConfig } from "next";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.1.245'],
  webpack(config) {
    // SVG support for React components with SVGR
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'], // Converts SVG into React components
    });

    // Optional: Add support for importing SVG as URLs
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { not: [/\.(js|ts)x?$/] },
      use: ['file-loader'], // Import SVG as URL
    });

    // Handle images (PNG, JPG, etc.)
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    });

    // Handle fonts
    config.module.rules.push({
      test: /\.(woff2?|eot|ttf|otf)$/,
      use: ['file-loader'],
    });

    // (Optional) Analyze bundles
    if (process.env.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }

    return config;
  },
  turbopack: {},
  images: {
    remotePatterns: [new URL('https://img.clerk.com/**')],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;",
          },
        ],
      },
    ];
  }
};

export default nextConfig;
