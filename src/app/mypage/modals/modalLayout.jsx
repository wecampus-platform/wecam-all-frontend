'use client';

export default function ModalLayout({
  title,
  icon,
  description,
  onBack,
  onClose,
  children,
}) {
  return (
    <div>
      <div className="flex px-20 py-5">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* 아이콘 + 타이틀 + 설명 */}
          <div className="border border-gray3 w-50 h-50 rounded-lg flex flex-col items-center justify-center text-center gap-4 px-[20px] py-[16px]">
            {icon}
            <div className="text-xl font-medium font-pretendard text-gray4 text-center">{title}</div>
            {description && (
              <div className="text-xs leading-[18px] font-pretendard text-gray4">{description}</div>
            )}
          </div>

          {/* 모달별 입력/버튼 내용 */}
          {children}

          {/* 뒤로가기 버튼 */}
          {onBack && (
            <button onClick={onBack} className="text-sm text-gray8 underline">
              ← 뒤로가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
