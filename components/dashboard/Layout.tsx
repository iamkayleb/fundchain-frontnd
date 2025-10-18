import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC<{ role: string; children: React.ReactNode }> = ({ role, children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      <Sidebar role={role} />
      <div className="pl-64">{/* sidebar width */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
