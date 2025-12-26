import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Icon = ({ name, className = "", filled = false }: { name: string; className?: string; filled?: boolean }) => (
  <span className={`material-symbols-outlined ${filled ? 'fill' : ''} ${className}`}>
    {name}
  </span>
);

export const BottomNav = ({ activeTab }: { activeTab: 'home' | 'products' | 'cart' | 'profile' }) => {
  const navigate = useNavigate();
  
  const NavItem = ({ icon, label, id, path }: { icon: string; label: string; id: string; path: string }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => navigate(path)}
        className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-primary'}`}
      >
        <Icon name={icon} className={`${isActive ? 'fill' : ''} text-[24px]`} filled={isActive} />
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a1929] border-t border-gray-100 dark:border-gray-800 px-6 py-2 pb-5 sm:pb-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <NavItem icon="home" label="Home" id="home" path="/" />
        <NavItem icon="grid_view" label="Categories" id="products" path="/admin/products" />
        <NavItem icon="shopping_bag" label="Cart" id="cart" path="/cart" />
        <NavItem icon="person" label="Profile" id="profile" path="/profile" />
      </div>
    </nav>
  );
};

export const AdminBottomNav = ({ activeTab }: { activeTab: 'dashboard' | 'products' | 'orders' | 'profile' }) => {
  const navigate = useNavigate();

  const NavItem = ({ icon, label, id, path }: { icon: string; label: string; id: string; path: string }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => navigate(path)}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
      >
        <Icon name={icon} className={`${isActive ? 'fill' : ''}`} />
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a1a2e] border-t border-gray-200 dark:border-gray-800 pb-safe z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
            <NavItem icon="dashboard" label="Home" id="dashboard" path="/admin" />
            <NavItem icon="inventory_2" label="Products" id="products" path="/admin/products" />
            
            <div className="relative -top-5">
                <button 
                  onClick={() => navigate('/admin/add-product')}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 w-14 flex items-center justify-center shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
                >
                    <Icon name="add" className="text-[28px]" />
                </button>
            </div>

            <NavItem icon="shopping_bag" label="Orders" id="orders" path="/admin/orders" />
            <NavItem icon="person" label="Profile" id="profile" path="/profile" />
        </div>
    </nav>
  );
};

export const Header = ({ title, showBack = true, rightAction }: { title?: string, showBack?: boolean, rightAction?: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-20 flex items-center bg-white/95 dark:bg-[#1a1929]/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-4">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Icon name="arrow_back_ios_new" />
          </button>
        )}
        {title && <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight">{title}</h2>}
      </div>
      <div>{rightAction}</div>
    </div>
  );
};

export const Button = ({ children, variant = 'primary', className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }) => {
  const baseStyle = "flex items-center justify-center rounded-xl h-12 px-6 font-bold text-base transition-all active:scale-[0.98]";
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90",
    secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
    ghost: "bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ icon, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon?: string }) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon name={icon} className="text-gray-400 text-[20px]" />
        </div>
      )}
      <input 
        className={`form-input flex w-full min-w-0 resize-none overflow-hidden rounded-xl text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-gray-400 ${icon ? 'pl-11' : 'pl-4'} pr-4 text-base font-normal leading-normal shadow-sm transition-all ${className}`}
        {...props} 
      />
    </div>
  );
};

export const Toast = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-slate-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-slate-900 px-4 py-3 rounded-full shadow-xl flex items-center gap-3 min-w-[200px] justify-center">
        <Icon name="check_circle" className="text-green-400 dark:text-green-600" filled />
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
};