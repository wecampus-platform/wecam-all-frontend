export default function MeetingInputField({ label, children }) {
  return (
    <div className="relative flex items-center w-fulll">
      <label className="block w-24 text-sm text-gray-400">{label}</label>
      <div className=" flex justify-start w-full">{children}</div>
    </div>
  );
}
