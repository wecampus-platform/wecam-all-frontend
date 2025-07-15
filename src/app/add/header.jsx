export default function Header({ submitLabel = "등록하기" }) {
    return (
      <div className="w-full flex mt-[64px] justify-between ">
        <div className="text-zinc-800 text-4xl font-bold">할 일 등록하기</div>
        <div className="flex gap-3 h-12">
          <div className="w-[102px] px-4 py-3 bg-blue-500 rounded inline-flex justify-center items-center gap-2">
            <div className="text-white text-xl font-bold">{submitLabel}</div>
          </div>
          <div className="w-[102px] h-12 px-4 py-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-zinc-400 inline-flex justify-center items-center gap-2">
            <div className="text-zinc-400 text-xl font-bold">나가기</div>
          </div>
        </div>
      </div>
    );
  }
  