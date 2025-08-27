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

export const fetchWorkSpaceRequestList = async (councilId) => {
  if (!councilId) throw new Error('councilId가 없습니다.');

  try {
    const res = await adminapi(`/council/${councilId}/organization/requests`, {
      method: 'GET',
    });
    const json = await res.json();
    console.log("json",json.result);

    if (Array.isArray(json.result)) return json.result;

    if (Array.isArray(json)) return json;

    throw new Error('응답에 배열이 없습니다.');
  } catch (e) {
    console.warn('[fetchInvitationList] API 실패, 예시 데이터로 대체됨:', e.message);
    return fallbackExample;
  }
};




/**
 * 부서 생성
 * POST /admin/council/{councilName}/composition/department/create
 * - Header: X-Council-Id (현재 접속 중인 학생회 ID)
 * - Path: councilName
 * - Body: 없음
 */
export const createCouncilDepartment = async ({councilId,councilName}) => {
  if (!councilId) throw new Error('councilId가 없습니다.');
  if (!councilName?.trim()) throw new Error('councilName이 없습니다.');

  const url = `/council/${encodeURIComponent(
    councilName.trim()
  )}/composition/department/create`;

  const res = await adminapi(url, {method: 'POST'});

  const json = await res.json().catch(() => ({}));
  console.log("json",json.result);

  if (!res.ok) {
    throw new Error(json.message || '부서 생성 실패');
  }

  // 스웨거 예시가 result:{} 구조이므로 안전하게 result 우선 반환
  return json.result ?? json;
};



/**
 * 부서 멤버 조회
 * GET /admin/council/{councilName}/composition/members
 * - Header: X-Council-Id (필수)
 * - Path: councilName (필수)
 * - Response: { isSuccess, code, message, result: CouncilDeptMember[] }
 */
// api-service/adminMemberManageApi.ts
export const fetchCouncilDepartmentMembers = async ({ councilId,councilName }) => {
  if (!councilId) throw new Error('councilId가 없습니다.');

  // 백엔드 실제 스펙에 맞춰 경로 조정
  const url = `/council/${encodeURIComponent(String(councilName))}/composition/members`;

  const res = await adminapi(url, {
    method: 'GET'
    // credentials 등은 adminapi 내부에서 설정돼 있다면 생략 가능
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `부서 멤버 조회 실패 (HTTP ${res.status})`);

  // 기대 형태: { isSuccess, code, message, result: { departments, unassigned } }
  const result = json?.result;

  // 🔁 정규화: 무엇이 오든 { departments, unassigned }로 맞춰서 반환
  if (result?.departments && result?.unassigned) {
    return {
      departments: result.departments ?? [],
      unassigned: result.unassigned ?? [],
    };
  }

  // 혹시 배열만 오는 구형 응답이라면 미배치로 간주
  if (Array.isArray(result)) {
    return { departments: [], unassigned: result };
  }
  if (Array.isArray(json)) {
    return { departments: [], unassigned: json };
  }

  // 방어적 기본값
  return { departments: [], unassigned: [] };
};
