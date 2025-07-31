'use client';

import { useState } from 'react';
import { CheckIcon } from './icons/check-icons';

//variant=filled 지정 시 파란 배경 체크박스
//지정X 시 하양 배경 체크박스
export default function Checkbox({
  checked,
  onChange,
  label,
  className = '',
  variant = 'filled',
}) {
  const isFilled = variant === 'filled';

  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <div
        onClick={onChange}
        className={`w-5 h-5 border rounded flex items-center justify-center
          ${checked
            ? isFilled
              ? 'bg-point border-point'
              : 'bg-white border-point'
            : 'bg-white border-gray3'}
        `}
      >
        {checked && (
          <CheckIcon
            active
            className={`w-4 h-4 ${isFilled ? 'text-white' : 'text-point'}`}
          />
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
