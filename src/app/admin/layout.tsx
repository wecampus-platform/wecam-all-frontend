'use client';

import { useState, useEffect } from 'react';
import SideBarPage from '@/components/side-bar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            const isSmallScreen = window.innerWidth < 1024; // lg 브레이크포인트
            setIsMobile(isSmallScreen);
            if (isSmallScreen) {
                setIsSidebarVisible(false);
            } else {
                setIsSidebarVisible(true);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="h-screen relative">
            {/* Sidebar - 데스크톱에서만 표시하고 토글 가능 */}
            {!isMobile && isSidebarVisible && (
                <div className="absolute left-0 top-0 h-full">
                    <SideBarPage onToggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                </div>
            )}
            
            {/* Main Content */}
            <main className={`h-full bg-cream overflow-auto transition-all duration-300 ${!isMobile && isSidebarVisible ? 'ml-[330px]' : 'ml-0'}`}>
                {/* Sidebar Toggle Button - 사이드바가 숨겨진 상태에서만 표시 */}
                {!isMobile && !isSidebarVisible && (
                    <button
                        onClick={toggleSidebar}
                        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Show sidebar"
                    >
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
                
                {children}
            </main>
        </div>
    );
}
