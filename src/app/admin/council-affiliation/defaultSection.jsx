'use client';

import { useEffect, useState,useMemo } from 'react';
import { CheckIcon, XIcon } from "@/components/icons/check-icons";
import Checkbox from '@/components/checkbox';
import { useAuthStore } from '@/store/authStore';
import {
  fetchAffiliationRequests,
  approveAffiliationRequest,
  rejectAffiliationRequest
} from '@/api-service/councilAffiliationApi';
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
  

  // 목업 데이터
  const mockRequests = [
    {
      userId: 1,
      inputUserName: "김철수",
      inputOrganizationName: "컴퓨터공학부",
      inputEnrollYear: "2024",
      authenticationType: "NEW_STUDENT",
      ocrResult: "SUCCESS",
      status: "PENDING",
      requestedAt: "2025-08-28T14:39:38.539Z",
      displayStatus: "대기중"
    },
    {
      userId: 2,
      inputUserName: "이영희",
      inputOrganizationName: "전자공학부",
      inputEnrollYear: "2023",
      authenticationType: "NEW_STUDENT",
      ocrResult: "SUCCESS",
      status: "APPROVED",
      requestedAt: "2025-08-27T10:20:15.123Z",
      displayStatus: "승인됨"
    },
    {
      userId: 3,
      inputUserName: "박민수",
      inputOrganizationName: "기계공학부",
      inputEnrollYear: "2024",
      authenticationType: "NEW_STUDENT",
      ocrResult: "SUCCESS",
      status: "REJECTED",
      requestedAt: "2025-08-26T16:45:22.456Z",
      displayStatus: "거절됨"
    },
    {
      userId: 4,
      inputUserName: "정수진",
      inputOrganizationName: "화학공학부",
      inputEnrollYear: "2023",
      authenticationType: "NEW_STUDENT",
      ocrResult: "SUCCESS",
      status: "PENDING",
      requestedAt: "2025-08-25T09:15:33.789Z",
      displayStatus: "대기중"
    },
    {
      userId: 5,
      inputUserName: "최동현",
      inputOrganizationName: "건축공학부",
      inputEnrollYear: "2024",
      authenticationType: "NEW_STUDENT",
      ocrResult: "SUCCESS",
      status: "PENDING",
      requestedAt: "2025-08-24T11:30:45.012Z",
      displayStatus: "대기중"
    }
  ];

  const refreshRequests = async () => {
    console.log('🔍 소속 요청 목록 새로고침 시작');
    
    try {
      // 실제 API 호출 시도
      if (currentCouncil) {
        console.log('🔍 API 호출 시도:', { councilName: currentCouncil.name });
        
        try {
          const data = await fetchAffiliationRequests(currentCouncil.name);
          console.log('🔍 API 응답 데이터:', data);
          
          if (data && Array.isArray(data)) {
            // 직접 배열인 경우
            const processedRequests = data.map(item => {
              console.log('🔍 처리 중인 항목:', item);
              
              if (item.status && typeof item.status === 'string' && item.status !== 'string') {
                return item;
              } else {
                console.warn('🔍 유효하지 않은 status 필드:', item.status);
                return {
                  ...item,
                  status: 'PENDING',
                  displayStatus: '대기중'
                };
              }
            });
            
            setRequests(processedRequests);
            setCheckedList(Array(processedRequests.length).fill(false));
            console.log('🔍 실제 API 데이터 로드 성공:', processedRequests.length, '개');
            return;
          } else if (data && data.result && Array.isArray(data.result)) {
            // result 필드에 배열이 있는 경우
            const processedRequests = data.result.map(item => {
              console.log('🔍 처리 중인 항목:', item);
              
              if (item.status && typeof item.status === 'string' && item.status !== 'string') {
                return item;
              } else {
                console.warn('🔍 유효하지 않은 status 필드:', item.status);
                return {
                  ...item,
                  status: 'PENDING',
                  displayStatus: '대기중'
                };
              }
            });
            
            setRequests(processedRequests);
            setCheckedList(Array(processedRequests.length).fill(false));
            console.log('🔍 실제 API 데이터 로드 성공 (result 필드):', processedRequests.length, '개');
            return;
          } else {
            console.warn('🔍 예상과 다른 API 응답 구조:', data);
          }
        } catch (apiError) {
          console.error('🔍 API 호출 실패:', apiError);
          console.log('🔍 API 오류 상세:', {
            name: apiError.name,
            message: apiError.message,
            stack: apiError.stack
          });
        }
      } else {
        console.warn('🔍 currentCouncil이 없음');
      }
      
      // API 실패 시 목업 데이터 사용
      console.log('🔍 목업 데이터 사용');
      setRequests(mockRequests);
      setCheckedList(Array(mockRequests.length).fill(false));
      console.log('🔍 목업 데이터 로드 성공:', mockRequests.length, '개');
      
    } catch (error) {
      console.error('🔍 데이터 로드 실패:', error);
      // 에러가 발생해도 목업 데이터 사용
      setRequests(mockRequests);
      setCheckedList(Array(mockRequests.length).fill(false));
    }
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
      console.error('❌ 승인 실패:', e);
      alert('승인 중 오류가 발생했습니다.\n다시 시도해주세요.');
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
      console.error('❌ 거절 실패:', e);
      alert('거절 중 오류가 발생했습니다.\n다시 시도해주세요.');
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
           <div className="grid grid-cols-[40px_120px_80px_150px_1fr_120px_240px] items-center px-4 py-2 text-xs text-gray-500">
             <div></div>
             <div>이름</div>
             <div>학번</div>
             <div>학부</div>
             <div>신청일</div>
             <div>상태</div>
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
        refreshRequests={refreshRequests}
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