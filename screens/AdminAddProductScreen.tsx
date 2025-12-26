import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Input, Button } from '../components/Components';
import { useApp } from '../App';

export default function AdminAddProductScreen() {
  const navigate = useNavigate();
  const { addProduct } = useApp();

  const [formData, setFormData] = useState({
      name: '',
      price: '',
      stock: '',
      category: '',
      image: 'https://placehold.co/400x400/5048e5/ffffff?text=New+Product', // Default placeholder
      description: 'A newly added product.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
      if (!formData.name || !formData.price) {
          alert("Please fill in name and price");
          return;
      }
      
      addProduct({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0,
          category: formData.category || 'Uncategorized',
          image: formData.image,
          description: formData.description,
          originalPrice: parseFloat(formData.price) * 1.2 // Mock logic
      });
      navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
       <div className="bg-white dark:bg-[#121121] w-full max-w-md h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl">
          <div className="flex flex-col items-center pt-3 pb-2 border-b border-gray-100 dark:border-gray-800">
             <div className="h-1.5 w-10 rounded-full bg-gray-300 dark:bg-gray-700 mb-3"></div>
             <div className="w-full px-4 flex justify-between items-center">
                <div className="w-8"></div>
                <h4 className="font-bold text-lg dark:text-white">New Product</h4>
                <button onClick={() => navigate(-1)} className="size-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"><Icon name="close" /></button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 pb-24">
             <label className="block mb-2 text-sm font-medium dark:text-gray-200">Product Image</label>
             <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors mb-6">
                 <div className="h-14 w-14 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-primary"><Icon name="add_a_photo" className="text-2xl" /></div>
                 <p className="text-gray-400 text-sm font-medium">Tap to add image (using default)</p>
             </div>

             <div className="flex flex-col gap-4">
                 <label className="block">
                     <span className="text-sm font-medium mb-2 block dark:text-white">Product Name</span>
                     <Input name="name" placeholder="e.g., Summer T-Shirt" value={formData.name} onChange={handleChange} />
                 </label>
                 <div className="flex gap-4">
                    <label className="flex-1">
                        <span className="text-sm font-medium mb-2 block dark:text-white">Price</span>
                        <Input name="price" type="number" placeholder="0.00" icon="attach_money" value={formData.price} onChange={handleChange} />
                    </label>
                    <label className="flex-1">
                        <span className="text-sm font-medium mb-2 block dark:text-white">Stock</span>
                        <Input name="stock" type="number" placeholder="10" value={formData.stock} onChange={handleChange} />
                    </label>
                 </div>
                 <label className="block">
                     <span className="text-sm font-medium mb-2 block dark:text-white">Category</span>
                     <div className="relative">
                        <select name="category" value={formData.category} onChange={handleChange} className="form-select w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 px-4 appearance-none dark:text-white">
                            <option value="">Select category</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home">Home</option>
                            <option value="Beauty">Beauty</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"><Icon name="expand_more" /></div>
                     </div>
                 </label>
             </div>
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3 bg-white dark:bg-[#121121]">
             <Button onClick={handleSubmit} className="w-full gap-2"><Icon name="save" /> Save Product</Button>
             <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
       </div>
    </div>
  );
}