'use client';

import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import NameTag from './nameTag';
import OrgMemberManageModal from './modals/OrgMemberManageModal';
import AffiliationList from './components/AffiliationList';
import EditIcon from '@/components/icons/EditIcon';
import { renameDepartment } from '@/api-service/councilAffiliationApi';

export default function CouncilMemberSection({ sections = [], setSections, councilName }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState('');

    const handleAddSection = () => {
        const newSection = {
            id: `section-${Date.now()}`,
            title: '새로운 부서',
            number: '0명',
            leadTitle: '부장',
            subTitle: '부원',
            lead: [],
            sub: [],
        };
        setSections((prev) => [...prev, newSection]);
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
            await renameDepartment(
                councilName,
                selectedSection.id,
                editingTitle.trim()
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
                                            {section.lead.map((m, index) => (
                                                <Draggable key={m.id} draggableId={String(m.id)} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <NameTag name={m.name} />
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
                                            {section.sub.map((m, index) => (
                                                <Draggable key={m.id} draggableId={String(m.id)} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <NameTag name={m.name} />
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
                            
                            {selectedSection.lead.length > 0 ? (
                                <div className="space-y-3">
                                    {selectedSection.lead.map((member) => (
                                        <AffiliationList
                                            key={member.id}
                                            imgSrc={member.imgSrc || '/default-avatar.png'}
                                            name={member.name}
                                            studentId={member.studentId || 'N/A'}
                                            major={member.major || 'N/A'}
                                            department={selectedSection.title}
                                            joinDate={member.joinDate || 'N/A'}
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
                            
                            {selectedSection.sub.length > 0 ? (
                                <div className="space-y-3">
                                    {selectedSection.sub.map((member) => (
                                        <AffiliationList
                                            key={member.id}
                                            imgSrc={member.imgSrc || '/default-avatar.png'}
                                            name={member.name}
                                            studentId={member.studentId || 'N/A'}
                                            major={member.major || 'N/A'}
                                            department={selectedSection.title}
                                            joinDate={member.joinDate || 'N/A'}
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
        </>
    );
}
