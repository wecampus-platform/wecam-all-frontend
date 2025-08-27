'use client';

import React, { useState, useEffect } from 'react';
import { Search } from '@/components/search';
import Link from 'next/link';
import MeetingFilters from '../components/main/MeetingFilters';
import MeetingSort from '../components/main/MeetingSort';
import MeetingList from '../components/main/MeetingList';
import { getMeetings, getMemberList, getCategoryList } from '@/api-service/meetingApi';
import { useAuthStore } from '@/store/authStore';
import AdminLayout from '@/app/admin/AdminLayout';

export default function MeetingMainPage() {
    const { councilName } = useAuthStore();
    
    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [selectedSort, setSelectedSort] = useState('latest');
    const [meetings, setMeetings] = useState([]);
    const [members, setMembers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // 회의록 목록 조회
    const fetchMeetings = async () => {
        setLoading(true);
        try {
            const params = {
                categoryId: selectedCategory || undefined,
                attendeeId: selectedParticipant || undefined,
                sortOrder: selectedSort === 'latest' ? 'LATEST' : 'OLDEST'
            };
            const data = await getMeetings(councilName, params);
            setMeetings(data.result || []);
        } catch (error) {
            console.error('회의록 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 카테고리와 멤버 목록 가져오기
    const fetchFilterData = async () => {
        if (!councilName) return;
        
        try {
            // 멤버와 카테고리를 개별적으로 가져와서 에러가 발생해도 계속 진행
            try {
                const membersData = await getMemberList(councilName);
                setMembers(membersData);
            } catch (memberError) {
                console.error('멤버 목록 조회 실패:', memberError);
                setMembers([]);
            }
            
            try {
                const categoriesData = await getCategoryList(councilName);
                setCategories(categoriesData);
            } catch (categoryError) {
                console.error('카테고리 목록 조회 실패:', categoryError);
                setCategories([]);
            }
        } catch (error) {
            console.error('필터 데이터 조회 실패:', error);
        }
    };

    // 필터나 정렬이 변경될 때마다 회의록 목록 재조회
    useEffect(() => {
        fetchMeetings();
    }, [selectedCategory, selectedParticipant, selectedSort, councilName]);

    // 페이지 로드 시에도 회의록 목록 조회
    useEffect(() => {
        if (councilName) {
            fetchMeetings();
            fetchFilterData();
        }
    }, [councilName]);

    return (
        <AdminLayout
            title="회의록 작성 및 관리"
            actionButton={
                <Link 
                    href="/admin/meeting/create"
                    className="button-common w-[200px] h-[50px] flex items-center justify-center"
                >
                    + 새 회의록 작성하기
                </Link>
            }
            subtitle="회의록 목록"
            additionalContent={
                <div className="flex gap-2">
                    <Search
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onSearchClick={() => console.log('검색 버튼 눌림:', inputValue)}
                        placeholder="회의록 제목 또는 회의 일시를 입력하세요."
                    />
                </div>
            }
            mainContent={
                <div className="w-full">
                    {/* 필터 및 정렬 */}
                    <div className="flex items-center justify-between mb-6">
                        <MeetingFilters
                            selectedCategory={selectedCategory}
                            selectedParticipant={selectedParticipant}
                            onCategoryChange={setSelectedCategory}
                            onParticipantChange={setSelectedParticipant}
                            categories={categories}
                            members={members}
                        />
                        
                        <MeetingSort
                            selectedSort={selectedSort}
                            onSortChange={setSelectedSort}
                        />
                    </div>

                    {/* 회의록 목록 */}
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-600">로딩 중...</div>
                        </div>
                    ) : (
                        <MeetingList meetings={meetings} />
                    )}
                </div>
            }
        />
    );
}
