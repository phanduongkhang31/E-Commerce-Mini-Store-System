import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button } from '../components/Components';

export default function SignUpScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark">
      <Header title="Sign Up" />
      <div className="flex-1 overflow-y-auto p-6">
         <div className="text-center mb-6">
            <h1 className="text-slate-900 dark:text-white text-[32px] font-bold mb-2">Get Started</h1>
            <p className="text-gray-500">Create an account to start shopping.</p>
         </div>
         <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
            <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Full Name</span><Input placeholder="John Doe" /></label>
            <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Email</span><Input type="email" placeholder="john@example.com" /></label>
            <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Password</span><Input type="password" placeholder="Min 8 chars" /></label>
            <Button type="submit" className="mt-2">Create Account</Button>
         </form>
         <div className="mt-auto pt-6 text-center">
            <p className="text-gray-500">Already have an account? <span className="text-primary font-bold cursor-pointer" onClick={() => navigate('/login')}>Log In</span></p>
         </div>
      </div>
    </div>
  );
}