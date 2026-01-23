import React, { useState, useRef } from "react";
import { Icon } from "./Components";

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageUrl: string) => void;
  currentAvatar?: string;
}

export const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentAvatar,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentAvatar || null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      onSave(previewUrl);
      onClose();
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
  };

  const predefinedAvatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Chỉnh Sửa Ảnh Đại Diện
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Đóng"
            aria-label="Đóng modal"
          >
            <Icon name="close" className="text-2xl text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="size-32 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-lg border-4 border-white dark:border-gray-700">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      name="person"
                      className="text-6xl text-gray-400 dark:text-gray-600"
                    />
                  </div>
                )}
              </div>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all active:scale-95"
                  title="Xóa ảnh"
                  aria-label="Xóa ảnh đại diện"
                >
                  <Icon name="delete" className="text-lg" />
                </button>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-gray-300 dark:border-gray-700 hover:border-primary"
            }`}
          >
            <Icon
              name="cloud_upload"
              className="text-5xl text-gray-400 dark:text-gray-600 mx-auto mb-3"
            />
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Kéo thả ảnh vào đây
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              hoặc
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95"
             aria-label="Button" title="Button">
              Chọn Ảnh
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              aria-label="Chọn file ảnh đại diện"
              title="Chọn file ảnh"
            />
            <p className="text-xs text-gray-400 mt-3">
              PNG, JPG, GIF tối đa 5MB
            </p>
          </div>

          {/* Predefined Avatars */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Hoặc chọn avatar có sẵn
            </h3>
            <div className="grid grid-cols-6 gap-3">
              {predefinedAvatars.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPreviewUrl(avatar)}
                  className={`size-12 rounded-full overflow-hidden border-2 transition-all hover:scale-110 active:scale-95 ${
                    previewUrl === avatar
                      ? "border-primary shadow-lg"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                 aria-label="Button" title="Button">
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
           aria-label="Button" title="Button">
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!previewUrl}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              previewUrl
                ? "bg-primary text-white hover:bg-primary/90 active:scale-95"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
            }`}
           aria-label="Button" title="Button">
            Lưu Ảnh
          </button>
        </div>
      </div>
    </div>
  );
};
