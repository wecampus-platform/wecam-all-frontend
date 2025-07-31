'use client';

import RegisterForm from './registerform';
import { useRouter } from 'next/navigation';
import { usePresidentRegisterStore } from '@/store/registerStore'
import { useSearchParams } from 'next/navigation';


function RegisterPage1() {
  //회원가입 정보 zustand에 저장 -> 다음 페이지 전달
  const setPresidentRegisterInfo = usePresidentRegisterStore((state) => state.setPresidentRegisterInfo);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect'); // 예: /login?redirect=/workspace/make

  const handleFormSubmit = (data) => {
    setPresidentRegisterInfo(data);
    router.push(`/register/president/step2?redirect=${encodeURIComponent(redirect)}`);
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
