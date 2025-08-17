export default function MeetingHeader({ form, resetForm }) {
  const handleSave = () => {
    console.log(form);
    alert("저장되었습니다!");
    resetForm();
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl mb-2 ">회의록 작성하기</h1>
        <p className="text-sm text-gray-400">
          회의록 작성 이후 반드시 우측의 저장하기 버튼을 눌러주세요.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-sm"
        >
          저장하기
        </button>
        <button className="px-4 py-2 bg-white text-gray-400 border border-gray-300 rounded-md">
          나가기
        </button>
      </div>
    </div>
  );
}
