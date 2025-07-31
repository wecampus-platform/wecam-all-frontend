import { adminapi, clientapi } from '@/lib/fetchClient';

export async function fetchCouncilHome(councilId, accessToken) {
  const res = await adminapi('/council/home', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Council-Id': councilId.toString(),
    },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || '학생회 홈 정보 불러오기 실패');
  }

  return text;
}

// 사용자 정보 조회
export async function fetchUserInfo() {
  const res = await clientapi('/user/mypage', {
    method: 'GET',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '사용자 정보 불러오기 실패');
  }

  return data;
}

// 워크스페이스 생성 요청
export async function createWorkspaceRequest(requestData, files) {
  const formData = new FormData();
  
  // request 객체를 JSON 문자열로 추가
  formData.append('request', new Blob([JSON.stringify(requestData)], {
    type: 'application/json'
  }));
  
  // 파일들 추가
  files.forEach((fileObj, index) => {
    formData.append('files', fileObj.file);
  });

  const res = await clientapi('/organization-request/create', {
    method: 'POST',
    body: formData,
    // FormData 사용 시 Content-Type 헤더를 자동으로 설정하도록 제거
  });

  // 먼저 응답 상태 체크
  if (!res.ok) {
    let errorMessage = '워크스페이스 생성 요청 실패';
    try {
      const errorData = await res.text();
      errorMessage = errorData || errorMessage;
    } catch (e) {
      console.warn('Error reading response:', e);
    }
    throw new Error(errorMessage);
  }

  // 성공인 경우 - 백엔드에서 문자열로 응답
  const message = await res.text();
  console.log('서버 응답 메시지:', message);
  
  return { 
    success: true, 
    message: message 
  };
}

export async function fetchSchoolName() {
  const res = await clientapi('/organization-request/view', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('학교 이름을 불러오지 못했습니다.');
  const data = await res.json();
  return data.result; // 👉 여기서 result만 반환
  
}