import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button, Icon } from '../components/Components';

export default function ChangePasswordScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header title="Đổi Mật Khẩu" />
      <main className="flex-1 flex flex-col p-4 pb-32">
         <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6 flex gap-3">
             <Icon name="info" className="text-primary" />
             <p className="text-sm text-slate-900 dark:text-gray-200">Mật khẩu mới phải khác với mật khẩu đã dùng trước đó.</p>
         </div>
         <form className="flex flex-col gap-5">
            <label className="block"><span className="text-sm font-medium block mb-2 text-slate-900 dark:text-white">Mật khẩu hiện tại</span><Input type="password" placeholder="Nhập mật khẩu hiện tại" icon="visibility_off" /></label>
            <div className="flex justify-end -mt-3"><span className="text-primary text-xs font-medium">Quên mật khẩu?</span></div>
            
            <label className="block"><span className="text-sm font-medium block mb-2 text-slate-900 dark:text-white">Mật khẩu mới</span><Input type="password" placeholder="Ít nhất 8 ký tự" icon="visibility_off" /></label>
            
            <div className="bg-white dark:bg-[#1e1c2e] p-3 rounded-lg border border-gray-100 dark:border-gray-800">
               <div className="flex justify-between items-center mb-1"><p className="text-xs font-medium text-gray-500">Độ mạnh mật khẩu</p><p className="text-xs font-bold text-primary">Trung bình</p></div>
               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"><div className="bg-primary h-full rounded-full w-[60%]"></div></div>
            </div>

            <label className="block"><span className="text-sm font-medium block mb-2 text-slate-900 dark:text-white">Xác nhận mật khẩu mới</span><Input type="password" placeholder="Nhập lại mật khẩu mới" icon="visibility_off" /></label>
         </form>
      </main>
      <div className="fixed bottom-0 max-w-md w-full bg-white dark:bg-[#121121] border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
         <Button onClick={() => navigate('/change-password-success')} className="w-full mb-3">Lưu Thay Đổi</Button>
         <Button variant="ghost" className="w-full" onClick={() => navigate(-1)}>Hủy</Button>
      </div>
    </div>
  );
}
