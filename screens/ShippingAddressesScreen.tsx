import React, { useState } from "react";
import { Icon } from "../components/Components";
import { useLanguage } from "../LanguageContext";
import { useApp, type Address } from "../App";

export default function ShippingAddressesScreen() {
  const { t } = useLanguage();
  const {
    user,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useApp();

  const addresses = user?.addresses || [];

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t.shippingAddresses.deleteConfirm)) {
      deleteAddress(id);
    }
  };

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      district: address.district,
      ward: address.ward,
    });
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateAddress(editingId, formData);
      setEditingId(null);
    } else {
      addAddress({ ...formData, isDefault: addresses.length === 0 });
    }
    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const AddressCard = ({ address }: { address: Address }) => (
    <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {address.name}
            </h3>
            {address.isDefault && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {t.shippingAddresses.default}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {address.phone}
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1">
        <p>{address.address}</p>
        <p>
          {address.ward}, {address.district}, {address.city}
        </p>
      </div>

      <div className="flex gap-2">
        {!address.isDefault && (
          <button
            type="button"
            onClick={() => handleSetDefault(address.id)}
            className="flex-1 py-2 px-3 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-all"
          >
            {t.shippingAddresses.setAsDefault}
          </button>
        )}
        <button
          type="button"
          onClick={() => handleEdit(address)}
          className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#2a2a45] transition-all"
        >
          <Icon name="edit" className="text-[16px] inline mr-1" />
          {t.shippingAddresses.edit}
        </button>
        <button
          type="button"
          onClick={() => handleDelete(address.id)}
          className="py-2 px-3 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          title={t.shippingAddresses.delete}
          aria-label={t.shippingAddresses.delete}
        >
          <Icon name="delete" className="text-[16px]" />
        </button>
      </div>
    </div>
  );

  if (showAddForm) {
    return (
      <AddAddressForm
        onClose={() => {
          setShowAddForm(false);
          setEditingId(null);
          resetForm();
        }}
        onSave={handleSave}
        formData={formData}
        onChange={handleChange}
        isEditing={!!editingId}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="size-24 rounded-full bg-gray-100 dark:bg-[#24243e] flex items-center justify-center mb-4">
              <Icon name="location_on" className="text-[48px] text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t.shippingAddresses.noAddresses}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {t.shippingAddresses.noAddressesMessage}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-w-lg mx-auto">
            {addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>
        )}
      </main>

      {/* Add Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40">
        <div className="max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Icon name="add" className="text-[20px]" />
            {t.shippingAddresses.addNewAddress}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Address Form Component
interface AddAddressFormProps {
  onClose: () => void;
  onSave: () => void;
  formData: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  onChange: (field: string, value: string) => void;
  isEditing: boolean;
}

function AddAddressForm({
  onClose,
  onSave,
  formData,
  onChange,
  isEditing,
}: AddAddressFormProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a2e]">
        <button
          type="button"
          onClick={onClose}
          className="mr-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          aria-label="Back"
        >
          <Icon name="arrow_back" className="text-[24px]" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900 dark:text-white">
          {isEditing ? t.shippingAddresses.editAddress : t.shippingAddresses.addNewAddress}
        </h1>
      </div>

      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        <div className="space-y-4 max-w-lg mx-auto">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Họ và Tên
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Nhập họ và tên người nhận"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Số Điện Thoại
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="0123 456 789"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Địa Chỉ Cụ Thể
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => onChange("address", e.target.value)}
              placeholder="Số nhà, tên đường"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Ward, District, City */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Phường/Xã
              </label>
              <input
                type="text"
                value={formData.ward}
                onChange={(e) => onChange("ward", e.target.value)}
                placeholder="Phường 1"
                className="w-full px-3 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Quận/Huyện
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => onChange("district", e.target.value)}
                placeholder="Quận 1"
                className="w-full px-3 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Tỉnh/TP
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => onChange("city", e.target.value)}
                placeholder="TP.HCM"
                className="w-full px-3 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#24243e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-[#24243e] transition-all"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onSave}
            className="flex-1 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
          >
            {isEditing ? "Cập Nhật" : "Lưu Địa Chỉ"}
          </button>
        </div>
      </div>
    </div>
  );
}
