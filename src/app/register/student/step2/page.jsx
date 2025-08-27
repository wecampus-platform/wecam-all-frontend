'use client';

import { useRouter } from 'next/navigation';
import RegisterForm2 from './registerform2';
import { registerUser } from '@/api-service/register2Api';
import { useRegisterStore } from '@/store/registerStore';

export default function RegisterStep2Page() {
  const { registerInfo } = useRegisterStore();
  const { school, college, department, studentNumber } = registerInfo || {};
  const router = useRouter();

  const handleSubmit = async (form2Data) => {
    if (!school || !college || !department) {
      console.error('소속 정보를 다시 선택해주세요.');
      return;
    }

    const data = {
      ...form2Data,
      selectSchoolId: Number(school.id),
      selectOrganizationId: Number(department.id),
      enrollYear: studentNumber,
    };

    try {
      console.log(data);
      await registerUser(data);
      router.push('/register/student/success');
    } catch (error) {
      console.error('회원가입 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="register-page">
      <RegisterForm2 onSubmit={handleSubmit} />
    </div>
  );
}
