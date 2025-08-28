import DepartmentSelectPanel from "./DepartmentSelectPanel";
import MemberActionMenu from "./MemberActionMenu";
import OptionsIcon from "@/components/icons/OptionsIcon";
import useToggleMenu from "@/hooks/useToggleMenu";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { fetchDepartmentRoles, moveMemberToDepartment } from "@/api-service/member-manage";

export default function AffiliationList({
  imgSrc,
  name,
  studentId,
  major,
  department,
  joinDate,
  councilMemberId,
  onMemberUpdate, // 부서 변경 후 콜백 함수 추가
}) {
  const {
    toggleMemberActionMenu,
    openMemberActionMenu,
    closeMemberActionMenu,

    toggleMoveDepartment,
    openMoveDepartment,
    closeMoveDepartment,
  } = useToggleMenu();

  const [selectedDept, setSelectedDept] = useState(department);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { councilName, selectedCouncilId } = useAuthStore();

  // 부서 목록 가져오기
  useEffect(() => {
    const loadDepartments = async () => {
      if (!councilName || !selectedCouncilId) {
        console.log('councilName 또는 selectedCouncilId가 없음:', { councilName, selectedCouncilId });
        return;
      }
      
      try {
        console.log('부서 목록 로드 시작:', { councilName, selectedCouncilId });
        const response = await fetchDepartmentRoles(councilName, selectedCouncilId);
        console.log('부서 목록 API 전체 응답:', response);
        
        if (response.isSuccess && response.result) {
          console.log('부서 목록 result:', response.result);
          // API 응답 구조에 맞게 name 필드 사용하고 undefined 값 필터링
          const deptNames = response.result
            .filter(dept => dept && dept.departmentName && dept.departmentName.trim() !== '')
            .map(dept => dept.departmentName);
          console.log('추출된 부서명들:', deptNames);
          console.log('departments 배열 길이:', deptNames.length);
          setDepartments(deptNames);
        } else {
          console.warn('부서 목록 API 응답이 예상과 다름:', response);
          setError('부서 목록을 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error('부서 목록 로드 실패:', err);
        setError('부서 목록을 불러올 수 없습니다.');
      }
    };

    loadDepartments();
  }, [councilName, selectedCouncilId]);

  const handleSelectDepartment = async (newDepartment) => {
    console.log('handleSelectDepartment 호출됨:', { newDepartment, type: typeof newDepartment });
    
    if (!newDepartment || newDepartment === 'undefined' || newDepartment.trim() === '') {
      setError('유효하지 않은 부서명입니다.');
      console.error('부서 이동 실패 - 유효하지 않은 부서명:', newDepartment);
      return;
    }
    
    if (!councilMemberId || !councilName || !selectedCouncilId) {
      const missingInfo = [];
      if (!councilMemberId) missingInfo.push('councilMemberId');
      if (!councilName) missingInfo.push('councilName');
      if (!selectedCouncilId) missingInfo.push('selectedCouncilId');
      
      setError(`필수 정보가 누락되었습니다: ${missingInfo.join(', ')}`);
      console.error('부서 이동 실패 - 필수 정보 누락:', { councilMemberId, councilName, selectedCouncilId });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('부서 이동 시작:', { councilMemberId, newDepartment, councilName, selectedCouncilId });
      
      // 부서명으로 부서 ID 찾기
      const deptResponse = await fetchDepartmentRoles(councilName, selectedCouncilId);
      console.log('부서 목록 API 응답:', deptResponse);
      
      if (!deptResponse.isSuccess) {
        throw new Error(`부서 목록 조회 실패: ${deptResponse.message || '알 수 없는 오류'}`);
      }
      
      if (!deptResponse.result || !Array.isArray(deptResponse.result)) {
        throw new Error('부서 목록 데이터가 올바르지 않습니다.');
      }
      
      // API 응답 구조에 맞게 departmentName 필드로 검색
      const targetDept = deptResponse.result.find(dept => dept.departmentName === newDepartment);
      console.log('찾은 부서 정보:', targetDept);
      
      if (!targetDept) {
        throw new Error(`'${newDepartment}' 부서를 찾을 수 없습니다.`);
      }
      
      // API 응답 구조에 맞게 departmentId 필드 사용
      if (!targetDept.departmentId) {
        throw new Error(`'${newDepartment}' 부서의 ID가 없습니다.`);
      }

      console.log('부서 이동 API 호출:', {
        councilName,
        councilMemberId,
        departmentId: targetDept.departmentId,
        departmentLevel: 1,
        selectedCouncilId
      });

      // API 호출하여 부서 이동
      const moveResponse = await moveMemberToDepartment(
        councilName, 
        councilMemberId, 
        targetDept.departmentId,
        1, // departmentLevel (부원으로 설정)
        selectedCouncilId
      );
      
      console.log('부서 이동 API 응답:', moveResponse);

      // 성공 시 로컬 상태 업데이트
      setSelectedDept(newDepartment);
      closeMoveDepartment();
      
      // 부모 컴포넌트에 업데이트 알림 - 구체적인 정보 전달
      if (onMemberUpdate) {
        onMemberUpdate({
          councilMemberId,
          oldDepartment: department,
          newDepartment,
          memberInfo: {
            name,
            studentId,
            major,
            joinDate
          }
        });
      }
      
    } catch (err) {
      console.error('부서 이동 실패:', err);
      setError(err.message || '부서 이동에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
      <div className="flex gap-8">
        <div className="flex items-center gap-4">
          <img
            src={imgSrc}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="font-semibold">{name}</div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-800">
          <div className="text-gray-500">{studentId}</div>
          <div className="text-gray-700">{major}</div>
        </div>

        {department && department.length !== 0 && (
          <div className="flex justify-center items-center px-2 bg-blue-100 text-blue-600 rounded-2xl text-xs">
            {selectedDept}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <div>{joinDate}</div>
        <div className="relative w-full h-full">
          <button
            className="text-[#ABAEB4] hover:text-gray-600"
            onClick={openMemberActionMenu}
          >
            <OptionsIcon />
          </button>

          {toggleMemberActionMenu && (
            <MemberActionMenu
              onClose={closeMemberActionMenu}
              onAssignDepartment={openMoveDepartment}
              onMoveDepartment={openMoveDepartment}
              onExpel={() => console.log("Expel Member")} // 이후 기능 구현 필요
            />
          )}

          {toggleMoveDepartment && (
            <DepartmentSelectPanel
              onClose={closeMoveDepartment}
              selected={selectedDept}
              onSelect={handleSelectDepartment}
              departments={departments}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}
