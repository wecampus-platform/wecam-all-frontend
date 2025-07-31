import { adminapi,clientapi } from '@/lib/fetchClient';

const fallbackExample = [
  {
    code: 'EX1234',
    makeUser: '예시유저',
    codeType: 'council_member',
    createdAt: '2025-07-24T23:21:04.410Z',
    isActive: true,
    expiredAt: '2025-07-30T23:59:59.000Z',
  },
];

export const fetchInvitationList = async (councilId) => {
  if (!councilId) throw new Error('councilId가 없습니다.');

  try {
    const res = await adminapi(`/council/${councilId}/invitation/list`, {
      method: 'GET',
    });

    const json = await res.json();

    if (Array.isArray(json.result)) return json.result;

    if (Array.isArray(json)) return json;

    throw new Error('응답에 배열이 없습니다.');
  } catch (e) {
    console.warn('[fetchInvitationList] API 실패, 예시 데이터로 대체됨:', e.message);
    return fallbackExample;
  }
};


export const updateInvitationExpiry = async (councilName, invitationId, currentExpiredAt) => {
  console.log('[updateInvitationExpiry] 호출됨:', { councilName, invitationId, currentExpiredAt });
  
  if (!councilName || !invitationId) throw new Error('councilName 또는 invitationId가 없습니다.');
  if (!currentExpiredAt) throw new Error('currentExpiredAt이 없습니다.');

  // 기존 만료시간에 +1시간
  const currentExpiry = new Date(currentExpiredAt);
  const oneHourLater = new Date(currentExpiry.getTime() + 60 * 60 * 1000);
  const expiredAt = oneHourLater.toISOString().slice(0, 19); // 'yyyy-MM-ddTHH:mm:ss'

  console.log('[updateInvitationExpiry] 계산된 값들:', {
    currentExpiry: currentExpiry.toISOString(),
    oneHourLater: oneHourLater.toISOString(),
    expiredAt
  });

  const url = `/council/${councilName}/invitation/${invitationId}/edit/expiredAt?expiredAt=${expiredAt}`;
  console.log('[updateInvitationExpiry] API URL:', url);

  const res = await adminapi(url, {
    method: 'PUT',
  });

  const result = await res.json();
  console.log('[updateInvitationExpiry] API 응답:', result);
  
  return result;
};

export const createInvitation = async (councilName, codeType) => {
  if (!councilName) throw new Error('councilName이 없습니다.');
  if (!codeType) throw new Error('codeType이 없습니다.');
  
  // codeType 유효성 검사
  const validCodeTypes = ['student_member', 'council_member'];
  if (!validCodeTypes.includes(codeType)) {
    throw new Error(`유효하지 않은 codeType입니다. 사용 가능한 값: ${validCodeTypes.join(', ')}`);
  }

  try {
    const res = await adminapi(`/council/${councilName}/invitation/create/${codeType}`, {
      method: 'POST',
    });

    const json = await res.json();

    // API 응답 구조에 따라 데이터 반환
    if (json.code && json.expiredAt) {
      return {
        code: json.code,
        expiredAt: json.expiredAt,
      };
    }

    // 응답 구조가 다를 경우를 대비한 처리
    if (json.result) {
      return json.result;
    }

    return json;
  } catch (e) {
    console.error('[createInvitation] API 실패:', e.message);
    
    // 개발 중 fallback 데이터 (실제 배포 시에는 제거 권장)
    const fallbackCode = `DEV${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const fallbackExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7일 후
    
    console.warn('[createInvitation] 개발용 fallback 데이터 사용:', { code: fallbackCode, expiredAt: fallbackExpiry });
    
    return {
      code: fallbackCode,
      expiredAt: fallbackExpiry,
    };
  }
};

// 초대코드 사용이력 조회 API
const fallbackHistoryExample = [
  {
    invitationPkId: 123,
    usedAtTime: '2025-07-31T07:45:54.420Z',
    userPkId: 1,
    userName: '김위캠',
    userEmail: 'kim@wecam.com',
  },
  {
    invitationPkId: 123,
    usedAtTime: '2025-07-30T15:30:22.100Z',
    userPkId: 2,
    userName: '이학생',
    userEmail: 'lee@wecam.com',
  },
];

export const fetchInvitationHistory = async (councilName, invitationId) => {
  if (!councilName) throw new Error('councilName이 없습니다.');
  if (!invitationId) throw new Error('invitationId가 없습니다.');

  try {
    const res = await adminapi(`/council/${councilName}/invitation/${invitationId}/show/history`, {
      method: 'GET',
    });

    const json = await res.json();

    // API 응답 구조에 따라 데이터 반환
    if (Array.isArray(json.result)) return json.result;
    if (Array.isArray(json)) return json;

    throw new Error('응답에 배열이 없습니다.');
  } catch (e) {
    console.warn('[fetchInvitationHistory] API 실패, 예시 데이터로 대체됨:', e.message);
    return fallbackHistoryExample;
  }
};


//초대코드 사용 _ 학생 , 학생회 둘 다 가능함.
export async function useInvitationCode(codeType, code) {
  const url = `/invitation-code/use/${codeType}?Code=${encodeURIComponent(code)}`;

  const res = await clientapi(url, {
    method: 'POST',

  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || '초대 코드 사용 실패');
  }

  return await res.json(); // 성공 시 결과 데이터 반환
}