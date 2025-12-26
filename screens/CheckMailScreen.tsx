import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../components/Components';

export default function CheckMailScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark justify-center items-center p-6 text-center">
       <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center p-6 mb-8 ring-1 ring-black/5">
           <Icon name="mail" className="text-6xl text-primary" />
       </div>
       <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-4">Check your mail</h2>
       <p className="text-gray-500 mb-8 max-w-xs">We have sent password recover instructions to your email. Please check your spam folder.</p>
       <div className="w-full flex flex-col gap-4">
           <Button onClick={() => navigate('/login')}>Return to Login</Button>
           <button className="flex items-center justify-center gap-2 text-primary text-sm font-medium">
              <Icon name="refresh" className="text-lg" />
              Did not receive the email? Resend
           </button>
       </div>
    </div>
  );
}