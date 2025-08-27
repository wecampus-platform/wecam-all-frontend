'use client';

import Checkbox from '@/components/checkbox';

export default function FilterCheckboxGroup({
    selectedYears,
    selectedGrades,
    onToggleFilter,
}) {
    const yearOptions = ['25학번', '24학번', '23학번', '22학번', '21학번', '20학번', '19학번 이전'];
    const gradeOptions = ['1학년', '2학년', '3학년', '4학년'];

    return (
        <div className="flex flex-row gap-10">
            <div className="flex flex-wrap gap-2 items-center">
                {yearOptions.map((year) => (
                    <Checkbox
                        key={year}
                        label={year}
                        checked={selectedYears.includes(year)}
                        onChange={() => onToggleFilter('year', year)}
                        variant="filled"
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                {gradeOptions.map((grade) => (
                    <Checkbox
                        key={grade}
                        label={grade}
                        checked={selectedGrades.includes(grade)}
                        onChange={() => onToggleFilter('grade', grade)}
                        variant="filled"
                    />
                ))}
            </div>
        </div>
    );
}
