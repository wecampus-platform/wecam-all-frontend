'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const approvalTarget = searchParams.get('target') || '상위 조직';

  return (
    <div className="bg-[#F5F7FA] flex flex-col items-center w-full h-screen overflow-hidden">
      <div className="w-[684px] mt-[200px] flex flex-col justify-start items-center gap-8">
        <div className="self-stretch flex flex-col justify-start items-center gap-8">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex flex-col justify-center items-center gap-3">
              <div className="self-stretch inline-flex justify-start items-start">
                <div className="text-center justify-start text-blue-500 text-3xl font-bold font-['Pretendard']">
                  {approvalTarget}
                </div>
                <div className="text-center justify-start text-zinc-800 text-3xl font-semibold font-['Pretendard']">
                  에게 승인 요청이 성공적으로 전송 되었습니다.
                </div>
              </div>
            </div>
            <div className="self-stretch text-center justify-start text-zinc-800 text-3xl font-semibold font-['Pretendard']">
              승인까지 대기해주세요.
            </div>
          </div>
          
          <div className="flex flex-col justify-start items-center gap-3">
            <div className="self-stretch p-5 rounded-xl inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-center justify-start text-zinc-400 text-base font-semibold font-['Pretendard'] leading-none">
                학생회 상위 조직이 있는 경우
              </div>
              <div className="self-stretch text-center justify-start text-neutral-400 text-xl font-semibold font-['Pretendard']">
                상위 조직에 워크스페이스 승인이 요청됩니다.
              </div>
            </div>
            
            <div className="w-96 p-5 rounded-xl inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-center justify-start text-zinc-400 text-base font-semibold font-['Pretendard'] leading-none">
                학생회 상위 조직이 없는 경우
              </div>
              <div className="self-stretch text-center justify-start text-neutral-400 text-xl font-semibold font-['Pretendard']">
                위캠퍼스 관리자가 승인을 도와드립니다.
              </div>
            </div>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-96 py-4 bg-blue-500 rounded-lg flex justify-center items-center gap-1 hover:bg-blue-600 transition-colors"
        >
          <div className="text-center justify-start text-white text-base font-semibold font-['Pretendard']">
            홈화면으로 이동하기
          </div>
        </button>
      </div>
      
      {/* 하단 회색 영역 */}
      <div className="w-full h-48 bg-zinc-300 absolute bottom-0" />
    </div>
  );
}

export default function WorkspaceCreateSuccessPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessContent />
    </Suspense>
  );
}