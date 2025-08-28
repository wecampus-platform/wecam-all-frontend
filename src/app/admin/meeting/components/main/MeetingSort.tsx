'use client';

import React from 'react';
import CustomDropdown from '@/components/drop-down';

interface MeetingSortProps {
    selectedSort: string;
    onSortChange: (value: string) => void;
}

export default function MeetingSort({
    selectedSort,
    onSortChange
}: MeetingSortProps) {
    // 정렬 옵션
    const sortOptions = [
        { value: 'all', label: '전체' },
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' }
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">정렬</span>
            <CustomDropdown
                options={sortOptions}
                value={selectedSort}
                onChange={onSortChange}
                placeholder="정렬을 선택해주세요."
            />
        </div>
    );
}
