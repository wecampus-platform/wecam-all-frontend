'use client';

import { useRouter,useSearchParams } from 'next/navigation';
import RegisterForm2 from './registerform2';
import { presidentRegisterUser } from '@/app/api-service/register2Api';
import { usePresidentRegisterStore } from '@/store/registerStore';

export default function RegisterStep2Page() {
  const { presidentRegisterInfo } = usePresidentRegisterStore();
  const { school, college, department, studentNumber,selschool,selcollege,seldepartment } = presidentRegisterInfo || {};
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleSubmit = async (form2Data) => {
    if (!school || !college || !department) {
      alert('소속 정보를 다시 선택해주세요.');
      return;
    }
    const selectOrganizationId =
    seldepartment ??
    selcollege ??
    null;

    const data = {
      ...form2Data,
      inputSchoolName: school,
      inputCollegeName: college,
      inputDepartmentName: department,
      selectSchoolId: Number(selschool),
      selectOrganizationId: Number(selectOrganizationId),
      enrollYear: studentNumber,
    };

    try {
      await presidentRegisterUser(data);
      router.push(`/register/president/success?redirect=${encodeURIComponent(redirect)}`);
    } catch (err) {
      alert('회원가입 중 문제가 발생했습니다.');
      console.error(err);
    }
  };

  console.log(school, college, department)

  return (
    <div className="register-page">
      <RegisterForm2 onSubmit={handleSubmit} />
    </div>
  );
}
