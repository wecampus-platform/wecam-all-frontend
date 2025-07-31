'use client';
import Image from 'next/image';

const CodeSuccessModal = ({ onClose, invitationCode = "A3a1bb", codeType = "일반 학생용", expiryDate = "2025.07.15", expiryTime = "23:59:00" }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-90 bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative">
        {/* 닫기 버튼 - 모달 바깥쪽 오른쪽 위 */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-9 h-9 relative overflow-hidden z-20"
        >
          <div className="w-5 h-5 left-[8.14px] top-[8.14px] absolute">
            <Image 
              src="/x.svg" 
              alt="닫기" 
              width={20} 
              height={20}
              className="w-full h-full"
            />
          </div>
        </button>
        
        <div 
          className="w-[642px] h-96 bg-white rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[586px] left-[28px] top-[32px] absolute inline-flex flex-col justify-start items-center gap-6">
          <div className="self-stretch py-12 bg-slate-100 rounded-lg inline-flex justify-center items-center">
            <div className="text-blue-500 text-6xl font-bold font-['Pretendard']">{invitationCode}</div>
          </div>
          <div className="self-stretch text-center text-zinc-600 text-base font-semibold font-['Pretendard']">{codeType}</div>
          <div className="w-[586px] h-0 outline outline-1 outline-offset-[-0.50px] outline-slate-100" />
        </div>
        <div className="left-[101px] top-[320px] absolute inline-flex justify-center items-center gap-20">
          <div className="justify-start text-neutral-500 text-base font-medium font-['Pretendard']">코드 유효기간</div>
          <div className="flex justify-center items-center gap-2">
            <div className="justify-start text-red-500 text-2xl font-bold font-['Pretendard']">{expiryDate}</div>
            <div className="justify-start text-red-500 text-2xl font-bold font-['Pretendard']">{expiryTime}</div>
            <div className="justify-start text-neutral-500 text-base font-medium font-['Pretendard']">까지</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSuccessModal;