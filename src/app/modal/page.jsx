

export default function ModalPage(){
    return(
        <div className=" w-[1228px] h-[800px] bg-white mt-[64px] mx-[56px] flex flex-col">
            <div className="flex justify-between mb-[48px]">
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
            <div className="flex flex-col ml-[80px] gap-[28px]">
                <div className="flex gap-[58px]">
                    <div className="justify-start text-neutral-400 text-base font-normal">마감일</div>
                    <div className="justify-start text-neutral-500 text-base font-semibold">2025년 7월 1일</div>
                </div>
                <div className="flex gap-[40px]">
                    <div className="justify-start text-neutral-400 text-base font-normal ">진행 여부</div>
                    <div data-status="진행 완료" className="px-2 py-1 bg-green-100 rounded-[32px] outline outline-1 outline-offset-[-1px] outline-green-500 inline-flex justify-center items-center gap-2">
                        <div className="text-center justify-start text-green-500 text-xs font-semibold">진행 완료</div>
                    </div>
                </div>
                <div className="flex gap-[58px]">
                    <div className="justify-start text-neutral-400 text-base font-normal">담당자</div>
                    <div className="flex gap-[8px]">
                        <img className="w-6 h-6 rounded-full" src="https://placehold.co/24x24" />
                        <div className="justify-start text-neutral-500 text-base font-semibold">담당자 이름</div>
                    </div>
                </div>
                <div className="flex gap-[58px]">
                    <div className="justify-start text-neutral-400 text-base font-normal">작성자</div>
                    <div className="flex gap-[8px]">
                        <img className="w-6 h-6 rounded-full" src="https://placehold.co/24x24" />
                        <div className="justify-start text-neutral-500 text-base font-semibold">담당자 이름</div>
                    </div>
                </div>
            </div>
            <div className="w-[1116px] h-0 my-[24px] outline outline-1 outline-offset-[-0.50px] outline-slate-100" />
            <div className="flex mr-[80px] gap-[58px]">
                <div className="justify-start text-neutral-400 text-base font-normal ">내용</div>
                <div className="justify-start text-neutral-500 text-base font-semibold">할일 내용입니다.</div>

            </div>
        </div>
    )
}