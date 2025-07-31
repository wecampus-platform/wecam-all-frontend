'use client';

import { useState } from 'react';

//search input (no icon)
export function Input({
  value = '',
  onChange = () => {},
  placeholder = '',
  disabled = false,
}) {
  return (
    <div className="w-full">
      <div className="rounded-xl bg-white border-gray2 border-solid border-[1px] flex flex-row items-center justify-between py-3 px-4 gap-0 focus-within:border-point">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

// 워크스페이스 생성용 스타일된 입력 필드
export function WorkspaceInput({
  value = '',
  onChange = () => {},
  placeholder = '',
  disabled = false,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        mt-[8px] w-[656px] h-11 px-4 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px]
        transition-all duration-150 placeholder:text-left
        ${isFocused || value
          ? 'outline-blue-500 text-[#55575C] font-medium text-left placeholder:text-zinc-400'
          : 'outline-zinc-300 text-zinc-400 font-normal text-left'}
      `}
      style={{ fontSize: '16px' }}
    />
  );
}