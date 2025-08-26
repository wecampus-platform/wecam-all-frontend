'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/app/admin/AdminLayout';

export default function AdminMainPage() {
    return (
        <AdminLayout
            title="관리자 페이지 홈"
            mainContent={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-gray2 h-fit">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">할 일 관리</h3>
                        <p className="text-gray-600">학생회 할 일을 관리하고 진행 상황을 추적하세요.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray2 h-fit">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">소속 인증 관리</h3>
                        <p className="text-gray-600">학생회 소속 인증 요청을 처리하세요.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray2 h-fit">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">구성원 관리</h3>
                        <p className="text-gray-600">학생회 구성원을 관리하고 조직도를 확인하세요.</p>
                    </div>
                </div>
            }
        />
    );
}