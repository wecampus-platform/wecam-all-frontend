import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이 부분이 Static Export를 활성화하는 핵심 설정입니다.
  // This part is the core setting to enable Static Export.
  output: 'export',

  // next/image 사용 시 정적 export를 위한 설정
  // Settings for static export when using next/image
  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
