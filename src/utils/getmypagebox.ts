// app/mypage/getMyPageBoxes.ts
import { BoxData, UserProfile } from '@/types/types';
import type { ReactNode } from 'react';

export const getMyPageBoxes = (user: UserProfile, authLinks: { [key: string]: ReactNode }): BoxData[] => [
  {
    title: '기본 정보',
    contents: [
      { subtitle: '이름', body: user.username },
      { subtitle: '연락처', body: user.phoneNumber },
      { subtitle: '이메일', body: user.userEmail },
    ],
  },
  {
    title: '소속 정보',
    contents: [
      { subtitle: '학교', body: user.organizationHierarchyList?.[0] ?? '' },
      { subtitle: '단과대학', body: user.organizationHierarchyList?.[1] ?? '' },
      { subtitle: '학과', body: user.organizationHierarchyList?.[2] ?? '' },
      { subtitle: '학번', body: user.studentId ?? '' },
      { subtitle: '학년', body: user.student_grade ?? ''},
      { subtitle: '학적 상태', body: user.academicStatus?? '' },
      { subtitle: '역할', body: user.role },
    ],
  },
  {
    title: '인증 내역',
    contents: [
      { subtitle: '소속 인증하기 (재학증명서 또는 합격증명서)', body: authLinks.organization },
      { subtitle: '학교 이메일', body: authLinks.schoolEmail },
      { subtitle: '학생회 인증하기', body: authLinks.studentCouncil },
      { subtitle: '학생비 납부 내역', body: '내역 보러가기' },
    ],
  },
  {
    title: '계정 정보',
    contents: [
      { subtitle: '비밀번호 변경', body: '' },
      { subtitle: '로그인 기기 관리', body: '' },
    ],
  },
];
