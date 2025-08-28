'use client';
import { useState, useEffect } from 'react';
import { detailAffiliationRequest } from '@/api-service/councilAffiliationApi';
import RejectReasonModal from '@/app/admin/council-affiliation/modals/rejectReasonModal';
import { useAuthStore } from '@/store/authStore';
import {
  approveAffiliationRequest,
  rejectAffiliationRequest
} from '@/api-service/councilAffiliationApi';
const rowHeaders = ['이름', '입학년도', '소속', '증명서 발급일'];
const colHeaders = ['입력 정보', '증명서 정보(OCR 결과)'];
const ocrLabels = ['신뢰도', '이름 인식률', '학번 인식률', '소속 인식률'];

export default function AffiliationDetailModal({ isOpen, onClose, request }) {
  if (!isOpen || !request) return null;
  const [fetchedData, setFetchedData] = useState(null); // 서버 응답 저장

  const apiData = fetchedData || {};
  const ocrData = apiData.ocrResult?.split(',') || ['-', '-', '-', '-'];
  const councilList = useAuthStore((state) => state.councilList);
  const currentCouncil = councilList?.[0];

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  
  const openModal = () => {
    setRejectModalOpen(true);
  };

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

  useEffect(() => {
    const fetchDetail = async () => {
      if (!isOpen || !request?.userId || !request?.authenticationType) return;
      try {
        const result = await detailAffiliationRequest({
          councilName: request.councilName,
          userId: request.userId,
          authType: request.authenticationType,
        });
        setFetchedData(result); // 상태에 저장
        console.log(result);
      } catch (e) {
        console.error('상세 조회 실패:', e);
      }
    };

    fetchDetail();
  }, [isOpen, request]);

  const ocrValues = fetchedData?.ocrResult?.split(',') || ['-', '-', '-', '-'];

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

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto rounded">
      <div className="bg-white w-[800px] h-[1000px] p-6 rounded shadow relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl"
        >
          &times;
        </button>

        <div className="flex-1 flex flex-col justify-between gap-4 mt-6">
          {/* 신청일 */}
          <div className="flex flex-row justify-between bg-cream p-10">
          <div className="w-1/3 pr-5 flex items-start justify-start">
            신청일: {fetchedData?.requestedAt?.replace('T', ' ') ?? '-'}
          </div>           
          <div className="w-px bg-gray3"></div>
            <div className="w-1/2 pl-5 grid grid-cols-2 gap-y-1 text-sm">
              {ocrLabels.map((label, index) => (
                <div key={index} className="contents">
                  <div className="text-gray-600">{label}</div>
                  <div>{ocrData[index] ?? '-'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 그리드 영역 */}
          <div className="flex flex-col gap-0">
            {/* Header row */}
            <div className="flex border-b border-gray-300">
              <div className="w-1/6 px-2 py-1"></div>
              <div className="w-2/6 px-2 py-1">{colHeaders[0]}</div>
              <div className="w-2/6 px-2 py-1">{colHeaders[1]}</div>
              <div className="w-1/6 px-2 py-1"></div>
            </div>

            {/* Data rows */}
            {rowHeaders.map((label, rowIdx) => {
            const inputValue = [
              fetchedData?.inputUserName,
              fetchedData?.inputEnrollYear,
              fetchedData?.inputOrganizationName,
            ][rowIdx];

            const ocrValue = [
              fetchedData?.ocrUserName,
              fetchedData?.ocrEnrollYear,
              fetchedData?.ocrOrganizationName,
              fetchedData?.issuanceDate?.replace('T', ' ') ?? '-', // 동일
            ][rowIdx];

            const isMatched = inputValue === ocrValue;

            return (
              <div key={rowIdx} className={`flex border-b border-gray-300 py-5 ${!isMatched && 'bg-[#FFF1F1]'}`}>
                <div className="w-1/4 px-2 py-1 font-medium">{label}</div>
                <div className="w-1/4 px-2 py-1">{inputValue}</div>
                <div className="w-1/4 px-2 py-1">{ocrValue}</div>

                <div className="w-1/4 px-2 py-1 flex justify-center items-center">
                  {isMatched ? (
                  <div className="w-7 h-7 rounded-full flex justify-center items-center text-blue-300">
                    ✓
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full flex justify-center items-center text-red-500 ">
                    ✕
                  </div>
                  )}
                </div>
              </div>
            );
          })}



          </div>

          {/* 일치 확인 영역 */}
          <div className="flex items-center justify-center py-10">
          <div
  className={`w-[586px] py-8 rounded-xl inline-flex justify-center items-center gap-2
  ${fetchedData?.ocrResult === 'UNCLEAR'
                ? 'bg-[#FFE7E7] text-red'
                : 'bg-[#DCF8E8] text-green'}
            `}
          >
            {fetchedData?.ocrResult === 'UNCLEAR'
              ? '불일치 항목이 존재합니다.'
              : '모든 항목이 일치합니다.'}
          </div>
        </div>

          {/* 첨부파일 영역 */}
          <div className="flex flex-col py-8 bg-cream gap-2 rounded pl-5">
            <div>첨부 파일(#)</div>
            <div className="flex flex-row gap-3">
              <button className="rounded-[32px] bg-white border border-point text-point py-2 px-3">파일명_재학증명서1</button>
              <button className="rounded-[32px] bg-white border border-point text-point py-2 px-3">파일명_재학증명서2</button>
              <button className="rounded-[32px] bg-white border border-point text-point py-2 px-3">파일명_재학증명서3</button>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleApprove(request)}
              className="bg-green-500 text-white rounded px-4 py-2 text-sm"
            >
              승인하기
            </button>
            <button
  onClick={() => {
    setSelectedRequest(request);            // 어떤 요청인지 지정
    setRejectModalOpen(true);           // 모달 열기
  }}
  className="bg-red-500 text-white rounded px-3 py-1 text-sm"
>
  거절하기
</button>
          </div>
        </div>
      </div>
    </div>
    <RejectReasonModal
      isOpen={rejectModalOpen}
      onClose={() => setRejectModalOpen(false)}
      onConfirm={(reason) => {
        if (selectedRequest) {
          handleReject(selectedRequest, reason); // req + reason 전달
        }
        setRejectModalOpen(false);
      }}
    />
  </>
  );
}