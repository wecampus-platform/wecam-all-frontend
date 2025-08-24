'use client';

import React from 'react';

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
        { value: 'latest', label: '최신순' },
        { value: 'oldest', label: '오래된순' },
        { value: 'title', label: '제목순' },
        { value: 'category', label: '카테고리순' }
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">정렬</span>
            <select
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-point focus:border-transparent"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
