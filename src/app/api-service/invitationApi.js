import { adminapi } from '@/lib/fetchClient';

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


export const updateInvitationExpiry = async (councilName, invitationId) => {
  if (!councilName || !invitationId) throw new Error('councilName 또는 invitationId가 없습니다.');

  // 현재 시간 +1시간
  const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
  const expiredAt = oneHourLater.toISOString().slice(0, 19); // 'yyyy-MM-ddTHH:mm:ss'

  const url = `/council/${councilName}/invitation/${invitationId}/edit/expiredAt?expiredAt=${expiredAt}`;

  const res = await adminapi(url, {
    method: 'PUT',
  });

  return await res.json();
};