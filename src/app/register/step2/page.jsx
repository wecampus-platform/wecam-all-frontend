'use client';

import { useRouter } from 'next/navigation';
import RegisterForm2 from './registerform2';
import { registerUser } from './registerapi2';
import { useRegisterStore } from '@/stores/registerStore';

export default function RegisterStep2Page() {
  const { school, college, department } = useRegisterStore();
  const router = useRouter();

  const handleSubmit = async (form2Data) => {
    if (!school || !college || !department) {
      alert('소속 정보를 다시 선택해주세요.');
      return;
    }

    const data = {
      ...form2Data,
      schoolId: school.id,
      collegeId: college.id,
      departmentId: department.id,
    };

    try {
      await registerUser(data);
      alert('회원가입이 완료되었습니다!');
      router.push('/main');
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
