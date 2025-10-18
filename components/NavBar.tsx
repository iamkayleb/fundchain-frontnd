import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="w-full bg-white/80 p-3 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="text-lg font-semibold">FundChain</div>
        <div className="space-x-4">
          <Link href="/campaigns">Campaigns</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
