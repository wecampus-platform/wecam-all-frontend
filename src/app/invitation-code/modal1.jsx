const Modal1 = () => {
  const listItems = Array.from({ length: 10 });

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-[643px] items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-2 items-center text-center justify-center">A3a1bb</h1>
      <p className="text-center text-gray-500 mb-6">학생회 초대용</p>

      <h2 className="text-xl font-bold mb-2">초대 코드 사용 내역</h2>
      <div className="h-px bg-gray-200 mb-4" />

      {/* 헤더 */}
      <div className="flex text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
        <div className="w-[93px]">이름</div>
        <div className="flex-1">아이디</div>
        <div className="w-[93px] text-right">사용 시각</div>
      </div>

      {/* 리스트 */}
      <div className="space-y-2">
        {listItems.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center text-sm bg-gray-50 py-2 px-3 rounded-md"
          >
            <div className="w-[93px] font-medium text-gray-800">이름</div>
            <div className="flex-1 text-gray-600">아이디</div>
            <div className="w-[93px] text-right text-gray-500">사용 시각</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal1;
