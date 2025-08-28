'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { clientapi } from '@/lib/fetchClient';

// SVG 아이콘 컴포넌트들
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4l-1.5-1.5L9 9H15a2 2 0 012 2z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function Nav({ isMobile = false, onClose }) {
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
            if (onClose) onClose();
        }
    };

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    // 모바일 네비게이션
    if (isMobile) {
        return (
            <nav className="py-8 px-6">
                {/* 메인 메뉴 섹션 */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                        메뉴
                    </h3>
                    <div className="space-y-2">
                        <MobileNavLink href="/" onClick={handleNavClick} icon={<HomeIcon />}>
                            서비스 소개
                        </MobileNavLink>
                        <MobileNavLink href="/" onClick={handleNavClick} icon={<LightningIcon />}>
                            기능
                        </MobileNavLink>
                        <MobileNavLink href="/" onClick={handleNavClick} icon={<BellIcon />}>
                            공지
                        </MobileNavLink>
                        <MobileNavLink href="/" onClick={handleNavClick} icon={<BookIcon />}>
                            사용법
                        </MobileNavLink>
                    </div>
                </div>

                {/* 계정 섹션 */}
                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                        계정
                    </h3>
                    <div className="space-y-2">
                        {accessToken ? (
                            <>
                                <MobileNavLink href="/client/mypage" onClick={handleNavClick} icon={<UserIcon />}>
                                    마이페이지
                                </MobileNavLink>
                                <button
                                    onClick={handleLogout}
                                    className="group w-full flex items-center px-4 py-3 text-left rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 text-base font-medium text-gray-700 hover:text-red-600"
                                >
                                    <span className="mr-3 text-red-500 group-hover:scale-110 transition-transform duration-200">
                                        <LogoutIcon />
                                    </span>
                                    로그아웃
                                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500">
                                        →
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <MobileNavLink href="/login" onClick={handleNavClick} icon={<KeyIcon />}>
                                    로그인
                                </MobileNavLink>
                                <MobileNavLink href="/register/student/step1" onClick={handleNavClick} icon={<SparklesIcon />}>
                                    회원가입
                                </MobileNavLink>
                            </>
                        )}
                    </div>
                </div>

                {/* 하단 정보 */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-xs text-gray-400 mb-2">WeCampus</p>
                        <p className="text-xs text-gray-300">편리한 대학 생활의 시작</p>
                    </div>
                </div>
            </nav>
        );
    }

    // 데스크톱 네비게이션 (기존 코드)
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

function MobileNavLink({ href, children, onClick, icon }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group flex items-center px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 text-base font-medium text-gray-700 hover:text-blue-600 hover:shadow-sm"
        >
            <span className="mr-3 text-blue-500 group-hover:scale-110 transition-transform duration-200">
                {icon}
            </span>
            {children}
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0 text-blue-500">
                →
            </span>
        </Link>
    );
}
