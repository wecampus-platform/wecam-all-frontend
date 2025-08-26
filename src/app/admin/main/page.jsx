'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';

export default function AdminMainPage() {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">관리자 페이지 홈</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">할 일 관리</h3>
                        <p className="text-gray-600">학생회 할 일을 관리하고 진행 상황을 추적하세요.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">소속 인증 관리</h3>
                        <p className="text-gray-600">학생회 소속 인증 요청을 처리하세요.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">구성원 관리</h3>
                        <p className="text-gray-600">학생회 구성원을 관리하고 조직도를 확인하세요.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}