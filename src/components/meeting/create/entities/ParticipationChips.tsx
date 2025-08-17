export type ParticipationChipsProps = {
  avatar: string; // 프로필 이미지 ur
  onClick?: () => void;
  selected?: boolean;
  children?: React.ReactNode;
};

export default function ParticipationChips({
  avatar,
  onClick,
  selected = false,
  children,
}: ParticipationChipsProps) {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full  text-sm
        ${
          selected
            ? "bg-blue-50 border-blue-300"
            : "bg-gray-50 border-gray-200 cursor-pointer"
        }
      `}
      onClick={onClick}
    >
      <img
        src={avatar}
        alt={name}
        className="w-6 h-6 rounded-full object-cover"
      />

      {/* 이름 */}
      <span className="text-gray-700">{children}</span>

      {/* 닫기 버튼 */}
      {selected && (
        <button
          type="button"
          onClick={onClick}
          className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
