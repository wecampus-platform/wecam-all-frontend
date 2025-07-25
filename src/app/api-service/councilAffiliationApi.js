import { adminapi } from '@/lib/fetchClient';

// 전체 리스트 조회
export const fetchAffiliationRequests = async (councilId, councilName) => {
  try {
    const res = await adminapi(`/council/${councilName}/affiliation/requests/all`, {
      method: 'GET',
    });
    return await res.json();
  } catch (err) {
    console.error('[fetchAffiliationRequests] 실패:', err);
    return [
      {
        id: 9999,
        name: '홍길동',
        studentNumber: '20230001',
        department: '컴퓨터공학과',
        requestedAt: '2025-07-25',
      },
    ];
  }
};

// 승인 요청
export const approveAffiliationRequest = async ({ councilName, userId, authType }) => {
  try {
    const url = `/council/${councilName}/affiliation/approve?userId=${userId}&authType=${authType}`;
    const res = await adminapi(url, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.error('[approveAffiliationRequest] 실패:', err);
    throw err;
  }
};

// 거절(삭제) 요청
export const rejectAffiliationRequest = async ({ councilName, userId, authType }) => {
  try {
    const url = `/council/${councilName}/affiliation/delete?userId=${userId}&authType=${authType}`;
    const res = await adminapi(url, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    console.error('[rejectAffiliationRequest] 실패:', err);
    throw err;
  }
};
