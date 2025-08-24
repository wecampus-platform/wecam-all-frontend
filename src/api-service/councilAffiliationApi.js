import { adminapi } from '@/lib/fetchClient';

// 부서명 변경 API
export const renameDepartment = async (councilName, departmentId, newName) => {
  try {
    const response = await adminapi(
      `/council/${councilName}/composition/department/rename?departmentId=${departmentId}&newName=${encodeURIComponent(newName)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('부서명 변경 API 오류:', error);
    throw error;
  }
};
