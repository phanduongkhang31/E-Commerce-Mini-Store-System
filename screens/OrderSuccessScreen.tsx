import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../components/Components';

export default function OrderSuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121121]">
       <div className="h-12"></div>
       <div className="flex w-full flex-col items-center pt-4 pb-2">
         <div className="h-1.5 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
       </div>

       <main className="flex-1 overflow-y-auto px-6 pb-24 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 mt-8">
             <Icon name="check" className="text-primary text-[48px] font-bold" />
          </div>
          <h1 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight mb-3">Order Placed Successfully</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base mb-8">Thank you for your purchase. A confirmation email has been sent to your inbox.</p>

          <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 mb-8 w-full text-left">
             <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700/50">
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-gray-400">
                        <Icon name="receipt_long" className="text-sm" />
                     </div>
                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Order Number</p>
                 </div>
                 <p className="text-slate-900 dark:text-white text-sm font-semibold">#ORD-9928</p>
             </div>
             <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700/50">
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-gray-400">
                        <Icon name="payments" className="text-sm" />
                     </div>
                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Amount</p>
                 </div>
                 <p className="text-slate-900 dark:text-white text-sm font-semibold">$45.00</p>
             </div>
          </div>
       </main>

       <div className="p-6 border-t border-gray-100 dark:border-gray-800">
           <Button className="w-full mb-3" onClick={() => navigate('/')}>Continue Shopping</Button>
           <Button variant="ghost" className="w-full" onClick={() => navigate('/order-history')}>Track Order</Button>
       </div>
    </div>
  );
}