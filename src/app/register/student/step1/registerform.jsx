// RegisterForm.jsx
'use client';

import { useRegisterForm } from '@/hooks/useRegisterForm';
import Link from 'next/link';

function RegisterForm({ onSubmit }) {
    const {
        schoolInput, setSchoolInput, schoolList, selectedSchool, setSelectedSchool,
        collegeInput, setCollegeInput, collegeList, selectedCollege, setSelectedCollege,
        departmentInput, setDepartmentInput, departmentList, selectedDepartment, setSelectedDepartment,
        studentNumberInput, setStudentNumberInput,
        showSchoolList, setShowSchoolList, showCollegeList, setShowCollegeList, showDepartmentList, setShowDepartmentList,
        fetchSchools, fetchColleges, fetchDepartments, isFormComplete
    } = useRegisterForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            school: selectedSchool,
            college: selectedCollege,
            department: selectedDepartment,
            studentNumber: studentNumberInput,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full bg-cream overflow-hidden text-center text-5xl text-darkslategray font-pretendard flex flex-col items-center">
            <div className="font-semibold text-4xl mb-12">회원가입</div>

            <div className="w-[656px] flex flex-col items-center gap-7 text-left text-base text-dimgray">
                <div className="self-stretch flex flex-col items-center gap-5">
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
                        }}
                        onFocus={fetchSchools}
                        showList={showSchoolList}
                        setShowList={setShowSchoolList}
                        disabled={false}
                    />

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
                        }}
                        onFocus={fetchColleges}
                        showList={showCollegeList}
                        setShowList={setShowCollegeList}
                        disabled={!selectedSchool || !schoolInput}
                    />

                    <InputWithStyledList
                        label="학부/학과/전공 이름을 입력하세요."
                        input={departmentInput}
                        setInput={setDepartmentInput}
                        list={departmentList}
                        onSelect={(item) => {
                            setSelectedDepartment(item);
                            setDepartmentInput(item.name);
                            setShowDepartmentList(false);
                        }}
                        onFocus={fetchDepartments}
                        showList={showDepartmentList}
                        setShowList={setShowDepartmentList}
                        disabled={!selectedCollege || !collegeInput}
                    />
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
                        disabled={!isFormComplete()}
                        className={`w-[656px] rounded-lg flex items-center justify-center py-3 px-4 text-white text-center font-semibold transition-colors ${!isFormComplete()
                            ? 'bg-gray3'
                            : 'bg-point cursor-pointer'
                            }`}
                    >
                        학과 정보 입력 완료하기
                    </button>
                </div>

                <div className="flex flex-col items-center gap-3 text-xl text-dimgray">
                    <div className="self-stretch flex flex-row items-center gap-1.5">
                        <div>* 본인의 학과가 없을 시, 학생회에 위캠</div>
                        <div className="flex flex-row items-center text-point">
                            <Link href="/workspace">
                                <b className="cursor-pointer">워크스페이스 개설</b>
                            </Link>
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

            {/* <div className="absolute top-[880px] left-0 bg-gainsboro-200 w-full h-[200px]" /> */}
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
    return (
        <div className="w-[656px] relative">
            <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 ${
                showList ? 'border-point shadow-lg' : 'hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="w-full px-3 py-2 bg-white flex items-center justify-between">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={!disabled ? onFocus : undefined}
                        onBlur={() => setTimeout(() => setShowList(false), 150)}
                        placeholder={label}
                        disabled={disabled}
                        className="flex-1 bg-transparent outline-none text-gray-900"
                    />
                    <svg
                        className={`w-4 h-4 text-gray-500 transition-transform ${showList ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {showList && !disabled && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-point rounded-b-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                        {list.map((item, index) => (
                            <div
                                key={item.id}
                                onMouseDown={() => onSelect(item)}
                                className={`px-3 py-2 cursor-pointer transition-colors ${
                                    index === 0 ? 'rounded-t-lg' : ''
                                } ${
                                    index === list.length - 1 ? 'rounded-b-lg' : ''
                                } hover:bg-gray-50 text-gray-700`}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegisterForm;
