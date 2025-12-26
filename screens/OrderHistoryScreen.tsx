import React from 'react';
import { Header, Icon, BottomNav } from '../components/Components';
import { MOCK_ORDERS } from '../constants';

export default function OrderHistoryScreen() {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header title="Order History" />
      
      <div className="bg-white dark:bg-[#1a1929] pt-2 pb-4 px-4 shadow-sm z-10">
         <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            <button className="h-9 px-5 rounded-full bg-primary text-white text-sm font-medium shadow-sm shrink-0">All</button>
            {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                <button key={status} className="h-9 px-5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium shrink-0 border border-transparent">{status}</button>
            ))}
         </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {MOCK_ORDERS.length === 0 ? (
           <div className="flex flex-col items-center justify-center pt-20 text-center">
              <div className="bg-white dark:bg-[#1e1e2d] p-6 rounded-full shadow-lg mb-6"><Icon name="shopping_bag" className="text-5xl text-gray-300" /></div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">No orders yet</h3>
              <p className="text-gray-500">Start shopping to see your orders here.</p>
           </div>
        ) : (
           MOCK_ORDERS.map(order => (
             <div key={order.id} className="flex flex-col bg-white dark:bg-[#1a1929] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex flex-col">
                      <span className="text-primary font-semibold text-sm mb-0.5">#{order.id}</span>
                      <span className="text-gray-500 text-xs">{order.date}</span>
                   </div>
                   <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium 
                      ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                        order.status === 'Shipped' ? 'bg-purple-50 text-purple-700' : 'bg-red-50 text-red-700'}`}>
                      <Icon name={order.status === 'Processing' ? 'sync' : order.status === 'Cancelled' ? 'cancel' : order.status === 'Shipped' ? 'local_shipping' : 'check_circle'} className="text-[16px]" />
                      {order.status}
                   </div>
                </div>
                <div className="flex gap-4 items-center">
                   <div className="relative shrink-0">
                      <div className="bg-center bg-no-repeat bg-cover rounded-lg size-[64px] shadow-inner" style={{backgroundImage: `url(${order.image})`}}></div>
                      {order.items > 1 && <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">+{order.items - 1}</div>}
                   </div>
                   <div className="flex flex-1 flex-col justify-center">
                       <div className="flex items-center justify-between mt-1">
                          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{order.items} items</p>
                          <p className="text-slate-900 dark:text-white text-lg font-bold">${order.total.toFixed(2)}</p>
                       </div>
                   </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <button className="text-primary text-sm font-medium">Re-order</button>
                    <div className="flex items-center text-gray-400 text-sm font-medium">View Details <Icon name="chevron_right" className="text-[18px]" /></div>
                </div>
             </div>
           ))
        )}
      </main>
      <BottomNav activeTab="profile" /> 
    </div>
  );
}