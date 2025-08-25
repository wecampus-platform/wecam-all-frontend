import { adminapi } from '@/lib/fetchClient';

// 회의록 목록 조회
export const getMeetings = async (councilName, params = {}) => {
    const { categoryId, attendeeId, sortOrder } = params;
    
    // 쿼리 파라미터 구성
    const queryParams = new URLSearchParams();
    if (categoryId) queryParams.append('categoryId', categoryId);
    if (attendeeId) queryParams.append('attendeeId', attendeeId);
    if (sortOrder) queryParams.append('sortOrder', sortOrder);
    
    const queryString = queryParams.toString();
    const url = `/council/${councilName}/meeting${queryString ? `?${queryString}` : ''}`;
    
    try {
        const response = await adminapi(url);
        return response.json();
    } catch (error) {
        console.error('회의록 목록 조회 실패:', error);
        throw error;
    }
};

// 회의록 상세 조회
export const getMeetingDetail = async (councilName, meetingId) => {
    try {
        const response = await adminapi(`/council/${councilName}/meeting/${meetingId}`);
        return response.json();
    } catch (error) {
        console.error('회의록 상세 조회 실패:', error);
        throw error;
    }
};

// 회의록 생성
export const createMeeting = async (councilName, meetingData) => {
    try {
        const response = await adminapi(`/council/${councilName}/meeting/create`, {
            method: 'POST',
            body: JSON.stringify(meetingData)
        });
        return response.json();
    } catch (error) {
        console.error('회의록 생성 실패:', error);
        throw error;
    }
};

// 회의록 수정
export const updateMeeting = async (councilName, meetingId, meetingData) => {
    try {
        const response = await adminapi(`/council/${councilName}/meeting/${meetingId}`, {
            method: 'PATCH',
            body: JSON.stringify(meetingData)
        });
        return response.json();
    } catch (error) {
        console.error('회의록 수정 실패:', error);
        throw error;
    }
};

// 회의록 삭제
export const deleteMeeting = async (councilName, meetingId) => {
    try {
        const response = await adminapi(`/council/${councilName}/meeting/${meetingId}`, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        console.error('회의록 삭제 실패:', error);
        throw error;
    }
};

// 전체 멤버 목록 조회
export const getMemberList = async (councilName) => {
    try {
        const response = await adminapi(`/council/${councilName}/member/list`, {
            method: 'POST'
        });
        const data = await response.json();
        
        if (!response.ok) {
            console.error('멤버 목록 조회 실패:', data);
            throw new Error(data.message || '멤버 목록을 가져올 수 없습니다.');
        }
        
        return data.result || [];
    } catch (error) {
        console.error('멤버 목록 조회 실패:', error);
        // 에러가 발생해도 빈 배열 반환하여 앱이 중단되지 않도록 함
        return [];
    }
};

// 전체 멤버 조회
export const getMembers = async (councilName) => {
    try {
        const response = await adminapi(`/council/${councilName}/member/list`, {
            method: 'POST'
        });
        const data = await response.json();
        
        if (!response.ok) {
            console.error('멤버 조회 실패:', data);
            throw new Error(data.message || '멤버를 가져올 수 없습니다.');
        }
        
        return data.result || [];
    } catch (error) {
        console.error('멤버 조회 실패:', error);
        return [];
    }
};

// 카테고리 목록 조회
export const getCategoryList = async (councilName) => {
    try {
        const response = await adminapi(`/council/${councilName}/category`, {
            method: 'GET'
        });
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        console.error('카테고리 목록 조회 실패:', error);
        throw error;
    }
};
