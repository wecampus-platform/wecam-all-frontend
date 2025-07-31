'use client';

import { useEffect, useState } from 'react';
import { fetchInvitationHistory } from '../api-service/invitationApi';
import { useAuthStore } from '../store/authStore';

const codeUseHistoryModal = ({ onClose, invitation }) => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const councilList = useAuthStore((state) => state.councilList);
  const currentCouncil = councilList?.[0];

  useEffect(() => {
    const fetchHistory = async () => {
      if (!invitation || !currentCouncil) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchInvitationHistory(currentCouncil.name, invitation.id);
        setHistoryData(data);
      } catch (error) {
        console.error('사용 내역 조회 실패:', error);
        setHistoryData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [invitation, currentCouncil]);

  return (
    <div className="w-[642px] h-[790px] relative bg-white rounded-lg">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
      >
        ×
      </button>
      <div className="w-[586px] py-8 left-[28px] top-[74px] absolute bg-slate-100 rounded-lg inline-flex justify-center items-center gap-16">
        <div className="justify-start text-blue-500 text-5xl font-bold font-['Pretendard']">
          {invitation?.code || 'A3a1bb'}
        </div>
      </div>
      <div className="left-[60px] top-[36px] absolute inline-flex justify-start items-center gap-5">
        <div className="justify-start text-zinc-400 text-xs font-normal font-['Pretendard']">생성자</div>
        <div className="text-center justify-start text-neutral-400 text-xs font-semibold font-['Pretendard']">
          {invitation?.makeUser || '김위캠'}
        </div>
      </div>
      <div className="left-[288px] top-[36px] absolute inline-flex justify-start items-center gap-5">
        <div className="justify-start text-zinc-400 text-xs font-normal font-['Pretendard']">생성 일시</div>
        <div className="text-center justify-start text-neutral-400 text-xs font-semibold font-['Pretendard']">
          {invitation?.requestedAt || '2025.07.01'}
        </div>
      </div>
      <div className="left-[455px] top-[36px] absolute inline-flex justify-start items-center gap-5">
        <div className="justify-start text-zinc-400 text-xs font-normal font-['Pretendard']">만료 일시</div>
        <div className="text-center justify-start text-neutral-400 text-xs font-bold font-['Pretendard']">
          {invitation?.expiredAt || '2025.07.01'}
        </div>
      </div>
      <div className="left-[278px] top-[219px] absolute text-center justify-start text-zinc-600 text-base font-semibold font-['Pretendard']">
        {invitation?.type || '학생회 초대용'}
      </div>
      <div className="left-[28px] top-[294px] absolute justify-start text-zinc-600 text-2xl font-bold font-['Pretendard']">초대 코드 사용 내역</div>
      <div className="w-[586px] h-0 left-[28px] top-[262px] absolute outline outline-1 outline-offset-[-0.50px] outline-slate-100" />
      <div className="w-[586px] h-96 left-[28px] top-[335px] absolute inline-flex flex-col justify-start items-start gap-1 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            로딩 중...
          </div>
        ) : historyData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            사용 내역이 없습니다.
          </div>
        ) : (
          historyData.map((item, idx) => (
            <div key={idx} className="w-[586px] px-4 py-3 bg-gray-50 rounded-lg inline-flex justify-between items-center">
              <div className="w-24 flex justify-between items-center">
                <div className="text-center justify-start text-zinc-600 text-xs font-semibold font-['Pretendard']">
                  {item.userName || '이름'}
                </div>
                <div className="text-center justify-start text-neutral-400 text-xs font-normal font-['Pretendard']">
                  {item.userEmail || '아이디'}
                </div>
              </div>
              <div className="text-center justify-start text-zinc-600 text-xs font-medium font-['Pretendard']">
                {item.usedAtTime ? new Date(item.usedAtTime).toLocaleString('ko-KR') : '사용 시각'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Modal1;
