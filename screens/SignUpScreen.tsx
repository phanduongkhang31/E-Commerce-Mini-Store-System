import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button } from '../components/Components';
import { useApp } from '../App';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { registerUser } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await registerUser(fullName, email, password);
    if (ok) navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark">
      <Header title="Đăng ký" />
      <div className="flex-1 overflow-y-auto p-6">
         <div className="text-center mb-6">
            <h1 className="text-slate-900 dark:text-white text-[32px] font-bold mb-2">Bắt đầu</h1>
            <p className="text-gray-500">Tạo tài khoản để bắt đầu mua sắm.</p>
         </div>
         <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Họ tên</span>
              <Input placeholder="Nguyễn Văn A" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Email</span>
              <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Mật khẩu</span>
              <Input type="password" placeholder="Ít nhất 6 ký tự" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <Button type="submit" className="mt-2">Tạo tài khoản</Button>
         </form>
         <div className="mt-auto pt-6 text-center">
            <p className="text-gray-500">Đã có tài khoản? <span className="text-primary font-bold cursor-pointer" onClick={() => navigate('/login')}>Đăng nhập</span></p>
         </div>
      </div>
    </div>
  );
}
