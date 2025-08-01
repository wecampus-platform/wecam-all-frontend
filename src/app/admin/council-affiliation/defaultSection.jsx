'use client';

import { useEffect, useState,useMemo } from 'react';
import { CheckIcon, XIcon } from "@/components/icons/check-icons";
import Checkbox from '@/components/checkbox';
import { useAuthStore } from '@/store/authStore';
import {
  fetchAffiliationRequests,
  approveAffiliationRequest,
  rejectAffiliationRequest
} from '@/app/api-service/councilAffiliationApi';
import AffiliationDetailModal from './modals/affiliationDetailModal';
import RejectReasonModal from '@/app/admin/council-affiliation/modals/rejectReasonModal';

export function DefaultSection({ authFilterIndex }) {
  const [activeTab, setActiveTab] = useState('match');
  const [checkedList, setCheckedList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);


  const councilList = useAuthStore((state) => state.councilList);
  const currentCouncil = councilList?.[0];

  const authTypeMap = {
    0: null, // 전체
    1: 'CURRENT_STUDENT', //재학
    2: 'NEW_STUDENT', //신입
  };


  const filteredRequests = useMemo(() => {
    const ocrFiltered = requests.filter((req) =>
      activeTab === 'match' ? req.ocrResult === 'SUCCESS' : req.ocrResult === 'UNCLEAR'
    );

  
    const targetAuth = authTypeMap[authFilterIndex];
    return targetAuth
      ? ocrFiltered.filter((req) => req.authenticationType === targetAuth)
      : ocrFiltered;
  }, [requests, activeTab, authFilterIndex]);
  
  
  useEffect(() => {
    setCheckedList(Array(filteredRequests.length).fill(false));
  }, [filteredRequests]);
  

  const refreshRequests = async () => {
    if (!currentCouncil) return;
    const data = await fetchAffiliationRequests(currentCouncil.name);
    setRequests(data);
    // setCheckedList(Array(data.length).fill(false));
  };



  useEffect(() => {
    refreshRequests();
  }, [currentCouncil]);

  const handleApprove = async (req) => {
    if (!currentCouncil) return;

    try {
      await approveAffiliationRequest({
        councilName: currentCouncil.name,
        userId: req.userId ?? req.id,
        authType: req.authType ?? 'CURRENT_STUDENT',
      });

      alert(`${req.inputUserName}님의 요청이 승인되었습니다.`);
      refreshRequests();
    } catch (e) {
      console.error('승인 실패:', e);
      alert('승인 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (req, reason) => {
    if (!currentCouncil) return;
  
    try {
      await rejectAffiliationRequest({
        councilName: currentCouncil.name,
        userId: req.userId ?? req.id,
        authType: req.authType ?? 'CURRENT_STUDENT',
        reason, // ✅ 여기 반영
      });

      console.log("reason:",reason);
  
      alert(`${req.inputUserName}님의 요청이 거절되었습니다.`);
      refreshRequests();
    } catch (e) {
      console.error('거절 실패:', e);
      alert('거절 중 오류가 발생했습니다.');
    }
  };
  

  const openModal = (req) => {
    setSelectedRequest(req);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const tabs = [
    { key: 'match', label: '일치 그룹', icon: CheckIcon },
    { key: 'mismatch', label: '불일치 그룹', icon: XIcon },
  ];

  const toggleCheck = (index) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  const toggleAll = () => {
    const allChecked = checkedList.every(Boolean);
    setCheckedList(Array(checkedList.length).fill(!allChecked));
  };

  

  return (
    <div className="w-full flex flex-col items-start justify-start text-left text-base text-gray4 font-pretendard rounded">
      {/* 탭 + 전체 체크 */}
      <div className="flex flex-row items-center w-full mx-10 my-6">
        <Checkbox className="mr-10" checked={checkedList.every(Boolean)} onChange={toggleAll} variant="filled" />
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-40 flex flex-row items-center pt-3 pb-2 pl-2 gap-1 cursor-pointer ${isActive
                ? "border-b-2 border-point text-point font-medium"
                : "border-b-0 text-gray3"
                }`}
            >
              <div>{tab.label}</div>
              <div className="w-5 h-5 relative overflow-hidden shrink-0">
                <IconComponent active={isActive} className="w-full h-full" />
              </div>
            </button>
          );
        })}
      </div>

      {/* 테이블 헤더 */}
      <div className="w-full p-10">
        <div className="grid grid-cols-[40px_120px_80px_150px_1fr_240px] items-center px-4 py-2 text-xs text-gray-500">
          <div></div>
          <div>이름</div>
          <div>학번</div>
          <div>학부</div>
          <div>신청일</div>
          <div></div>
        </div>

        {/* 실제 목록 */}
        {filteredRequests.map((req, idx) => (
          <div key={req.id || idx} className="grid grid-cols-[40px_120px_80px_150px_1fr_240px] items-center px-4 py-3">
            <Checkbox checked={checkedList[idx]} onChange={() => toggleCheck(idx)} variant="filled" />
            <div className="font-medium">{req.inputUserName}</div>
            <div className="text-sm text-gray-600">{req.inputEnrollYear}</div>
            <div className="truncate">{req.inputOrganizationName}</div>
            <div className="text-sm text-gray-400">{req.requestedAt?.replace('T', ' ') ?? '-'}</div>
            <div className="flex gap-x-2 justify-end">
              <button
                className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer"
                onClick={() => openModal(req)}
              >
                상세보기
              </button>
              <button
                onClick={() => handleApprove(req)}
                className="bg-green-500 text-white rounded px-3 py-1 text-sm"
              >
                승인하기
              </button>
              <button
  onClick={() => {
    setSelectedRequest(req);            // ✅ 어떤 요청인지 지정
    setRejectModalOpen(true);           // ✅ 모달 열기
  }}
  className="bg-red-500 text-white rounded px-3 py-1 text-sm"
>
  거절하기
</button>
            </div>
          </div>
        ))}
      </div>

      <AffiliationDetailModal
        isOpen={modalOpen}
        onClose={closeModal}
        request={selectedRequest}
      />
    <RejectReasonModal
      isOpen={rejectModalOpen}
      onClose={() => setRejectModalOpen(false)}
      onConfirm={(reason) => {
        if (selectedRequest) {
          handleReject(selectedRequest, reason); // ✅ req + reason 전달
        }
        setRejectModalOpen(false);
      }}
    />
    </div>
  );
}
