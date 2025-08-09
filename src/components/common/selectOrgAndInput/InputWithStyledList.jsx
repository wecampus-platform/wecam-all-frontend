// components/common/InputWithStyledList.jsx

'use client';

import { SearchIcon } from '@/components/icons/serach-icon';

export default function InputWithStyledList({
  label,
  input,
  setInput,
  list,
  onSelect,
  onFocus,
  showList,
  setShowList,
  disabled
}) {

    const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes((input || '').toLowerCase())
  );
  return (
    <div className="w-[656px] relative">
      <div className="rounded-xl bg-white border-gray2 border-solid border-[1px] flex flex-row items-center justify-between py-3 px-4 gap-0 focus-within:border-point">
      <input
        type="text"
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
        onFocus={!disabled ? onFocus : undefined}
        onBlur={() => setTimeout(() => setShowList(false), 150)}
        placeholder={label}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none"
        />

        <SearchIcon className="w-6 h-6 shrink-0 text-gray3" />
      </div>

      {showList && !disabled && (
        <ul className="absolute w-full bg-white border border-point rounded-lg z-10 max-h-48 overflow-y-auto mt-1">
          {filteredList.map((item) => (
            <li
              key={item.id}
              onMouseDown={() => onSelect(item)}
              className="px-4 py-4 hover:bg-point cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

