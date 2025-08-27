'use client';

interface Category {
    id: number;
    name: string;
    noticeCount: number;
    fileCount: number;
    meetingCount: number;
}

interface CategoryListSectionProps {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    onRefresh: () => void;
}

export default function CategoryListSection({ 
    categories, 
    isLoading, 
    error, 
    onRefresh 
}: CategoryListSectionProps) {
    // 임시 데이터 (API 실패 시 fallback)
    const mockCategories: Category[] = [
        { id: 1, name: "회의록", noticeCount: 15, fileCount: 8, meetingCount: 12 },
        { id: 2, name: "공지사항", noticeCount: 8, fileCount: 5, meetingCount: 3 },
        { id: 3, name: "행사관리", noticeCount: 12, fileCount: 15, meetingCount: 8 },
        { id: 4, name: "예산관리", noticeCount: 6, fileCount: 12, meetingCount: 4 },
        { id: 5, name: "구성원관리", noticeCount: 20, fileCount: 8, meetingCount: 6 },
        { id: 6, name: "문서관리", noticeCount: 25, fileCount: 30, meetingCount: 10 },
    ];

    const displayCategories = categories.length > 0 ? categories : mockCategories;

    // 로딩 상태 표시
    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-500">카테고리 데이터를 불러오는 중...</div>
            </div>
        );
    }

    // 에러 상태 표시
    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="text-red-500">{error}</div>
                <button 
                    onClick={onRefresh}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-2 gap-6">
                {displayCategories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:brightness-98 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {category.name}
                                </h3>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">
                                        할일: {category.noticeCount}개
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        파일: {category.fileCount}개
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        회의록: {category.meetingCount}개
                                    </p>
                                </div>
                            </div>
                            <div className="ml-4">
                                <span className="inline-block px-3 py-1 bg-point text-white text-xs font-medium rounded-full">
                                    {category.name}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
