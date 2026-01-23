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
       <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-4">Kiểm Tra Email</h2>
       <p className="text-gray-500 mb-8 max-w-xs">Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra cả thư rác.</p>
       <div className="w-full flex flex-col gap-4">
           <Button onClick={() => navigate('/login')}>Quay lại đăng nhập</Button>
           <button className="flex items-center justify-center gap-2 text-primary text-sm font-medium" aria-label="Nút" title="Nút">
              <Icon name="refresh" className="text-lg" />
              Chưa nhận được email? Gửi lại
           </button>
       </div>
    </div>
  );
}
