'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { publicapi } from '../../lib/fetchClient';
import { useAuthStore } from '../../stores/authStore';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [remember, setRemember] = useState(false);
    const accessToken = useAuthStore((state) => state.accessToken);

    useEffect(() => {
        if (accessToken) {
            router.replace('/mypage');
        }
    }, [accessToken]);

    const handleSubmit = async (e) => {
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
            });

            if (typeof window !== 'undefined') {
                localStorage.setItem('refreshToken', data.refreshToken);
            }

            router.push('/mypage');
        } catch (err) {
            console.error(err);
            setError('아이디 또는 비밀번호가 일치하지 않습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full relative bg-whitesmoke min-h-screen overflow-hidden text-center text-4xl text-darkslategray font-pretendard">
            <form
                onSubmit={handleSubmit}
                className="absolute top-[120px] left-1/2 -translate-x-1/2 shadow-[0px_0px_4px_rgba(44,_45,_47,_0.24)] rounded-[20px] border border-gray2 bg-white flex flex-col items-center justify-center py-24 px-[72px] gap-12 max-w-[500px]"
            >
                <h2 className="w-[376px] font-semibold">로그인</h2>
                <div className="w-[376px] flex flex-col items-center justify-start text-left text-base text-dimgray gap-10">
                    <div className="w-full flex flex-col gap-3">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray4">이메일</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일"
                                    autoComplete="email"
                                    className="w-full rounded-lg bg-white border border-gray2 p-4 focus:border-point focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2 text-gray4">
                                <label className="font-semibold">비밀번호</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호"
                                    autoComplete="current-password"
                                    className="w-full rounded-lg bg-white border border-gray2 p-4 focus:border-point focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between text-darkgray">
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="w-4 h-4 cursor-pointer border border-gray2 appearance-none checked:bg-transparent checked:before:content-['✔'] checked:before:text-point checked:before:text-xs checked:before:block checked:before:text-center"
                                />
                                <label className="select-none">자동로그인</label>
                            </div>
                            <div className="cursor-pointer gray8">비밀번호를 잊으셨나요?</div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 text-center text-white">
                        <div className="min-h-[24px] h-[24px] flex items-center justify-center">
                            <p className={`text-red-500 text-sm transition-none ${error ? 'opacity-100' : 'opacity-0'}`}>
                                {error || ''}
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className={`w-full rounded-lg py-4 font-semibold transition ${email && password && !loading
                                ? 'bg-point text-white cursor-pointer hover:bg-point/80'
                                : 'bg-gray2 text-white cursor-default'
                                }`}
                        >
                            로그인
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/register/step1')}
                            className="w-full rounded-lg bg-white border border-point py-4 font-semibold text-point cursor-pointer "
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
