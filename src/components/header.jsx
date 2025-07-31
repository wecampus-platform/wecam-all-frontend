'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Nav from './nav';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-20 py-4 h-16 min-h-[64px] bg-inherit shadow-none">
      <Link href="/">
        <img src="/logo-black.svg" alt="Logo" className="h-8 w-auto cursor-pointer" />
      </Link>

      {pathname === '/' && <Nav />}
    </header>
  );
}
