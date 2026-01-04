import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Components";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 p-6 justify-center">
      {/* Logo & Title */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm text-white shadow-2xl">
          <Icon name="storefront" className="text-[48px]" />
        </div>
        <h1 className="text-white text-4xl font-bold leading-tight mb-3">
          MiniStore
        </h1>
        <p className="text-white/80 text-lg">
          Chào mừng đến với hệ thống quản lý
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="space-y-4 mb-8">
        {/* User Card */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg group-hover:scale-110 transition-transform">
              <Icon name="shopping_bag" className="text-3xl" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Khách Hàng
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mua sắm và đặt hàng trực tuyến
              </p>
            </div>
            <Icon
              name="arrow_forward"
              className="text-2xl text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
            />
          </div>
        </button>

        {/* Admin Card */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-transform">
              <Icon name="admin_panel_settings" className="text-3xl" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Quản Trị Viên
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quản lý sản phẩm và đơn hàng
              </p>
            </div>
            <Icon
              name="arrow_forward"
              className="text-2xl text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
            />
          </div>
        </button>
      </div>

      {/* Features */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h4 className="text-white font-semibold mb-4 text-center">
          Tính Năng Nổi Bật
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Icon name="verified" className="text-green-400 text-xl" filled />
            <span className="text-white/90 text-sm">Bảo mật cao</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="speed" className="text-yellow-400 text-xl" />
            <span className="text-white/90 text-sm">Nhanh chóng</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="support_agent" className="text-blue-400 text-xl" />
            <span className="text-white/90 text-sm">Hỗ trợ 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="payments" className="text-pink-400 text-xl" />
            <span className="text-white/90 text-sm">Đa dạng TT</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-white/60 text-xs">
          © 2024 MiniStore. All rights reserved.
        </p>
      </div>
    </div>
  );
}

