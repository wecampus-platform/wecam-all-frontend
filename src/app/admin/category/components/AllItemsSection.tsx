'use client';

import CustomDropdown from '@/components/drop-down';

interface Item {
    id: number;
    category: string;
    title: string;
    nametag: string;
    requestedAt: string;
}

interface AllItemsSectionProps {
    items?: Item[];
}

export default function AllItemsSection({ items = [] }: AllItemsSectionProps) {
    // 임시 데이터 (실제로는 API에서 받아올 데이터)
    const mockItems: Item[] = [
        { id: 1, category: "회의록", title: "2024년 1월 정기회의", nametag: "회의록", requestedAt: "2024-01-15" },
        { id: 2, category: "공지사항", title: "학기말 행사 안내", nametag: "공지사항", requestedAt: "2024-01-14" },
        { id: 3, category: "행사관리", title: "봄맞이 축제 기획", nametag: "행사관리", requestedAt: "2024-01-13" },
        { id: 4, category: "예산관리", title: "2024년 예산 계획서", nametag: "예산관리", requestedAt: "2024-01-12" },
        { id: 5, category: "구성원관리", title: "신입 부원 모집", nametag: "구성원관리", requestedAt: "2024-01-11" },
        { id: 6, category: "문서관리", title: "학생회 규정 개정안", nametag: "문서관리", requestedAt: "2024-01-10" },
    ];

    const displayItems = items.length > 0 ? items : mockItems;

    // 드롭다운 옵션
    const categoryOptions = [
        { id: 1, name: "전체" },
        { id: 2, name: "회의록" },
        { id: 3, name: "공지사항" },
        { id: 4, name: "행사관리" },
        { id: 5, name: "예산관리" },
        { id: 6, name: "구성원관리" },
        { id: 7, name: "문서관리" },
    ];

    const menuOptions = [
        { id: 1, name: "전체" },
        { id: 2, name: "최신순" },
        { id: 3, name: "오래된순" },
        { id: 4, name: "이름순" },
    ];

    return (
        <div className="w-full h-full">
            {/* 필터 영역 */}
            <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">카테고리별 필터:</span>
                    <CustomDropdown
                        options={categoryOptions}
                        placeholder="카테고리 선택"
                        onSelect={(option) => console.log('카테고리 선택:', option)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">메뉴 필터:</span>
                    <CustomDropdown
                        options={menuOptions}
                        placeholder="정렬 선택"
                        onSelect={(option) => console.log('정렬 선택:', option)}
                    />
                </div>
            </div>

            {/* 아이템 목록 */}
            <div className="space-y-2">
                {displayItems.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[100px_1fr_auto_auto] items-center px-4 py-5 bg-white border rounded-[8px] border-gray1 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        {/* 카테고리 */}
                        <div className="font-medium text-center">
                            <div className="text-point bg-sub2 rounded-[24px] px-3 py-1 text-sm">
                                {item.category}
                            </div>
                        </div>
                        
                        {/* 제목 */}
                        <div className="text-sm font-semibold text-gray-800">
                            {item.title}
                        </div>
                        
                        {/* nametag */}
                        <div className="text-sm font-medium text-gray-600">
                            {item.nametag}
                        </div>
                        
                        {/* requestedAt */}
                        <div className="text-sm text-gray-400 text-right">
                            {item.requestedAt}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
