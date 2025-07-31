'use client';

import { useEffect, useState } from 'react';
import SideBarPage from '@/components/side-bar';


export default function AdminMainPage() {


    return (
        <div className="h-screen w-full flex">
            <SideBarPage />
            {/* 가장 오른쪽 공간 */}
        </div>
    )
}