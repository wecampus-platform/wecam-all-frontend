'use client';

import { useEffect, useRef, useState } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
  scrollbarWidth?: number;
  scrollbarColor?: string;
  scrollbarTrackColor?: string;
  scrollbarHoverColor?: string;
  forceUpdate?: boolean;
}

export default function CustomScrollbar({
  children,
  className = '',
  scrollbarWidth = 6,
  scrollbarColor = '#E2E8F0',
  scrollbarTrackColor = '#F1F5F9',
  scrollbarHoverColor = '#94A3B8',
  forceUpdate = false
}: CustomScrollbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollInfo = () => {
      setScrollTop(container.scrollTop);
      setScrollHeight(container.scrollHeight);
      setClientHeight(container.clientHeight);
      // 스크롤바 표시 여부를 더 정확하게 계산
      const shouldShowScrollbar = container.scrollHeight > container.clientHeight && container.scrollHeight > 0;
      setShowScrollbar(shouldShowScrollbar);
    };

    updateScrollInfo();
    container.addEventListener('scroll', updateScrollInfo);
    window.addEventListener('resize', updateScrollInfo);

    return () => {
      container.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, [forceUpdate]);

  const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const scrollbarHeight = rect.height;
    const scrollRatio = clickY / scrollbarHeight;
    const newScrollTop = scrollRatio * (scrollHeight - clientHeight);
    
    container.scrollTop = newScrollTop;
  };

  const scrollbarHeight = clientHeight > 0 ? (clientHeight / scrollHeight) * clientHeight : 0;
  
  // 스크롤바가 끝까지 들어가도록 조정
  const maxScrollTop = scrollHeight - clientHeight;
  const adjustedScrollbarTop = maxScrollTop > 0 
    ? Math.min((scrollTop / maxScrollTop) * (clientHeight - scrollbarHeight), clientHeight - scrollbarHeight)
    : 0;

  return (
    <div className={`relative ${className}`}>
      {/* 메인 컨테이너 */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {children}
      </div>

      {/* 커스텀 스크롤바 */}
      {showScrollbar && (
        <div
          className="absolute right-0 top-0 w-2 h-full pointer-events-none"
          style={{ width: scrollbarWidth }}
        >
          {/* 스크롤바 트랙 */}
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: scrollbarTrackColor }}
          />
          
          {/* 스크롤바 썸 */}
          <div
            className="absolute right-0 rounded-full transition-all duration-200 hover:opacity-80 cursor-pointer pointer-events-auto"
            style={{
              width: scrollbarWidth,
              height: Math.max(scrollbarHeight, 40),
              top: adjustedScrollbarTop,
              backgroundColor: scrollbarColor
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = scrollbarHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = scrollbarColor;
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const startY = e.clientY;
              const startScrollTop = scrollTop;
              
              const handleMouseMove = (moveEvent: MouseEvent) => {
                const deltaY = moveEvent.clientY - startY;
                const scrollDelta = (deltaY / clientHeight) * (scrollHeight - clientHeight);
                const newScrollTop = Math.max(0, Math.min(startScrollTop + scrollDelta, scrollHeight - clientHeight));
                
                if (containerRef.current) {
                  containerRef.current.scrollTop = newScrollTop;
                }
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
            onClick={handleScrollbarClick}
          />
        </div>
      )}

      {/* 스크롤바 숨김을 위한 CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
