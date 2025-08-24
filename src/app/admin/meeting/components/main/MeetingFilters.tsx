'use client';

import React from 'react';
import CustomDropdown from '@/components/drop-down';

interface MeetingFiltersProps {
    selectedCategory: string;
    selectedParticipant: string;
    onCategoryChange: (value: string) => void;
    onParticipantChange: (value: string) => void;
}

export default function MeetingFilters({
    selectedCategory,
    selectedParticipant,
    onCategoryChange,
    onParticipantChange
}: MeetingFiltersProps) {
    // 카테고리 옵션
    const categoryOptions = [
        { value: '', label: '카테고리를 선택해주세요.' },
        { value: 'planning', label: '기획' },
        { value: 'development', label: '개발' },
        { value: 'design', label: '디자인' },
        { value: 'marketing', label: '마케팅' },
        { value: 'operation', label: '운영' }
    ];

    // 참석자 옵션
    const participantOptions = [
        { value: '', label: '참석자를 선택해주세요.' },
        { value: 'all', label: '모든 참석자' },
        { value: 'leader', label: '팀장' },
        { value: 'member', label: '팀원' },
        { value: 'guest', label: '게스트' }
    ];

    return (
        <div className="flex items-center gap-6">
            {/* 카테고리 필터 */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">카테고리별 필터</span>
                <CustomDropdown
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    placeholder="카테고리를 선택해주세요."
                />
            </div>

            {/* 참석자 필터 */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">참석자별 필터</span>
                <CustomDropdown
                    options={participantOptions}
                    value={selectedParticipant}
                    onChange={onParticipantChange}
                    placeholder="참석자를 선택해주세요."
                />
            </div>
        </div>
    );
}
