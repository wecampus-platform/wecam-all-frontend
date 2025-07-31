'use client';

import { useRouter } from 'next/navigation';
import RegisterForm2 from './registerform2';
import { registerUser } from '@/app/api-service/registerapi2';
import { useRegisterStore } from '@/app/store/registerStore';

export default function RegisterStep2Page() {
  const { registerInfo } = useRegisterStore();
  const { school, college, department, studentNumber } = registerInfo || {};
  const router = useRouter();

  const handleSubmit = async (form2Data) => {
    if (!school || !college || !department) {
      alert('소속 정보를 다시 선택해주세요.');
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
      router.push('/presidentregister/success');
    } catch (err) {
      alert('회원가입 중 문제가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="register-page">
      <RegisterForm2 onSubmit={handleSubmit} />
    </div>
  );
}
