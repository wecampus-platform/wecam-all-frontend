'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTaskDetail } from '@/app/api-service/adminTodoApi';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuthStore } from '@/app/store/authStore';

export default function ModalPage() {
  const params = useSearchParams();
  const todoId = params.get('id');         // ?id=123
  const councilName = '위캠퍼스';
  const councilId = 2;
  const {accessToken} = useAuthStore();

  const [detail, setDetail] = useState(null);

  /* ───────────────────────────── API 호출 */
  useEffect(() => {
    if (!todoId) return;
    getTaskDetail(accessToken,councilName, todoId, councilId)
      .then(setDetail)
      .catch(console.error);
  }, [todoId]);

  if (!detail) return <div className="p-16">로딩 중…</div>;

  /* ───────────────────────────── 값 가공 */
  const dueStr = detail.dueAt
    ? format(new Date(detail.dueAt), 'yyyy년 M월 d일 (EEE)', { locale: ko })
    : '미정';

  const statusMap = {
    DONE:  { label: '진행 완료', bg: 'bg-green-100', outline: 'outline-green-500', text: 'text-green-500' },
    IN_PROGRESS: { label: '진행 중', bg: 'bg-blue-100', outline: 'outline-blue-500', text: 'text-blue-500' },
    NOT_STARTED: { label: '진행 전', bg: 'bg-zinc-300', outline: 'outline-zinc-600', text: 'text-zinc-600' },
  };
  const st = statusMap[detail.progressStatus] || statusMap.NOT_STARTED;

  /* ───────────────────────────── 렌더   */
  return (
    <div className="w-[1228px] h-[800px] bg-white mt-[64px] mx-[56px] flex flex-col">
      {/* ── 헤더 ─────────────────────────── */}
      <div className="flex justify-between mb-[48px]">
        <h1 className="text-zinc-600 text-5xl font-bold">{detail.title}</h1>

        <div className="flex gap-2">
          <button className="px-4 py-3 rounded outline outline-1 outline-blue-500 text-blue-500 font-bold">
            수정하기
          </button>
          <button className="px-4 py-3 rounded bg-slate-100 text-zinc-400 font-bold">
            삭제하기
          </button>
        </div>
      </div>

      {/* ── 메타 정보 블록 ───────────────── */}
      <div className="flex flex-col ml-[80px] gap-[28px] overflow-y-auto">
        {/* 마감일 */}
        <InfoRow label="마감일" value={dueStr} />

        {/* 진행 여부 */}
        <div className="flex gap-[40px]">
          <span className="text-neutral-400 text-base">진행 여부</span>
          <span
            className={`px-2 py-1 rounded-[32px] outline outline-1 ${st.bg} ${st.outline} ${st.text} text-xs font-semibold`}
          >
            {st.label}
          </span>
        </div>

        {/* 담당자 (managers 배열) */}
        <UserRow label="담당자" users={detail.managers} fallback="미지정" />

        {/* 작성자 */}
        <InfoRow label="작성자" value={detail.createUserName} />
      </div>

      {/* 구분선 */}
      <div className="w-full border-t border-slate-100 my-[24px]" />

      {/* ── 내용 ------------------------------------------------ */}
      <div className="flex mr-[80px] gap-[58px] overflow-y-auto">
        <span className="text-neutral-400 text-base">내용</span>
        <p className="text-neutral-500 text-base font-semibold whitespace-pre-wrap">
          {detail.content}
        </p>
      </div>
    </div>
  );
}

/* ── 보조 컴포넌트들 ─────────────────────────────── */
function InfoRow({ label, value }) {
  return (
    <div className="flex gap-[58px]">
      <span className="text-neutral-400 text-base">{label}</span>
      <span className="text-neutral-500 text-base font-semibold">{value}</span>
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
