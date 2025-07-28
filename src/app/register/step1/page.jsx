'use client';

import RegisterForm from './registerform';
import { useRouter } from 'next/navigation';
import { useRegisterStore } from '@/app/store/registerStore'

function RegisterPage1() {
  //회원가입 정보 zustand에 저장 -> 다음 페이지 전달
  const setRegisterInfo = useRegisterStore((state) => state.setRegisterInfo);
  const router = useRouter();

  const handleFormSubmit = (data) => {
    setRegisterInfo(data);
    router.push('/register/step2');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-white p-8 rounded-lg">
        <RegisterForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default RegisterPage1;
