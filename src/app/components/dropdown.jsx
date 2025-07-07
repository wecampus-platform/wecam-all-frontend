'use client';
import { useState } from 'react';

export default function CustomDropdown({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const options = ['총학생회', '단과대학 학생회', '학부/학과 학생회', '전공 학생회'];

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    onSelect(value); // 부모로 전달
  };

  return (
    <div className="relative w-[656px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer h-11 w-full px-4 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px] 
        flex justify-between items-center ${selected ? 'outline-blue-500' : 'outline-zinc-300'}`}
      >
        <div className={`text-base w-full text-left ${selected ? 'text-[#55575C] font-medium' : 'text-zinc-400 font-normal'}`}>
          {selected || '학생회 계층을 선택하세요.'}
        </div>
        <div className="w-6 h-6 relative overflow-hidden shrink-0">
          <div className={`w-2.5 h-0.5 absolute left-2 top-3 transition-transform ${isOpen ? 'rotate-45' : 'rotate-0'} bg-zinc-400`} />
          <div className={`w-2.5 h-0.5 absolute left-2 top-3 transition-transform ${isOpen ? '-rotate-45' : 'rotate-90'} bg-zinc-400`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-md border border-zinc-300">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-zinc-700 text-base font-normal text-left"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
