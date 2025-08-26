"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import Header from "@/components/header";

export default function Page() {
  const accessToken = useAuthStore((state) => state.accessToken);
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

        <div className="flex-col flex justify-center items-center gap-5 mt-8">
          <div className="text-point animate-slide-up-4 opacity-0">
            현재 공사중입니다...
          </div>
          <div className="animate-slide-up-5 opacity-0">
            더 멋진 페이지로 돌아올게요!
          </div>
        </div>
      </main>
    </div>
  );
}
