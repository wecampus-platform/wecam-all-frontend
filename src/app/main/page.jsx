'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getAllTasks } from '@/app/api-service/api';
import SideBarPage from '@/app/main/side-bar';
import Task from '@/app/main/task';

export default function MainPage() {
  const router = useRouter();

  /** 상태 ----------------------------------------------------------- */
  const [tasks, setTasks] = useState([]);

  // 임시 하드코딩 — 실제론 로그인 정보·context 등에서 가져오면 됨
  const councilName = '위캠퍼스';
  const councilId = 2;

  /** 사이드 이펙트 -------------------------------------------------- */
  useEffect(() => {
    getAllTasks(councilName, councilId)
      .then(res => {
        // 응답 구조가 배열인지 객체인지 확인
        //   - 배열:   [{…}, {…}]
        //   - 객체:   { data: [{…}] }
        const taskArray = Array.isArray(res) ? res : res.data;
        setTasks(taskArray);
      })
      .catch(console.error);
  }, []);

  /** 네비게이션 ------------------------------------------------------ */
  const goToAddPage = () => router.push('/add');

  /** 렌더 ----------------------------------------------------------- */
  return (
    <div className="h-screen w-full bg-[#F5F7FA] flex overflow-hidden">
      {/* 사이드바 --------------------------------------------------- */}
      <SideBarPage />

      {/* 메인 영역 -------------------------------------------------- */}
      <div className="mt-[60px] px-[60px] w-full flex flex-col">
        {/* 헤더 (제목 + 버튼) ------------------------------------- */}
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
        <div className="w-[1300px] h-64 bg-white rounded-3xl" />

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
              <div className="px-4 py-2 bg-blue-500 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-white text-xl font-semibold">
                  전체 할 일
                </span>
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-zinc-400 text-xl">내 할 일</span>
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-zinc-400 text-xl">받은 할 일</span>
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-zinc-400 text-xl">보낸 할 일</span>
              </div>
            </div>
          </div>

          {/* 세로 구분선 ------------------------------------- */}
          <div className="w-px h-16 bg-zinc-300 mx-[48px]" />

          {/* 상태별 ------------------------------------------- */}
          <div className="flex flex-col gap-[12px]">
            <div className="text-neutral-400 text-base font-bold">
              상태별 필터
            </div>
            <div className="flex gap-[12px]">
              <div className="px-4 py-2 bg-blue-500 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-white text-xl font-semibold">
                  오늘까지
                </span>
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-zinc-400 text-xl">전체</span>
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-zinc-400 text-xl">진행 전</span>
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-zinc-400 text-xl">진행 중</span>
              </div>
              <div className="px-4 py-2 bg-gray-200 rounded-[32px] inline-flex items-center gap-2">
                <span className="text-zinc-400 text-xl">진행 완료</span>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 그리드 ---------------------------------------- */}
        <div className="grid grid-cols-3 gap-x-[28px] gap-y-[24px]">
          {tasks.map(task => (
            <Task key={task.todoId} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
