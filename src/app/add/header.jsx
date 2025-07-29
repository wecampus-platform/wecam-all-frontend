'use client';

import { useRouter } from 'next/navigation';
import useTaskStore from '@/app/store/task-store';
import { createTask } from '@/app/api-service/api';

/**
 * @param {{ submitLabel?: string, titleComponent?: React.ReactNode }} props
 */
export default function Header({ submitLabel = '등록하기', titleComponent }) {
  const { newTask, addTask } = useTaskStore();
  const router = useRouter();

  /* ---- 제출 로직 -------------------------------------------- */
  const handleSubmit = async () => {
    try {
      const apiData = {
        title: newTask.title,
        content: newTask.description,
        dueAt: newTask.deadline,
        managers: [newTask.assignee],
      };
      const created = await createTask(2, '위캠퍼스', apiData);
      addTask(created);
      router.push('/main');
    } catch (err) {
      console.error(err);
      alert('업로드 중 에러가 발생했습니다.');
    }
  };
  const wrapperClass = `flex justify-between ${
    titleComponent ? 'mt-[64px]' : ''
  }`;

  /* ---- 렌더 -------------------------------------------------- */
  return (
    <div className={wrapperClass}>
      {/* 왼쪽: 전달된 컴포넌트가 있을 때만 표시 */}
      {titleComponent ?? null}

      {/* 오른쪽: 버튼들 */}
      <div className="flex gap-3 h-12">
        <button
          onClick={handleSubmit}
          className="w-[102px] px-4 py-3 bg-blue-500 rounded inline-flex justify-center items-center"
        >
          <span className="text-white text-xl font-bold">{submitLabel}</span>
        </button>

        <div className="w-[102px] h-12 px-4 py-3 bg-white rounded outline outline-1 outline-zinc-400 inline-flex justify-center items-center">
          <span className="text-zinc-400 text-xl font-bold">나가기</span>
        </div>
      </div>
    </div>
  );
}
