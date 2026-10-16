import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, Users, LogOut, Bell, Search } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-16 flex items-center px-6 text-white font-bold text-lg tracking-wider border-b border-slate-800">
            MERN ADMIN
          </div>
          <nav className="p-4 space-y-1">
            <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition">
              <Package size={20} /> Products
            </Link>
            <Link to="/categories" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition">
              <FolderTree size={20} /> Categories
            </Link>
            <Link to="/users" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition">
              <Users size={20} /> Users
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3 w-96 bg-slate-100 px-3 py-1.5 rounded-lg">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-slate-600 cursor-pointer" />
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
              <div className="w-9 h-9 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">A</div>
              <span className="text-sm font-medium text-slate-700">Admin User</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}