'use client';

import { useState } from 'react';
import Checkbox from '@/components/checkbox';
import FilterCheckboxGroup from './filterCheckBoxGroup';

export default function AllStudentsSection() {
    const [requests, setRequests] = useState([
        {
            id: 1,
            name: '김위캠',
            studentNumber: '2021',
            department: '컴퓨터공학과',
            grade: '3학년',
            status: '재학',
        },
        {
            id: 2,
            name: '홍위캠',
            studentNumber: '2020',
            department: '전자공학과',
            grade: '4학년',
            status: '휴학',
        },
    ]);

    const [checkedList, setCheckedList] = useState(Array(requests.length).fill(false));
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedGrades, setSelectedGrades] = useState([]);

    const toggleAll = () => {
        const newChecked = !checkedList.every(Boolean);
        setCheckedList(Array(requests.length).fill(newChecked));
    };

    const toggleCheck = (idx) => {
        const newCheckedList = [...checkedList];
        newCheckedList[idx] = !newCheckedList[idx];
        setCheckedList(newCheckedList);
    };

    const onToggleFilter = (type, value) => {
        if (type === 'year') {
            setSelectedYears((prev) =>
                prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
            );
        } else {
            setSelectedGrades((prev) =>
                prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
            );
        }
    };

    const filterByStudentNumber = (num) => {
        if (selectedYears.length === 0) return true;
        const year = num.slice(2, 4);
        const label = year + '학번';
        return selectedYears.includes(label) || (parseInt(year) <= 19 && selectedYears.includes('19학번 이전'));
    };

    const filterByGrade = (grade) => {
        return selectedGrades.length === 0 || selectedGrades.includes(grade);
    };

    const filteredRequests = requests.filter(
        (r) => filterByStudentNumber(r.studentNumber) && filterByGrade(r.grade)
    );

    const handleReject = (req) => {
        alert(`제명: ${req.name}`);
    };

    return (
        <div>
            {/* 필터 */}
            <div className="mb-10">
                <FilterCheckboxGroup
                    selectedYears={selectedYears}
                    selectedGrades={selectedGrades}
                    onToggleFilter={onToggleFilter}
                />

            </div>

            <div className="flex flex-col text-center bg-white rounded py-8 gap-5">
                <div className="text-center text-sm text-gray-500 mb-5">
                    학년, 재학/휴학 여부는 개인이 변경하지 않은 경우 그대로 표기되니 주의하세요!
                </div>

                {/* 테이블 */}
                <div className="w-full px-10 items-start justify-start text-left text-base text-gray4 font-pretendard rounded">

                    {/* 헤더 */}
                    <div className="grid grid-cols-[40px_50px_80px_150px_100px_1fr_240px] items-center px-4 py-2 text-xs text-gray-500">
                        <div>
                            <Checkbox
                                checked={checkedList.every(Boolean)}
                                onChange={toggleAll}
                                variant="filled"
                            /></div>
                        <div>이름</div>
                        <div>학번</div>
                        <div>학부</div>
                        <div>학년</div>
                        <div></div>
                        <div></div>
                    </div>

                    {/* 목록 */}
                    {filteredRequests.map((req, idx) => (
                        <div
                            key={req.id || idx}
                            className="grid grid-cols-[40px_50px_80px_150px_100px_1fr_240px] items-center px-4 py-3"
                        >
                            <Checkbox
                                checked={checkedList[idx]}
                                onChange={() => toggleCheck(idx)}
                                variant="filled"
                            />
                            <div className="font-medium">{req.name}</div>
                            <div className="text-sm text-gray-600">{req.studentNumber}</div>
                            <div className="truncate">{req.department}</div>
                            <div className="text-sm text-gray-400">{req.grade}</div>
                            <div className="text-sm text-point">{req.status}</div>
                            <div className="flex gap-x-2 justify-end">
                                <button
                                    onClick={() => handleReject(req)}
                                    className="bg-red-500 text-white rounded px-3 py-1 text-sm"
                                >
                                    제명하기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
