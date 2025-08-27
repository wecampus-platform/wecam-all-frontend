'use client';

import { useState, useCallback, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAuthStore } from '@/store/authStore';
import { moveMemberToDepartment, fetchDepartments, fetchAllMembers } from '@/api-service/councilAffiliationApi';

import FilterTabs from '@/components/filterTabs';
import { Search } from '@/components/search';
import AdminLayout from '../AdminLayout';
import CouncilMemberSection from './councilMemberSection';
import NotPlacedMember from './notPlacedMember';
import AllStudentsSection from './allStudentsSection';
import LowerCounCilManagementSection from './lowerCouncilManagementSection';
import OrgMemberManageModal from './modals/OrgMemberManageModal';
import AffiliationList from './components/AffiliationList';

interface Member {
  id: number;
  councilMemberId: number;
  name: string;
  role: string;
  councilRole: string;
}

interface Section {
  id: string;
  departmentId: number;
  title: string;
  number: string;
  leadTitle: string;
  subTitle: string;
  lead: Member[];
  sub: Member[];
}

export default function MemberManagePage() {
    const { councilName, selectedCouncilId } = useAuthStore();
    
    const filters = ['학생회 구성원 관리', '학생 전체 관리', '하위 학생회 관리'];
    const [activeLabel, setActiveLabel] = useState(filters[0]);
    const [inputValue, setInputValue] = useState('');

    const [notPlacedMembers, setNotPlacedMembers] = useState<Member[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // setNotPlacedMembers를 안정적인 참조로 만들기
    const stableSetNotPlacedMembers = useCallback(setNotPlacedMembers, []);

    // 부서 목록 새로고침 함수
    const refreshDepartments = useCallback(async () => {
        try {
            const response = await fetchDepartments(councilName, selectedCouncilId);
            console.log('새로고침 API 응답:', response);
            
            if (response && response.result) {
                const departments = response.result.departments || [];
                const unassignedMembers = response.result.unassigned || [];
                
                // API 응답을 sections 형태로 변환
                const formattedSections: Section[] = departments.map((dept: any, index: number) => ({
                    id: `section-${index + 1}`,
                    departmentId: dept.departmentId,
                    title: dept.departmentName,
                    number: `${(dept.lead?.length || 0) + (dept.sub?.length || 0)}명`,
                    leadTitle: '부장',
                    subTitle: '부원',
                    lead: dept.lead?.filter((member: any) => member && member.councilMemberId).map((member: any) => ({
                        id: member.councilMemberId,
                        councilMemberId: member.councilMemberId,
                        name: member.userName || 'Unknown',
                        role: member.departmentRoleName || 'Unknown',
                        councilRole: member.userCouncilRole || 'Unknown'
                    })) || [],
                    sub: dept.sub?.filter((member: any) => member && member.councilMemberId).map((member: any) => ({
                        id: member.councilMemberId,
                        councilMemberId: member.councilMemberId,
                        name: member.userName || 'Unknown',
                        role: member.departmentRoleName || 'Unknown',
                        councilRole: member.userCouncilRole || 'Unknown'
                    })) || [],
                }));
                
                setSections(formattedSections);
                stableSetNotPlacedMembers(unassignedMembers.map((member: any) => ({
                    id: member.councilMemberId,
                    councilMemberId: member.councilMemberId,
                    name: member.userName,
                    role: member.departmentRoleName,
                    councilRole: member.userCouncilRole
                })));
            }
        } catch (error) {
            console.error('부서 목록 새로고침 실패:', error);
        }
    }, [councilName, selectedCouncilId, stableSetNotPlacedMembers]);

    const [sections, setSections] = useState<Section[]>([]);

    // 페이지 로드 시 부서 목록 불러오기
    useEffect(() => {
        refreshDepartments();
    }, [refreshDepartments]);

    const onDragEnd = async ({ source, destination, draggableId }: DropResult) => {
        if (!destination) return;

        console.log('=== 드래그 앤 드롭 시작 ===');
        console.log('드래그 앤 드롭 정보:', { source, destination, draggableId });
        console.log('draggableId 타입:', typeof draggableId, '값:', draggableId);
        console.log('현재 notPlacedMembers:', notPlacedMembers);
        console.log('현재 sections:', sections);

        let dragged: Member | undefined;

        // 출발지에서 제거
        if (source.droppableId === 'notPlaced') {
            // draggableId를 숫자로 변환하여 비교 (draggableId는 id)
            const memberId = parseInt(draggableId, 10);
            console.log('미배치에서 찾기 - memberId:', memberId);
            console.log('notPlacedMembers의 id들:', notPlacedMembers.map(m => m.id));
            
            dragged = notPlacedMembers.find(member => member.id === memberId);
            console.log('찾은 dragged 멤버:', dragged);
            
            if (dragged) {
                console.log('✅ 미배치에서 멤버 찾음:', dragged);
                setNotPlacedMembers(prev => prev.filter(member => member.id !== memberId));
            } else {
                console.log('❌ 미배치에서 멤버를 찾을 수 없음');
            }
        } else {
            // sections에서 찾기 - source.droppableId는 "section-1:lead" 또는 "section-1:sub" 형태
            const sourceSectionId = source.droppableId.split(':')[0]; // "section-1" 부분 추출
            const sourceSection = sections.find(section => section.id === sourceSectionId);
            
            console.log('섹션에서 찾기 - sourceSectionId:', sourceSectionId);
            console.log('찾은 sourceSection:', sourceSection);
            
            if (sourceSection) {
                const memberId = parseInt(draggableId, 10);
                console.log('섹션에서 찾을 memberId:', memberId);
                
                if (source.droppableId.includes(':lead')) {
                    console.log('lead 영역에서 찾기');
                    console.log('lead 멤버들의 id들:', sourceSection.lead.map(m => m.id));
                    dragged = sourceSection.lead.find(member => member.id === memberId);
                    console.log('lead에서 찾은 dragged:', dragged);
                    
                    if (dragged) {
                        console.log('✅ lead에서 멤버 찾음:', dragged);
                        setSections(prev => prev.map(section => 
                            section.id === sourceSectionId 
                                ? { ...section, lead: section.lead.filter(member => member.id !== memberId) }
                                : section
                        ));
                    } else {
                        console.log('❌ lead에서 멤버를 찾을 수 없음');
                    }
                } else if (source.droppableId.includes(':sub')) {
                    console.log('sub 영역에서 찾기');
                    console.log('sub 멤버들의 id들:', sourceSection.sub.map(m => m.id));
                    dragged = sourceSection.sub.find(member => member.id === memberId);
                    console.log('sub에서 찾은 dragged:', dragged);
                    
                    if (dragged) {
                        console.log('✅ sub에서 멤버 찾음:', dragged);
                        setSections(prev => prev.map(section => 
                            section.id === sourceSectionId 
                                ? { ...section, sub: section.sub.filter(member => member.id !== memberId) }
                                : section
                        ));
                    } else {
                        console.log('❌ sub에서 멤버를 찾을 수 없음');
                    }
                }
            } else {
                console.log('❌ sourceSection을 찾을 수 없음');
            }
        }

        if (!dragged) {
            console.log('❌ dragged 멤버를 찾을 수 없음 - 함수 종료');
            return;
        }

        console.log('✅ 최종 dragged 멤버:', dragged);
        console.log('dragged.councilMemberId:', dragged.councilMemberId);
        console.log('dragged.name:', dragged.name);

        // 도착지에 추가
        if (destination.droppableId === 'notPlaced') {
            console.log('도착지: 미배치 명단');
            setNotPlacedMembers(prev => [...prev, dragged!]);
        } else {
            // destination.droppableId는 "section-1:lead" 또는 "section-1:sub" 형태
            const destinationSectionId = destination.droppableId.split(':')[0]; // "section-1" 부분 추출
            const destinationSection = sections.find(section => section.id === destinationSectionId);
            
            console.log('도착지 섹션 ID:', destinationSectionId);
            console.log('도착지 섹션:', destinationSection);
            
            if (destinationSection) {
                if (destination.droppableId.includes(':lead')) {
                    console.log('도착지: lead 영역 (부장)');
                    setSections(prev => prev.map(section => 
                        section.id === destinationSectionId 
                            ? { ...section, lead: [...section.lead, dragged!] }
                            : section
                    ));
                } else if (destination.droppableId.includes(':sub')) {
                    console.log('도착지: sub 영역 (부원)');
                    setSections(prev => prev.map(section => 
                        section.id === destinationSectionId 
                            ? { ...section, sub: [...section.sub, dragged!] }
                            : section
                    ));
                }
            }
        }

        // API 호출하여 서버에 변경사항 반영
        try {
            // destination.droppableId에서 실제 departmentId와 level 추출
            let departmentId;
            let departmentLevel;
            
            if (destination.droppableId === 'notPlaced') {
                departmentId = null; // 미배치 상태
                departmentLevel = null;
            } else {
                // "section-1:lead" 또는 "section-1:sub"에서 section-1 부분 추출
                const sectionId = destination.droppableId.split(':')[0];
                const destinationSection = sections.find(section => section.id === sectionId);
                departmentId = destinationSection?.departmentId;
                
                // lead 영역이면 level 0 (부장), sub 영역이면 level 1 (부원)
                if (destination.droppableId.includes(':lead')) {
                    departmentLevel = 0;
                } else if (destination.droppableId.includes(':sub')) {
                    departmentLevel = 1;
                }
            }
            
            if (departmentId !== null && departmentLevel !== null) {
                // 특정 부서로 이동하는 경우
                console.log('특정 부서로 이동 - API 호출');
                
                // 이름 매칭 없이 드래그된 항목의 고유 ID만 사용
                const memberId = dragged.councilMemberId;
                if (memberId === undefined || memberId === null) {
                    throw new Error('councilMemberId가 없습니다. 이동할 멤버를 식별할 수 없습니다.');
                }
                console.log('전송할 데이터:', {
                    councilName,
                    memberId,
                    departmentId,
                    departmentLevel,
                    selectedCouncilId
                });
                await moveMemberToDepartment(councilName, memberId, departmentId, departmentLevel, selectedCouncilId);
                console.log(`멤버 이동 성공: 부서 ${departmentId}, 레벨 ${departmentLevel === 0 ? '부장' : '부원'}`);
            } else {
                throw new Error('부서 ID 또는 레벨을 찾을 수 없습니다.');
            }
            
            console.log('=== API 호출 완료 ===');
            console.log('이동된 멤버 정보:', {
                councilMemberId: dragged.councilMemberId,
                name: dragged.name,
                source: source.droppableId,
                destination: destination.droppableId
            });
            
            // 모든 경우에 새로고침하여 UI 업데이트
            console.log('🔄 UI 새로고침 시작...');
            await refreshDepartments();
            console.log('✅ UI 새로고침 완료');
        } catch (error) {
            console.error('❌ 멤버 이동 실패:', error);
            // 실패 시 원래 상태로 되돌리기
            console.log('🔄 실패로 인한 UI 새로고침 시작...');
            await refreshDepartments();
            console.log('✅ 실패 후 UI 새로고침 완료');
        }
        
        console.log('=== 드래그 앤 드롭 완료 ===');
    };

    return (
        <AdminLayout
            title="구성원 관리"
            description="학생회 구성원을 부서별로 관리하고 배치합니다."
            actionButton={
                <button 
                    className="button-common w-[200px] h-[50px] flex items-center justify-center"
                    onClick={() => setIsModalOpen(true)}
                >
                    + 새 구성원 추가하기
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
                            placeholder="검색하려는 구성원 이름을 입력하세요."
                        />
                    </div>
                </div>
            }
            mainContent={
                <div className="w-full h-full">
                    {activeLabel === '학생회 구성원 관리' && (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex flex-col gap-6">
                                                                 <CouncilMemberSection 
                                     sections={sections as any} 
                                     setSections={setSections}
                                     setNotPlacedMembers={stableSetNotPlacedMembers}
                                     refreshDepartments={refreshDepartments}
                                 />
                                                                 <NotPlacedMember 
                                     members={notPlacedMembers}
                                     onSectionClick={() => console.log('미배치 명단 클릭')}
                                 />
                            </div>
                        </DragDropContext>
                    )}
                    
                    {activeLabel === '학생 전체 관리' && (
                        <AllStudentsSection />
                    )}
                    
                    {activeLabel === '하위 학생회 관리' && (
                        <LowerCounCilManagementSection />
                    )}
                </div>
            }
        />
    );
}
