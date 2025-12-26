import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button, Icon } from '../components/Components';
import { useApp } from '../App';

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { cart, placeOrder } = useApp();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + 5.00 + (subtotal * 0.05);

  const handleOrder = () => {
    // Construct order data
    const orderData = {
        total: total,
        items: cart.length,
        image: cart[0]?.image || ''
    };
    
    placeOrder(orderData);
    navigate('/success');
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header title="Checkout" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
           <p className="text-slate-900 dark:text-gray-200 text-sm font-medium">Step 2 of 3</p>
           <p className="text-gray-500 dark:text-gray-400 text-sm">Shipping & Payment</p>
        </div>
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-1.5 w-full overflow-hidden">
           <div className="h-full rounded-full bg-primary w-2/3"></div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-32">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1 mb-4">Shipping Details</h3>
        <div className="space-y-4">
           <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">Full Name</span><Input defaultValue="Jane Doe" /></label>
           <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">Address</span><Input defaultValue="123 Main St" /></label>
           <div className="flex gap-4">
              <label className="flex-1"><span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">City</span><Input defaultValue="New York" /></label>
              <label className="w-28"><span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">Zip</span><Input defaultValue="10001" /></label>
           </div>
        </div>

        <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1 mt-6 mb-4">Payment Method</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
           <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-gray-700 opacity-60">
              <Icon name="payments" className="text-3xl mb-1 text-gray-600 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Cash</span>
           </div>
           <div className="relative flex flex-col items-center justify-center p-3 rounded-xl border-2 border-primary bg-primary/5">
              <div className="absolute top-2 right-2 text-primary"><Icon name="check_circle" className="text-sm" filled /></div>
              <Icon name="credit_card" className="text-3xl mb-1 text-primary" />
              <span className="text-xs font-bold text-primary">Card</span>
           </div>
        </div>
        
        <div className="space-y-4 animate-fade-in">
             <div className="flex items-center gap-2 mb-1">
                <Icon name="lock" className="text-green-600 text-sm" />
                <p className="text-xs text-green-600 font-medium">Payments are secure and encrypted</p>
             </div>
             <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">Card Number</span><Input icon="credit_card" placeholder="0000 0000 0000 0000" /></label>
             <div className="flex gap-4">
                <label className="flex-1"><span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">Expiry</span><Input placeholder="MM/YY" /></label>
                <label className="flex-1"><span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">CVV</span><Input placeholder="123" /></label>
             </div>
        </div>

        <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1 mt-6 mb-2">Order Summary</h3>
        <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
             <div className="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 items-center">
                 <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover" style={{backgroundImage: `url(${cart[0]?.image})`}}></div>
                 <div className="flex-1">
                    <p className="text-slate-900 dark:text-white text-sm font-bold">{cart[0]?.name}</p>
                    <p className="text-gray-500 text-xs">Variant: Default</p>
                 </div>
                 <p className="text-slate-900 dark:text-white text-sm font-bold">${cart[0]?.price.toFixed(2)}</p>
             </div>
             <div className="p-4 flex flex-col gap-2 bg-gray-50 dark:bg-white/5">
                 <div className="flex justify-between items-center"><p className="text-gray-500 text-sm">Total</p><p className="text-primary text-lg font-bold">${total.toFixed(2)}</p></div>
             </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-100 dark:border-gray-800 p-4 pb-8 flex items-center gap-4">
          <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Total Price</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
          </div>
          <Button className="flex-1" onClick={handleOrder}>Place Order</Button>
      </div>
    </div>
  );
}