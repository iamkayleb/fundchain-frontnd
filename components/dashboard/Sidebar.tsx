import React from 'react';
import Link from 'next/link';
import { Home, Grid, PlusCircle, Bell, User, Users, CheckCircle, DollarSign, Settings, FileText, Shield } from 'lucide-react';

const sections: Record<string, Array<{ href: string; label: string; icon: React.ReactNode }>> = {
  student: [
    { href: '/dashboard/student', label: 'Dashboard', icon: <Home size={18} /> },
    { href: '/dashboard/student/campaigns', label: 'My Campaigns', icon: <Grid size={18} /> },
    { href: '/dashboard/student/create', label: 'Create Campaign', icon: <PlusCircle size={18} /> },
    { href: '/dashboard/student/notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { href: '/dashboard/student/profile', label: 'Profile', icon: <User size={18} /> },
  ],
  donor: [
    { href: '/dashboard/donor', label: 'Dashboard', icon: <Home size={18} /> },
    { href: '/campaigns', label: 'Explore', icon: <Grid size={18} /> },
    { href: '/dashboard/donor/contributions', label: 'My Contributions', icon: <Grid size={18} /> },
    { href: '/dashboard/donor/notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { href: '/dashboard/donor/profile', label: 'Profile', icon: <User size={18} /> },
  ],
  institution: [
    { href: '/dashboard/institution', label: 'Dashboard', icon: <Home size={18} /> },
    { href: '/dashboard/institution', label: 'Verification Queue', icon: <CheckCircle size={18} /> },
    { href: '/dashboard/institution', label: 'Student Management', icon: <Users size={18} /> },
    { href: '/dashboard/institution', label: 'Campaign Oversight', icon: <Grid size={18} /> },
    { href: '/dashboard/institution', label: 'Financial Reports', icon: <DollarSign size={18} /> },
    { href: '/dashboard/institution', label: 'Institution Profile', icon: <Shield size={18} /> },
  ],
  admin: [
    { href: '/dashboard/admin', label: 'Dashboard', icon: <Home size={18} /> },
    { href: '/dashboard/admin/verifications', label: 'Verifications', icon: <Grid size={18} /> },
    { href: '/dashboard/admin/campaigns', label: 'Campaigns', icon: <Grid size={18} /> },
    { href: '/dashboard/admin/ledger', label: 'Ledger', icon: <Bell size={18} /> },
    { href: '/dashboard/admin/settings', label: 'System', icon: <User size={18} /> },
  ],
};

export default function Sidebar({ role }: { role: string }) {
  const items = sections[role] || sections.donor;

  const accentMap: Record<string, string> = {
    student: 'text-cyan-400',
    donor: 'text-amber-400',
    institution: 'text-purple-400',
    admin: 'text-indigo-400',
  };

  const accent = accentMap[role] || 'text-cyan-400';

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900/60 backdrop-blur-lg border-r border-gray-700/60">
      <div className="p-6">
        <div className="text-white text-lg font-bold mb-6">FundChain</div>
        <nav className="space-y-2">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className={`flex items-center gap-3 p-2 rounded-md hover:bg-white/5`}>
              <div className={`${accent}`}>{it.icon}</div>
              <span className="text-sm text-gray-200">{it.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
