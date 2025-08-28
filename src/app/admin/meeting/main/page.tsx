'use client';

import React, { useState, useEffect } from 'react';
import { Search } from '@/components/search';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MeetingFilters from '../components/main/MeetingFilters';
import MeetingSort from '../components/main/MeetingSort';
import MeetingList from '../components/main/MeetingList';
import { getMeetings, getMemberList, getCategoryList } from '@/api-service/meetingApi';
import { useAuthStore } from '@/store/authStore';
import AdminLayout from '@/app/admin/AdminLayout';

// 회의록 타입 정의
interface MeetingRecord {
    meetingId: number;
    title: string;
    meetingDateTime: string;
    categoryNames: string[];
    authorName: string;
    authorId: number;
    authorProfileThumbnailUrl: string | null;
    createdAt: string;
}

export default function MeetingMainPage() {
    const { councilName } = useAuthStore();
    const searchParams = useSearchParams();
    
    const [inputValue, setInputValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [selectedSort, setSelectedSort] = useState('latest');
    const [meetings, setMeetings] = useState<MeetingRecord[]>([]);
    const [members, setMembers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // 회의록 목록 조회
    const fetchMeetings = async () => {
        setLoading(true);
        try {
            // API에서는 필터링만 하고, 정렬은 클라이언트에서 처리
            const params = {
                categoryId: selectedCategory || undefined,
                attendeeId: selectedParticipant || undefined,
                // sortOrder는 제거하고 클라이언트에서 정렬
            };
            const data = await getMeetings(councilName, params);
            const meetingsData = data.result || [];
            
            // 클라이언트 측 정렬 로직
            if (Array.isArray(meetingsData)) {
                const sortedMeetings = [...meetingsData].sort((a: MeetingRecord, b: MeetingRecord) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    
                    if (selectedSort === 'latest') {
                        return dateB - dateA; // 최신순 (최신이 위)
                    } else if (selectedSort === 'oldest') {
                        return dateA - dateB; // 오래된순 (오래된 것이 위)
                    } else {
                        // 'all' 또는 기본값: 최신순
                        return dateB - dateA;
                    }
                });
                
                setMeetings(sortedMeetings);
                console.log('🔍 정렬된 회의록:', sortedMeetings.map((m: MeetingRecord) => ({ 
                    title: m.title, 
                    createdAt: m.createdAt,
                    sortType: selectedSort 
                })));
            } else {
                setMeetings(meetingsData);
            }
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

    // refresh 파라미터가 있을 때 데이터 새로고침
    useEffect(() => {
        const refresh = searchParams.get('refresh');
        if (refresh === 'true' && councilName) {
            console.log('🔍 데이터 새로고침 요청 감지');
            fetchMeetings();
            fetchFilterData();
            // URL에서 refresh 파라미터 제거
            window.history.replaceState({}, '', '/admin/meeting/main');
        }
    }, [searchParams, councilName]);

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
