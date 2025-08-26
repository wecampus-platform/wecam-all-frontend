'use client';

import SideBarPage from '@/components/side-bar';
import Header from '@/components/header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <SideBarPage />
                <main className="flex-1 bg-cream overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
