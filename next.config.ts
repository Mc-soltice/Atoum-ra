// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   turbopack: {
//     root: "../../",
//   },
//   // images: {
//   //   domains: ["img.daisyui.com"], // autoriser ce domaine
//   //   remotePatterns: [
//   //     {
//   //       protocol: 'https',
//   //       hostname: 'images.unsplash.com',
//   //       pathname: '/**',
//   //     },
//   //   ]
//   // },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/storage/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },
  // Important pour Turbopack
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

module.exports = nextConfig;
