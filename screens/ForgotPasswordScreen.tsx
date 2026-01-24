import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, Button, Icon } from '../components/Components';

const API_BASE_URL = 'http://localhost/api';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Vui lòng nhập email của bạn');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth_login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'dummy' }),
      });

      if (response.status === 401 || response.status === 200) {
        navigate('/check-mail', { state: { email } });
        return;
      }

      const payload = await response.json();
      if (payload?.error === 'Invalid credentials') {
        navigate('/check-mail', { state: { email } });
        return;
      }

      setError('Email không tồn tại trong hệ thống');
    } catch {
      setError('Không thể gửi yêu cầu, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-slate-900 dark:text-white text-[32px] font-bold mb-3">Quên mật khẩu?</h1>
          <p className="text-gray-500">
            Đừng lo! Vui lòng nhập email liên kết với tài khoản của bạn.
          </p>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-900 dark:text-white mb-2 block">Email</span>
            <Input
              icon="mail"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Đang gửi...' : 'Tiếp tục'}
          </Button>
        </form>
        <div className="mt-auto pb-8 text-center">
          <span className="text-gray-500 text-sm">Nhớ mật khẩu? </span>
          <span className="text-primary font-bold text-sm cursor-pointer" onClick={() => navigate('/login')}>
            Đăng nhập
          </span>
        </div>
      </main>
    </div>
  );
}
