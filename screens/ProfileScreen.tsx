import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header, BottomNav, Icon } from "../components/Components";
import defaultAvatar from "../assets/avatar-default.svg";
import { useApp } from "../App";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const profileName = useMemo(() => user?.name || "Khách", [user?.name]);
  const profileEmail = useMemo(
    () => user?.email || "guest@example.com",
    [user?.email]
  );
  const profileAvatar = user?.avatar || defaultAvatar;
  const MenuItem = ({
    icon,
    label,
    path,
  }: {
    icon: string;
    label: string;
    path?: string;
  }) => {
    const content = (
      <>
        <div className="flex items-center gap-4">
          <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
            <Icon name={icon} className="text-2xl" />
          </div>
          <p className="text-slate-900 dark:text-white text-base font-medium flex-1">
            {label}
          </p>
        </div>
        <Icon name="chevron_right" className="text-gray-400" />
      </>
    );

    if (!path) {
      return (
        <div className="flex items-center gap-4 p-4 min-h-14 justify-between border-b border-gray-100 dark:border-gray-700 last:border-0">
          {content}
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => navigate(path)}
        className="flex items-center gap-4 p-4 min-h-14 justify-between w-full text-left hover:bg-gray-100 dark:hover:bg-[#2a2a45] transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
        aria-label={label}
        title={label}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <Header title="Hồ Sơ" showBack={false} />
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col items-center p-4 pb-8">
          <div className="size-28 rounded-full bg-gray-200 border-4 border-white dark:border-[#24243e] overflow-hidden shadow-md">
            <img
              src={profileAvatar}
              alt="?nh ??i di?n"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-[22px] font-bold text-slate-900 dark:text-white">
              {profileName}
            </p>
            <p className="text-gray-500">{profileEmail}</p>
          </div>
        </div>

        <div className="px-4 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pl-1">
              Tài Khoản
            </h3>
            <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <MenuItem
                icon="person"
                label="Thông Tin Cá Nhân"
                path="/personal-details"
              />
              <MenuItem
                icon="location_on"
                label="Địa Chỉ Giao Hàng"
                path="/shipping-addresses"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pl-1">
              Hoạt Động
            </h3>
            <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <MenuItem
                icon="shopping_bag"
                label="Lịch Sử Đơn Hàng"
                path="/order-history"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pl-1">
              Bảo Mật
            </h3>
            <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <MenuItem
                icon="lock"
                label="Đổi Mật Khẩu"
                path="/change-password"
              />
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-3 px-4 rounded-xl border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-100 flex items-center justify-center gap-2"
            aria-label="Đăng Xuất"
            title="Đăng Xuất"
          >
            <Icon name="logout" className="text-[20px]" /> Đăng Xuất
          </button>
          <p className="text-center text-xs text-gray-400 mt-4 pb-4">
            Phiên Bản 1.2.0 (Build 3405)
          </p>
        </div>
      </main>
      <BottomNav activeTab="profile" />
    </div>
  );
}
