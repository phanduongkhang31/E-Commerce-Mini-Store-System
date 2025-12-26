import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav, Icon } from '../components/Components';
import { useApp } from '../App';

export default function AdminProductListScreen() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useApp();

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="flex items-center bg-white dark:bg-[#1a1a2e] px-4 py-3 justify-between sticky top-0 z-20 shadow-sm border-b border-gray-100 dark:border-gray-800">
         <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/admin')}><Icon name="arrow_back" className="text-2xl" /></div>
         <h2 className="text-lg font-bold flex-1 text-center">Products</h2>
         <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100"><Icon name="search" className="text-2xl" /></div>
      </div>
      
      <div className="p-4 bg-white dark:bg-[#1a1a2e]">
          <button onClick={() => navigate('/admin/add-product')} className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95">
             <Icon name="add" className="text-xl" /> Add New Product
          </button>
      </div>

      <div className="sticky top-[72px] z-10 bg-background-light dark:bg-background-dark pb-2 px-4 flex gap-3 overflow-x-auto no-scrollbar">
         <div className="h-9 px-5 rounded-full bg-slate-900 text-white text-sm font-medium flex items-center shrink-0">All</div>
         {['In Stock', 'Low Stock', 'Out of Stock'].map(f => (
            <div key={f} className="h-9 px-5 rounded-full bg-white dark:bg-[#252538] border border-gray-200 dark:border-gray-700 text-sm font-medium flex items-center shrink-0">{f}</div>
         ))}
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-24 gap-3 flex flex-col">
         {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
               <Icon name="inventory_2" className="text-6xl mb-2" />
               <p>No products yet</p>
            </div>
         ) : products.map(item => (
            <div key={item.id} className={`flex gap-4 bg-white dark:bg-[#1e1e2d] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 ${item.stock === 0 ? 'opacity-70' : ''}`}>
               <div className="size-[80px] shrink-0 rounded-lg bg-cover bg-center border border-gray-100 dark:border-gray-700 bg-gray-100" style={{backgroundImage: `url(${item.image})`}}></div>
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                     <p className="font-semibold text-base line-clamp-1 dark:text-white">{item.name}</p>
                     <p className="text-sm text-gray-500 font-medium mt-1">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-center">
                     <p className="text-base font-bold dark:text-white">${item.price.toFixed(2)}</p>
                     <span className={`px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${item.stock === 0 ? 'bg-gray-100 text-gray-600 ring-gray-500/10' : item.stock < 10 ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' : 'bg-green-50 text-green-700 ring-green-600/20'}`}>
                        {item.stock === 0 ? 'Out of Stock' : item.stock < 10 ? `Low Stock (${item.stock})` : `${item.stock} in stock`}
                     </span>
                  </div>
               </div>
               <div className="flex flex-col justify-between border-l border-gray-100 pl-3 ml-1">
                  <button className="p-1 hover:bg-gray-100 rounded text-slate-900 dark:text-white"><Icon name="edit" /></button>
                  <button 
                    onClick={() => {
                        if(window.confirm('Delete this product?')) {
                            deleteProduct(item.id);
                        }
                    }} 
                    className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                  >
                    <Icon name="delete" />
                  </button>
               </div>
            </div>
         ))}
      </main>
      <BottomNav activeTab="products" />
    </div>
  );
}