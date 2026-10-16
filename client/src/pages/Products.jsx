import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { getProducts, createProduct, deleteProduct, getCategories } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const fetchData = async () => {
    try {
      const prodRes = await getProducts();
      setProducts(prodRes.data);
      const catRes = await getCategories();
      setCategories(catRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ name, sku, category, price, stock, description });
      setIsModalOpen(false);
      setName(''); setSku(''); setCategory(''); setPrice(''); setStock(''); setDescription('');
      fetchData();
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchData();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Product Management</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4">Product Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-900">{p.name}</td>
                <td className="p-4 text-slate-500">{p.sku}</td>
                <td className="p-4">{p.category?.name || 'N/A'}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Add New Product</h3>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" />
              <input type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" />
              <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600 bg-white">
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" />
                <input type="number" placeholder="Stock Quantity" value={stock} onChange={(e) => setStock(e.target.value)} required className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600" />
              </div>
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-emerald-600"></textarea>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}