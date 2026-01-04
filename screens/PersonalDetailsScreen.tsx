import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Icon } from "../components/Components";
import { useLanguage } from "../LanguageContext";
import { useApp } from "../App";

export default function PersonalDetailsScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, updateUserDetails } = useApp();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.birthdate || "",
    gender: "female",
  });

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

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <Header title={t.personalDetails.title} showBack={true} />

      <main className="flex-1 overflow-y-auto pb-24 px-4">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center py-6">
          <div className="relative group">
            <div className="size-32 rounded-full bg-gray-200 border-4 border-white dark:border-[#24243e] overflow-hidden shadow-lg">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTSA5IIPJCMvXz2ZBs6__BlxZ51I1eE7ty9OMy5XI3ZpTNDWfw4WQKKt3NsY5ICLXQG2qJ65xQSs8_clDeU8o_drWYOKm7XaQAXoa45IMXd2oNvUXlBjEqgzCDL9n_BWkfXLbe40NcVW2sGWcVxvPmAmteN44OizpLAxHdd_TC14PROOMlllfoOfrocKkpQsgkrtcqG3BQT9gLO0oEDgC-Mj0TLG-tvZnCXcyqaI7bSg_vnoEUxUJzB9jSJ1IQjGDqnBamFMS_Efk"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all active:scale-95">
              <Icon name="photo_camera" className="text-[20px]" />
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {t.personalDetails.changePhoto}
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-4 max-w-lg mx-auto">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t.personalDetails.fullName}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="person" className="text-[20px]" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder={t.personalDetails.fullNamePlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t.personalDetails.email}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="mail" className="text-[20px]" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={t.personalDetails.emailPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t.personalDetails.phone}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="phone" className="text-[20px]" />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder={t.personalDetails.phonePlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t.personalDetails.dateOfBirth}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="cake" className="text-[20px]" />
              </div>
              <input
                type="text"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                placeholder={t.personalDetails.dateOfBirthPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t.personalDetails.gender}
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
                >
                  {t.personalDetails[gender as keyof typeof t.personalDetails]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-[#24243e] transition-all"
          >
            {t.personalDetails.cancel}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
          >
            {t.personalDetails.saveChanges}
          </button>
        </div>
      </div>
    </div>
  );
}
