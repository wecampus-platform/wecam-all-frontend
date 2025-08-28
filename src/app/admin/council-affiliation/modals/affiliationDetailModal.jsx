'use client';

const rowHeaders = ['이름', '입학년도', '소속', '증명서 발급일'];
const colHeaders = ['입력 정보', '증명서 정보(OCR 결과)'];
const ocrLabels = ['신뢰도', '이름 인식률', '학번 인식률', '소속 인식률'];

export default function AffiliationDetailModal({ isOpen, onClose, request }) {
  if (!isOpen || !request) return null;

  const apiData = request.data || [];
  const ocrData = request.data || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] p-6 rounded shadow relative flex flex-col overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl hover:text-gray-600"
        >
          &times;
        </button>

        <div className="flex-1 flex flex-col gap-4 mt-6">
          {/* 신청일 */}
          <div className="flex flex-row justify-between bg-cream p-6">
            <div className="w-1/3 pr-4 flex items-start justify-start text-sm">
              신청일: {request.requestedAt ? new Date(request.requestedAt).toLocaleDateString('ko-KR') : '날짜 없음'}
            </div>
            <div className="w-px bg-gray3"></div>
            <div className="w-1/2 pl-4 grid grid-cols-2 gap-y-1 text-sm">
              {ocrLabels.map((label, index) => (
                <div key={index} className="contents">
                  <div className="text-gray-600">{label}</div>
                  <div>{ocrData[index] ?? '-'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 그리드 영역 */}
          <div className="flex flex-col gap-0 text-sm">
            {/* Header row */}
            <div className="flex border-b border-gray-300">
              <div className="w-1/6 px-2 py-2 font-medium">{rowHeaders[0]}</div>
              <div className="w-2/6 px-2 py-2 font-medium">{colHeaders[0]}</div>
              <div className="w-2/6 px-2 py-2 font-medium">{colHeaders[1]}</div>
              <div className="w-1/6 px-2 py-2"></div>
            </div>

            {/* Data rows */}
            {rowHeaders.slice(1).map((label, rowIdx) => (
              <div key={rowIdx} className="flex border-b border-gray-300 py-3">
                <div className="w-1/6 px-2 py-1 text-gray-600">{label}</div>
                <div className="w-2/6 px-2 py-1">
                  {label === '입학년도' ? request.inputEnrollYear : 
                   label === '소속' ? request.inputOrganizationName : 
                   label === '증명서 발급일' ? (request.requestedAt ? new Date(request.requestedAt).toLocaleDateString('ko-KR') : '-') : '-'}
                </div>
                <div className="w-2/6 px-2 py-1 text-gray-500">OCR 결과</div>
                <div className="w-1/6 px-2 py-1"></div>
              </div>
            ))}
          </div>

          {/* 일치 확인 영역 */}
          <div className="flex items-center justify-center py-4 bg-lightgreen text-green rounded text-sm">
            모든 항목이 일치합니다.
          </div>

          {/* 첨부파일 영역 */}
          <div className="flex flex-col py-4 bg-cream gap-2 rounded pl-4">
            <div className="text-sm font-medium">첨부 파일</div>
            <div className="flex flex-row gap-2 flex-wrap">
              <button className="rounded-full bg-white border border-point text-point py-1 px-3 text-xs">재학증명서1</button>
              <button className="rounded-full bg-white border border-point text-point py-1 px-3 text-xs">재학증명서2</button>
              <button className="rounded-full bg-white border border-point text-point py-1 px-3 text-xs">재학증명서3</button>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleApprove(request)}
              className="bg-green-500 text-white rounded px-4 py-2 text-sm hover:bg-green-600 transition-colors"
            >
              승인하기
            </button>
            <button
              onClick={() => handleReject(request)}
              className="bg-red-500 text-white rounded px-4 py-2 text-sm hover:bg-red-600 transition-colors"
            >
              거절하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
