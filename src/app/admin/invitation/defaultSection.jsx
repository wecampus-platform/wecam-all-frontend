'use client';

import { useEffect, useState } from 'react';
import { TimerIcon } from "@/components/icons/timerIcon";
import { useAuthStore } from '@/store/authStore';
import { fetchInvitationList, updateInvitationExpiry } from '@/app/api-service/invitationApi';


export function DefaultSection({ onRefresh, onShowHistory }) {
    const [activeTab, setActiveTab] = useState('student');
    const [modalOpen, setModalOpen] = useState(false);
    const [requests, setRequests] = useState([]);

    const councilList = useAuthStore((state) => state.councilList);
    const currentCouncil = councilList?.[0];

    const handleExtendExpiry = async (invitationId) => {
        if (!currentCouncil) return;
        try {
            await updateInvitationExpiry(currentCouncil.name, invitationId);
            alert('만료일이 1시간 연장되었습니다.');
        } catch (e) {
            alert(`만료일 연장 실패: ${e.message}`);
        }
    };
    
    const fetchData = async () => {
        if (!currentCouncil) return;

        try {
            const data = await fetchInvitationList(currentCouncil.id);
            const mapped = data.map((item) => ({
                id: item.invitationId,
                code: item.code,
                type: item.codeType === 'council_member' ? '학생회 용' : '일반 학생용',
                makeUser: item.makeUser,
                requestedAt: item.createdAt?.slice(0, 10) || '-',
                expiredAt: item.expiredAt?.slice(0, 10) || '-',
            }));
            setRequests(mapped);
        } catch (err) {
            console.error('초대 코드 목록 로딩 실패:', err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentCouncil]);

    // onRefresh가 변경될 때마다 데이터 다시 가져오기
    useEffect(() => {
        if (onRefresh) {
            fetchData();
        }
    }, [onRefresh]);

    const tabs = [
        { key: 'student', label: '일반 학생용' },
        { key: 'council', label: '학생회 초대용' },
    ];

    return (
        <div className="w-full flex flex-col items-start justify-start text-left text-base text-gray4 font-pretendard">
            {/* 탭 영역 */}
            <div className="flex flex-row items-center w-full mx-10 my-6">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;
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
                            <div className="w-5 h-5 relative overflow-hidden shrink-0"></div>
                        </button>
                    );
                })}
            </div>

            {/* 테이블 */}
            <div className="w-full p-10">
                {/* 헤더 */}
                <div className="grid grid-cols-[120px_100px_1fr_100px_150px_150px_5px] items-center px-4 py-2 text-xs text-gray-500">
                    <div>초대코드</div>
                    <div>유형</div>
                    <div>생성자</div>
                    <div>생성 일시</div>
                    <div>만료 일시</div>
                    <div></div>
                    <div></div>
                </div>

                {/* 데이터 행 */}
                {requests
                    .filter((req) => {
                        if (activeTab === 'student') {
                            return req.type === '일반 학생용';
                        } else if (activeTab === 'council') {
                            return req.type === '학생회 용';
                        }
                        return true; // 기본적으로 모든 항목 표시
                    })
                    .map((req, idx) => (
                    <div key={req.code || idx} className="grid grid-cols-[120px_100px_1fr_100px_150px_150px_5px] items-center px-4 py-5 bg-cream my-2 rounded">
                        <div className="font-medium text-xl text-black">{req.code}</div>
                        <div className="text-sm text-gray8">{req.type}</div>
                        <div className="truncate">{req.makeUser}</div>
                        <div className="text-sm">{req.requestedAt}</div>
                        <div className={`text-sm ${
                            req.expiredAt === new Date().toISOString().slice(0, 10) 
                                ? 'text-[rgba(243,79,79,1)]' 
                                : ''
                        }`}>{req.expiredAt}</div>
                        <div className="flex gap-x-2 justify-end">
                            <button 
                                className="border border-gray8 rounded px-2 py-1 text-sm text-gray8 bg-white"
                                onClick={() => onShowHistory(req)}
                            >
                                사용 내역 보기
                            </button>
                            <button onClick={() => handleExtendExpiry(req.id)}>
                                <TimerIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
