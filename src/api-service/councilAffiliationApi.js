import { adminapi } from '@/lib/fetchClient';

// 부서명 변경 API
export const renameDepartment = async (councilName, departmentId, newName, councilId) => {
  try {
    const response = await adminapi(
      `/council/${councilName}/composition/department/rename?departmentId=${departmentId}&newName=${encodeURIComponent(newName)}`,
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
    const response = await adminapi(
      `/council/${departmentTitle}/composition/department/create`,
      {
        method: 'POST',
        headers: {
          'X-Council-Id': councilId.toString(),
        },
      }
    );
    
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
      `/council/${councilName}/composition/members`,
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

// 구성원 배치 이동 API
// memberId는 다음 중 하나일 가능성이 높습니다:
// - userId (가장 가능성 높음)
// - userCouncilId
// - memberId
// - userMemberId
export const moveMemberToDepartment = async (councilName, memberId, departmentId, departmentLevel = 1, councilId) => {
  try {
    const requestBody = {
      departmentId: departmentId,
      departmentLevel: departmentLevel
    };
    
    console.log('moveMemberToDepartment API 요청 정보:', {
      url: `/council/${councilName}/member/${memberId}/department`,
      method: 'PUT',
      headers: {
        'X-Council-Id': councilId.toString(),
        'Content-Type': 'application/json',
      },
      body: requestBody
    });
    
    const response = await adminapi(
      `/council/${councilName}/member/${memberId}/department`,
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
    const responseData = await response.json();
    console.log('moveMemberToDepartment API 응답 데이터:', responseData);
    
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
      `/council/${councilName}/affiliation/requests`,
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
      `/council/${councilName}/affiliation/approve`,
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
      `/council/${councilName}/affiliation/reject`,
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
