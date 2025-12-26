import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Icon } from '../components/Components';
import { useApp } from '../App';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      // Simple mock validation
      if (email === 'admin@store.com' && password === 'admin') {
          showToast("Welcome Admin!");
          navigate('/admin');
      } else {
          showToast("Welcome back!");
          navigate('/');
      }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark p-6 justify-center">
      <div className="flex flex-col items-center text-center w-full mb-8">
         <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon name="storefront" className="text-[32px]" />
         </div>
         <h1 className="text-slate-900 dark:text-white text-[32px] font-bold leading-tight pb-3">Welcome Back!</h1>
         <p className="text-slate-500 dark:text-slate-400 text-base">Sign in to manage your mini store</p>
         <p className="text-xs text-gray-400 mt-2">(Try admin@store.com / admin)</p>
      </div>

      <form className="w-full space-y-5" onSubmit={handleLogin}>
         <label className="block">
            <span className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Email</span>
            <Input type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
         </label>
         <label className="block">
            <div className="flex justify-between mb-2">
                <span className="block text-sm font-medium text-slate-900 dark:text-white">Password</span>
                <span className="text-sm font-medium text-primary cursor-pointer" onClick={() => navigate('/forgot-password')}>Forgot Password?</span>
            </div>
            <Input type="password" placeholder="Enter your password" icon="lock" value={password} onChange={e => setPassword(e.target.value)} />
         </label>
         <Button type="submit" className="w-full mt-4">Log In</Button>
      </form>
      
      <div className="w-full my-8 flex items-center gap-4">
         <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
         <span className="text-xs font-medium text-gray-400 uppercase">Or continue with</span>
         <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" className="gap-2"><Icon name="g_mobiledata" className="text-xl" /> Google</Button>
          <Button variant="secondary" className="gap-2"><Icon name="apple" className="text-xl" /> Apple</Button>
      </div>

      <div className="mt-8 text-center">
         <p className="text-gray-500 text-sm">New to the shop? <span className="text-primary font-bold cursor-pointer" onClick={() => navigate('/signup')}>Create an account</span></p>
      </div>
    </div>
  );
}