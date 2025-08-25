'use client';

import React from 'react';
import CustomDropdown from '@/components/drop-down';

interface Category {
    categoryId: number;
    categoryName: string;
}

interface Member {
    userId: number;
    userName: string;
    userCouncilRole: string;
}

interface MeetingFiltersProps {
    selectedCategory: string;
    selectedParticipant: string;
    onCategoryChange: (value: string) => void;
    onParticipantChange: (value: string) => void;
    categories: Category[];
    members: Member[];
}

export default function MeetingFilters({
    selectedCategory,
    selectedParticipant,
    onCategoryChange,
    onParticipantChange,
    categories,
    members
}: MeetingFiltersProps) {
    // 카테고리 옵션 (실제 데이터 기반)
    const categoryOptions = [
        { value: '', label: '카테고리를 선택해주세요.' },
        ...(categories || []).map(category => ({
            value: category.categoryId.toString(),
            label: category.categoryName
        }))
    ];

    // 참석자 옵션 (실제 데이터 기반)
    const participantOptions = [
        { value: '', label: '참석자를 선택해주세요.' },
        ...(members || []).map(member => ({
            value: member.userId.toString(),
            label: member.userName
        }))
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
