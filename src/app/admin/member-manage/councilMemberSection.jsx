'use client';

import { useState, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import NameTag from './nameTag';
import OrgMemberManageModal from './modals/OrgMemberManageModal';
import AffiliationList from './components/AffiliationList';
import EditIcon from '@/components/icons/EditIcon';
import { renameDepartment, createDepartment, fetchDepartments } from '@/api-service/councilAffiliationApi';

export default function CouncilMemberSection({ sections = [], setSections, councilName, councilId, setNotPlacedMembers: stableSetNotPlacedMembers, refreshDepartments }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newDepartmentTitle, setNewDepartmentTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // 부서 목록 불러오기
    useEffect(() => {
        const loadDepartments = async () => {
            if (!councilName) return;
            
            try {
                setIsLoading(true);
                                 const response = await fetchDepartments(councilName, councilId);
                console.log('API 응답:', response); // 응답 구조 확인
                
                                                  // API 응답에서 departments 배열과 unassigned 배열 추출
                 let departments = [];
                 let unassignedMembers = [];
                 
                 if (response && response.result) {
                     if (Array.isArray(response.result.departments)) {
                         departments = response.result.departments;
                     }
                     if (Array.isArray(response.result.unassigned)) {
                         unassignedMembers = response.result.unassigned;
                     }
                 } else {
                     console.warn('예상과 다른 API 응답 구조:', response);
                     departments = [];
                     unassignedMembers = [];
                 }
                 
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
                         name: member.userName || 'Unknown',
                         role: member.departmentRoleName || 'Unknown',
                         councilRole: member.userCouncilRole || 'Unknown'
                     })) || [],
                     sub: dept.sub?.filter(member => member && member.userId).map(member => ({
                         id: member.userId,
                         name: member.userName || 'Unknown',
                         role: member.departmentRoleName || 'Unknown',
                         councilRole: member.userCouncilRole || 'Unknown'
                     })) || [],
                 }));
                 
                 setSections(formattedSections);
                 
                 // unassigned 상태를 부모 컴포넌트에 설정
                 stableSetNotPlacedMembers(unassignedMembers.map(member => ({
                     id: member.userId,
                     name: member.userName,
                     role: member.departmentRoleName,
                     councilRole: member.userCouncilRole
                 })));
            } catch (error) {
                console.error('부서 목록 불러오기 실패:', error);
                // 에러 발생 시 기본 회장단만 표시
                setSections([
                    {
                        id: 'section-1',
                        departmentId: 1,
                        title: '회장단',
                        number: '0명',
                        leadTitle: '회장',
                        subTitle: '부회장',
                        lead: [],
                        sub: [],
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        loadDepartments();
    }, [councilName, councilId]);

    const handleAddSection = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateDepartment = async () => {
        if (!newDepartmentTitle.trim()) {
            alert('부서명을 입력해주세요.');
            return;
        }

        try {
            // API를 통해 부서 생성
                         const response = await createDepartment(councilName, newDepartmentTitle.trim(), councilId);
            
                         // 생성된 부서 정보로 새 섹션 생성
             const newSection = {
                 id: `section-${Date.now()}`,
                 departmentId: response.result?.departmentId || Date.now(), // API에서 반환된 실제 부서 ID 사용
                 title: newDepartmentTitle.trim(),
                 number: '0명',
                 leadTitle: '부장',
                 subTitle: '부원',
                 lead: [],
                 sub: [],
             };
            
            setSections((prev) => [...prev, newSection]);
            setIsCreateModalOpen(false);
            setNewDepartmentTitle('');
            refreshDepartments(); // 부서 생성 후 목록 새로고침
        } catch (error) {
            console.error('부서 생성 실패:', error);
            alert('부서 생성에 실패했습니다: ' + error.message);
        }
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setNewDepartmentTitle('');
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSection(null);
        setIsEditing(false);
        setEditingTitle('');
    };

    const handleEditSection = () => {
        setIsEditing(true);
        setEditingTitle(selectedSection.title);
    };

    const handleSaveTitle = async () => {
        if (!editingTitle.trim()) {
            alert('부서명을 입력해주세요.');
            return;
        }

        try {
            if (!selectedSection.departmentId) {
                alert('부서 ID를 찾을 수 없습니다.');
                return;
            }
            
                         await renameDepartment(
                 councilName,
                 selectedSection.departmentId,
                 editingTitle.trim(),
                 councilId
             );

            // 로컬 상태 업데이트
            setSections(prev => 
                prev.map(section => 
                    section.id === selectedSection.id 
                        ? { ...section, title: editingTitle.trim() }
                        : section
                )
            );

            // 선택된 섹션도 업데이트
            setSelectedSection(prev => ({ ...prev, title: editingTitle.trim() }));
            
            setIsEditing(false);
            alert('부서명이 성공적으로 변경되었습니다.');
            refreshDepartments(); // 부서 이름 변경 후 목록 새로고침
        } catch (error) {
            alert('부서명 변경에 실패했습니다: ' + error.message);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingTitle(selectedSection.title);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveTitle();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };



    return (
        <>
            {isLoading ? (
                <div className="w-full flex justify-center items-center py-20">
                    <div className="text-gray-500 text-lg">부서 목록을 불러오는 중...</div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 w-full">
                    {sections.map((section) => (
                    <div
                        key={section.id}
                        className="h-fit bg-white border border-gray9 rounded-[12px] p-8 flex flex-col gap-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleSectionClick(section)}
                    >
                        {/* 섹션 제목 */}
                        <div className="flex flex-row gap-3">
                            <div className="font-semibold text-[24px]">{section.title}</div>
                            <div className="text-gray3 text-[16px]">
                                {section.lead.length + section.sub.length}명
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-gray8 text-[12px]">{section.leadTitle}</div>
                            <Droppable droppableId={`${section.id}:lead`} direction="horizontal">
                                {(provided) => (
                                    <div className="relative">
                                        <div
                                            className="flex flex-wrap gap-2 min-h-[40px]"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {section.lead?.filter(m => m && m.id).map((m, index) => (
                                                <Draggable key={m.id} draggableId={m.id.toString()} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <NameTag name={m.name || 'Unknown'} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-gray8 text-[12px]">{section.subTitle}</div>
                            <Droppable droppableId={`${section.id}:sub`} direction="horizontal">
                                {(provided) => (
                                    <div className="relative">
                                        <div
                                            className="flex flex-wrap gap-2 min-h-[40px]"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {section.sub?.filter(m => m && m.id).map((m, index) => (
                                                <Draggable key={m.id} draggableId={m.id.toString()} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <NameTag name={m.name || 'Unknown'} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                ))}

                 {/* + 버튼 */}
                 <button
                     onClick={handleAddSection}
                     className="min-h-[200px] py-8 rounded-[12px] border border-gray9 bg-white text-point text-3xl font-semibold flex items-center justify-center"
                 >
                     +
                 </button>
                 </div>
             )}

            {/* OrgMemberManageModal */}
            {isModalOpen && selectedSection && (
                <OrgMemberManageModal
                    onClose={handleCloseModal}
                    title={
                        isEditing ? (
                            <input
                                type="text"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="text-black text-3xl font-bold bg-transparent focus:outline-none"
                                autoFocus
                            />
                        ) : (
                            selectedSection.title
                        )
                    }
                    icon={
                        !isEditing && (
                            <button
                                onClick={handleEditSection}
                                className="ml-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="수정"
                            >
                                <EditIcon />
                            </button>
                        )
                    }
                >
                    <div className="flex flex-col gap-6">

                        {/* 상급 직책 섹션 */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">{selectedSection.leadTitle}</h3>
                            </div>
                            
                            {selectedSection.lead && selectedSection.lead.length > 0 ? (
                                <div className="space-y-3">
                                    {selectedSection.lead.map((member) => (
                                        <AffiliationList
                                            key={member?.id || 'unknown'}
                                            imgSrc={member?.imgSrc || '/default-profile.png'}
                                            name={member?.name || 'Unknown'}
                                            studentId={member?.studentId || 'N/A'}
                                            major={member?.major || 'N/A'}
                                            department={selectedSection.title}
                                            joinDate={member?.joinDate || 'N/A'}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
                                    <p className="text-sm">상급 직책 구성원이 없습니다.</p>
                                </div>
                            )}
                        </div>

                        {/* 하급 직책 섹션 */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 mt-10">{selectedSection.subTitle}</h3>
                            </div>
                            
                            {selectedSection.sub && selectedSection.sub.length > 0 ? (
                                <div className="space-y-3">
                                    {selectedSection.sub.map((member) => (
                                        <AffiliationList
                                            key={member?.id || 'unknown'}
                                            imgSrc={member?.imgSrc || '/default-profile.png'}
                                            name={member?.name || 'Unknown'}
                                            studentId={member?.studentId || 'N/A'}
                                            major={member?.major || 'N/A'}
                                            department={selectedSection.title}
                                            joinDate={member?.joinDate || 'N/A'}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
                                    <p className="text-sm">하급 직책 구성원이 없습니다.</p>
                                </div>
                            )}
                        </div>
                                         </div>
                 </OrgMemberManageModal>
             )}

             {/* 부서 생성 모달 */}
             {isCreateModalOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                     <div 
                         className="w-[500px] bg-white rounded-2xl p-8"
                         onClick={(e) => e.stopPropagation()}
                     >
                         <div className="mb-6">
                             <h2 className="text-2xl font-bold text-gray-800 mb-2">새 부서 생성</h2>
                             <p className="text-gray-600">새로 생성할 부서의 이름을 입력해주세요.</p>
                         </div>
                         
                         <div className="mb-6">
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                                 부서명
                             </label>
                             <input
                                 type="text"
                                 value={newDepartmentTitle}
                                 onChange={(e) => setNewDepartmentTitle(e.target.value)}
                                 onKeyDown={(e) => {
                                     if (e.key === 'Enter') {
                                         handleCreateDepartment();
                                     } else if (e.key === 'Escape') {
                                         handleCloseCreateModal();
                                     }
                                 }}
                                 placeholder="부서명을 입력하세요"
                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 autoFocus
                             />
                         </div>
                         
                         <div className="flex gap-3 justify-end">
                             <button
                                 onClick={handleCloseCreateModal}
                                 className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                             >
                                 취소
                             </button>
                             <button
                                 onClick={handleCreateDepartment}
                                 disabled={!newDepartmentTitle.trim()}
                                 className={`px-6 py-2 text-white rounded-lg transition-colors ${
                                     newDepartmentTitle.trim() 
                                         ? 'bg-blue-500 hover:bg-blue-600' 
                                         : 'bg-gray-300 cursor-not-allowed'
                                 }`}
                             >
                                 생성하기
                             </button>
                         </div>
                     </div>
                 </div>
             )}
         </>
     );
 }
