'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    width?: string;
}

export default function CustomDropdown({ options, value, onChange, placeholder, width = "w-56" }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(option => option.value === value);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    return (
        <div className={`relative ${width}`} ref={dropdownRef}>
            {/* 드롭다운 버튼과 메뉴를 감싸는 통합 컨테이너 */}
            <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 ${
                isOpen ? 'border-point shadow-lg' : 'hover:border-gray-300'
            }`}>
                {/* 드롭다운 버튼 */}
                <button
                    type="button"
                    className={`w-full px-3 py-2 bg-white text-left flex items-center justify-between transition-colors border-none ${
                        isOpen ? 'bg-white' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={`${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
                        {displayText}
                    </span>
                    <svg
                        className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* 드롭다운 메뉴 (오버레이지만 시각적으로 연결) */}
                {isOpen && (
                    <div 
                        className="absolute top-full left-0 right-0 bg-white border border-point rounded-b-lg shadow-lg z-50 max-h-48 overflow-y-auto"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#cbd5e1 #f1f5f9'
                        }}
                    >
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            width: 6px;
                        }
                        
                        div::-webkit-scrollbar-track {
                            background: #f1f5f9;
                            border-radius: 3px;
                        }
                        
                        div::-webkit-scrollbar-thumb {
                            background: #cbd5e1;
                            border-radius: 3px;
                        }
                        
                        div::-webkit-scrollbar-thumb:hover {
                            background: #94a3b8;
                        }
                    `}</style>
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            className={`px-3 py-2 cursor-pointer transition-colors ${
                                option.value === value
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'hover:bg-gray-50 text-gray-700'
                            } ${index === 0 ? 'rounded-t-lg' : ''} ${
                                index === options.length - 1 ? 'rounded-b-lg' : ''
                            }`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}
