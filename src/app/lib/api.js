const API_BASE = process.env.NEXT_PUBLIC_API_URL;


export async function createTask(councilId, councilName, taskData, token) {
    const url = `${API_BASE}/admin/council/${councilName}/todo/${councilId}/create`;
  
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Council-Id': token, // 예시
      },
      body: JSON.stringify(taskData),
    });
  
    if (!res.ok) throw new Error('할 일 등록 실패');
    return res.json();
  }


export async function getAllTasks(councilName) {
  const res = await fetch(`${API_BASE}/admin/council/${councilName}/todo/list`, {
    cache: 'no-store', // 항상 fresh data
  });
  
  if (!res.ok) throw new Error('할 일 목록 가져오기 실패');
  return res.json();
}