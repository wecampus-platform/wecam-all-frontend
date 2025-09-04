'use client';

import React from 'react';
import CustomDropdown from '@/components/drop-down';

export default function FileFilters({
  selectedCategory,
  onCategoryChange,
  categories = [],

  // 메뉴(소스 타입) 필터는 옵션
  selectedMenu = '',
  onMenuChange,
  showMenu = true,
}) {
  const categoryOptions = [
    { value: '', label: '카테고리를 선택해주세요.' },
    ...categories.map((c) => ({
      value: String(c.categoryId ?? c.id),
      label: String(c.categoryName ?? c.name ?? '—'),
    })),
  ];

  const menuOptions = [
    { value: '', label: '메뉴를 선택해주세요.' },
    { value: 'TODO', label: '할일' },
    { value: 'MEETING', label: '회의록' },
    { value: 'FILE_ASSET', label: '파일운영함' },
  ];

  return (
    <div className="flex items-center gap-6">
      {/* 카테고리 */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">카테고리별 필터</span>
        <CustomDropdown
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          placeholder="카테고리를 선택해주세요."
        />
      </div>

      {/* 메뉴(소스타입): 모달에서는 숨김 */}
      {showMenu && typeof onMenuChange === 'function' && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">메뉴별 필터</span>
          <CustomDropdown
            options={menuOptions}
            value={selectedMenu}
            onChange={onMenuChange}
            placeholder="메뉴를 선택해주세요."
          />
        </div>
      )}
    </div>
  );
}
