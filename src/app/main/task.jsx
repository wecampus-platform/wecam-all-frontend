import { useRouter } from 'next/navigation';
import { getTaskDetail } from '@/app/api-service/api';

export default function Task(task){
    const router = useRouter();

    const handleClick = async () => {
    const detail = await getTaskDetail("위캠퍼스", task.todoId);
    router.push(`/detail`, {
      scroll: false,
    })
    return(
        <div onClick={handleClick} className="w-full h-[230px] px-[24px] py-[32px] flex flex-col bg-white rounded-xl">
            <div className="flex w-full justify-between mb-[20px]">
                <div className="justify-start text-black text-2xl font-bold">{task.title}</div>
                <div className="flex gap-[4px]">
                    <div data-status="오늘까지" className="px-2 py-1 bg-rose-100 rounded-[32px] outline outline-1 outline-offset-[-1px] outline-red-500 inline-flex justify-center items-center gap-2">
                        <div className="text-center justify-start text-red-500 text-xs font-semibold ">오늘까지</div>
                    </div>
                    <div data-status="진행 전" className="px-2 py-1 bg-zinc-300 rounded-[32px] outline outline-1 outline-offset-[-1px] outline-zinc-600 inline-flex justify-center items-center gap-2">
                        <div className="text-center justify-start text-zinc-600 text-xs font-semibold">진행 전</div>
                    </div>
                </div>

            </div>
            <div className="self-stretch justify-start text-zinc-600 text-base font-medium leading-snug">{task.description}</div>
            <div className="flex mt-[28px] w-full justify-between">
                <div className="flex gap-[2px] items-center">
                    <div className="justify-start text-zinc-400 text-base font-normal">담당자:</div>
                    <div className="justify-start text-neutral-400 text-base font-semibold">{task.assignee || "미지정"}</div>
                    <div className="justify-start text-zinc-400 text-base font-medium ">+팀원 수</div>
                    <div className="w-6 h-6 p-2 bg-sky-100 rounded-[32px] ml-[2px] outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-center items-center gap-2">
                        <div className="justify-start text-blue-500 text-[10px] font-medium ">ME</div>
                    </div>

                </div>
            </div>
        </div>

    )
}
}