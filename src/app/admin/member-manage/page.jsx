'use client';

import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useAuthStore } from '@/store/authStore';
import SideBarPage from '@/components/side-bar';
import FilterTabs from '@/components/filterTabs';
import { Search } from '@/components/search';
import CouncilMemberSection from './councilMemberSection';
import NotPlacedMember from './notPlacedMember';
import AllStudentsSection from './allStudentsSection';
import LowerCounCilManagementSection from './lowerCouncilManagementSection';
import { createCouncilDepartment, fetchCouncilDepartmentMembers } from '@/app/api-service/adminMemberManageApi';

export default function MemberManagePage() {
  const filters = ['학생회 구성원 관리', '학생 전체 관리', '하위 학생회 관리'];
  const [activeLabel, setActiveLabel] = useState(filters[0]);
  const [inputValue, setInputValue] = useState('');

  const { councilList } = useAuthStore();
  const councilId = councilList?.[0]?.id || 2;
  // store 필드명에 맞게 둘 중 하나로 잡아줘
  const councilName =
    councilList?.[0]?.councilName ?? councilList?.[0]?.name ?? '';

  const [sections, setSections] = useState([]);          // 부서 섹션
  const [notPlacedMembers, setNotPlacedMembers] = useState([]); // 미배치

  const handleAddSection = async () => {
    const deptName = window.prompt('생성할 부서 이름을 입력하세요.');
    if (!deptName?.trim()) return;
  
    try {
      // 백엔드 스펙에 따라 departmentName을 보내야 하면 아래처럼 전달
      await createCouncilDepartment({ councilId, councilName, departmentName: deptName.trim() });
      await loadMembers();
      alert('부서가 생성되었습니다.');
    } catch (e) {
      console.error(e);
      alert(e.message || '부서 생성 실패');
    }
  };
  const loadMembers = async () => {
    console.log('loadMembers 실행');
    try {
      const { departments, unassigned } = await fetchCouncilDepartmentMembers({ councilId,councilName });
      console.log('정규화된 응답', { departments, unassigned });
  
      const sectionMap = {};
      (departments ?? []).forEach((dept) => {
        sectionMap[dept.departmentId] = {
          id: `section-${dept.departmentId}`,
          title: dept.departmentName || '이름없는 부서',
          leadTitle: '부장',
          subTitle: '부원',
          lead: (dept.lead ?? []).map((m) => ({ id: String(m.userId), name: m.userName })),
          sub: (dept.sub ?? []).map((m) => ({ id: String(m.userId), name: m.userName })),
        };
      });
  
      const unassignedList = (unassigned ?? []).map((m) => ({
        id: String(m.userId),
        name: m.userName,
      }));
  
      setSections(Object.values(sectionMap));
      setNotPlacedMembers(unassignedList);
    } catch (e) {
      console.error('부서/멤버 로드 실패:', e);
      setSections([]);
      setNotPlacedMembers([]);
    }
  };
  
  useEffect(() => {
    console.log('useEffect 진입', { councilId });
    if (!councilId) return;
    loadMembers();
  }, [councilId]);
  
  

  const onDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return;

    let dragged;

    // 출발지에서 제거
    if (source.droppableId === 'notPlaced') {
      dragged = notPlacedMembers.find((m) => m.id === draggableId);
      setNotPlacedMembers((prev) => prev.filter((m) => m.id !== draggableId));
    } else {
      const [sectionId, role] = source.droppableId.split(':');
      dragged = sections.find((s) => s.id === sectionId)[role].find((m) => m.id === draggableId);
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, [role]: s[role].filter((m) => m.id !== draggableId) } : s
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
          s.id === sectionId ? { ...s, [role]: [...s[role], dragged] } : s
        )
      );
    }

    // TODO: 여기서 서버에 배치 변경 반영 API 호출 (원하면 시그니처 맞춰서 만들어줄게)
  };

  return (
    <div className="h-screen w-full flex">
      <SideBarPage />
      <div className="px-[76px] w-full flex flex-col gap-8">
        <b className="text-[40px] font-pretendard text-darkslategray text-left">
          구성원 및 조직 관리
        </b>

        <FilterTabs options={filters} activeLabel={activeLabel} onChange={setActiveLabel} />

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
            onAddSection={handleAddSection}
            />
            <NotPlacedMember members={notPlacedMembers} />
          </DragDropContext>
        )}

        {activeLabel === '하위 학생회 관리' && (
          <div>
            <LowerCounCilManagementSection councilId={councilId} />
          </div>
        )}

        {activeLabel === '학생 전체 관리' && <AllStudentsSection />}
      </div>
    </div>
  );
}
