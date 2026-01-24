import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from '../components/Components';

const API_BASE_URL = 'http://localhost/api';

type LocationState = {
  email?: string;
};

export default function CheckMailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const [email, setEmail] = useState(state.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = async () => {
    setError('');
    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth_reset.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        setError(data?.error || 'Không thể đặt lại mật khẩu');
        return;
      }
      navigate('/login');
    } catch {
      setError('Không thể đặt lại mật khẩu, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark justify-center items-center p-6 text-center">
      <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center p-6 mb-8 ring-1 ring-black/5">
        <Icon name="mail" className="text-6xl text-primary" />
      </div>
      <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-2">Đặt lại mật khẩu</h2>
      <p className="text-gray-500 mb-6 max-w-xs">
        Nhập email và mật khẩu mới để hoàn tất.
      </p>
      <div className="w-full flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleReset} disabled={isSubmitting}>
          {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/login')}>Quay lại đăng nhập</Button>
      </div>
    </div>
  );
}
