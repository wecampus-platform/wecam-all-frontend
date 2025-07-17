

export default function ModalPage(){
    return(
        <div className=" w-[1228px] h-[800px] bg-white mt-[64px] mx-[56px] flex flex-col">
            <div className="flex justify-between">
                <div className="justify-start text-zinc-600 text-5xl font-bold">제목</div>
                <div className="flex gap-[8px]">
                    <div data-hover="unhovered" className="px-4 py-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-center items-center gap-2">
                        <div className="text-center justify-start text-blue-500 text-base font-bold">수정하기</div>
                    </div>
                    <div data-hover="unhovered" className="px-4 py-3 bg-slate-100 rounded inline-flex justify-center items-center gap-2">
                        <div className="text-center justify-start text-zinc-400 text-base font-bold">삭제하기</div>
                    </div>
                </div>
            </div>

        </div>
    )
}