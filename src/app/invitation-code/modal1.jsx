const Modal1 = ({ onClose }) => {
  const listItems = Array.from({ length: 12 });

  return (
    <div className="w-[642px] h-[790px] relative bg-white rounded-lg">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
      >
        ×
      </button>
      <div className="w-[586px] py-8 left-[28px] top-[74px] absolute bg-slate-100 rounded-lg inline-flex justify-center items-center gap-16">
        <div className="justify-start text-blue-500 text-5xl font-bold font-['Pretendard']">A3a1bb</div>
      </div>
      <div className="left-[60px] top-[36px] absolute inline-flex justify-start items-center gap-5">
        <div className="justify-start text-zinc-400 text-xs font-normal font-['Pretendard']">생성자</div>
        <div className="text-center justify-start text-neutral-400 text-xs font-semibold font-['Pretendard']">김위캠</div>
      </div>
      <div className="left-[288px] top-[36px] absolute inline-flex justify-start items-center gap-5">
        <div className="justify-start text-zinc-400 text-xs font-normal font-['Pretendard']">생성 일시</div>
        <div className="text-center justify-start text-neutral-400 text-xs font-semibold font-['Pretendard']">2025.07.01</div>
      </div>
      <div className="left-[455px] top-[36px] absolute inline-flex justify-start items-center gap-5">
        <div className="justify-start text-zinc-400 text-xs font-normal font-['Pretendard']">만료 일시</div>
        <div className="text-center justify-start text-neutral-400 text-xs font-bold font-['Pretendard']">2025.07.01</div>
      </div>
      <div className="left-[278px] top-[219px] absolute text-center justify-start text-zinc-600 text-base font-semibold font-['Pretendard']">학생회 초대용</div>
      <div className="left-[28px] top-[294px] absolute justify-start text-zinc-600 text-2xl font-bold font-['Pretendard']">초대 코드 사용 내역</div>
      <div className="w-[586px] h-0 left-[28px] top-[262px] absolute outline outline-1 outline-offset-[-0.50px] outline-slate-100" />
      <div className="w-[586px] h-96 left-[28px] top-[335px] absolute inline-flex flex-col justify-start items-start gap-1 overflow-hidden">
        {listItems.map((_, idx) => (
          <div key={idx} className="w-[586px] px-4 py-3 bg-gray-50 rounded-lg inline-flex justify-between items-center">
            <div className="w-24 flex justify-between items-center">
              <div className="text-center justify-start text-zinc-600 text-xs font-semibold font-['Pretendard']">이름</div>
              <div className="text-center justify-start text-neutral-400 text-xs font-normal font-['Pretendard']">아이디</div>
            </div>
            <div className="text-center justify-start text-zinc-600 text-xs font-medium font-['Pretendard']">사용 시각</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal1;
