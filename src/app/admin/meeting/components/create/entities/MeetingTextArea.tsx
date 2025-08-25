import { TEMPLATES } from "@/mocks/meeting/create/templates";

export default function MeetingTextArea({ value, onChange, readOnly = false }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}) {
  const template = ({ text, onClick }: { text: string; onClick: () => void }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  return (
    <div className={`min-h-60`}>
      <textarea
        placeholder="아래에서 템플릿 또는 입력 방식을 선택하거나, 회의 내용을 입력하세요."
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full rounded-md py-2 ${
          value === "" ? "h-12" : "h-60"
        } placeholder-gray-300 focus:outline-none resize-none ${
          readOnly ? 'bg-gray-50 cursor-not-allowed' : ''
        }`}
      />
      {value === "" && !readOnly && (
        <div className="flex flex-col text-sm text-gray-300 space-y-2">
          {TEMPLATES.map((tpl, idx) => (
            <div key={idx}>{template(tpl)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
