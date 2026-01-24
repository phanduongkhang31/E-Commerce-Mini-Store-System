import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminBottomNav, Icon } from "../components/Components";
import { useApp } from "../App";

export default function AdminSettingsScreen() {
  const navigate = useNavigate();
  const { showToast, adminSettings, updateAdminSettings } = useApp();
  const [settings, setSettings] = useState(adminSettings);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSettings(adminSettings);
  }, [adminSettings]);

  const handleSave = () => {
    updateAdminSettings(settings);
    showToast("Đã lưu cài đặt");
    setTimeout(() => navigate(-1), 1000);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      setSettings((prev) => ({ ...prev, logo: result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-28">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between transition-colors duration-200">
        <button
          onClick={() => navigate(-1)}
          aria-label="Quay lại"
          title="Quay lại"
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-gray-900 dark:text-white"
        >
          <Icon name="arrow_back" className="text-[24px]" />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2 dark:text-white">
          Cài Đặt
        </h2>
        <div className="size-10"></div>
      </div>

      <div className="mx-auto w-full max-w-lg px-4 pt-6 space-y-6 overflow-y-auto no-scrollbar">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
            Thông Tin Cửa Hàng
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden p-5">
            <div className="flex flex-col items-center sm:flex-row gap-5 mb-6">
              <div className="relative group cursor-pointer">
                <img
                  src={settings.logo}
                  alt="Tên Cửa Hàng"
                  className="h-20 w-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 shadow-inner"
                />
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="edit" className="text-white text-sm" />
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start flex-1 text-center sm:text-left">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Tên Cửa Hàng
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Cập nhật giao diện cửa hàng
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30 px-3 py-1.5 rounded-lg transition-colors"
                  aria-label="Đổi Logo"
                  title="Đổi Logo"
                >
                  Đổi Logo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  aria-label="Đổi Logo"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5 block">
                  Tên Cửa Hàng
                </span>
                <input
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm"
                  type="text"
                  value={settings.storeName}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, storeName: e.target.value }))
                  }
                  aria-label="Tên Cửa Hàng"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5 block">
                  Email Hỗ Trợ
                </span>
                <input
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, supportEmail: e.target.value }))
                  }
                  aria-label="Email Hỗ Trợ"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
            Cấu Hình
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Icon name="payments" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  Tiền Tệ
                </span>
              </div>
              <select
                aria-label="Tiền Tệ"
                className="bg-transparent border-none text-right text-sm text-gray-500 dark:text-gray-400 focus:ring-0 cursor-pointer pr-8"
                value={settings.currency}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, currency: e.target.value }))
                }
              >
                <option>VND (?)</option>
                <option>EUR (EUR)</option>
                <option>GBP (GBP)</option>
                <option>JPY (JPY)</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Icon name="percent" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  Thuế
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  aria-label="Thuế"
                  className="w-16 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-right h-8 text-sm p-1"
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      taxRate: Number(e.target.value || 0),
                    }))
                  }
                />
                <span className="text-sm text-gray-500 dark:text-gray-500">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
            Thông Báo
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Icon name="notifications" className="text-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    Thông Báo Đẩy
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Cập nhật đơn hàng trên điện thoại
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.pushEnabled}
                  onChange={() =>
                    setSettings((prev) => ({ ...prev, pushEnabled: !prev.pushEnabled }))
                  }
                  aria-label="Thông Báo Đẩy"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <Icon name="mail" className="text-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    Thông Báo Email
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Tóm tắt hiệu suất tuần
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.emailEnabled}
                  onChange={() =>
                    setSettings((prev) => ({ ...prev, emailEnabled: !prev.emailEnabled }))
                  }
                  aria-label="Thông Báo Email"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">
            Nhóm & Bảo Mật
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
            <button
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
              aria-label="Quản lý phân quyền"
              title="Quản lý phân quyền"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                  <Icon name="group" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  Quản lý phân quyền
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-500">2 quản trị viên</span>
                <Icon
                  name="chevron_right"
                  className="text-gray-400 dark:text-gray-600 text-[20px] group-hover:text-primary transition-colors"
                />
              </div>
            </button>
            <button
              onClick={() => navigate("/change-password")}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
              aria-label="Đổi Mật Khẩu"
              title="Đổi Mật Khẩu"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <Icon name="lock" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  Đổi Mật Khẩu
                </span>
              </div>
              <Icon
                name="chevron_right"
                className="text-gray-400 dark:text-gray-600 text-[20px] group-hover:text-primary transition-colors"
              />
            </button>
          </div>
        </div>

        <div className="pt-4 pb-2">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 text-center text-red-600 dark:text-red-400 font-medium text-sm bg-red-50 dark:bg-red-900/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Đăng Xuất"
            title="Đăng Xuất"
          >
            Đăng Xuất
          </button>
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
            Phiên Bản
          </p>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            aria-label="Lưu Cài Đặt"
            title="Lưu Cài Đặt"
          >
            <span>Lưu Cài Đặt</span>
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1a1a2e] border-t border-gray-200 dark:border-gray-800">
        <AdminBottomNav activeTab="settings" />
      </div>
    </div>
  );
}
