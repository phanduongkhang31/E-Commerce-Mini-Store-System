import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Icon } from "../components/Components";
import { useApp } from "../App";
import defaultAvatar from "../assets/avatar-default.svg";

export default function PersonalDetailsScreen() {
  const navigate = useNavigate();
  const { user, updateUserDetails } = useApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.birthdate || "",
    gender: "female",
  });
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || defaultAvatar
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUserDetails({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      birthdate: formData.dateOfBirth,
    });
    setTimeout(() => navigate(-1), 500);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      setAvatarPreview(result);
      updateUserDetails({ avatar: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <Header title="Thông Tin Cá Nhân" showBack={true} />

      <main className="flex-1 overflow-y-auto pb-24 px-4">
        <div className="flex flex-col items-center py-6">
          <div className="relative group">
            <div className="size-32 rounded-full bg-gray-200 border-4 border-white dark:border-[#24243e] overflow-hidden shadow-lg">
              <img
                src={avatarPreview}
                alt="Ảnh Đại Diện"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all active:scale-95"
              aria-label="Đổi Ảnh"
              title="Đổi Ảnh"
            >
              <Icon name="photo_camera" className="text-[20px]" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              aria-label="Đổi Ảnh"
              title="Đổi Ảnh"
            />
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Đổi Ảnh</p>
        </div>

        <div className="space-y-4 max-w-lg mx-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Họ và Tên
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="person" className="text-[20px]" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Nhập họ và tên"
                aria-label="Họ và Tên"
                title="Họ và Tên"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="mail" className="text-[20px]" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="email@example.com"
                aria-label="Email"
                title="Email"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Số Điện Thoại
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="phone" className="text-[20px]" />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+84 xxx xxx xxx"
                aria-label="Số Điện Thoại"
                title="Số Điện Thoại"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ngày Sinh
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="cake" className="text-[20px]" />
              </div>
              <input
                type="text"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                placeholder="DD/MM/YYYY"
                aria-label="Ngày Sinh"
                title="Ngày Sinh"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Giới Tính
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["male", "female", "other"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => handleChange("gender", gender)}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    formData.gender === gender
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-700 dark:text-gray-300 hover:border-primary/50"
                  }`}
                  aria-label="Giới Tính"
                  title="Giới Tính"
                >
                  {gender === "male" ? "Nam" : gender === "female" ? "Nữ" : "Khác"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-[#24243e] transition-all"
            aria-label="Hủy"
            title="Hủy"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
            aria-label="Lưu Thay Đổi"
            title="Lưu Thay Đổi"
          >
            Lưu Thay Đổi
          </button>
        </div>
      </div>
    </div>
  );
}
