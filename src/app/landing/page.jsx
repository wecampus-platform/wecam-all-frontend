// pages/index.tsx
'use client';

import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
    const router = useRouter();

  return (
    <div className="relative w-full min-h-screen bg-[#fbfbfb] text-[#2c2d2f] font-pretendard text-center">
      {/* Top Navigation */}
      <header className="absolute top-12 left-[356px] flex items-center gap-12">
        <Image src="/landing/smallWecampus.svg" alt="WeCampus" width={151} height={26} />
        <nav className="ml-[70px] flex gap-12 text-[20px] font-semibold">
          <button>서비스 소개</button>
          <button>기능</button>
          <button>공지</button>
          <button>문의하기</button>
          <button>사용법</button>
        </nav>
      </header>

      {/* 로그인 / 회원가입 버튼 */}
      <div className="absolute top-12 right-[180px] flex gap-6 text-[20px] font-bold">
        <Link href="/login">로그인</Link>
        <Link href="/register/student/step1">회원가입</Link>
      </div>

      {/* 메인 비주얼 */}
      <h2 className="absolute top-[561px] left-1/2 -translate-x-1/2 text-[24px] text-[#55575c] font-semibold">
        편리한 대학 생활, 위캠퍼스에서 시작하세요!
      </h2>
      <div className="absolute top-[284px] left-1/2 -translate-x-1/2 w-[1469px] h-[241px]">
        <Image src="/landing/WeCampus.png" alt="WeCampus Visual" width={1469} height={241} />
      </div>

      {/* CTA 버튼 */}
      <button
  onClick={() => router.push("/workspace")}
  className="absolute top-[666px] left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[32px] font-bold rounded-xl px-14 py-7 cursor-pointer hover:bg-blue-600 transition"
>
  WeCampus 워크스페이스 생성하기
</button>

      {/* 공사중 안내 */}
      <p className="absolute top-[949px] left-1/2 -translate-x-1/2 text-[32px] font-extrabold text-[#9bc1ff]">
        현재 공사중입니다...
      </p>
      <p className="absolute top-[1007px] left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#65676b]">
        더 멋진 페이지로 돌아올게요!
      </p>
    </div>
  );
};

export default LandingPage;
