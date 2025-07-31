'use client';

import { getAllTasks } from '@/app/api-service/adminTodoApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideBarPage from '@/components/side-bar';
import Task from './task';
import { useAuthStore } from '@/store/authStore';
import TaskModal from '../modals/task-modal';
import DashboardSummary from './dashboardSummary';

export default function MainPage() {
  const router = useRouter();
  const [todoType, setTodoType] = useState('');
  const [progressStatus, setProgressStatus] = useState('');

  const [tasks, setTasks] = useState([]);


  const councilName = '위캠퍼스';
  const councilId = 2;
  const {accessToken} = useAuthStore();

  useEffect(() => {
    getAllTasks(accessToken, councilName, councilId, todoType, progressStatus)
      .then(res => {
        const taskArray = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setTasks(taskArray);
      })
      .catch(error => {
        console.error('할 일 목록 가져오기 실패:', error);
        setTasks([]);
      });
  }, [todoType, progressStatus]);
  

  const goToAddPage = () => router.push('/add');

  return (
    <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
      <SideBarPage />

      <div className="mt-[60px] px-[60px] w-full flex flex-col">
        <div className="flex justify-between items-center w-full mb-[24px]">
          <h1 className="w-40 h-14 text-zinc-800 text-4xl font-bold">
            할 일 관리
          </h1>

          <button
            onClick={goToAddPage}
            className="pl-4 pr-5 py-3 bg-blue-500 rounded-lg inline-flex items-center gap-1"
          >
            <span className="w-6 h-6 relative overflow-hidden">
              <span className="w-3 h-3 absolute left-[5.5px] top-[5.5px] bg-white" />
            </span>
            <span className="text-white text-xl font-semibold">
              할 일 등록하기
            </span>
          </button>
        </div>

        {/* (예시) 검색·필터 바 ------------------------------------ */}
     <DashboardSummary />

        {/* 역할별 + 상태별 필터 UI ------------------------------- */}
        {/* …필터 UI 그대로 유지 (생략 없음) … */}
        {/* === 역할별 필터 ===================================== */}
        <div className="mt-[56px] mb-[28px] w-full flex">
          {/* 역할별 ------------------------------------------ */}
          <div className="flex flex-col gap-[12px]">
            <div className="text-neutral-400 text-base font-bold">
              역할별 필터
            </div>
            <div className="flex gap-[12px]">
            <div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${todoType === '' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setTodoType('')}
>
  <span className="text-xl">전체 할 일</span>
</div>

<div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${todoType === 'MY_TODO' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setTodoType('MY_TODO')}
>
  <span className="text-xl">내 할 일</span>
</div>

<div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${todoType === 'RECEIVED_TODO' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setTodoType('RECEIVED_TODO')}
>
  <span className="text-xl">받은 할 일</span>
</div>

<div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${todoType === 'SENT_TODO' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setTodoType('SENT_TODO')}
>
  <span className="text-xl">보낸 할 일</span>
</div>
            </div>
          </div>

          <div className="w-px h-16 bg-zinc-300 mx-[48px]" />

          <div className="flex flex-col gap-[12px]">
            <div className="text-neutral-400 text-base font-bold">
              상태별 필터
            </div>
            <div className="flex gap-[12px]">
              <div   className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${progressStatus === 'DUE_TODAY' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
    onClick={() => setProgressStatus('DUE_TODAY')}>

                <span className="text-xl">
                  오늘까지
                </span>
              </div>
              <div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${progressStatus === '' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setProgressStatus('')}
>
  <span className="text-xl">전체</span>
</div>

<div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${progressStatus === 'NOT_STARTED' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setProgressStatus('NOT_STARTED')}
>
  <span className="text-xl">진행 전</span>
</div>

<div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${progressStatus === 'IN_PROGRESS' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setProgressStatus('IN_PROGRESS')}
>
  <span className="text-xl">진행 중</span>
</div>

<div
  className={`px-4 py-2 rounded-[32px] inline-flex items-center gap-2 cursor-pointer 
    ${progressStatus === 'COMPLETED' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-200 text-zinc-400'}`}
  onClick={() => setProgressStatus('COMPLETED')}
>
  <span className="text-xl">진행 완료</span>
</div>


            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-[28px] gap-y-[24px]">
        {tasks.map(task => (
  <Task key={task.todoId} task={task} />
        ))}
        </div>
        <TaskModal />
      </div>
    </div>
  );
}
