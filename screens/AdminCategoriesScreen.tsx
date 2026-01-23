import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminBottomNav, Icon } from "../components/Components";
import { useApp } from "../App";

export default function AdminCategoriesScreen() {
  const navigate = useNavigate();
  const { categories, products, addCategory, updateCategory, deleteCategory } = useApp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const productCount = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category.id] = products.filter((product) => product.category === category.name).length;
      return acc;
    }, {});
  }, [categories, products]);

  const handleAdd = () => {
    if (!name.trim()) return;
    addCategory({ name: name.trim(), description: description.trim() || undefined });
    setName("");
    setDescription("");
  };

  const startEdit = (id: string, currentName: string, currentDescription?: string) => {
    setEditingId(id);
    setEditingName(currentName);
    setEditingDescription(currentDescription || "");
  };

  const handleSaveEdit = () => {
    if (!editingId || !editingName.trim()) return;
    updateCategory(editingId, {
      name: editingName.trim(),
      description: editingDescription.trim() || undefined,
    });
    setEditingId(null);
  };

  const handleDelete = (id: string, categoryName: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${categoryName}" không?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="flex items-center bg-white dark:bg-[#1a1a2e] px-4 py-3 justify-between sticky top-0 z-30 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-900 dark:text-white"
          onClick={() => navigate("/admin")}
          aria-label="Quay lại"
          title="Quay lại"
        >
          <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center dark:text-white">
          Danh Sách Danh Mục
        </h2>
        <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
          <Icon name="more_vert" className="text-2xl" />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1a1a2e] sticky top-[60px] z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium mb-2 block dark:text-white">
              Tên Danh Mục
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên danh mục"
              className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm"
              aria-label="Tên Danh Mục"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-2 block dark:text-white">
              Mô Tả Danh Mục
            </span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả danh mục (tùy chọn)"
              className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm"
              aria-label="Mô Tả Danh Mục"
            />
          </label>
          <button
            onClick={handleAdd}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all active:scale-95 text-sm"
            aria-label="Thêm Danh Mục"
            title="Thêm Danh Mục"
          >
            <Icon name="add" className="text-xl" /> Thêm Danh Mục
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-24 gap-3 flex flex-col">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-3">
              <Icon name="inventory_2" className="text-4xl text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">Chưa có danh mục</p>
            <p className="text-sm text-gray-400 mt-1">Thêm danh mục để quản lý sản phẩm dễ hơn.</p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col gap-3 bg-white dark:bg-[#1e1e2d] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md"
            >
              {editingId === category.id ? (
                <div className="space-y-3">
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm"
                    aria-label="Tên Danh Mục"
                  />
                  <input
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm"
                    aria-label="Mô Tả Danh Mục"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 h-10 bg-primary text-white rounded-lg font-semibold"
                      aria-label="Lưu"
                      title="Lưu"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 h-10 border border-gray-200 dark:border-gray-700 rounded-lg font-semibold text-gray-600 dark:text-gray-300"
                      aria-label="Hủy"
                      title="Hủy"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-base dark:text-white">{category.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {category.description || "Chưa có mô tả"}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {productCount[category.id] || 0} sản phẩm
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(category.id, category.name, category.description)}
                      className="size-9 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                      aria-label="Chỉnh sửa"
                      title="Chỉnh sửa"
                    >
                      <Icon name="edit" className="text-[18px]" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id, category.name)}
                      className="size-9 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      aria-label="Xóa"
                      title="Xóa"
                    >
                      <Icon name="delete" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </main>

      <div className="bg-white dark:bg-[#1a1a2e] border-t border-gray-100 dark:border-gray-800">
        <AdminBottomNav activeTab="products" />
      </div>
    </div>
  );
}
