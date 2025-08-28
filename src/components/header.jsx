'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Nav from './nav';

export default function Header() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 특정 경로에서만 헤더 표시
  if (pathname !== '/' && pathname !== '/login') {
    return null;
  }

  // 모바일 헤더
  if (isMobile) {
    return (
      <header className="relative">
        {/* 모바일 헤더 상단 */}
        <div className="flex items-center justify-between px-6 py-4 h-16 min-h-[64px] bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
          <Link href="/" className="group">
            <img 
              src="/logo-black.svg" 
              alt="Logo" 
              className="h-8 w-auto cursor-pointer transition-transform duration-200 group-hover:scale-105" 
            />
          </Link>

          {/* 햄버거 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex flex-col justify-center items-center w-10 h-10 cursor-pointer rounded-full hover:bg-gray-100 transition-all duration-200 group"
            aria-label="메뉴 열기/닫기"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'group-hover:bg-blue-500'}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out my-1 ${isMenuOpen ? 'opacity-0' : 'group-hover:bg-blue-500'}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'group-hover:bg-blue-500'}`}></span>
            
            {/* 햄버거 메뉴 호버 효과 */}
            {!isMenuOpen && (
              <div className="absolute inset-0 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            )}
          </button>
        </div>

        {/* 모바일 네비게이션 메뉴 */}
        <div className={`absolute top-16 left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl border-b border-gray-100 transition-all duration-500 ease-in-out z-50 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
          <Nav isMobile={true} onClose={() => setIsMenuOpen(false)} />
        </div>

        {/* 오버레이 */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
    );
  }

  // 데스크톱 헤더 (기존 코드)
  return (
    <header 
      className="flex items-center justify-between px-20 py-4 h-16 min-h-[64px] shadow-none header-transparent"
      style={{ backgroundColor: 'transparent' }}
    >
      <Link href="/">
        <img src="/logo-black.svg" alt="Logo" className="h-8 w-auto cursor-pointer" />
      </Link>

      <Nav />
    </header>
  );
}
