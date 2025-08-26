'use client';

import { useState, useCallback, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useAuthStore } from '@/store/authStore';
import { moveMemberToDepartment, fetchDepartments } from '@/api-service/councilAffiliationApi';

import FilterTabs from '@/components/filterTabs';
import { Search } from '@/components/search';
import CouncilMemberSection from './councilMemberSection';
import NotPlacedMember from './notPlacedMember';
import AllStudentsSection from './allStudentsSection';
import LowerCounCilManagementSection from './lowerCouncilManagementSection';
import OrgMemberManageModal from './modals/OrgMemberManageModal';
import AffiliationList from './components/AffiliationList';

export default function MemberManagePage() {
    const { councilList } = useAuthStore();
    const councilName = councilList?.[0]?.name || '위캠퍼스';
    const councilId = councilList?.[0]?.id || 1;
    
    const filters = ['학생회 구성원 관리', '학생 전체 관리', '하위 학생회 관리'];
    const [activeLabel, setActiveLabel] = useState(filters[0]);
    const [inputValue, setInputValue] = useState('');

    const [notPlacedMembers, setNotPlacedMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // setNotPlacedMembers를 안정적인 참조로 만들기
    const stableSetNotPlacedMembers = useCallback(setNotPlacedMembers, []);

    // 부서 목록 새로고침 함수
    const refreshDepartments = useCallback(async () => {
        try {
            const response = await fetchDepartments(councilName, councilId);
            console.log('새로고침 API 응답:', response);
            
            if (response && response.result) {
                const departments = response.result.departments || [];
                const unassignedMembers = response.result.unassigned || [];
                
                // API 응답을 sections 형태로 변환
                const formattedSections = departments.map((dept, index) => ({
                    id: `section-${index + 1}`,
                    departmentId: dept.departmentId,
                    title: dept.departmentName,
                    number: `${(dept.lead?.length || 0) + (dept.sub?.length || 0)}명`,
                    leadTitle: '부장',
                    subTitle: '부원',
                                         lead: dept.lead?.filter(member => member && member.userId).map(member => ({
                         id: member.userId,
                         userId: member.userId,  // userId 필드 추가
                         name: member.userName || 'Unknown',
                         role: member.departmentRoleName || 'Unknown',
                         councilRole: member.userCouncilRole || 'Unknown'
                     })) || [],
                     sub: dept.sub?.filter(member => member && member.userId).map(member => ({
                         id: member.userId,
                         userId: member.userId,  // userId 필드 추가
                         name: member.userName || 'Unknown',
                         role: member.departmentRoleName || 'Unknown',
                         councilRole: member.userCouncilRole || 'Unknown'
                     })) || [],
                }));
                
                setSections(formattedSections);
                stableSetNotPlacedMembers(unassignedMembers.map(member => ({
                    id: member.userId,
                    userId: member.userId,  // userId 필드 추가
                    name: member.userName,
                    role: member.departmentRoleName,
                    councilRole: member.userCouncilRole
                })));
            }
        } catch (error) {
            console.error('부서 목록 새로고침 실패:', error);
        }
    }, [councilName, councilId, stableSetNotPlacedMembers]);

    const [sections, setSections] = useState([]);

    // 페이지 로드 시 부서 목록 불러오기
    useEffect(() => {
        refreshDepartments();
    }, [refreshDepartments]);

    const onDragEnd = async ({ source, destination, draggableId }) => {
        if (!destination) return;

        console.log('드래그 앤 드롭 정보:', { source, destination, draggableId });
        console.log('현재 notPlacedMembers:', notPlacedMembers);
        console.log('현재 sections:', sections);

        let dragged;

        // 출발지에서 제거
        if (source.droppableId === 'notPlaced') {
            // draggableId를 숫자로 변환하여 비교
            const memberId = parseInt(draggableId, 10);
            console.log('미배치에서 찾기:', { memberId, draggableId, notPlacedMembers });
            dragged = notPlacedMembers.find((m) => m.id === memberId);
            if (!dragged) {
                console.error('드래그된 구성원을 찾을 수 없습니다:', draggableId, 'memberId:', memberId);
                console.error('notPlacedMembers:', notPlacedMembers);
                return;
            }
            console.log('찾은 dragged 객체:', dragged);
            stableSetNotPlacedMembers((prev) => prev.filter((m) => m.id !== memberId));
        } else {
            const [sectionId, role] = source.droppableId.split(':');
            const sourceSection = sections.find((s) => s.id === sectionId);
            if (!sourceSection || !sourceSection[role]) {
                console.error('출발지 섹션을 찾을 수 없습니다:', source.droppableId);
                return;
            }
            // draggableId를 숫자로 변환하여 비교
            const memberId = parseInt(draggableId, 10);
            console.log('부서에서 찾기:', { memberId, draggableId, sourceSection, role });
            dragged = sourceSection[role].find((m) => m.id === memberId);
            if (!dragged) {
                console.error('드래그된 구성원을 찾을 수 없습니다:', draggableId, 'memberId:', memberId);
                console.error('sourceSection[role]:', sourceSection[role]);
                return;
            }
            console.log('찾은 dragged 객체:', dragged);
            setSections((prev) =>
                prev.map((s) =>
                    s.id === sectionId
                        ? { ...s, [role]: s[role].filter((m) => m.id !== memberId) }
                        : s
                )
            );
        }

        // 도착지에 추가
        if (destination.droppableId === 'notPlaced') {
            stableSetNotPlacedMembers((prev) => [...prev, dragged]);
        } else {
            const [sectionId, role] = destination.droppableId.split(':');
            const targetSection = sections.find((s) => s.id === sectionId);
            if (!targetSection) {
                console.error('도착지 섹션을 찾을 수 없습니다:', sectionId);
                return;
            }
            const departmentLevel = role === 'lead' ? 0 : 1; // lead는 부장(0), sub는 부원(1)
            
            setSections((prev) =>
                prev.map((s) =>
                    s.id === sectionId
                        ? { ...s, [role]: [...s[role], dragged] }
                        : s
                )
            );

            // API 호출하여 서버에 변경사항 반영
            try {
                // API 호출 시에는 userId를 사용
                const memberId = dragged.userId;
                console.log('API 호출용 memberId:', { draggedId: dragged.id, draggedUserId: dragged.userId, finalMemberId: memberId });
                
                console.log('구성원 배치 이동 API 호출 파라미터:', {
                    councilName,
                    memberId: memberId,
                    departmentId: targetSection.departmentId,
                    departmentLevel,
                    councilId
                });
                
                const response = await moveMemberToDepartment(
                    councilName,
                    memberId,
                    targetSection.departmentId,
                    departmentLevel,
                    councilId
                );
                
                console.log('구성원 배치 이동 API 응답:', response);
                
                // API 응답 성공 여부 확인
                if (response.isSuccess) {
                    console.log('구성원 배치 이동 성공');
                    refreshDepartments(); // API 성공 후 부서 목록 새로고침
                } else {
                    // API 응답은 받았지만 실패한 경우
                    console.error('구성원 배치 이동 API 실패:', response.message);
                    throw new Error(`API 실패: ${response.message} (코드: ${response.code})`);
                }
            } catch (error) {
                console.error('구성원 배치 이동 실패:', error);
                console.error('에러 상세 정보:', {
                    message: error.message,
                    stack: error.stack,
                    response: error.response
                });
                // API 실패 시 UI 상태를 원래대로 되돌림
                if (source.droppableId === 'notPlaced') {
                    stableSetNotPlacedMembers((prev) => [...prev, dragged]);
                } else {
                    const [sourceSectionId, sourceRole] = source.droppableId.split(':');
                    setSections((prev) =>
                        prev.map((s) =>
                            s.id === sourceSectionId
                                ? { ...s, [sourceRole]: [...s[sourceRole], dragged] }
                                : s
                        )
                    );
                }
                alert('구성원 배치 이동에 실패했습니다: ' + error.message);
            }
        }
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div className="px-[76px] w-full flex flex-col gap-8 bg-cream flex-1">
                <b className="text-[40px] font-pretendard text-darkslategray text-left">
                    구성원 및 조직 관리
                </b>

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
                        placeholder="이름을 입력하세요."
                    />
                </div>


                {activeLabel === '학생회 구성원 관리' && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <CouncilMemberSection
                            sections={sections}
                            setSections={setSections}
                            councilName={councilName}
                            councilId={councilId}
                            setNotPlacedMembers={stableSetNotPlacedMembers}
                            refreshDepartments={refreshDepartments}
                        />
                        <NotPlacedMember 
                            members={notPlacedMembers} 
                            onSectionClick={() => {
                                console.log('미배치 명단 섹션 클릭됨');
                                setIsModalOpen(true);
                            }}
                        />
                    </DragDropContext>
                )}

                {activeLabel === '하위 학생회 관리' && (
                    <div>
                        <LowerCounCilManagementSection/>
                    </div>
                )}

                {activeLabel === '학생 전체 관리' && (
                    <AllStudentsSection />
                )}

                                 {/* 미배치 명단 모달 */}
                 {isModalOpen && (
                     <OrgMemberManageModal
                         onClose={() => setIsModalOpen(false)}
                         title="미배치 명단"
                     >
                         <div className="flex flex-col gap-6">
                             {/* 미배치 구성원 목록 */}
                             <div>
                                 <div className="flex items-center gap-3 mb-4">
                                     <h3 className="text-xl font-semibold text-gray-800">미배치 구성원</h3>
                                     <span className="text-gray-500 text-sm">({notPlacedMembers.length}명)</span>
                                 </div>
                                 
                                 {notPlacedMembers.length > 0 ? (
                                     <div className="space-y-3">
                                         {notPlacedMembers.map((member) => (
                                             <AffiliationList
                                                 key={member.id}
                                                 imgSrc="/default-profile.png"
                                                 name={member.name || 'Unknown'}
                                                 studentId={member.id || 'N/A'}
                                                 major={member.role || 'N/A'}
                                                 department="미배치"
                                                 joinDate={member.councilRole || 'N/A'}
                                             />
                                         ))}
                                     </div>
                                 ) : (
                                     <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
                                         <p className="text-sm">미배치된 구성원이 없습니다.</p>
                                     </div>
                                 )}
                             </div>
                         </div>
                     </OrgMemberManageModal>
                 )}

            </div>
        </div>
    );
}
