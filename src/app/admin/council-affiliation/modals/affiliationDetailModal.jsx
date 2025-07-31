'use client';

const rowHeaders = ['이름', '입학년도', '소속', '증명서 발급일'];
const colHeaders = ['입력 정보', '증명서 정보(OCR 결과)'];
const ocrLabels = ['신뢰도', '이름 인식률', '학번 인식률', '소속 인식률'];

export default function AffiliationDetailModal({ isOpen, onClose, request }) {
  if (!isOpen || !request) return null;

  const apiData = request.data || [];
  const ocrData = request.data || [];

  return (
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
            <div className="w-1/3 pr-5 flex items-start justify-start">신청일: {request.date}</div>
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
            {rowHeaders.map((label, rowIdx) => (
              <div key={rowIdx} className="flex border-b border-gray-300 py-5">
                <div className="w-1/4 px-2 py-1">{label}</div>
                {[0, 1, 2].map((colIdx) => {
                  const flatIndex = rowIdx * 3 + colIdx;
                  return (
                    <div key={colIdx} className="w-1/4 px-2 py-1">
                      {apiData[flatIndex] ?? ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* 일치 확인 영역 */}
          <div className="flex items-center justify-center py-10 bg-lightgreen text-green rounded">
            모든 항목이 일치합니다.
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
              onClick={() => handleReject(request)}
              className="bg-red-500 text-white rounded px-4 py-2 text-sm"
            >
              거절하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
