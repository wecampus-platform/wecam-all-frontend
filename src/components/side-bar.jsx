'use client';

import LeftIconBar from './sidebar/LeftIconBar';
import RightMenuBar from './sidebar/RightMenuBar';

export default function SideBarPage() {
    return (
        <div className="flex h-[calc(100vh-64px)]">
            <LeftIconBar />
            <RightMenuBar />
        </div>
    );
}
