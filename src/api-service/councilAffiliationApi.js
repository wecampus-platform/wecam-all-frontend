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
    console.log('🔍 fetchAffiliationRequests 호출:', { councilName });
    
    const response = await adminapi(
      `/council/${encodeURIComponent(councilName)}/affiliation/requests/all`,
      {
        method: 'GET',
      }
    );
    
    console.log('🔍 fetchAffiliationRequests 응답:', response);
    
    if (!response.ok) {
      console.error('🔍 fetchAffiliationRequests HTTP 오류:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('🔍 fetchAffiliationRequests 응답 데이터:', data);
    
    // 백엔드 응답에서 status 필드 분석
    if (data && Array.isArray(data.result)) {
      console.log('🔍 응답 데이터의 status 필드 분석:');
      data.result.forEach((item, index) => {
        console.log(`  - 항목 ${index}:`, {
          userId: item.userId,
          status: item.status,
          statusType: typeof item.status,
          authenticationType: item.authenticationType
        });
      });
    }
    
    return data;
  } catch (error) {
    console.error('🔍 소속 요청 목록 조회 API 오류:', error);
    
    // 타입 불일치 오류 특별 처리
    if (error.message && error.message.includes('AuthenticationStatus') && error.message.includes('BaseEntity$Status')) {
      console.error('🔍 타입 불일치 오류 감지: AuthenticationStatus와 BaseEntity.Status 타입이 맞지 않습니다.');
      console.error('🔍 이는 백엔드에서 상태값을 처리할 때 발생하는 문제입니다.');
      console.error('🔍 백엔드 응답 예시:', {
        "userId": 0,
        "status": "string", // 이 필드가 문제
        "authenticationType": "NEW_STUDENT"
      });
      throw new Error('백엔드 상태값 타입 오류: status 필드의 값이 BaseEntity.Status 타입과 맞지 않습니다.');
    }
    
    throw error;
  }
};

// 소속 요청 승인 API
export const approveAffiliationRequest = async ({ councilName, userId }) => {
  // 백엔드에서 기대하는 상태값들을 순서대로 시도
  const possibleStatusValues = ['PENDING', 'APPROVED', 'ACTIVE', 'ENABLED', 'ACTIVE'];
  
  for (const statusValue of possibleStatusValues) {
    try {
      console.log(`🔍 상태값 '${statusValue}'로 승인 시도 중...`);
      
      const response = await adminapi(
        `/council/${encodeURIComponent(councilName)}/affiliation/approve`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            authType: statusValue,
          }),
        }
      );
      
      const result = await response.json();
      console.log(`✅ 상태값 '${statusValue}'로 승인 성공!`);
      return result;
      
    } catch (error) {
      console.log(`❌ 상태값 '${statusValue}'로 승인 실패:`, error.message);
      
      // 타입 불일치 오류가 아닌 경우 즉시 중단
      if (!error.message.includes('AuthenticationStatus') && !error.message.includes('BaseEntity$Status')) {
        throw error;
      }
      
      // 마지막 시도였다면 오류 정보 출력
      if (statusValue === possibleStatusValues[possibleStatusValues.length - 1]) {
        console.error('🔍 모든 상태값 시도 실패');
        console.error('🔍 백엔드에서 기대하는 정확한 상태값을 확인해주세요');
        throw new Error(`승인 실패: 모든 상태값 시도 실패. 백엔드 개발자에게 문의해주세요.`);
      }
    }
  }
};

// 소속 요청 거절 API
export const rejectAffiliationRequest = async ({ councilName, userId }) => {
  // 백엔드에서 기대하는 상태값들을 순서대로 시도
  const possibleStatusValues = ['PENDING', 'REJECTED', 'INACTIVE', 'DISABLED'];
  
  for (const statusValue of possibleStatusValues) {
    try {
      console.log(`🔍 상태값 '${statusValue}'로 거절 시도 중...`);
      
      const response = await adminapi(
        `/council/${encodeURIComponent(councilName)}/affiliation/reject`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            authType: statusValue,
          }),
        }
      );
      
      const result = await response.json();
      console.log(`✅ 상태값 '${statusValue}'로 거절 성공!`);
      return result;
      
    } catch (error) {
      console.log(`❌ 상태값 '${statusValue}'로 거절 실패:`, error.message);
      
      // 타입 불일치 오류가 아닌 경우 즉시 중단
      if (!error.message.includes('AuthenticationStatus') && !error.message.includes('BaseEntity$Status')) {
        throw error;
      }
      
      // 마지막 시도였다면 오류 정보 출력
      if (statusValue === possibleStatusValues[possibleStatusValues.length - 1]) {
        console.error('🔍 모든 상태값 시도 실패');
        console.error('🔍 백엔드에서 기대하는 정확한 상태값을 확인해주세요');
        throw new Error(`거절 실패: 모든 상태값 시도 실패. 백엔드 개발자에게 문의해주세요.`);
      }
    }
  }
};
