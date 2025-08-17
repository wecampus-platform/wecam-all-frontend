export type ParticipationChipsProps = {
  avatar: string;
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
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full  text-sm bg-gray-50 border-gray-200 cursor-pointer `}
      onClick={onClick}
    >
      <img
        src={avatar}
        alt={name}
        className="w-6 h-6 rounded-full object-cover"
      />

      <span className="text-gray-700">{children}</span>

      {selected && (
        <button
          type="button"
          onClick={onClick}
          className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          X
        </button>
      )}
    </div>
  );
}
