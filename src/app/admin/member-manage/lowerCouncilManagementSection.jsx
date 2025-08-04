'use client';

import { useState } from 'react';

//기본 레이아웃
function LowerCouncilRow({ req, showActions = false, onApprove, onReject, onDetail }) {
    return (
        <div className="grid grid-cols-[100px_120px_160px_1fr_70px_auto] items-center px-4 py-5 bg-white border rounded-[8px] border-gray1 my-2">
            <div className="font-medium text-center items-center justify-center mr-3">
                <div className="text-point bg-sub2 rounded-[24px]">
                    {req.councilStatus}
                </div>
            </div>
            <div className="text-sm text-gray-600">{req.organization}</div>
            <div className="text-sm">{req.department}</div>
            <div className="text-semibold">{req.councilName}</div>
            <div className="text-semibold">{req.leader}</div>
            {req.requestedAt && (
                <div className="text-sm text-gray-400 text-right">{req.requestedAt}</div>
            )}


            {showActions && (
                <div className="flex gap-x-2 justify-end ml-4">
                    <button
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        onClick={() => onDetail?.(req)}
                    >
                        상세보기
                    </button>
                    <button
                        onClick={() => onApprove?.(req)}
                        className="bg-green-500 text-white rounded px-3 py-1 text-sm"
                    >
                        승인하기
                    </button>
                    <button
                        onClick={() => onReject?.(req)}
                        className="bg-red-500 text-white rounded px-3 py-1 text-sm"
                    >
                        거절하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default function LowerCouncilManagementSection() {
    const [upperRequests, setUpperRequests] = useState([
        {
            id: 1,
            councilStatus: '학과 학생회',
            organization: '정보의생명공학대학',
            department: '정보컴퓨터공학부',
            councilName: '세론',
            leader: '김위캠',
            requestedAt: '2025.08.01',
        },
        {
            id: 2,
            councilStatus: '학과 학생회',
            organization: '정보의생명공학대학',
            department: '정보컴퓨터공학부',
            councilName: '세론',
            leader: '김위캠',
            requestedAt: '2025.08.01',
        },
    ]);

    const [lowerRequests, setLowerRequests] = useState([
        {
            id: 3,
            councilStatus: '학과 학생회',
            organization: '정보의생명공학대학',
            department: '정보컴퓨터공학부',
            councilName: '세론',
            leader: '김위캠',
        },
        {
            id: 4,
            councilStatus: '학과 학생회',
            organization: '정보의생명공학대학',
            department: '정보컴퓨터공학부',
            councilName: '세론',
            leader: '김위캠',
        },
    ]);

    const handleApprove = (req) => {
        alert(`${req.councilName} 승인`);
    };

    const handleReject = (req) => {
        alert(`${req.councilName} 거절`);
    };

    const handleDetail = (req) => {
        alert(`${req.councilName} 상세보기`);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* 상위 섹션 */}
            <div>
                {upperRequests.map((req) => (
                    <LowerCouncilRow key={req.id} req={req} />
                ))}
            </div>

            {/* 하위 섹션 */}
            <div>
                <div className="text-[32px] font-semibold px-4 pb-2">워크스페이스 생성 승인 요청(#)</div>
                {lowerRequests.map((req) => (
                    <LowerCouncilRow
                        key={req.id}
                        req={req}
                        showActions
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDetail={handleDetail}
                    />
                ))}
            </div>
        </div>
    );
}
