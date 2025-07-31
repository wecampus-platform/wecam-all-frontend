'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import useTaskStore from '@/app/store/task-store';
import { createTask, updateTask } from '@/app/api-service/adminTodoApi';


/**
 * @param {{
 *   mode?: 'create' | 'edit',
 *   todoId?: number,               // edit 모드일 때 필수
 *   submitLabel?: string,
 *   titleComponent?: React.ReactNode
 * }} props
 */
export default function Header({
  mode = 'create',
  todoId,
  submitLabel = mode === 'edit' ? '수정하기' : '등록하기',
  titleComponent,
}) {
  const { newTask, addTask } = useTaskStore();
  const router = useRouter();
  const { accessToken, role, councilList } = useAuthStore();

  const councilId   = 2;
  const councilName = '위캠퍼스';

  /* ---------- 공통 payload ---------- */
  const apiData = {
    title: newTask.title,
    content: newTask.description,
    dueAt: newTask.deadline,
    managers: newTask.assigneeList?.map((a) => a.userId), // ✅ 수정: userId 리스트만 추출
  };

  /* ---------- 제출 ---------- */
  const handleSubmit = async () => {
    try {
      const latestTask = useTaskStore.getState().newTask; // ✅ 최신 상태 직접 조회

      const apiData = {
        title: latestTask.title,
        content: latestTask.description,
        dueAt: latestTask.deadline,
        managers: latestTask.assigneeList?.map((a) => a.userId), // ✅ 수정: userId 리스트만 추출
      };

      const councilId = 2;
      const councilName = "위캠퍼스";
      console.log("[create]apiData : " , apiData);
      console.log("[create]latestTask : " , latestTask.file);

      if (mode === 'create') {
        const created = await createTask(accessToken,councilId, councilName, apiData,latestTask.file);
        addTask(created);              // 목록에 즉시 추가
      } else {
        if (!todoId) throw new Error('todoId missing for edit');
        await updateTask(accessToken,councilId, councilName, todoId, apiData);
      }
      router.push('/main');
      router.refresh();                // 메인 새로고침
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  /* ---------- 렌더 ---------- */
  const wrapperClass = `flex justify-between ${titleComponent ? 'mt-[64px]' : ''}`;

  return (
    <div className={wrapperClass}>
      {titleComponent ?? null}

      <div className="flex gap-3 h-12">
        <button
          onClick={handleSubmit}
          className="w-[102px] px-4 py-3 bg-blue-500 rounded inline-flex justify-center items-center"
        >
          <span className="text-white text-xl font-bold">{submitLabel}</span>
        </button>

        <button
          onClick={() => router.back()}
          className="w-[102px] h-12 px-4 py-3 bg-white rounded outline outline-1 outline-zinc-400 inline-flex justify-center items-center"
        >
          <span className="text-zinc-400 text-xl font-bold">나가기</span>
        </button>
      </div>
    </div>
  );
}
