"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import Header from "@/components/header";
import { useState, useEffect } from "react";

export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일 뷰
  if (isMobile) {
    return (
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col justify-center items-center gap-6 px-4">
          <img
            src="/logo.svg"
            alt="Logo"
            className="animate-slide-up-1 opacity-0 w-60 h-auto"
          />
          <div className="animate-slide-up-2 opacity-0 text-center text-lg px-4">
            편리한 대학 생활, 위캠퍼스에서 시작하세요!
          </div>
          <Link href={accessToken ? "/workspace/make" : "/workspace"} className="w-full">
            <button className="button-common w-full max-w-[1000px] animate-slide-up-3 opacity-0 text-base py-4">
              WeCampus 워크스페이스 생성하기
            </button>
          </Link>
        </main>
      </div>
    );
  }

  // 데스크톱 뷰 (기존 코드)
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <Header />
      <main className="flex flex-1 flex-col justify-center items-center gap-10">
        <img
          src="/logo.svg"
          alt="Logo"
          className="animate-slide-up-1 opacity-0"
        />
        <div className="animate-slide-up-2 opacity-0">
          편리한 대학 생활, 위캠퍼스에서 시작하세요!
        </div>
        <Link href={accessToken ? "/workspace/make" : "/workspace"}>
          <button className="button-common w-[600px] animate-slide-up-3 opacity-0">
            WeCampus 워크스페이스 생성하기
          </button>
        </Link>
      </main>
    </div>
  );
}
