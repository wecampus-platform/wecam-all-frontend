"use client";

import { SearchIcon } from '@/components/icons/serach-icon';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function RegisterForm({ onSubmit }) {
    const {
        schoolInput, setSchoolInput, schoolList, selectedSchool, setSelectedSchool,
        collegeInput, setCollegeInput, collegeList, selectedCollege, setSelectedCollege,
        departmentInput, setDepartmentInput, departmentList, selectedDepartment, setSelectedDepartment,
        studentNumberInput, setStudentNumberInput,
        showSchoolList, setShowSchoolList, showCollegeList, setShowCollegeList, showDepartmentList, setShowDepartmentList,
        fetchSchools, fetchColleges, fetchDepartments, isFormCompleteForPresident
    } = useRegisterForm();

    const [showManualSchoolInput, setShowManualSchoolInput] = useState(false);
    const [showManualCollegeInput, setShowManualCollegeInput] = useState(false);
    const [showManualDepartmentInput, setShowManualDepartmentInput] = useState(false);

    const [manualSchool, setManualSchool] = useState('');
    const [manualCollege, setManualCollege] = useState('');
    const [manualDepartment, setManualDepartment] = useState('');

    const [schoolError, setSchoolError] = useState(false);
    const [collegeError, setCollegeError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);

    useEffect(() => {
        if (schoolInput && schoolList.length > 0 && !selectedSchool) {
            const matched = schoolList.some((s) => s.name === schoolInput);
            setSchoolError(!matched);
        }
    }, [schoolInput, selectedSchool, schoolList]);

    useEffect(() => {
        if (collegeInput && collegeList.length > 0 && !selectedCollege) {
            const matched = collegeList.some((c) => c.name === collegeInput);
            setCollegeError(!matched);
        }
    }, [collegeInput, selectedCollege, collegeList]);

    useEffect(() => {
        if (departmentInput && departmentList.length > 0 && !selectedDepartment) {
            const matched = departmentList.some((d) => d.name === departmentInput);
            setDepartmentError(!matched);
        }
    }, [departmentInput, selectedDepartment, departmentList]);

    useEffect(() => {
        if (showManualSchoolInput) {
            setSelectedSchool(null);
            setSelectedCollege(null);
            setSelectedDepartment(null);

            setShowManualCollegeInput(true);
            setShowManualDepartmentInput(true);
        }
    }, [showManualSchoolInput]);

    useEffect(() => {
        if (showManualCollegeInput) {
            setSelectedCollege(null);
            setSelectedDepartment(null);
        }
    }, [showManualCollegeInput]);

    useEffect(() => {
        if (showManualDepartmentInput) {
            setSelectedDepartment(null);
        }
    }, [showManualDepartmentInput]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            school: manualSchool || schoolInput,
            college: manualCollege || collegeInput,
            department: manualDepartment || departmentInput,
            selschool: showManualSchoolInput ? null : selectedSchool?.id || 0,
            selcollege: showManualCollegeInput ? null : selectedCollege?.id || 0,
            seldepartment: showManualDepartmentInput ? null : selectedDepartment?.id || 0,
            studentNumber: studentNumberInput,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full bg-white h-[1080px] overflow-hidden text-center text-5xl text-darkslategray font-pretendard relative">
            <div className="absolute top-[160px] left-1/2 -translate-x-1/2 font-semibold">회원가입</div>

            <div className="absolute top-[253px] left-1/2 -translate-x-1/2 w-[656px] flex flex-col items-center gap-7 text-left text-base text-silver">
                <div className="self-stretch flex flex-col items-center gap-5">
                    {/* 학교 입력란 */}
                    {!showManualSchoolInput && (
                        <InputWithStyledList
                            label="학교 이름을 입력하세요."
                            input={schoolInput}
                            setInput={setSchoolInput}
                            list={schoolList}
                            onSelect={(item) => {
                                setSelectedSchool(item);
                                setSchoolInput(item.name);
                                setSelectedCollege(null);
                                setCollegeInput('');
                                setSelectedDepartment(null);
                                setDepartmentInput('');
                                setShowSchoolList(false);
                                setSchoolError(false);
                            }}
                            onFocus={fetchSchools}
                            showList={showSchoolList}
                            setShowList={setShowSchoolList}
                            disabled={false}
                        />
                    )}

                    {schoolError && !showManualSchoolInput && (
                        <div className="text-red-500 text-sm mt-1">
                            당신이 입력한 조직은 존재하지 않습니다. 새로 만드시겠습니까?
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedSchool(null);
                                    setShowManualSchoolInput(true);
                                    setSchoolError(false);
                                }}
                                className="ml-2 underline"
                            >
                                새로 만들기
                            </button>
                        </div>
                    )}

                    {showManualSchoolInput && (
                        <input
                            type="text"
                            value={manualSchool}
                            onChange={(e) => setManualSchool(e.target.value)}
                            placeholder="학교 이름을 직접 입력하세요."
                            className="rounded-xl bg-white border-gray2 border-[1px] flex items-center justify-between py-3 px-4 w-full focus:border-point outline-none mt-2"
                        />
                    )}

                    {/* 단과대학 입력란 */}
                    {!showManualCollegeInput && (
                        <InputWithStyledList
                            label="단과대학 이름을 입력하세요."
                            input={collegeInput}
                            setInput={setCollegeInput}
                            list={collegeList}
                            onSelect={(item) => {
                                setSelectedCollege(item);
                                setCollegeInput(item.name);
                                setSelectedDepartment(null);
                                setDepartmentInput('');
                                setShowCollegeList(false);
                                setCollegeError(false);
                            }}
                            onFocus={fetchColleges}
                            showList={showCollegeList}
                            setShowList={setShowCollegeList}
                            disabled={(!selectedSchool && !showManualSchoolInput && !manualSchool) || (!schoolInput && !manualSchool)}
                        />
                    )}

                    {collegeError && !showManualCollegeInput && (
                        <div className="text-red-500 text-sm mt-1">
                            당신이 입력한 조직은 존재하지 않습니다. 새로 만드시겠습니까?
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedCollege(null);
                                    setShowManualCollegeInput(true);
                                    setCollegeError(false);

                                    setShowManualDepartmentInput(true);
                                    setSelectedDepartment(null);
                                    setDepartmentInput('');
                                }}
                                className="ml-2 underline"
                            >
                                새로 만들기
                            </button>
                        </div>
                    )}

                    {showManualCollegeInput && (
                        <input
                            type="text"
                            value={manualCollege}
                            onChange={(e) => setManualCollege(e.target.value)}
                            placeholder="단과대학 이름을 직접 입력하세요."
                            className="rounded-xl bg-white border-gray2 border-[1px] flex items-center justify-between py-3 px-4 w-full focus:border-point outline-none mt-2"
                        />
                    )}

                    {/* 학과 입력란 */}
                    {!showManualDepartmentInput && (
                        <InputWithStyledList
                            label="학부/학과/전공 이름을 입력하세요."
                            input={departmentInput}
                            setInput={setDepartmentInput}
                            list={departmentList}
                            onSelect={(item) => {
                                setSelectedDepartment(item);
                                setDepartmentInput(item.name);
                                setShowDepartmentList(false);
                                setDepartmentError(false);
                            }}
                            onFocus={fetchDepartments}
                            showList={showDepartmentList}
                            setShowList={setShowDepartmentList}
                            disabled={(!selectedCollege && !showManualCollegeInput && !manualCollege) || (!collegeInput && !manualCollege)}
                        />
                    )}

                    {departmentError && !showManualDepartmentInput && (
                        <div className="text-red-500 text-sm mt-1">
                            당신이 입력한 조직은 존재하지 않습니다. 새로 만드시겠습니까?
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedDepartment(null);
                                    setShowManualDepartmentInput(true);
                                    setDepartmentError(false);
                                }}
                                className="ml-2 underline"
                            >
                                새로 만들기
                            </button>
                        </div>
                    )}

                    {showManualDepartmentInput && (
                        <input
                            type="text"
                            value={manualDepartment}
                            onChange={(e) => setManualDepartment(e.target.value)}
                            placeholder="학부/학과/전공 이름을 직접 입력하세요."
                            className="rounded-xl bg-white border-gray2 border-[1px] flex items-center justify-between py-3 px-4 w-full focus:border-point outline-none mt-2"
                        />
                    )}

                    <div className="w-[656px] relative">
                        <input
                            type="text"
                            value={studentNumberInput}
                            onChange={(e) => setStudentNumberInput(e.target.value)}
                            placeholder="학번을 입력하세요."
                            className="rounded-xl bg-white border-gray2 border-[1px] flex items-center justify-between py-3 px-4 w-full focus:border-point outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormCompleteForPresident}
                        className={`w-[656px] rounded-lg flex items-center justify-center py-3 px-4 text-white text-center font-semibold transition-colors ${!isFormCompleteForPresident() ? 'bg-gray3 cursor-not-allowed' : 'bg-point cursor-pointer'}`}
                    >
                        학과 정보 입력 완료하기
                    </button>
                </div>

                <div className="flex flex-col items-center gap-3 text-xl text-dimgray">
                    <div className="self-stretch flex flex-row items-center gap-1.5">
                        <div>* 본인의 학과가 없을 시, 학생회에 위캠</div>
                        <div className="flex flex-row items-center text-point">
                            <b className="cursor-pointer">워크스페이스 개설</b>
                        </div>
                        <div>을 문의하세요!</div>
                    </div>

                    <div className="flex flex-row items-center gap-1 text-base text-gray3">
                        <div>이미 계정이 있으신가요?</div>
                        <Link href="/login" className="underline font-semibold cursor-pointer">
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}

function InputWithStyledList({
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
    const filteredList = list.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className="w-[656px] relative">
            <div className="rounded-xl bg-white border-gray2 border-solid border-[1px] flex flex-row items-center justify-between py-3 px-4 gap-0 focus-within:border-point">
                <input
                    type="text"
                    value={input}
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

export default RegisterForm;