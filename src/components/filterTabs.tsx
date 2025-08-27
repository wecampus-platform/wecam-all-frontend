'use client';

interface FilterTabsProps {
  options: string[];
  activeLabel: string;
  onChange: (label: string) => void;
}

const FilterTabs = ({ options = [], activeLabel = '', onChange }: FilterTabsProps) => {
  return (
    <div className="flex flex-row gap-2">
      {options.map((label) => (
        <button
          key={label}
          className={`relative button-very-round w-auto flex flex-row items-center justify-center py-2 px-4 box-border text-left text-xl font-pretendard 
            ${activeLabel === label ? 'active' : 'text-darkgray'}`}
          onClick={() => onChange(label)}
        >
          <div className="relative">{label}</div>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
