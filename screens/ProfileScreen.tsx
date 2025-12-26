import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, BottomNav, Icon } from '../components/Components';

export default function ProfileScreen() {
  const navigate = useNavigate();

  const MenuItem = ({ icon, label, path }: { icon: string, label: string, path?: string }) => (
    <div onClick={() => path && navigate(path)} className="flex items-center gap-4 p-4 min-h-14 justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2a2a45] transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
        <div className="flex items-center gap-4">
            <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                <Icon name={icon} className="text-2xl" />
            </div>
            <p className="text-slate-900 dark:text-white text-base font-medium flex-1">{label}</p>
        </div>
        <Icon name="chevron_right" className="text-gray-400" />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
       <Header title="Profile" showBack={false} />
       <main className="flex-1 overflow-y-auto pb-24">
          <div className="flex flex-col items-center p-4 pb-8">
             <div className="relative group">
                 <div className="size-32 rounded-full bg-gray-200 border-4 border-white dark:border-[#24243e] overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTSA5IIPJCMvXz2ZBs6__BlxZ51I1eE7ty9OMy5XI3ZpTNDWfw4WQKKt3NsY5ICLXQG2qJ65xQSs8_clDeU8o_drWYOKm7XaQAXoa45IMXd2oNvUXlBjEqgzCDL9n_BWkfXLbe40NcVW2sGWcVxvPmAmteN44OizpLAxHdd_TC14PROOMlllfoOfrocKkpQsgkrtcqG3BQT9gLO0oEDgC-Mj0TLG-tvZnCXcyqaI7bSg_vnoEUxUJzB9jSJ1IQjGDqnBamFMS_Efk" alt="Profile" className="w-full h-full object-cover" />
                 </div>
                 <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg">
                    <Icon name="edit" className="text-[20px]" />
                 </button>
             </div>
             <div className="mt-4 text-center">
                <p className="text-[22px] font-bold text-slate-900 dark:text-white">Sarah Jenkins</p>
                <p className="text-gray-500">sarah.j@example.com</p>
             </div>
          </div>

          <div className="px-4 space-y-6">
              <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pl-1">Account</h3>
                  <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                      <MenuItem icon="person" label="Personal Details" />
                      <MenuItem icon="location_on" label="Shipping Addresses" />
                  </div>
              </div>
              <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pl-1">Activity</h3>
                  <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                      <MenuItem icon="shopping_bag" label="Order History" path="/order-history" />
                  </div>
              </div>
              <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pl-1">Security</h3>
                  <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                      <MenuItem icon="lock" label="Change Password" path="/change-password" />
                  </div>
              </div>

              <button onClick={() => navigate('/login')} className="w-full py-3 px-4 rounded-xl border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-100 flex items-center justify-center gap-2">
                 <Icon name="logout" className="text-[20px]" /> Log Out
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 pb-4">Version 1.0.2</p>
          </div>
       </main>
       <BottomNav activeTab="profile" />
    </div>
  );
}