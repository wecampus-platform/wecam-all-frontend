'use client';

import { useState, useEffect } from 'react';
import SideBarPage from '@/components/side-bar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            const isSmallScreen = window.innerWidth < 1024; // lg 브레이크포인트
            setIsMobile(isSmallScreen);
            if (isSmallScreen) {
                setIsSidebarVisible(false);
                setIsMobileMenuOpen(false);
            } else {
                setIsSidebarVisible(true);
                setIsMobileMenuOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="h-screen relative">
            {/* 모바일 햄버거 버튼 */}
            {isMobile && (
                <button
                    onClick={toggleMobileMenu}
                    className="fixed top-4 left-2 z-50 flex flex-col justify-center items-center w-10 h-10 cursor-pointer rounded-lg hover:bg-gray-100 transition-all duration-200"
                    aria-label="메뉴 열기/닫기"
                >
                    <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out my-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            )}

            {/* 모바일 사이드바 오버레이 */}
            {isMobile && isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* 모바일 사이드바 */}
            {isMobile && (
                <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SideBarPage onToggleSidebar={() => setIsMobileMenuOpen(false)} isSidebarVisible={true} />
                </div>
            )}

            {/* 데스크톱 사이드바 */}
            {!isMobile && isSidebarVisible && (
                <div className="absolute left-0 top-0 h-full">
                    <SideBarPage onToggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                </div>
            )}
            
            {/* Main Content */}
            <main className={`h-full bg-cream overflow-auto transition-all duration-300 ${!isMobile && isSidebarVisible ? 'ml-[330px]' : 'ml-0'}`}>
                {/* 데스크톱 사이드바 토글 버튼 - 사이드바가 숨겨진 상태에서만 표시 */}
                {!isMobile && !isSidebarVisible && (
                    <button
                        onClick={toggleSidebar}
                        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 p-2 hover:bg-gray-100 rounded-lg transition-colors bg-white shadow-md"
                        aria-label="Show sidebar"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
                
                {children}
            </main>
        </div>
    );
}
