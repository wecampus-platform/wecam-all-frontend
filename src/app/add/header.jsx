"use client"

import useTaskStore from '@/app/store/task-store';
import { useRouter } from 'next/navigation';
import { createTask } from '@/app/lib/api';

export default function Header({ submitLabel = "등록하기" }) {
  const { newTask, addTask } = useTaskStore();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const apiData = {
        title: newTask.title,
        content: newTask.description,
        dueAt: newTask.deadline,
        managers: [newTask.assignee], // 배열이면 여기 수정
      };

      const councilId = 2;
      const councilName = "위캠퍼스";
      

      const createdTask = await createTask(councilId, councilName, apiData);

      addTask(createdTask);
      router.push('/main');
    } catch (error) {
      console.log('제출 에러:', error);
      alert('업로드 중 에러가 발생했습니다.');
    }
  };

  return (
    <div className="w-full flex mt-[64px] justify-between">
      <div className="text-zinc-800 text-4xl font-bold">할 일 등록하기</div>
      <div className="flex gap-3 h-12">
        <button
          onClick={handleSubmit}
          className="w-[102px] px-4 py-3 bg-blue-500 rounded inline-flex justify-center items-center gap-2">
          <div className="text-white text-xl font-bold">{submitLabel}</div>
        </button>
        <div className="w-[102px] h-12 px-4 py-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-zinc-400 inline-flex justify-center items-center gap-2">
          <div className="text-zinc-400 text-xl font-bold">나가기</div>
        </div>
      </div>
    </div>
  );
}
