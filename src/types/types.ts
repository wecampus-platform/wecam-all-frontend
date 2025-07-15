export type ContentItem = {
  subtitle: string;
  body: string | React.ReactNode;
};

export type BoxData = {
  title: string;
  contents: ContentItem[];
};


export interface Duplicate {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    isDuplicate: boolean;
  }
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  schoolId: number;
  collegeId: number;
  departmentId: number;
}


export interface User {
  email: string;
  role: 'UNAUTH' | 'GUEST_STUDENT' | 'GUEST'; 
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  username: string;
  phoneNumber: string;
  userEmail: string;
  universityId: number;
  organizationId: number;
  academicStatus: string;
  role: 'UNAUTH' | 'GUEST_STUDENT' | 'GUEST';
  student_grade: number;
  isAuthentication: boolean;
  isCouncilFee: boolean;
  nickName: string;
  studentId: string;
  organizationHierarchyList: string[];
}

export interface School {
  id: number;
  name: string;
}

export interface Organization {
  id: number;
  name: string;
  level: number;
}

//공통 응답
// interface ApiResponse<T> {
//   isSuccess: boolean;
//   code: number;
//   message: string;
//   result: T;
// }

// type EmailCheckResult = {
//   isDuplicate: boolean;
// };

// type EmailCheckResponse = ApiResponse<EmailCheckResult>;