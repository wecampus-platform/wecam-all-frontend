'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
    const ready = useAuthStore((state) => state.ready);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated || !ready) return null;

    return <>{children}</>;
}
