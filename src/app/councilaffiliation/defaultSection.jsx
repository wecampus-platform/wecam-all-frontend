'use client';

import { useState } from 'react';
import { CheckIcon, XIcon } from "../components/icons/check-icons";
import Checkbox from '../components/checkbox';

export function DefaultSection() {
  const [activeTab, setActiveTab] = useState('match');
  const [checkedList, setCheckedList] = useState(Array(5).fill(false)); // 5개 기준

  const tabs = [
    { key: 'match', label: '일치 그룹', icon: CheckIcon },
    { key: 'mismatch', label: '불일치 그룹', icon: XIcon },
  ];

  const toggleCheck = (index) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start text-left text-base text-gray4 font-pretendard">
      <div className="flex flex-row items-center w-full mx-10 my-6">
        <Checkbox className="mr-10" checked={checkedList.every(Boolean)} onChange={() => {
          const allChecked = checkedList.every(Boolean);
          setCheckedList(checkedList.map(() => !allChecked));
        }} variant="filled" />

        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-40 flex flex-row items-center pt-3 pb-2 pl-2 gap-1 cursor-pointer ${isActive
                  ? "border-b-2 border-point text-point font-medium"
                  : "border-b-0 text-gray3"
                }`}
            >
              <div>{tab.label}</div>
              <div className="w-5 h-5 relative overflow-hidden shrink-0">
                <IconComponent active={isActive} className="w-full h-full" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="w-full p-10">
        <div className="grid grid-cols-[40px_120px_80px_150px_1fr_240px] items-center px-4 py-2 text-xs text-gray-500">
          <div></div>
          <div>이름</div>
          <div>학번</div>
          <div>학부</div>
          <div>신청일</div>
          <div></div>
        </div>

        {checkedList.map((isChecked, idx) => (
          <div key={idx} className="grid grid-cols-[40px_120px_80px_150px_1fr_240px] items-center px-4 py-3">
            <Checkbox checked={isChecked} onChange={() => toggleCheck(idx)} variant="filled" />
            <div className="font-medium">김위컴</div>
            <div className="text-sm text-gray-600">2021</div>
            <div className="truncate">정보컴퓨터공학부</div>
            <div className="text-sm text-gray-400">2025.07.01</div>
            <div className="flex gap-x-2 justify-end">
              <button className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer">상세보기</button>
              <button className="bg-green-500 text-white rounded px-3 py-1 text-sm cursor-pointer">승인하기</button>
              <button className="bg-red-500 text-white rounded px-3 py-1 text-sm cursor-pointer">거절하기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
