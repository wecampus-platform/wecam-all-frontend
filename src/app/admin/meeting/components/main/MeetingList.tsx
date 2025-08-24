'use client';

import React from 'react';

interface MeetingRecord {
    id: string;
    title: string;
    category: string;
    leader: string;
    createdAt: string;
}

interface MeetingListProps {
    meetings: MeetingRecord[];
}

export default function MeetingList({ meetings }: MeetingListProps) {
    //샘플 데이터
    const sampleMeetings: MeetingRecord[] = [
        {
            id: '1',
            title: '회의록',
            category: '카테고리1',
            leader: '김위캠',
            createdAt: '2025.07.01'
        }
    ];

    const displayMeetings = meetings.length > 0 ? meetings : sampleMeetings;

    return (
        <div className="bg-white rounded-lg border border-gray1">
            {/* 테이블 내용 */}
            {displayMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between px-4 py-5 bg-white border-b border-gray1 last:border-b-0 hover:bg-gray-50 transition-colors">
                    {/* 왼쪽: 회의록 제목과 카테고리 */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900 text-lg">
                            {meeting.title}
                        </span>
                        <div className="px-3 py-1 rounded-full text-sm font-medium text-point bg-sub2">
                            {meeting.category}
                        </div>
                    </div>
                    
                    {/* 오른쪽: 작성자와 생성일 */}
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-700">
                            {meeting.leader}
                        </span>
                        <span className="text-sm text-gray-600">
                            {meeting.createdAt}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
