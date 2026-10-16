import React, { useState, useEffect } from 'react';
import { Trash2, Shield } from 'lucide-react';
import { getUsers, deleteUser } from '../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">User Management</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                    {u.name.charAt(0)}
                  </div>
                  {u.name}
                </td>
                <td className="p-4 text-slate-500">{u.email}</td>
                <td className="p-4 flex items-center gap-1.5">
                  <Shield size={14} className={u.role === 'Admin' ? 'text-purple-600' : 'text-slate-400'} />
                  {u.role}
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {u.status || 'Active'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}