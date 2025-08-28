'use client';

import AdminLayout from '../layout';
import Link from 'next/link';

export default function AdminMainPage() {
    const adminPages = [
        {
            title: '관리자페이지 홈',
            description: '관리자 메인 페이지',
            path: '/admin/main'
        },
        {
            title: '할 일 관리',
            description: '할 일 목록 및 관리',
            path: '/admin/todo/main'
        },
        {
            title: '소속 인증 관리',
            description: '학생회 소속 인증 요청 처리',
            path: '/admin/council-affiliation'
        },
        {
            title: '회의록 작성 및 관리',
            description: '회의록 작성, 수정, 관리',
            path: '/admin/meeting/main'
        },
        {
            title: '구성원 관리',
            description: '학생회 구성원 관리 및 조직도',
            path: '/admin/member-manage'
        },
        {
            title: '초대코드 생성',
            description: '초대장 발송 및 관리',
            path: '/admin/invitation'
        },
        {
            title: '카테고리 관리',
            description: '카테고리 설정 및 관리',
            path: '/admin/category'
        },
        {
            title: '학생회 파일함',
            description: '파일 업로드 및 관리',
            path: '/admin/file'
        }
    ];

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">관리자 페이지</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminPages.map((page, index) => (
                        <Link 
                            key={index} 
                            href={page.path}
                            className="block"
                        >
                            <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                                <h3 className="font-medium text-gray-800 mb-2">{page.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {page.description}
                                </p>
                                <div className="text-xs text-blue-600 font-medium">
                                    이동하기 →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}