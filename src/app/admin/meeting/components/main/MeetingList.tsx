'use client';

import React, { useState } from 'react';
import { getMeetingDetail } from '@/api-service/meetingApi';
import { useAuthStore } from '@/store/authStore';
import MeetingDetailModal from './modals/MeetingDetailModal';

interface MeetingRecord {
    meetingId: number;
    title: string;
    meetingDateTime: string;
    categoryNames: string[];
    authorName: string;
    authorId: number;
    authorProfileThumbnailUrl: string | null;
    createdAt: string;
}

interface MeetingDetail {
    meetingId: number;
    title: string;
    meetingDateTime: string;
    location: string;
    content: string;
    createdById: number;
    createdByName: string;
    categoryIds: number[];
    categoryNames: string[];
    attendees: {
        attendeeId: number;
        memberName: string;
        attendanceStatus: string;
        role: string;
    }[];
    files: {
        fildId: number;
        fileName: string;
        fileUrl: string;
        fileSize: number;
        fileType: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

interface MeetingListProps {
    meetings: MeetingRecord[];
}

export default function MeetingList({ meetings }: MeetingListProps) {
    const { councilName } = useAuthStore();
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingDetail | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // 디버깅을 위한 로그
    console.log('🔍 MeetingList props meetings:', meetings);
    console.log('🔍 meetings type:', typeof meetings);
    console.log('🔍 meetings isArray:', Array.isArray(meetings));

    // meetings가 배열인지 확인하고 안전하게 처리
    const displayMeetings = Array.isArray(meetings) ? meetings : [];

    // 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // 회의록 상세 조회
    const handleMeetingClick = async (meetingId: number) => {
        if (!councilName) return;

        try {
            setLoading(true);
            const data = await getMeetingDetail(councilName, meetingId.toString());
            setSelectedMeeting(data.result);
            setIsModalOpen(true);
        } catch (error) {
            console.error('회의록 상세 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMeeting(null);
    };

    // 수정 페이지로 이동
    const handleEdit = (meetingId: number) => {
        window.location.href = `/admin/meeting/edit?meetingId=${meetingId}`;
    };

    return (
        <>
            <div className="rounded-lg border border-gray1">
                {/* 테이블 내용 */}
                {displayMeetings.map((meeting) => (
                    <div 
                        key={meeting.meetingId} 
                        className="flex items-center justify-between px-4 py-5 bg-white hover:bg-gray-50 transition-colors cursor-pointer mb-3 rounded-lg border border-gray-200"
                        onClick={() => handleMeetingClick(meeting.meetingId)}
                    >
                        {/* 왼쪽: 회의록 제목과 카테고리 */}
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900 text-lg">
                                {meeting.title}
                            </span>
                            <div className="flex gap-2">
                                {meeting.categoryNames.map((category, index) => (
                                    <div key={index} className="px-3 py-1 rounded-full text-sm font-medium text-point bg-sub2">
                                        {category}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* 오른쪽: 작성자와 생성일 */}
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-700">
                                {meeting.authorName}
                            </span>
                            <span className="text-sm text-gray-600">
                                {formatDate(meeting.createdAt)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 회의록 상세 조회 모달 */}
            <MeetingDetailModal
                isOpen={isModalOpen}
                meeting={selectedMeeting}
                loading={loading}
                onClose={closeModal}
                onEdit={handleEdit}
            />
        </>
    );
}
