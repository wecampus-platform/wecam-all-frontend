'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { deleteTask} from '@/api-service/adminTodoApi';
import { useTaskModalStore } from '@/store/task-modal-store';
import { useRouter } from 'next/navigation';
import useTaskStore from '@/store/task-store';
import { useAuthStore } from '@/store/authStore';
import { updateTaskStatus } from "@/api-service/adminTodoApi";
import { StatusDropdown } from '@/components/modals/StatusDropdown'; // ✅ 너가 만든 위치 기준

export default function TaskModal() {

  const router = useRouter();
  const { isOpen, detail, close } = useTaskModalStore();
  const {accessToken, councilList} = useAuthStore();
  const councilName = councilList?.[0]?.name || '위캠퍼스';
  const councilId = councilList?.[0]?.id || 2;
  const { loadTaskToForm, setCurrentEditTodoId } = useTaskStore();

  if (!isOpen || !detail) return null;

  /* ③ 파생 값 계산 */
  const dueStr = detail.dueAt
    ? format(new Date(detail.dueAt), 'yyyy년 M월 d일 (EEE)', { locale: ko })
    : '미정';


const statusMap = [
  { value: 'NOT_STARTED', label: '진행 전', className: 'chipstatus' },
  { value: 'IN_PROGRESS', label: '진행 중', className: 'chipstatus1' },
  { value: 'COMPLETED', label: '진행 완료', className: 'chipstatusGreen' }, // 커스텀 추가 가능
];

  const st = statusMap[detail.progressStatus] || statusMap.NOT_STARTED;

  console.log("detail:",detail);
  console.log(detail.todoId);


  const handleEdit = () => {
    loadTaskToForm(detail);   // ① 폼 스토어 채우기
    setCurrentEditTodoId(detail.todoId); //todoId만 저장
    close();                  // ② 현 모달 닫기
    router.push(`/admin/todo/edit`);    // ③ /edit 페이지 이동
  };


  const handleClose = () => {
    close();
    console.log("이동했엉");
    window.location.href = '/admin/todo/main';
  };

  const handleDelete = async () => {
  
    try {
      await deleteTask(accessToken,councilName, detail.todoId, councilId);
      close();
      window.location.href = '/admin/todo/main';
    } catch (err) {
      alert(err.message);
    }
  };

  /* ④ 오버레이 렌더 */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}                        /* 배경 클릭 → 닫기 */
    >
      <div
        onClick={(e) => e.stopPropagation()} /* 내부 클릭은 유지 */
        className="w-[1228px] h-[800px] bg-white rounded-2xl flex flex-col p-[56px] overflow-hidden"
      >
        {/* 헤더 ------------------------------------------------ */}
        <div className="flex justify-between mb-[48px]">
          <h1 className="text-zinc-600 text-5xl font-bold">{detail.title}</h1>
          <div className="flex gap-3 h-12">
            <button
              onClick={handleEdit}
              className="w-[102px] px-4 py-3 bg-blue-500 rounded inline-flex justify-center items-center"
            >
              <span className="text-white text-xl font-bold">수정하기</span>
            </button>
            <button
              onClick={handleDelete}
              className="w-[102px] h-12 px-4 py-3 bg-white rounded outline outline-1 outline-zinc-400 inline-flex justify-center items-center"
            >
              <span className="text-zinc-400 text-xl font-bold">삭제하기</span>
            </button>
          </div>
        </div>
        {/* 메타 정보 ------------------------------------------ */}
        <div className="flex flex-col gap-6 ml-[80px] overflow-y-auto">
          <InfoRow label="마감일" value={dueStr} />

          <InfoRow
              label="진행 여부"
              valueComponent={
                <StatusDropdown
                  currentStatus={detail.progressStatus}
                  onUpdate={(newStatus) =>
                    updateTaskStatus(accessToken, councilName, councilId, detail.todoId, newStatus)
                    
                  }
                />
              }
            />
          <UserRow label="담당자" users={detail.managers} fallback="미지정" />
          <InfoRow label="작성자" value={detail.createUserName} />
        </div>

        {/* 구분선 */}
        <div className="w-full border-t border-slate-100 my-[24px]" />

        {/* 내용 ----------------------------------------------- */}
        <div className="flex mr-[80px] gap-[58px] overflow-y-auto">
          <span className="text-neutral-400 text-base">내용</span>
          <p className="text-neutral-500 text-base font-semibold whitespace-pre-wrap">
            {detail.content}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─ 보조 컴포넌트 ─ */
function InfoRow({ label, value, valueComponent }) {
  return (
    <div className="flex gap-[58px]">
      <span className="text-neutral-400 text-base">{label}</span>
      {valueComponent ? (
        valueComponent
      ) : (
        <span className="text-neutral-500 text-base font-semibold">{value}</span>
      )}
    </div>
  );
}

function UserRow({ label, users, fallback }) {
  if (!users || users.length === 0)
    return <InfoRow label={label} value={fallback} />;

  return (
    <div className="flex gap-[58px]">
      <span className="text-neutral-400 text-base">{label}</span>
      <div className="flex gap-2 items-center">
        {users.map((u) => (
          <div key={u.userId} className="flex gap-2 items-center">
            <img
              src="https://placehold.co/24x24"
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <span className="text-neutral-500 text-base font-semibold">
              {u.userName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
