'use client';

import { useState } from 'react';
import CustomDropdown from '@/app/components/dropdown';

export default function MakeWorkspacePage() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');

  const renderExtraInputs = () => {
    const baseStyle =
      'mt-[8px] w-[656px] h-11 px-4 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-blue-500 inline-flex justify-start items-center gap-1 text-zinc-600 text-base font-medium';

    if (selectedLevel === '단과대학 학생회') {
      return (
        <div className= "flex flex-col mt-[12px]">
            <div className="self-stretch justify-start text-neutral-500 text-xs font-bold ">단과대학</div>
            <div className={baseStyle}>
            단과대학 이름 입력 필드
            </div>
        </div>
      );
    }

    if (selectedLevel === '학부/학과 학생회') {
      return (
        <div className="flex flex-col">
            <div className= "flex flex-col mt-[12px]">
                <div className="self-stretch justify-start text-neutral-500 text-xs font-bold ">단과대학</div>
                <div className={baseStyle}>
                단과대학 이름 입력 필드
                </div>
            </div>
            <div className= "flex flex-col mt-[12px]">
                <div className="self-stretch justify-start text-neutral-500 text-xs font-bold ">학부/학과</div>
                <div className={baseStyle}>
                학부/학과 입력 필드
                </div>
            </div>
        </div>
      );
    }

    if (selectedLevel === '전공 학생회') {
      return (
        <div className="flex flex-col">
            <div className= "flex flex-col mt-[12px]">
                <div className="self-stretch justify-start text-neutral-500 text-xs font-bold ">단과대학</div>
                <div className={baseStyle}>
                단과대학 이름 입력 필드
                </div>
            </div>
            <div className= "flex flex-col mt-[12px]">
                <div className="self-stretch justify-start text-neutral-500 text-xs font-bold ">학부/학과</div>
                <div className={baseStyle}>
                학부/학과 이름 입력 필드
                </div>
            </div>
            <div className= "flex flex-col mt-[12px]">
                <div className="self-stretch justify-start text-neutral-500 text-xs font-bold ">전공</div>
                <div className={baseStyle}>
                전공 이름 입력 필드
                </div>
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
          위캠대학교
        </div>

        {/* 조건부 추가 필드 */}
        {renderExtraInputs()}

        <div className="mt-[32px] mb-[8px] text-neutral-500 text-xs font-bold">학생회 이름</div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="학생회 이름이 워크스페이스 이름으로 지정됩니다."
          className={`
            w-[656px] h-11 px-4 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px]
            transition-all duration-150 placeholder:text-left
            ${isFocused || value
              ? 'outline-blue-500 text-[#55575C] font-medium text-left placeholder:text-zinc-400'
              : 'outline-zinc-300 text-zinc-400 font-normal text-left'}
          `}
          style={{ fontSize: '16px' }}
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
