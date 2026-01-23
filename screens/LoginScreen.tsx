import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Icon } from '../components/Components';
import { useApp } from '../App';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loginWithGoogle, showToast } = useApp();

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (email === 'admin@store.com' && password === 'admin') {
          login(email, 'admin');
          showToast("Chào mừng Admin!");
          navigate('/admin');
      } else {
          login(email, 'user');
          showToast("Chào mừng trở lại!");
          navigate('/');
      }
  };

  return (
    <div className="relative flex min-h-full flex-col justify-center bg-gradient-to-br from-amber-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6 py-12">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-600/10"></div>

      <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon name="storefront" className="text-[28px]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Chào mừng trở lại!</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Đăng nhập để quản lý cửa hàng của bạn</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Icon name="info" className="text-base" />
            <span>Dùng thử: admin@store.com / admin</span>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">Email</span>
            <Input type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <div className="mb-2 flex items-center justify-between">
              <span className="block text-sm font-medium text-slate-900 dark:text-white">Mật khẩu</span>
              <span className="text-sm font-semibold text-primary cursor-pointer" onClick={() => navigate('/forgot-password')}>Quên mật khẩu?</span>
            </div>
            <Input type="password" placeholder="Nhập mật khẩu của bạn" icon="lock" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <span className="text-xs text-slate-400">Bảo mật bởi ShopGuard</span>
          </div>
          <Button type="submit" className="w-full">Đăng nhập</Button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Hoặc tiếp tục với</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button variant="secondary" className="gap-2" onClick={handleGoogleLogin}><Icon name="g_mobiledata" className="text-xl" /> Google</Button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Mới đến cửa hàng? <span className="cursor-pointer font-bold text-primary" onClick={() => navigate('/signup')}>Tạo tài khoản</span></p>
        </div>
      </div>
    </div>
  );
}

