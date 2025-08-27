'use client';

import AdminLayout from '../AdminLayout';
import FilterTabs from '@/components/filterTabs';
import { Search } from '@/components/search';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { categoryApi } from '@/api-service/categoryApi';
import CategoryListSection from './components/CategoryListSection';
import AllItemsSection from './components/AllItemsSection';
import InputModal from '@/components/modals/Inputmodal';

interface Category {
    id: number;
    name: string;
    noticeCount: number;
    fileCount: number;
    meetingCount: number;
}

export default function CategoryPage() {
    const filters = ['카테고리 목록 보기', '전체 목록 보기'];
    const [activeLabel, setActiveLabel] = useState(filters[0]);
    const [inputValue, setInputValue] = useState('');
    
    // 카테고리 등록 모달 관련 상태
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setIsError] = useState('');
    
    // 카테고리 목록 상태
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);
    
    const { councilName } = useAuthStore();

    // 카테고리 목록 가져오기
    const fetchCategories = async () => {
        if (!councilName) return;
        
        try {
            setIsCategoriesLoading(true);
            setCategoriesError(null);
            const response = await categoryApi.getCategoryDashboard(councilName);
            
            if (response.isSuccess && response.result?.items) {
                setCategories(response.result.items);
            } else {
                setCategoriesError('데이터를 불러올 수 없습니다.');
            }
        } catch (err) {
            console.error('카테고리 대시보드 조회 오류:', err);
            setCategoriesError('카테고리 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setIsCategoriesLoading(false);
        }
    };

    // 컴포넌트 마운트 시 카테고리 목록 가져오기
    useEffect(() => {
        fetchCategories();
    }, [councilName]);

    // 카테고리 생성 함수
    const handleCreateCategory = async () => {
        if (!categoryName.trim()) {
            setIsError('카테고리 이름을 입력해주세요.');
            return;
        }

        if (!councilName) {
            setIsError('권한이 없습니다.');
            return;
        }

        setIsLoading(true);
        setIsError('');

        try {
            await categoryApi.createCategory(councilName, categoryName);
            setShowCreateModal(false);
            setCategoryName('');
            
            // 카테고리 목록 즉시 새로고침
            await fetchCategories();
            
            console.log('카테고리가 성공적으로 생성되었습니다.');
        } catch (error) {
            console.error('카테고리 생성 오류:', error);
            setIsError(error instanceof Error ? error.message : '카테고리 생성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 모달 닫기 함수
    const handleCloseModal = () => {
        setShowCreateModal(false);
        setCategoryName('');
        setIsError('');
    };

    return (
        <>
            <AdminLayout
                title="카테고리 대시보드"
                description="학생회 업무를 카테고리 별로 분류하고 관리합니다."
                actionButton={
                    <button 
                        className="button-common w-[200px] h-[50px] flex items-center justify-center"
                        onClick={() => setShowCreateModal(true)}
                    >
                        + 새 카테고리 등록하기
                    </button>
                }
                additionalContent={
                    <div className="flex flex-col gap-4">
                        <FilterTabs
                            options={filters}
                            activeLabel={activeLabel}
                            onChange={setActiveLabel}
                        />

                        <div className="flex gap-2">
                            <Search
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onSearchClick={() => console.log('검색 버튼 눌림:', inputValue)}
                                placeholder="검색하려는 카테고리 이름을 입력하세요."
                            />
                        </div>
                    </div>
                }
                mainContent={
                    <div className="w-full h-full">
                        {activeLabel === '카테고리 목록 보기' && (
                            <CategoryListSection 
                                categories={categories}
                                isLoading={isCategoriesLoading}
                                error={categoriesError}
                                onRefresh={fetchCategories}
                            />
                        )}
                        
                        {activeLabel === '전체 목록 보기' && (
                            <AllItemsSection />
                        )}
                    </div>
                }
            />
            
            {/* 카테고리 생성 모달 */}
            {showCreateModal && (
                <InputModal
                    title="새 카테고리 등록"
                    label="등록하려는 카테고리 이름을 입력하세요"
                    placeholder="카테고리 이름을 입력하세요"
                    value={categoryName}
                    setValue={setCategoryName}
                    onConfirm={handleCreateCategory}
                    onCancel={handleCloseModal}
                    confirmText={isLoading ? "등록 중..." : "등록"}
                    errorMessage={errorMessage}
                    isError={!!errorMessage}
                />
            )}
        </>
    );
}
