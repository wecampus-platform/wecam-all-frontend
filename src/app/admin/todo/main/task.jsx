'use client';

import { useTaskModalStore } from '@/store/task-modal-store';
import { getTaskDetail } from '@/app/api-service/adminTodoApi';
import { useAuthStore } from '@/store/authStore';
import styles from '@/components/modals/StatusDropdown.module.css';

export default function Task({ task }) {
  const openModal = useTaskModalStore((s) => s.open);
  const {accessToken, councilList} = useAuthStore();
  const councilId = councilList?.[0]?.id || 2;

  const statusClassMap = {
    NOT_STARTED: 'chipstatus',
    IN_PROGRESS: 'chipstatus1',
    COMPLETED: 'chipstatusGreen',
  };
  
  /** 카드 클릭 → 상세 페이지 이동 ------------------------------ */
  const handleClick = async () => {
    const detail = await getTaskDetail(accessToken, councilList?.[0]?.name || '위캠퍼스', task.todoId, councilId);

    // ② 스토어에 저장 + 모달 열기
    openModal(detail);


    
    
  };

  /** 렌더 -------------------------------------------------------- */
  return (
    <div
      onClick={handleClick}
      className="w-full h-[230px] px-[24px] py-[32px] flex flex-col bg-white rounded-xl cursor-pointer"
    >
      {/* 제목 + 상태뱃지 영역 ---------------------------------- */}
      <div className="flex justify-between mb-[20px]">
        <h2 className="text-black text-2xl font-bold">{task.title}</h2>

        <div className="flex gap-[4px]">
          {/* 오늘까지 예시 뱃지 */}
          <div className="px-2 py-1 bg-rose-100 rounded-[32px] outline outline-1 outline-red-500 inline-flex items-center gap-2">
            <span className="text-red-500 text-xs font-semibold">
              오늘까지
            </span>
          </div>

          {/* 진행 전 예시 뱃지 */}
          {task.progressStatus && (
          <div className={styles[statusClassMap[task.progressStatus]]}>
            {statusClassMap[task.progressStatus] === 'chipstatus' && '진행 전'}
            {statusClassMap[task.progressStatus] === 'chipstatus1' && '진행 중'}
            {statusClassMap[task.progressStatus] === 'chipstatusGreen' && '진행 완료'}
          </div>
        )}
        </div>
      </div>

      {/* 설명 -------------------------------------------------- */}
      <p className="text-zinc-600 text-base leading-snug line-clamp-3">
        {task.content}
      </p>

      {/* 담당자 -------------------------------------------------- */}
      <div className="flex mt-[28px] justify-between">
  <div className="flex items-center gap-[2px]">
    <span className="text-zinc-400 text-base">담당자:</span>
    <span className="text-neutral-400 text-base font-semibold">
      {task.managers?.[0]?.userName || '미지정'}
    </span>

    {task.managers?.length > 1 && (
      <span className="text-zinc-400 text-base ml-1">
        +{task.managers.length - 1}명
      </span>
    )}
{task.todoTypeDTO === 'MY_TODO' && (
  <span className="w-6 h-6 bg-sky-100 rounded-[32px] ml-[2px] outline outline-1 outline-blue-500 inline-flex items-center justify-center">
    <span className="text-blue-500 text-[10px] font-medium">ME</span>
  </span>
)}

        </div>
      </div>
    </div>
  );
}