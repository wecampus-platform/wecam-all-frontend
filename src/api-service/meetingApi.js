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
    const url = `/council/${encodeURIComponent(councilName)}/meeting${queryString ? `?${queryString}` : ''}`;
    
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
        const response = await adminapi(`/council/${encodeURIComponent(councilName)}/meeting/${meetingId}`);
        return response.json();
    } catch (error) {
        console.error('회의록 상세 조회 실패:', error);
        throw error;
    }
};

// 회의록 생성
export const createMeeting = async (councilName, meetingData) => {
    try {
        const response = await adminapi(`/council/${encodeURIComponent(councilName)}/meeting/create`, {
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
        const response = await adminapi(`/council/${encodeURIComponent(councilName)}/meeting/${meetingId}`, {
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
        const response = await adminapi(`/council/${encodeURIComponent(councilName)}/meeting/${meetingId}`, {
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
        console.log('🔍 getMemberList 호출:', { councilName });
        
        const response = await adminapi(`/council/${encodeURIComponent(councilName)}/member/list`, {
            method: 'POST'
        });
        
        console.log('🔍 getMemberList 응답:', response);
        
        const data = await response.json();
        console.log('🔍 getMemberList 응답 데이터:', data);
        
        // 응답이 성공인지 확인
        if (!response.ok) {
            console.error('멤버 목록 조회 실패:', data);
            throw new Error(data.message || '멤버 목록을 가져올 수 없습니다.');
        }
        
        // data.result가 배열인지 확인
        if (Array.isArray(data.result)) {
            console.log('🔍 data.result 배열 길이:', data.result.length);
            console.log('🔍 data.result 첫 번째 항목:', data.result[0]);
            return data.result;
        } else if (Array.isArray(data)) {
            console.log('🔍 data 배열 길이:', data.length);
            console.log('🔍 data 첫 번째 항목:', data[0]);
            return data;
        } else {
            console.warn('🔍 예상과 다른 멤버 데이터 구조:', data);
            return [];
        }
    } catch (error) {
        console.error('멤버 목록 조회 실패:', error);
        // 에러가 발생해도 빈 배열 반환하여 앱이 중단되지 않도록 함
        return [];
    }
};

// 전체 멤버 조회
export const getMembers = async (councilName) => {
    try {
        const response = await adminapi(`/council/${encodeURIComponent(councilName)}/member/list`, {
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
        console.log('🔍 getCategoryList 호출:', { councilName });
        
        const response = await adminapi(`/council/${encodeURIComponent(councilName)}/category`);
        
        console.log('🔍 getCategoryList 응답:', response);
        
        const data = await response.json();
        console.log('🔍 getCategoryList 응답 데이터:', data);
        
        // 응답이 성공인지 확인
        if (!response.ok) {
            console.error('카테고리 목록 조회 실패:', data);
            throw new Error(data.message || '카테고리 목록을 가져올 수 없습니다.');
        }
        
        // data.result가 배열인지 확인
        if (Array.isArray(data.result)) {
            return data.result;
        } else if (Array.isArray(data)) {
            return data;
        } else {
            console.warn('🔍 예상과 다른 카테고리 데이터 구조:', data);
            return [];
        }
    } catch (error) {
        console.error('카테고리 목록 조회 실패:', error);
        // 에러가 발생해도 빈 배열 반환하여 앱이 중단되지 않도록 함
        return [];
    }
};
