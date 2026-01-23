import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Icon, Button } from '../components/Components';
import { useApp } from '../App';

export default function CartScreen() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Giỏ hàng" />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-indigo-50 dark:bg-gray-800">
                 <Icon name="shopping_cart_off" className="text-5xl text-primary/40 dark:text-primary/60" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Giỏ hàng trống!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[260px]">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
            <Button onClick={() => navigate('/')}>Mua sắm ngay</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header title="Giỏ hàng" />
      <main className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm">
               <img src={item.image} alt={item.name} className="aspect-square w-[80px] shrink-0 overflow-hidden rounded-lg bg-gray-100 object-cover" />
               <div className="flex flex-1 flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500" aria-label="Button" title="Button">
                           <Icon name="delete" className="text-[20px]" />
                        </button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
                 </div>
                 <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-slate-900 dark:text-white">${item.price.toFixed(2)}</p>
                    <div className="flex h-8 items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="flex size-6 items-center justify-center rounded-md bg-white dark:bg-gray-700 shadow-sm text-slate-600 dark:text-slate-200" aria-label="Button" title="Button">
                            <span className="text-lg font-medium">-</span>
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.id, 1)} className="flex size-6 items-center justify-center rounded-md bg-white dark:bg-gray-700 shadow-sm text-slate-600 dark:text-slate-200" aria-label="Button" title="Button">
                            <span className="text-lg font-medium">+</span>
                        </button>
                    </div>
                 </div>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-white dark:bg-[#1e1e2d] p-5 shadow-sm">
           <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Tóm tắt đơn hàng</h2>
           <div className="flex flex-col gap-3">
             <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Tổng tiền</span><span className="font-medium text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span></div>
             <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Vận chuyển</span><span className="font-medium text-slate-900 dark:text-white">${shipping.toFixed(2)}</span></div>
             <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">Thuế</span><span className="font-medium text-slate-900 dark:text-white">${tax.toFixed(2)}</span></div>
             <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
             <div className="flex justify-between"><span className="text-base font-bold text-slate-900 dark:text-white">Tổng</span><span className="text-xl font-bold text-primary">${total.toFixed(2)}</span></div>
           </div>
        </div>
      </main>
      
      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-100 dark:border-gray-800 p-4 pb-8">
        <Button onClick={() => navigate('/checkout')}>Tiến hành thanh toán</Button>
      </div>
    </div>
  );
}
