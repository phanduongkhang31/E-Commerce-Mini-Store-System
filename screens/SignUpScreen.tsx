import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button } from '../components/Components';

export default function SignUpScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark">
      <Header title="Đăng ký" />
      <div className="flex-1 overflow-y-auto p-6">
         <div className="text-center mb-6">
            <h1 className="text-slate-900 dark:text-white text-[32px] font-bold mb-2">Bắt đầu</h1>
            <p className="text-gray-500">Tạo tài khoản để bắt đầu mua sắm.</p>
         </div>
         <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
            <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Họ tên</span><Input placeholder="Nguyễn Văn A" /></label>
            <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Email</span><Input type="email" placeholder="email@example.com" /></label>
            <label className="block"><span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">Mật khẩu</span><Input type="password" placeholder="Ít nhất 8 ký tự" /></label>
            <Button type="submit" className="mt-2">Tạo tài khoản</Button>
         </form>
         <div className="mt-auto pt-6 text-center">
            <p className="text-gray-500">Đã có tài khoản? <span className="text-primary font-bold cursor-pointer" onClick={() => navigate('/login')}>Đăng nhập</span></p>
         </div>
      </div>
    </div>
  );
}
