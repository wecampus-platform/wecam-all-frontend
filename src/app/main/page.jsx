"use client"

import { getAllTasks } from '../api-service/api';
import { useRouter } from 'next/navigation';
import SideBarPage from '@/app/components/side-bar';
import Task from '@/app/main/task';
import { useEffect, useState } from 'react';


export default function MainPage(){

    

    const router = useRouter(); // 라우터 객체
    const [tasks, setTasks] = useState([]);
    const councilName = "위캠퍼스";
    const councilId = 2;

    const goToAddPage = () => {
        router.push('/add'); // 원하는 경로로 이동 
    };

    useEffect(() => {
        getAllTasks(councilName, councilId).then(setTasks).catch(console.error);
      }, []);
    

    return(
       <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
            <SideBarPage/>
            <div className="mt-[60px] px-[60px] w-full flex flex-col">
                <div className="flex justify-between items-center w-full mb-[24px]">
                    <div className="w-40 h-14 justify-start text-zinc-800 text-4xl font-bold">할 일 관리</div>
                    <div data-hover="unhovered" className="pl-4 pr-5 py-3 bg-blue-500 rounded-lg inline-flex justify-start items-center gap-1">
                        <div className="w-6 h-6 relative overflow-hidden">
                            <div className="w-3 h-3 left-[5.50px] top-[5.50px] absolute bg-white" />
                        </div>
                        <button
                            onClick = {goToAddPage} 
                            className="text-center justify-start text-white text-xl font-semibold">할 일 등록하기</button>


                    </div>
                </div>
                <div className="w-[1300px] h-64 bg-white rounded-3xl">

                </div>
                <div className="mt-[56px] mb-[28px] w-full flex">
                    <div className="flex flex-col gap-[12px] ">
                        <div className="self-stretch justify-start text-neutral-400 text-base font-bold">역할별 필터</div>
                        <div className="flex gap-[12px]">
                            <div data-available="available" data-status="전체 할 일" className="px-4 py-2 bg-blue-500 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-white text-xl font-semibold">전체 할 일</div>
                            </div>
                            <div data-available="unavailable" data-status="내 할 일" className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-zinc-400 text-xl font-normal">내 할 일</div>
                            </div>
                            <div data-available="unavailable" data-status="받은 할 일" className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-zinc-400 text-xl font-normal">받은 할 일</div>
                            </div>
                            <div data-available="unavailable" data-status="보낸 할 일" className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-zinc-400 text-xl font-normal">보낸 할 일</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-px h-16 bg-zinc-300 mx-[48px] justify-center items-center" />
                    <div className="flex flex-col gap-[12px] ">
                        <div className="self-stretch justify-start text-neutral-400 text-base font-bold">상태별 필터</div>
                        <div className="flex gap-[12px]">
                            <div data-available="available" data-status="오늘까지" className="px-4 py-2 bg-blue-500 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-white text-xl font-semibold ">오늘까지</div>
                            </div>
                            <div data-available="unavailable" data-status="전체" className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-zinc-400 text-xl font-normal ">전체</div>
                            </div>
                            <div data-available="unavailable" data-status="진행 전" className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-zinc-400 text-xl font-normal ">진행 전</div>
                            </div>
                            <div data-available="unavailable" data-status="진행 중" className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-zinc-400 text-xl font-normal">진행 중</div>
                            </div>
                            <div data-available="unavailable" data-status="진행 완료" className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex justify-center items-center gap-2">
                                <div className="justify-start text-zinc-400 text-xl font-normal ">진행 완료</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-[28px] gap-y-[24px]">
                    {tasks.map((task) => (
                        <Task key={task.todoId} task={task} />
                    ))}
                </div>


            </div>
       </div>
    )
}