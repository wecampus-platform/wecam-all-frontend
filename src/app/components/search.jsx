'use client';

import { SearchIcon } from './icons/serach-icon';

//search input (icon)
export function Search({
  value = '',
  onChange = () => {},
  onSearchClick = () => {},
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
        <button type="button" onClick={onSearchClick} disabled={disabled} className="cursor-pointer">
          <SearchIcon className="w-6 h-6 shrink-0 text-gray3" />
        </button>
      </div>
    </div>
  );
}

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
