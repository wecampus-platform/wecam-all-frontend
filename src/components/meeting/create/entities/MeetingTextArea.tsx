export default function MeetingTextArea({ value, onChange }) {
  const template = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  return (
    <div className={`min-h-60`}>
      <textarea
        placeholder="아래에서 템플릿 또는 입력 방식을 선택하거나, 회의 내용을 입력하세요."
        value={value}
        onChange={onChange}
        className={`w-full rounded-md py-2 ${
          value === "" ? "h-12" : "h-60"
        } placeholder-gray-300 focus:outline-none resize-none `}
      />
      {value === "" && (
        <div className="flex flex-col text-sm text-gray-300 space-y-2">
          {TEMPLATES.map((tpl, idx) => (
            <div key={idx}>{template(tpl)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export const TEMPLATES = [
  {
    text: "안건 & 논의사항.",
    onClick: () => console.log("안건 선택"),
  },
  {
    text: " 녹음 파일로 회의록 작성하기",
    onClick: () => console.log("녹음 파일로 회의록 작성"),
  },
  {
    text: "신입생 OT (예시)",
    onClick: () => console.log("신입생 OT 예시"),
  },
  {
    text: "MT (예시)",
    onClick: () => console.log("MT 예시"),
  },
];
