'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { publicapi } from '@/lib/fetchClient';
import { useAuthStore } from '@/store/authStore';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (accessToken) {
      router.replace(redirect);
    }
  }, [accessToken, redirect, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await publicapi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('로그인 응답 확인:', data);

      useAuthStore.getState().setAuth({
        accessToken: data.accessToken,
        email: data.email,
        role: data.role,
        auth: data.auth,
        councilList: data.councilList,
        refreshToken: data.refreshToken,
      });

      console.log("이거임,", redirect)
      router.push(redirect);
    } catch (err) {
      console.error(err);
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 모바일 뷰
  if (isMobile) {
    return (
      <div className="w-full bg-cream min-h-screen text-center text-2xl text-darkslategray font-pretendard px-4 py-8">
        {/* 모바일 헤더 */}
        <div className="flex flex-col items-center gap-4 mb-8 mt-30">
          <img src="/logo-black.svg" alt="Logo" className="h-10 w-auto cursor-pointer" />
        </div>

        {/* 모바일 로그인 폼 */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] mx-auto rounded-2xl bg-white flex flex-col items-center justify-center py-8 px-6 gap-6 border border-gray2/50 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm"
        >
          <div className="text-2xl font-semibold text-darkslategray mb-2">로그인</div>
          
          <div className="w-full flex flex-col items-center justify-start text-left text-base text-dimgray gap-6">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray4 text-sm">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  autoComplete="email"
                  className="w-full rounded-lg bg-white border border-gray2 p-3 focus:border-point focus:outline-none text-base"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray4 text-sm">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  className="w-full rounded-lg bg-white border border-gray2 p-3 focus:border-point focus:outline-none text-base"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="w-full text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRemember(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">로그인 상태 유지</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-point hover:underline">
                비밀번호 찾기
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-point text-white py-3 rounded-lg font-semibold hover:bg-point-dark transition-colors disabled:opacity-50 text-base"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray4">계정이 없으신가요? </span>
              <Link href="/register/student/step1" className="text-sm text-point hover:underline font-semibold">
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // 데스크톱 뷰 (기존 코드)
  return (
    <div className="w-full bg-cream relative min-h-screen overflow-hidden text-center text-4xl text-darkslategray font-pretendard">
      
      {/* 왼쪽 영역: 로고와 플랫폼 설명 */}
      <div className="absolute left-40 top-1/2 -translate-y-1/2 flex flex-col items-start gap-3">
        <div className="text-sm font-base text-gray2 text-left">
          학생회 통합 플랫폼
        </div>
        <img src="/logo-black.svg" alt="Logo" className="h-12 w-auto cursor-pointer" />
      </div>

      {/* 오른쪽 영역: 로그인 폼 */}
      <form
        onSubmit={handleSubmit}
        className="absolute right-50 top-1/2 -translate-y-1/2 rounded-[20px] bg-white flex flex-col items-center justify-center py-20 px-16 gap-8 max-w-[700px] border border-gray2/50 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm"
      >
        <div>
          
        </div>
        <div className="text-4xl font-semibold text-darkslategray mb-2">로그인</div>
        <div className="w-[376px] flex flex-col items-center justify-start text-left text-base text-dimgray gap-10">
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray4">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="이메일"
                  autoComplete="email"
                  className="w-full rounded-lg bg-white border border-gray2 p-4 focus:border-point focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray4">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  className="w-full rounded-lg bg-white border border-gray2 p-4 focus:border-point focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="w-full flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRemember(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">로그인 상태 유지</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-point hover:underline">
              비밀번호 찾기
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-point text-white py-4 rounded-lg font-semibold hover:bg-point-dark transition-colors disabled:opacity-50"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray4">계정이 없으신가요? </span>
            <Link href="/register/student/step1" className="text-point hover:underline font-semibold">
              회원가입
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}


