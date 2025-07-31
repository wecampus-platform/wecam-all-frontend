'use client';

import { useRouter,useSearchParams } from 'next/navigation';

export default function RegisterSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  console.log("rediirect",redirect);

  return (
    <div className="w-full relative bg-whitesmoke h-[1080px] overflow-hidden text-center text-[28px] text-darkslategray font-pretendard">
      <div className="absolute top-[368px] left-[calc(50%_-_266px)] flex flex-col items-center justify-start gap-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="self-stretch relative font-semibold">회원가입을 축하합니다!</div>
          <div className="self-stretch relative font-semibold">이제 가입하신 계정으로 로그인 하실 수 있습니다.</div>
        </div>
        <button
          className="w-[376px] button-common"
          onClick={() => router.push(`/login?redirect=${encodeURIComponent(redirect)}`)}
          >
          <div className="relative font-semibold">로그인 페이지로 이동하기</div>
        </button>
      </div>
      <div className="absolute top-[880px] left-[0px] bg-gainsboro w-[1920px] h-[200px]" />
    </div>
  );
}
