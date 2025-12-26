import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../components/Components';
import ProfileScreen from './ProfileScreen';

export default function ChangePasswordSuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full w-full">
       {/* Background (Profile Screen) */}
       <div className="absolute inset-0 opacity-20 pointer-events-none filter blur-sm">
          <ProfileScreen />
       </div>
       
       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
           <div className="bg-white dark:bg-[#1e1c2e] rounded-2xl shadow-2xl w-full max-w-[340px] p-8 flex flex-col items-center text-center">
               <div className="mb-5 size-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="check_circle" className="text-[40px] text-primary" />
               </div>
               <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Password Updated</h2>
               <p className="text-sm text-gray-500 mb-8">Your new password has been saved. You can now use it to access your store dashboard.</p>
               <Button className="w-full" onClick={() => navigate('/login')}>Back to Login</Button>
               <button className="mt-4 text-sm text-gray-400 font-medium hover:text-primary" onClick={() => navigate('/profile')}>Dismiss</button>
           </div>
       </div>
    </div>
  );
}