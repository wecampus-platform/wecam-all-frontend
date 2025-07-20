const API_BASE = process.env.NEXT_PUBLIC_API;
const token = process.env.NEXT_PUBLIC_API_TOKEN;

export async function createTask(councilId, councilName, taskData) {
    const url = `${API_BASE}/admin/council/${councilName}/todo/${councilId}/create`;
  
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Council-Id': councilId, 
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
  
    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ 서버 응답 오류:", res.status, errText);
      throw new Error('할 일 등록 실패')};
      return res.json();
  }


export async function getAllTasks(councilName, councilId) {
  if (!API_BASE) {
    throw new Error("API_BASE is not defined. Check your .env settings.");
  }
  console.log("API_BASE:", API_BASE);
  const url =`${API_BASE}/admin/council/${councilName}/todo/list`
  
  const res = await fetch(url, {
    cache: 'no-store', // 항상 fresh data
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${token}`
    },
  });
  
  const data = await res.json(); // ✅ 여기서만 한 번만 호출
  console.log("📦 받은 데이터:", data);
  return data;
  
}