const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createTask(accessToken,councilId, councilName, taskData, file) {
  const url = `${API_BASE}/admin/council/${councilName}/todo/${councilId}/create`;

  const formData = new FormData();

  // JSON → Blob
  const jsonFile = new File(
    [JSON.stringify(taskData)],
    "request.json", // ← 이름 필수!
    { type: "application/json" }
  );
  formData.append("request", jsonFile);

  // ✅ 파일이 존재하면 첨부
  if (file) {
    formData.append("files", file); // ← 이거 꼭 필요함
  }

  const filesEntry = formData.get("files");
  if (filesEntry instanceof File) {
    console.log("✅ [files] 파일 이름:", filesEntry.name);
    console.log("✅ [files] 파일 타입:", filesEntry.type);
    console.log("✅ [files] 파일 크기:", filesEntry.size, 'bytes');
  } else {
    console.warn("⚠️ [files] 항목이 비어있거나 File이 아님:", filesEntry);
  }

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`🗂️ [${key}] 파일 이름:`, value.name);
      console.log(`🗂️ [${key}] 파일 타입:`, value.type);
      console.log(`🗂️ [${key}] 파일 크기:`, value.size, 'bytes');
    } else {
      console.log(`📦 [${key}]`, value);
    }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId,
      // ❌ 'Content-Type': multipart 직접 설정하지 말기!
    },
    body: formData,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await res.json() : await res.text();

  console.log("📬 응답 코드:", res.status);
  console.log("📋 응답 내용:", body);

  return { status: res.status, body };
}

export async function fetchTodoSummary(accessToken, councilName, councilId) {
  const url = `${API_BASE}/admin/council/${councilName}/todo/dashboard/todo-summary`;

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('요약 데이터 가져오기 실패');

  return await res.json();
}


export async function getAllTasks(accessToken, councilName, councilId, todoType = '', progressStatus = '') {
  if (!API_BASE) {
    throw new Error("API_BASE is not defined. Check your .env settings.");
  }

  const params = new URLSearchParams();
  if (todoType) params.append('todoType', todoType);
  if (progressStatus) params.append('progressStatus', progressStatus);

  const url = `${API_BASE}/admin/council/${councilName}/todo/list?${params.toString()}`;

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  console.log("📦 받은 데이터:", data);
  
  // 새로운 API 응답 형식에 맞게 result 배열 반환
  if (data.isSuccess && data.result) {
    return data.result;
  }
  
  return data;
}


export async function getTaskDetail(accessToken,councilName, todoId,councilId) {

  const url =`${API_BASE}/admin/council/${councilName}/todo/${todoId}`

  const res = await fetch(url,{
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (!res.ok) throw new Error('Task detail fetch failed');
  return res.json();
}

export async function updateTaskStatus(accessToken, councilName, councilId, todoId, newStatus) {
  const url = `${API_BASE}/admin/council/${councilName}/todo/${todoId}/status`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-Council-Id': councilId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ progressStatus: newStatus }),
  });

  if (!res.ok) {
    console.log(res);
    return false;
  }

  return true;
}


export async function deleteTask(accessToken,councilName, todoId, councilId) {
  if (!API_BASE) throw new Error('API_BASE is not defined');

  const url = `${API_BASE}/admin/council/${councilName}/todo/${todoId}/delete`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'X-Council-Id': councilId,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`❌ Delete failed (${res.status}) ${msg}`);
  }

  return true;          // 필요하면 res.json() 또는 res.text()
}

// 학생회 조직 멤버 조회
export async function fetchCouncilMembers(accessToken, councilName, councilId) {
  try {
    const url = `${API_BASE}/admin/council/${councilName}/member/list`;
    console.log('🔍 fetchCouncilMembers 호출:', { url, councilName, councilId });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Council-Id': councilId,
      },
    });

    console.log('🔍 fetchCouncilMembers 응답 상태:', res.status, res.ok);

    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      throw new Error(`멤버 조회 실패 (${res.status}) ${msg}`);
    }

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    console.log('🔍 fetchCouncilMembers 응답 데이터:', data);

    // 응답 구조에 따라 안전하게 배열 반환
    if (data && Array.isArray(data)) {
      return data;
    } else if (data && data.result && Array.isArray(data.result)) {
      return data.result;
    } else if (data && data.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('🔍 예상과 다른 API 응답 구조:', data);
      return [];
    }
  } catch (error) {
    console.error('🔍 fetchCouncilMembers 오류:', error);
    return [];
  }
}


export async function updateTask(
  accessToken,
  councilId,
  councilName,
  todoId,
  taskData,             
  deletedFileNameList = [], // 삭제할 파일명들
  newFiles = []             // 새로 추가할 파일들 (File[] 형태)
) {
  const url = `${API_BASE}/admin/council/${councilName}/todo/${todoId}/edit`;

  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(taskData)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);


  // 2. 새 파일 추가
  if (newFiles && newFiles.length > 0) {
    newFiles.forEach((file) => {
      formData.append("files", file);
    });
  }

  // 3. 삭제할 파일명 추가
  if (deletedFileNameList && deletedFileNameList.length > 0) {
    deletedFileNameList.forEach((filename) => {
      formData.append("deleteFiles", filename);
    });
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Council-Id": councilId,
      // 'Content-Type' 지정 ❌ (multipart는 자동 설정됨)
    },
    body: formData,
  });

  if (!res.ok) {
    const errorMessage = await res.text(); // 혹은 res.json() 시도
    console.error('응답 에러 메시지:', errorMessage);
    throw new Error("할 일 수정 실패: " + errorMessage);
  }

  return true;
}
