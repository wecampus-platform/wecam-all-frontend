export default function MeetingInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  customCSS = "",
  disabled = false,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  customCSS?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`px-3 py-2 w-full rounded placeholder-gray-300 focus:outline-none ${
        disabled ? 'bg-gray-50 cursor-not-allowed' : 'hover:bg-gray-100'
      } ${customCSS}`}
      placeholder={placeholder}
    />
  );
}
