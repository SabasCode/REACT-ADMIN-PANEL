
import React, { useState, useEffect } from 'react';
import { Package, FolderTree, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getDashboardStats } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    salesData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full text-slate-500">Loading dashboard metrics...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>

      {/* Live Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Products</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalProducts}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Package size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Categories</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalCategories}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FolderTree size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalUsers}</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users size={24} /></div>
        </div>
      </div>

      {/* Dynamic API Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly Sales Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.salesData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Category Distribution Metrics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.salesData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React from 'react';
// import { Package, FolderTree, Users, TrendingUp } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// const data = [
//   { name: 'Jan', sales: 400 },
//   { name: 'Feb', sales: 300 },
//   { name: 'Mar', sales: 600 },
//   { name: 'Apr', sales: 800 },
//   { name: 'May', sales: 500 },
//   { name: 'Jun', sales: 900 },
// ];

// export default function Dashboard() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-slate-500 font-medium">Total Products</p>
//             <h3 className="text-2xl font-bold text-slate-800 mt-1">1,250</h3>
//           </div>
//           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Package size={24} /></div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-slate-500 font-medium">Total Categories</p>
//             <h3 className="text-2xl font-bold text-slate-800 mt-1">85</h3>
//           </div>
//           <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FolderTree size={24} /></div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-slate-500 font-medium">Total Users</p>
//             <h3 className="text-2xl font-bold text-slate-800 mt-1">5,300</h3>
//           </div>
//           <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users size={24} /></div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//           <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly Sales Trend</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data}>
//                 <XAxis dataKey="name" stroke="#94a3b8" />
//                 <YAxis stroke="#94a3b8" />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//           <h3 className="text-lg font-bold text-slate-800 mb-4">Category Distribution</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data}>
//                 <XAxis dataKey="name" stroke="#94a3b8" />
//                 <YAxis stroke="#94a3b8" />
//                 <Tooltip />
//                 <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }