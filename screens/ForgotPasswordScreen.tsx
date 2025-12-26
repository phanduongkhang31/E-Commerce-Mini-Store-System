import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button, Icon } from '../components/Components';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-1 flex flex-col px-6 pt-4">
         <div className="flex justify-center mb-8">
            <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                <Icon name="lock_reset" className="text-primary text-5xl" />
            </div>
         </div>
         <div className="text-center mb-8">
            <h1 className="text-slate-900 dark:text-white text-[32px] font-bold mb-3">Forgot Password?</h1>
            <p className="text-gray-500">Don't worry! It happens. Please enter the email associated with your account.</p>
         </div>
         <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); navigate('/check-mail'); }}>
            <label className="block"><span className="text-sm font-semibold text-slate-900 dark:text-white mb-2 block">Email Address</span><Input icon="mail" type="email" placeholder="Enter your email" /></label>
            <Button type="submit">Send Reset Link</Button>
         </form>
         <div className="mt-auto pb-8 text-center">
             <span className="text-gray-500 text-sm">Remember your password? </span>
             <span className="text-primary font-bold text-sm cursor-pointer" onClick={() => navigate('/login')}>Login</span>
         </div>
      </main>
    </div>
  );
}