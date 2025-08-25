'use client';

import React from 'react';
import ParticipationChips from '@/app/admin/meeting/components/create/entities/ParticipationChips';
import CategoryChips from '@/app/admin/meeting/components/create/entities/CategoryChips';
import MeetingInputField from '@/app/admin/meeting/components/create/entities/MeetingInputField';
import CloseIcon from "@/components/icons/CloseIcon";
import FullscreenIcon from "@/components/icons/FullscreenIcon";

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

interface MeetingDetailModalProps {
    isOpen: boolean;
    meeting: MeetingDetail | null;
    loading: boolean;
    onClose: () => void;
    onEdit: (meetingId: number) => void;
}

export default function MeetingDetailModal({
    isOpen,
    meeting,
    loading,
    onClose,
    onEdit
}: MeetingDetailModalProps) {
    if (!isOpen || !meeting) return null;

    return (
        <section
            onClick={onClose}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
            <div
                className="relative bg-[#F5F7FA] w-3/4 max-h-3/4 h-fit px-[56px] py-[64px] flex flex-col gap-[36px] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 모달 내용 */}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="text-gray-600">로딩 중...</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-[36px]">
                        {/* 제목 */}
                        <div className="w-full text-4xl font-semibold text-gray-900 cursor-default">
                            {meeting.title}
                        </div>

                        {/* 회의 정보 */}
                        <div className="space-y-4">
                            <MeetingInputField label="일시">
                                <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                                    {meeting.meetingDateTime.split('T')[0]}
                                </div>
                            </MeetingInputField>

                            <MeetingInputField label="장소">
                                <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded cursor-default">
                                    {meeting.location}
                                </div>
                            </MeetingInputField>

                            <MeetingInputField label="참석자">
                                <div className="flex flex-wrap gap-2">
                                    {meeting.attendees.map((attendee) => (
                                        <ParticipationChips
                                            key={attendee.attendeeId}
                                            avatar=""
                                            readOnly={true}
                                        >
                                            {attendee.memberName}
                                        </ParticipationChips>
                                    ))}
                                </div>
                            </MeetingInputField>

                            <MeetingInputField label="카테고리">
                                <div className="flex flex-wrap gap-2">
                                    {meeting.categoryNames.map((categoryName, index) => (
                                        <CategoryChips 
                                            key={index}
                                            readOnly={true}
                                        >
                                            {categoryName}
                                        </CategoryChips>
                                    ))}
                                </div>
                            </MeetingInputField>
                        </div>

                        {/* 회의 내용 */}
                        <div className="w-full text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded min-h-[200px] whitespace-pre-wrap cursor-default">
                            {meeting.content}
                        </div>

                        {/* 첨부파일 목록 */}
                        {meeting.files && meeting.files.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-3">첨부파일</h3>
                                <div className="space-y-2">
                                    {meeting.files.map((file) => (
                                        <div key={file.fildId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <div className="font-medium">{file.fileName}</div>
                                                <div className="text-sm text-gray-500">
                                                    {(file.fileSize / 1024 / 1024).toFixed(2)} MB • {file.fileType}
                                                </div>
                                            </div>
                                            <a
                                                href={file.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                                            >
                                                다운로드
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* CloseIcon과 FullscreenIcon - OrgMemberManageModal과 동일한 위치 */}
            <div
                className="absolute top-1/8 right-1/10 cursor-pointer"
                onClick={onClose}
            >
                <CloseIcon />
            </div>
            
            {/* FullscreenIcon - CloseIcon 바로 아래에 배치 */}
            <div
                className="absolute top-1/6 right-1/10 cursor-pointer"
                onClick={() => onEdit(meeting.meetingId)}
            >
                <FullscreenIcon />
            </div>
        </section>
    );
}
