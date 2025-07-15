import { useState, useCallback } from 'react';
import { publicapi } from '@/lib/fetchClient';

export function useRegisterForm() {
  const [schoolInput, setSchoolInput] = useState('');
  const [schoolList, setSchoolList] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const [collegeInput, setCollegeInput] = useState('');
  const [collegeList, setCollegeList] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const [departmentInput, setDepartmentInput] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [studentNumberInput, setStudentNumberInput] = useState("");

  const [showSchoolList, setShowSchoolList] = useState(false);
  const [showCollegeList, setShowCollegeList] = useState(false);
  const [showDepartmentList, setShowDepartmentList] = useState(false);

  const fetchSchools = useCallback(async () => {
    if (schoolList.length === 0) {
      const res = await publicapi('/schools', '', { method: 'GET' });
      const data = await res.json();
      setSchoolList(data);
    }
    setShowSchoolList(true);
  }, [schoolList]);

  const fetchColleges = useCallback(async () => {
    if (selectedSchool) {
      const res = await publicapi(`/schools/${selectedSchool.id}/organizations?level=1`, '', { method: 'GET' });
      const data = await res.json();
      setCollegeList(data);
      setShowCollegeList(true);
    }
  }, [selectedSchool]);

  const fetchDepartments = useCallback(async () => {
    if (selectedCollege) {
      const res = await publicapi(`/organizations/${selectedCollege.id}/children?level=2`, '', { method: 'GET' });
      const data = await res.json();
      setDepartmentList(data);
      setShowDepartmentList(true);
    }
  }, [selectedCollege]);

  const isFormComplete = useCallback(() => {
    return (
      selectedSchool && schoolInput.trim() &&
      selectedCollege && collegeInput.trim() &&
      selectedDepartment && departmentInput.trim()
    );
  }, [selectedSchool, schoolInput, selectedCollege, collegeInput, selectedDepartment, departmentInput]);

  return {
    schoolInput, setSchoolInput, schoolList, selectedSchool, setSelectedSchool,
    collegeInput, setCollegeInput, collegeList, selectedCollege, setSelectedCollege,
    departmentInput, setDepartmentInput, departmentList, selectedDepartment, setSelectedDepartment,
    showSchoolList, setShowSchoolList, showCollegeList, setShowCollegeList, showDepartmentList, setShowDepartmentList,
    fetchSchools, fetchColleges, fetchDepartments,
    studentNumberInput, setStudentNumberInput,
    isFormComplete
  };
}
