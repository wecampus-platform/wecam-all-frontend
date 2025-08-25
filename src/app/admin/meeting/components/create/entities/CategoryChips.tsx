export default function CategoryChips({
  children,
  className = "",
  onClick,
  readOnly = false,
  role = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  readOnly?: boolean;
  role?: string;
}) {
  return (
    <span
      role={role}
      tabIndex={readOnly ? -1 : 0}
      onClick={readOnly ? undefined : onClick}
      onKeyDown={readOnly ? undefined : (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // 키보드 이벤트는 마우스 클릭과 다르므로 onClick을 호출하지 않음
        }
      }}
      className={
        `inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm select-none ` +
        "bg-gray-50 text-gray-700" +
        (readOnly ? " cursor-default" : " cursor-pointer hover:bg-gray-100") +
        (className ? ` ${className}` : "")
      }
      style={{ pointerEvents: readOnly ? 'none' : 'auto' }}
    >
      <span className="truncate max-w-[12rem]">{children}</span>
      {/* 삭제 버튼 제거 - 읽기 전용 모드 */}
    </span>
  );
}
