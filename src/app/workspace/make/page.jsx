'use client';

import { useState, useEffect } from 'react';
import CustomDropdown from '@/components/dropdown';
import { WorkspaceInput } from '@/components/input';
import { fetchUserInfo } from '@/app/api-service/mypageApi';

export default function MakeWorkspacePage() {
  const [value, setValue] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  
  // 사용자 정보 관련 상태
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 추가 필드들 상태
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [major, setMajor] = useState('');

  // 사용자 정보 가져오기
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const renderExtraInputs = () => {
    if (selectedLevel === '단과대학 학생회') {
      return (
        <div className="flex flex-col mt-[12px]">
          <div className="self-stretch justify-start text-neutral-500 text-xs font-bold">단과대학</div>
          <WorkspaceInput
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="단과대학명을 입력해주세요"
          />
        </div>
      );
    }

    if (selectedLevel === '학부/학과 학생회') {
      return (
        <div className="flex flex-col">
          <div className="flex flex-col mt-[12px]">
            <div className="self-stretch justify-start text-neutral-500 text-xs font-bold">단과대학</div>
            <WorkspaceInput
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="단과대학명을 입력해주세요"
            />
          </div>
          <div className="flex flex-col mt-[12px]">
            <div className="self-stretch justify-start text-neutral-500 text-xs font-bold">학부/학과</div>
            <WorkspaceInput
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="학부/학과명을 입력해주세요"
            />
          </div>
        </div>
      );
    }

    if (selectedLevel === '전공 학생회') {
      return (
        <div className="flex flex-col">
          <div className="flex flex-col mt-[12px]">
            <div className="self-stretch justify-start text-neutral-500 text-xs font-bold">단과대학</div>
            <WorkspaceInput
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="단과대학명을 입력해주세요"
            />
          </div>
          <div className="flex flex-col mt-[12px]">
            <div className="self-stretch justify-start text-neutral-500 text-xs font-bold">학부/학과</div>
            <WorkspaceInput
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="학부/학과명을 입력해주세요"
            />
          </div>
          <div className="flex flex-col mt-[12px]">
            <div className="self-stretch justify-start text-neutral-500 text-xs font-bold">전공</div>
            <WorkspaceInput
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="전공명을 입력해주세요"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[#F5F7FA] flex flex-col items-center w-full h-screen">
      <div className="mt-[160px]">
        <div className="mb-[28px] text-center text-zinc-800 text-4xl font-semibold">워크스페이스 생성하기</div>

        <div className="mb-[8px] text-neutral-500 text-xs font-bold">학생회 계층 선택</div>
        <CustomDropdown onSelect={(val) => setSelectedLevel(val)} />

        <div className="mt-[32px] text-neutral-500 text-xs font-bold">대학교</div>
        <div className="mt-[8px] w-[656px] h-11 px-4 py-3 bg-white rounded-xl outline outline-1 outline-blue-500 flex items-center text-zinc-600 text-base font-medium">
          {loading 
            ? '로딩 중...' 
            : userInfo?.role === 'UNAUTH' 
              ? '대표자 회원가입 연결 후 보일 수 있음'
              : userInfo?.organizationHierarchyList?.[0] || '학교 정보 없음'
          }
        </div>

        {/* 조건부 추가 필드 */}
        {renderExtraInputs()}

        <div className="mt-[32px] mb-[8px] text-neutral-500 text-xs font-bold">학생회 이름</div>
        <WorkspaceInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="학생회 이름이 워크스페이스 이름으로 지정됩니다."
        />

        <div className="mt-[32px] mb-[8px] text-neutral-500 text-xs font-bold">증빙자료 업로드(대표자 재학증명서 첨부 필수)</div>
        <div className="flex space-x-[8px]">
          <div className="w-[551px] h-11 px-4 py-3 bg-white rounded-xl outline outline-1 outline-zinc-300 flex items-center text-zinc-400 text-base font-normal">
            승인자에게 해당 학생회 대표자임을 증명할 수 있는 자료를 업로드해주세요.
          </div>
          <div className="h-11 p-3 bg-white rounded outline outline-1 outline-blue-500 flex justify-center items-center">
            <div className="text-blue-500 text-base font-normal">파일 업로드</div>
          </div>
        </div>

      </div>
        <div className="mt-[52px] w-96 py-4 bg-zinc-400 rounded-lg justify-center items-center">
          <div className="text-white text-base font-semibold text-center">워크스페이스 생성 승인 요청하기</div>
        </div>
        
    </div>
  );
}
