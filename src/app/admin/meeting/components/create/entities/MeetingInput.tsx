export default function MeetingInput({
  value,
  onChange,
  placeholder = "",
  type = "text",
  customCSS = "",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`px-3 py-2 w-full  hover:bg-gray-100 rounded placeholder-gray-300 focus:outline-none ${customCSS}`}
      placeholder={placeholder}
    />
  );
}
