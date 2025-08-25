export type ParticipationChipsProps = {
  avatar: string | undefined;
  onClick?: () => void;
  readOnly?: boolean;
  children?: React.ReactNode;
};

export default function ParticipationChips({
  avatar,
  onClick,
  readOnly = false,
  children,
}: ParticipationChipsProps) {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gray-50 border-gray-200
        ${readOnly ? 'cursor-default' : 'cursor-pointer hover:bg-gray-100'}
      `}
      onClick={readOnly ? undefined : onClick}
      style={{ pointerEvents: readOnly ? 'none' : 'auto' }}
    >
      {avatar && avatar.trim() !== "" && (
        <img
          src={avatar}
          alt="avatar"
          className="w-6 h-6 rounded-full object-cover"
        />
      )}

      <span className="text-gray-700">{children}</span>

      {/* X 버튼 제거 - 읽기 전용 모드 */}
    </div>
  );
}
