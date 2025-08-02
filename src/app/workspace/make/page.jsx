'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CustomDropdown from '@/components/dropdown';
import { WorkspaceInput } from '@/components/input';
import { fetchUserInfo, createWorkspaceRequest,fetchSchoolName } from '@/app/api-service/mypageApi';
import InputWithStyledList from '@/components/common/selectOrgAndInput/InputWithStyledList';
import { useRegisterForm } from '@/hooks/useRegisterForm';

export default function MakeWorkspacePage() {

  const {
    selectedDepartment,selectedCollege,setSelectedDepartment,showDepartmentList,departmentList,setShowDepartmentList,
    setSelectedCollege,showCollegeList,collegeList,setShowCollegeList,setSelectedSchool,fetchColleges, fetchDepartments
} = useRegisterForm();


  const router = useRouter();
  const [value, setValue] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  
  // 사용자 정보 관련 상태
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schoolName, setSchoolName] = useState('');
  const [schoolId, setSchoolId] = useState('');
  
  // 추가 필드들 상태
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [major, setMajor] = useState('');
  
  // 파일 업로드 관련 상태
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  
  // API 요청 상태
  const [isSubmitting, setIsSubmitting] = useState(false);


  // "입력용 상태"
  const [collegeInput, setCollegeInput] = useState('');
  const [departmentInput, setDepartmentInput] = useState('');
  const [majorInput, setMajorInput] = useState('');

  // 사용자 정보 가져오기
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const getSchoolName = async () => {
      try {
        const res = await fetchSchoolName(); // { school_name, select_school_id }
        setSchoolName(res.school_name);
        setSchoolId(res.select_school_id);
        console.log("선택학교Id:",res.select_school_id);
        if (res.select_school_id) {
          setSelectedSchool({ id: res.select_school_id, name: res.school_name });
        }
      } catch (error) {
        console.error('학교 정보 불러오기 실패:', error);
      }
    };
  
    getSchoolName();
  }, []);
  

  // 학생회 계층을 organizationType으로 매핑
  const getOrganizationType = (level) => {
    switch (level) {
      case '총학생회':
        return 'UNIVERSITY';
      case '단과대학 학생회':
        return 'COLLEGE';
      case '학부/학과 학생회':
        return 'DEPARTMENT';
      case '전공 학생회':
        return 'MAJOR';
      default:
        return 'UNIVERSITY';
    }
  };

  // 버튼 활성화 조건 체크
  const isFormValid = () => {
    if (isSubmitting) return false;
    if (!selectedLevel || uploadedFiles.length === 0) return false;
  
    const isCollegeFilled = college.trim() !== '' || selectedCollege !== null;
    const isDepartmentFilled = department.trim() !== '' || selectedDepartment !== null;
  
    switch (selectedLevel) {
      case '단과대학 학생회':
        return isCollegeFilled;
      case '학부/학과 학생회':
        return isCollegeFilled && isDepartmentFilled;
      case '전공 학생회':
        return isCollegeFilled && isDepartmentFilled && major.trim() !== '';
      case '총학생회':
        return true;
      default:
        return false;
    }
  };
  

  // 워크스페이스 생성 요청
  const handleWorkspaceCreate = async () => {
    if (!isFormValid()) return;

    try {
      setIsSubmitting(true);

      // request 객체 구성
      const requestData = {
        selectSchoolId: schoolId ?? null,
        selectCollegeOrganizationId: selectedCollege?.id ?? null,
        selectDepartmentOrganizationId: selectedDepartment?.id ?? null,
        inputSchoolName: schoolName?.trim() || null,
        inputCollegeName: college.trim() || null,
        inputDepartmentName: (major.trim() || department.trim()) || null,
        councilName: value.trim() || null,
        organizationType: getOrganizationType(selectedLevel) || null
      };
      

      console.log('워크스페이스 생성 요청 데이터:', requestData);
      console.log('업로드 파일들:', uploadedFiles);

      const result = await createWorkspaceRequest(requestData, uploadedFiles);
      
      console.log('워크스페이스 생성 요청 성공:', result);
      
      // 승인 요청 대상 설정하고 성공 페이지로 이동
      const target = selectedLevel === '총학생회' ? '위캠퍼스 관리자' : '상위 조직';
      router.push(`/workspace/make/success?target=${encodeURIComponent(target)}`);
      
    } catch (error) {
      console.error('워크스페이스 생성 요청 실패:', error);
      console.error('에러 상세:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      alert(`워크스페이스 생성 요청에 실패했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 파일 업로드 관련 함수들
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newFiles = files.map(file => ({
        id: Date.now() + Math.random(), // 임시 ID
        name: file.name,
        file: file
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
    // input 값 초기화 (같은 파일을 다시 선택할 수 있도록)
    event.target.value = '';
  };

  const handleFileRemove = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const renderInputWithLabel = (
    label,
    inputValue,
    setInputValue,
    selectedValue,
    setSelectedValue,
    list,
    onFocus,
    showList,
    setShowList,
    disabled = false
  ) => (
    <div className="flex flex-col mt-[12px]">
      <div className="self-stretch text-neutral-500 text-xs font-bold">{label}</div>
      <InputWithStyledList
        label={`${label}를 입력하세요.`}
        input={inputValue ? inputValue : selectedValue?.name }
        setInput={(val) => {
          setInputValue(val);
          setSelectedValue(null); // 입력 시 select 초기화
        }}
        list={list}
        onSelect={(item) => {
          setSelectedValue(item);
          setInputValue(''); // 선택 시 input 초기화
        }}
        onFocus={onFocus}
        showList={showList}
        setShowList={setShowList}
        disabled={disabled}
      />
    </div>
  );
  
  const renderExtraInputs = () => {
    if (selectedLevel === '단과대학 학생회') {
      return renderInputWithLabel(
        '단과대학',
        college, setCollege,
        selectedCollege, setSelectedCollege,
        collegeList, fetchColleges,
        showCollegeList, setShowCollegeList
      );
    }
  
    if (selectedLevel === '학부/학과 학생회') {
      return (
        <div className="flex flex-col">
          {renderInputWithLabel(
            '단과대학',
            college, setCollege,
            selectedCollege, setSelectedCollege,
            collegeList, fetchColleges,
            showCollegeList, setShowCollegeList
          )}
          {renderInputWithLabel(
            '학부/학과',
            department, setDepartment,
            selectedDepartment, setSelectedDepartment,
            departmentList, fetchDepartments,
            showDepartmentList, setShowDepartmentList,
            !college.trim() // disabled
          )}
        </div>
      );
    }
  
    if (selectedLevel === '전공 학생회') {
      return (
        <div className="flex flex-col">
          {renderInputWithLabel(
            '단과대학',
            college, setCollege,
            selectedCollege, setSelectedCollege,
            collegeList, fetchColleges,
            showCollegeList, setShowCollegeList
          )}
          {renderInputWithLabel(
            '학부/학과',
            department, setDepartment,
            selectedDepartment, setSelectedDepartment,
            departmentList, fetchDepartments,
            showDepartmentList, setShowDepartmentList,
            !college.trim()
          )}
          <div className="flex flex-col mt-[12px]">
            <div className="self-stretch text-neutral-500 text-xs font-bold">전공</div>
            <WorkspaceInput
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="전공명을 입력해주세요"
            />
          </div>
        </div>
      );
    }
  
    return null;
  };

  
  return (
    <div className="bg-[#F5F7FA] flex flex-col items-center w-full h-screen">
      <div className="mt-[160px]">
        <div className="mb-[28px] text-center text-zinc-800 text-4xl font-semibold">워크스페이스 생성하기</div>

        <div className="mb-[8px] text-neutral-500 text-xs font-bold">학생회 계층 선택</div>
        <CustomDropdown onSelect={(val) => setSelectedLevel(val)} />

        <div className="mt-[32px] text-neutral-500 text-xs font-bold">대학교</div>
        <div className="mt-[8px] w-[656px] h-11 px-4 py-3 bg-white rounded-xl outline outline-1 outline-blue-500 flex items-center text-zinc-600 text-base font-medium">
          {loading 
            ? '로딩 중...' 
              : schoolName || '학교 정보 없음'
          }
        </div>

        {/* 조건부 추가 필드 */}
        {renderExtraInputs()}

        <div className="mt-[32px] mb-[8px] text-neutral-500 text-xs font-bold">학생회 이름</div>
        <WorkspaceInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="학생회 이름이 워크스페이스 이름으로 지정됩니다."
        />

        <div className="mt-[32px] mb-[8px] text-neutral-500 text-xs font-bold">증빙자료 업로드(대표자 재학증명서 첨부 필수)</div>
        <div className="flex flex-col gap-2">
          <div className="flex space-x-[8px]">
            <div className="w-[551px] h-11 px-4 py-3 bg-white rounded-xl outline outline-1 outline-zinc-300 flex items-center text-zinc-400 text-base font-normal">
              승인자에게 해당 학생회 대표자임을 증명할 수 있는 자료를 업로드해주세요.
            </div>
            <button
              type="button"
              onClick={handleFileUploadClick}
              className="h-11 p-3 bg-white rounded outline outline-1 outline-blue-500 flex justify-center items-center hover:bg-blue-50 transition-colors"
            >
              <div className="text-blue-500 text-base font-normal">파일 업로드</div>
            </button>
          </div>
          
          {/* 업로드된 파일들 표시 */}
          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="px-3 py-2 bg-white rounded-[32px] outline outline-1 outline-blue-500 flex justify-center items-center gap-1">
                  <div className="text-blue-500 text-xs font-normal truncate max-w-[200px]">{file.name}</div>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(file.id)}
                    className="w-3 h-3 flex items-center justify-center hover:bg-red-100 rounded-full transition-colors"
                  >
                    <span className="text-zinc-600 text-xs leading-none font-bold">×</span>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* 숨겨진 파일 input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
          />
        </div>

      </div>
        
        {/* 워크스페이스 생성 버튼 */}
        <button
          type="button"
          disabled={!isFormValid()}
          className={`
            mt-[52px] w-96 py-4 rounded-lg flex justify-center items-center transition-all duration-200
            ${isFormValid() 
              ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' 
              : 'bg-zinc-400 cursor-not-allowed'
            }
          `}
          onClick={handleWorkspaceCreate}
        >
          <div className="text-white text-base font-semibold text-center">
            {isSubmitting ? '요청 중...' : '워크스페이스 생성 승인 요청하기'}
          </div>
        </button>
        
    </div>
  );
}
