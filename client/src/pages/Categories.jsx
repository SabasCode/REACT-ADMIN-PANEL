import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FolderTree } from 'lucide-react';
import { getCategories, createCategory, deleteCategory } from '../services/api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name, description });
      setIsModalOpen(false);
      setName('');
      setDescription('');
      fetchCategories();
    } catch (err) {
      console.error('Error creating category:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        console.error('Error deleting category:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Category Management</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4">Category Name</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {categories.map((c) => (
              <tr key={c._id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                  <FolderTree size={16} className="text-blue-500" /> {c.name}
                </td>
                <td className="p-4 text-slate-500">{c.description}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Add New Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600"></textarea>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}