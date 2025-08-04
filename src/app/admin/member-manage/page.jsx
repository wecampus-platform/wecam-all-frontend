'use client';

import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';

import SideBarPage from '@/components/side-bar';
import FilterTabs from '@/components/filterTabs';
import { Search } from '@/components/search';
import CouncilMemberSection from './councilMemberSection';
import NotPlacedMember from './notPlacedMember';
import AllStudentsSection from './allStudentsSection';
import LowerCounCilManagementSection from './lowerCouncilManagementSection';

export default function MemberManagePage() {
    const filters = ['학생회 구성원 관리', '학생 전체 관리', '하위 학생회 관리'];
    const [activeLabel, setActiveLabel] = useState(filters[0]);
    const [inputValue, setInputValue] = useState('');

    const [notPlacedMembers, setNotPlacedMembers] = useState([
        { id: '1', name: '김위캠' },
        { id: '2', name: '이위캠' },
        { id: '3', name: '박위캠' },
    ]);

    const [sections, setSections] = useState([
        {
            id: 'section-1',
            title: '회장단',
            number: '2명',
            leadTitle: '회장',
            subTitle: '부회장',
            lead: [],
            sub: [],
        },
    ]);

    const onDragEnd = ({ source, destination, draggableId }) => {
        if (!destination) return;

        let dragged;

        // 출발지에서 제거
        if (source.droppableId === 'notPlaced') {
            dragged = notPlacedMembers.find((m) => m.id === draggableId);
            setNotPlacedMembers((prev) => prev.filter((m) => m.id !== draggableId));
        } else {
            const [sectionId, role] = source.droppableId.split(':');
            dragged = sections
                .find((s) => s.id === sectionId)
            [role].find((m) => m.id === draggableId);
            setSections((prev) =>
                prev.map((s) =>
                    s.id === sectionId
                        ? { ...s, [role]: s[role].filter((m) => m.id !== draggableId) }
                        : s
                )
            );
        }

        // 도착지에 추가
        if (destination.droppableId === 'notPlaced') {
            setNotPlacedMembers((prev) => [...prev, dragged]);
        } else {
            const [sectionId, role] = destination.droppableId.split(':');
            setSections((prev) =>
                prev.map((s) =>
                    s.id === sectionId
                        ? { ...s, [role]: [...s[role], dragged] }
                        : s
                )
            );
        }
    };

    return (
        <div className="h-screen w-full flex">
            <SideBarPage />
            <div className="px-[76px] w-full flex flex-col gap-8">
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
                        />
                        <NotPlacedMember members={notPlacedMembers} />
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


            </div>
        </div>
    );
}
