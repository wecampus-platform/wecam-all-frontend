import { adminapi } from '@/lib/fetchClient';

// 부서명 변경 API
export const renameDepartment = async (councilName, departmentId, newName, councilId) => {
  try {
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/composition/department/rename?departmentId=${departmentId}&newName=${encodeURIComponent(newName)}`,
      {
        method: 'PUT',
        headers: {
          'X-Council-Id': councilId.toString(),
        },
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('부서명 변경 API 오류:', error);
    throw error;
  }
};

// 부서 생성 API
export const createDepartment = async (councilName, departmentTitle, councilId) => {
  try {
    const url = `/council/${encodeURIComponent(councilName)}/composition/department/create?departmentName=${encodeURIComponent(departmentTitle)}`;
    
    console.log('🔍 createDepartment API 호출:', {
      url,
      method: 'POST',
      headers: {
        'X-Council-Id': councilId.toString(),
      },
      departmentTitle,
      councilName,
      councilId
    });
    
    const response = await adminapi(url, {
      method: 'POST',
      headers: {
        'X-Council-Id': councilId.toString(),
      },
    });
    
    console.log('🔍 createDepartment API 응답:', response);
    
    return await response.json();
  } catch (error) {
    console.error('부서 생성 API 오류:', error);
    throw error;
  }
};

// 부서 목록 조회 API
export const fetchDepartments = async (councilName, councilId) => {
  try {
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/composition/members`,
      {
        method: 'GET',
        headers: {
          'X-Council-Id': councilId.toString(),
        },
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('부서 목록 조회 API 오류:', error);
    throw error;
  }
};

// 부서 및 역할 목록 조회 API (새로운 API 명세 기반)
export const fetchDepartmentRoles = async (councilName, councilId) => {
  try {
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/member/departments`,
      {
        method: 'GET',
        headers: {
          'X-Council-Id': councilId.toString(),
        },
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('부서 및 역할 목록 조회 API 오류:', error);
    throw error;
  }
};

// 멤버 전체 조회 API (새로운 API 명세 기반)
export const fetchAllMembers = async (councilName, councilId) => {
  try {
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/member/list`,
      {
        method: 'POST',
        headers: {
          'X-Council-Id': councilId.toString(),
        },
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('멤버 전체 조회 API 오류:', error);
    throw error;
  }
};

// 학생회 부원 부서 배치/이동 API (새로운 API 명세 기반)
export const moveMemberToDepartment = async (councilName, memberId, departmentId, departmentLevel = 1, councilId) => {
  try {
    // API 명세에 따르면 departmentId는 필수이므로, 미배치 상태일 때는 특별한 처리 필요
    if (departmentId === null) {
      console.log('⚠️ 미배치 상태로 이동 요청 - departmentId가 null입니다.');
      console.log('⚠️ 서버에서 미배치 전용 부서를 생성하거나 별도 API를 제공해야 합니다.');
      throw new Error('미배치 상태로 이동하는 기능은 현재 지원되지 않습니다. 부서를 선택해주세요.');
    }
    
    const requestBody = {
      departmentId: departmentId,
      departmentLevel: departmentLevel
    };
    
    console.log('moveMemberToDepartment API 요청 정보:', {
      url: `/council/${encodeURIComponent(councilName)}/member/${memberId}/department`,
      method: 'PUT',
      headers: {
        'X-Council-Id': councilId.toString(),
        'Content-Type': 'application/json',
      },
      body: requestBody,
      memberId: memberId,
      departmentId: departmentId,
      departmentLevel: departmentLevel
    });
    
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/member/${memberId}/department`,
      {
        method: 'PUT',
        headers: {
          'X-Council-Id': councilId.toString(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );
    
    console.log('moveMemberToDepartment API 응답 객체:', response);
    console.log('moveMemberToDepartment API 응답 상태:', response.status, response.ok);
    
    const responseData = await response.json();
    console.log('moveMemberToDepartment API 응답 데이터:', responseData);
    
    // 응답이 실패인 경우 에러 처리
    if (!responseData.isSuccess) {
      throw new Error(`API 호출 실패: ${responseData.message || '알 수 없는 오류'}`);
    }
    
    return responseData;
  } catch (error) {
    console.error('구성원 배치 이동 API 오류:', error);
    console.error('에러 상세 정보:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// 소속 요청 목록 조회 API
export const fetchAffiliationRequests = async (councilName) => {
  try {
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/affiliation/requests/all`,
      {
        method: 'GET',
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('소속 요청 목록 조회 API 오류:', error);
    throw error;
  }
};

// 소속 요청 승인 API
export const approveAffiliationRequest = async ({ councilName, userId, authType }) => {
  try {
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/affiliation/approve`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          authType,
        }),
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('소속 요청 승인 API 오류:', error);
    throw error;
  }
};

// 소속 요청 거절 API
export const rejectAffiliationRequest = async ({ councilName, userId, authType }) => {
  try {
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/affiliation/reject`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          authType,
        }),
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('소속 요청 거절 API 오류:', error);
    throw error;
  }
};
