'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { clientapi } from '@/lib/fetchClient';

export default function Nav() {
    const { accessToken, refreshToken, ready, clearAuth } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        if (!ready) return;

        try {
            if (refreshToken) {
                await clientapi('/auth/logout', {
                    method: 'POST',
                    body: JSON.stringify({ refreshToken }),
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        } catch (err) {
            console.error('[LogOut] 에러 발생:', err);
        } finally {
            clearAuth();
            router.push('/');
        }
    };

    return (
        <nav className="flex items-center h-8 gap-5">
            <div className="flex gap-5">
                <NavLink href="/">서비스 소개</NavLink>
                <NavLink href="/">기능</NavLink>
                <NavLink href="/">공지</NavLink>
                <NavLink href="/">사용법</NavLink>
            </div>

            <div className="flex gap-5 ml-auto">
                {accessToken ? (
                    <>
                        <NavLink href="/client/mypage">마이페이지</NavLink>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-[32px] hover:bg-point hover:text-white transition-colors duration-200"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink href="/login">로그인</NavLink>
                        <NavLink href="/register/student/step1">회원가입</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

function NavLink({ href, children }) {
    return (
        <Link
            href={href}
            className="px-4 py-2 rounded-[32px] hover:bg-point hover:text-white transition-colors duration-200"
        >
            {children}
        </Link>
    );
}
