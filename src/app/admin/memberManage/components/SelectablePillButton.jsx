export default function SelectablePillButton({ label, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-full text-sm transition border ${
        isSelected
          ? "text-blue-600 border-blue-500 bg-blue-50 font-semibold"
          : "text-blue-600 bg-blue-100 border-transparent hover:bg-blue-200"
      }`}
    >
      {label}
    </button>
  );
}
