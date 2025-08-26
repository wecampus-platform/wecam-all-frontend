'use client';

import { useEffect, useState } from 'react';

import { Search } from '@/components/search';
import AdminLayout from '../AdminLayout';
import { DefaultSection } from './defaultSection';

export default function CouncilAffiliationPage() {
    const [inputValue, setInputValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const filters = ['전체', '재학증명서 인증', '합격증명서 인증'];

    const handleSearchClick = () => {
        console.log('검색 버튼 눌림! 값:', inputValue);
        // inputValue로 API 요청 등 처리
    };

    return (
        <AdminLayout
            title="소속 인증 관리"
            additionalContent={
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <div className="relative text-base font-pretendard text-dimgray text-left">증명서 유효 발급년도</div>
                        <div className="text-base text-point font-semibold">2025</div>
                    </div>
                    {/* 검색 공간 */}
                    <div className="flex gap-2">
                        <Search
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onSearchClick={handleSearchClick}
                            placeholder="이름을 입력하세요." />
                    </div>
                    {/* 필터 공간 */}
                    <div className="flex flex-row gap-2">
                        {filters.map((label, index) => (
                            <button
                                key={index}
                                className={`relative button-very-round w-auto text-base flex flex-row items-center justify-center py-2 px-4 box-border text-left
                                    ${activeIndex === index ? 'active' : 'text-darkgray'
                                    }`}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="relative">{label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            }
            mainContent={
                <DefaultSection/>
            }
        />
    );
}