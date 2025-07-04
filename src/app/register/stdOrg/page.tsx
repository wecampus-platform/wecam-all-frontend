'use client';
import React, { useState, useEffect } from 'react';
import api from '@/lib/api'; // axios 인스턴스
import { Search, ChevronDown } from 'lucide-react';

// useOrganizationForm 훅 (실제 API 연동)
export function useOrganizationForm() {
    const [schools, setSchools] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [departments, setDepartments] = useState([]);
  
const [selectedSchoolId, setSelectedSchoolId] = useState<number | ''>('');
const [selectedCollegeId, setSelectedCollegeId] = useState<number | ''>('');
const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);

  
    // 학교 목록 가져오기
    useEffect(() => {
      api.get('/public/schools')
        .then((res) => setSchools(res.data))
        .catch((err) => console.error('학교 목록 가져오기 실패:', err));
    }, []);
  
    // 단과대학 목록
    useEffect(() => {
      if (!selectedSchoolId) return;
      setColleges([]);
      setDepartments([]);
      api.get(`/public/schools/${selectedSchoolId}/organizations?level=1`)
        .then((res) => setColleges(res.data))
        .catch((err) => console.error('단과대학 목록 실패:', err));
    }, [selectedSchoolId]);
  
    // 학과 목록
    useEffect(() => {
      if (!selectedCollegeId) return;
      setDepartments([]);
      api.get(`/public/organizations/${selectedCollegeId}/children`)
        .then((res) => setDepartments(res.data))
        .catch((err) => console.error('학과 목록 실패:', err));
    }, [selectedCollegeId]);
  
    return {
      schools, colleges, departments,
      selectedSchoolId, setSelectedSchoolId,
      selectedCollegeId, setSelectedCollegeId
    };
}
interface OptionType {
    id: number;
    name: string;
  }
  
  interface AutoCompleteInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    options?: OptionType[];
    onSelect?: (option: OptionType) => void;
    disabled?: boolean;
    loading?: boolean;
  }
  

// 자동완성 input 컴포넌트
const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
    placeholder = '',
    value = '',
    onChange = () => {},
    options = [],
    onSelect = () => {},
    disabled = false,
    loading = false
  }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue) {
        const filtered = options.filter((option: any) => 
        option?.name?.toLowerCase().includes(inputValue.toLowerCase())
      );
      
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setIsOpen(true);
  };
  

const handleSelect = (option: any) => {
  setInputValue(option?.name || '');
  onChange(option?.name || '');
  onSelect(option);
  setIsOpen(false);
};


  const handleBlur = () => {
    // 클릭 이벤트가 처리되도록 약간의 지연을 줍니다
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled || loading}
          className="w-full text-base text-gray-700 placeholder-gray-400 bg-transparent outline-none disabled:cursor-not-allowed"
        />
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
      
      {isOpen && filteredOptions.length === 0 && inputValue && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 px-4 py-3 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

interface SelectOption {
    value: string;
    label: string;
  }
  
  interface SelectDropdownProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    options: SelectOption[];
    disabled?: boolean;
  }
  

// 선택 드롭다운 컴포넌트
const SelectDropdown: React.FC<SelectDropdownProps> = ({
    placeholder = '',
    value = '',
    onChange = () => {},
    options,
    disabled = false
  }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="relative">
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onBlur={handleBlur}
        tabIndex={0}
        className={`flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'
        }`}
      >
        <span className={`text-base ${selectedOption ? 'text-gray-700' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
interface Organization {
    id: number;
    name: string;
  }
  

  
// 메인 회원가입 컴포넌트
export default function SignUpForm() {
  const { 
    schools, colleges, departments,
    selectedSchoolId, setSelectedSchoolId,
    selectedCollegeId, setSelectedCollegeId 
  } = useOrganizationForm();

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);


  interface FormData {
    schoolName: string;
    collegeName: string;
    departmentName: string;
    admissionYear: string;
  }
  
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    collegeName: '',
    departmentName: '',
    admissionYear: ''
  });

  // 년도 옵션 생성
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: `${currentYear - i}년`
  }));

  const handleSchoolSelect = (school: Organization) => {
    setSelectedSchoolId(school.id);
    setFormData(prev => ({ ...prev, schoolName: school.name, collegeName: '', departmentName: '' }));
    setSelectedCollegeId('');
    setSelectedDepartmentId(null);
  };
  
  const handleCollegeSelect = (college: Organization) => {
    setSelectedCollegeId(college.id);
    setFormData(prev => ({ ...prev, collegeName: college.name, departmentName: '' }));
    setSelectedDepartmentId(null);
  };
  
  const handleDepartmentSelect = (department: Organization) => {
    setSelectedDepartmentId(department.id);
    setFormData(prev => ({ ...prev, departmentName: department.name }));
  };
  
  

  const handleSubmit = () => {
    if (!formData.schoolName || !formData.collegeName || !formData.departmentName || !formData.admissionYear) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    console.log('제출 데이터:', {
      schoolId: selectedSchoolId,
      collegeId: selectedCollegeId,
      departmentId: selectedDepartmentId,
      ...formData,
      admissionYear: formData.admissionYear  // ✅ 이건 가능
    });
    
    alert('학과 정보가 입력되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 제목 */}
        <h1 className="text-5xl font-semibold text-black text-center mb-16">
          회원가입
        </h1>

        {/* 폼 영역 */}
        <div className="space-y-7">
          <div className="space-y-5">
            {/* 학교명 입력 */}
            <div className="space-y-3">
              <AutoCompleteInput
                placeholder="학교 이름을 입력하세요."
                value={formData.schoolName}
                onChange={(value) => setFormData(prev => ({ ...prev, schoolName: value }))}
                options={schools}
                onSelect={handleSchoolSelect}
              />
            </div>

            {/* 단과대학 입력 */}
            <AutoCompleteInput
              placeholder="단과대학 이름을 입력하세요."
              value={formData.collegeName}
              onChange={(value) => setFormData(prev => ({ ...prev, collegeName: value }))}
              options={colleges}
              onSelect={handleCollegeSelect}
              disabled={!selectedSchoolId}
            />

            {/* 학부/학과 입력 */}
            <AutoCompleteInput
              placeholder="학부/학과/전공 이름을 입력하세요."
              value={formData.departmentName}
              onChange={(value) => setFormData(prev => ({ ...prev, departmentName: value }))}
              options={departments}
              onSelect={handleDepartmentSelect}
              disabled={!selectedCollegeId}
            />

            {/* 입학년도 선택 */}
            <SelectDropdown
              placeholder="입학년도를 선택해주세요."
              value={formData.admissionYear}
              onChange={(value) => setFormData(prev => ({ ...prev, admissionYear: value }))}
              options={yearOptions}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              학과 정보 입력 완료하기
            </button>
          </div>
        </div>

        {/* 하단 텍스트 */}
        <div className="mt-12 text-center space-y-3">
          <div className="text-xl text-gray-600">
            * 본인의 학과가 없을 시, 학생회에 위캠{' '}
            <span className="font-bold text-blue-600">워크스페이스 개설</span>
            을 문의하세요!
          </div>
          
          <div className="text-base text-gray-500">
            이미 계정이 있으신가요?{' '}
            <button className="text-gray-600 underline hover:text-gray-800">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}