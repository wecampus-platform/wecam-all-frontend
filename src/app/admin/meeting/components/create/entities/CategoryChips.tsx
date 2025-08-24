export default function CategoryChips({
  children,
  className = "",
  onClick,
  onClose,
  selected,
  role = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event) => void;
  onClose?: (event) => void;
  selected?: boolean;
  role?: string;
}) {
  return (
    <span
      role={role}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(e);
        }
      }}
      className={
        `inline-flex items-center gap-2 rounded-full  px-3 py-1 text-sm cursor-pointer select-none ` +
        (selected
          ? "bg-blue-50  text-blue-700"
          : "bg-gray-50  text-gray-700 hover:bg-gray-100") +
        (className ? ` ${className}` : "")
      }
    >
      <span className="truncate max-w-[12rem]">{children}</span>
      {onClose && (
        <button
          aria-label="remove"
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
          className="grid place-items-center rounded-full border border-transparent hover:border-gray-300 w-5 h-5"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
