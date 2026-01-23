import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminBottomNav, Icon } from "../components/Components";
import { useApp } from "../App";

export default function AdminProductListScreen() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useApp();

  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = useMemo(
    () => [
      { value: "All", label: "Tất Cả" },
      { value: "In Stock", label: "Còn Hàng" },
      { value: "Low Stock", label: "Sắp Hết" },
      { value: "Out of Stock", label: "Hết Hàng" },
    ],
    []
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    let matchesFilter = true;
    if (filterType === "In Stock") matchesFilter = product.stock >= 10;
    else if (filterType === "Low Stock")
      matchesFilter = product.stock > 0 && product.stock < 10;
    else if (filterType === "Out of Stock") matchesFilter = product.stock === 0;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (name: string, id: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${name}" không?`)) {
      deleteProduct(id);
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
          Danh Sách Sản Phẩm
        </h2>
        <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
          <Icon name="more_vert" className="text-2xl" />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1a1a2e] sticky top-[60px] z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="search" className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#252538] text-gray-900 dark:text-white text-sm rounded-lg pl-10 p-2.5 border-none focus:ring-2 focus:ring-primary/50"
            aria-label="Tìm kiếm..."
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Hủy"
              title="Hủy"
            >
              <Icon name="close" className="text-sm" />
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex-1 h-11 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all active:scale-95 text-sm"
            aria-label="Thêm Sản Phẩm Mới"
            title="Thêm Sản Phẩm Mới"
          >
            <Icon name="add" className="text-xl" /> Thêm Sản Phẩm Mới
          </button>
          <button
            onClick={() => navigate("/admin/categories")}
            className="h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
            aria-label="Danh Sách Danh Mục"
            title="Danh Sách Danh Mục"
          >
            <Icon name="category" className="text-lg" /> Danh Mục
          </button>
        </div>
      </div>

      <div className="bg-background-light dark:bg-background-dark py-3 px-4 flex gap-2 overflow-x-auto no-scrollbar">
        {filterOptions.map((filter) => {
          const isActive = filterType === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setFilterType(filter.value)}
              className={`h-8 px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                  : "bg-white dark:bg-[#252538] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              }`}
              aria-label={filter.label}
              title={filter.label}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-24 gap-3 flex flex-col">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-3">
              <Icon name="inventory_2" className="text-4xl text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">Chưa có sản phẩm</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-primary text-sm font-bold mt-2"
                aria-label="Hủy"
                title="Hủy"
              >
                Hủy
              </button>
            )}
          </div>
        ) : (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              className={`group flex gap-3 bg-white dark:bg-[#1e1e2d] p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md ${
                item.stock === 0 ? "opacity-75 grayscale-[0.5]" : ""
              }`}
            >
              <div className="size-[80px] shrink-0 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {item.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                      Hết Hàng
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm line-clamp-2 dark:text-white leading-tight mr-2">
                      {item.name}
                    </p>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => navigate(`/admin/edit-product/${item.id}`)}
                        className="size-8 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                        aria-label="Chỉnh sửa"
                        title="Chỉnh sửa"
                      >
                        <Icon name="edit" className="text-[18px]" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.name, item.id)}
                        className="size-8 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                        aria-label="Xóa"
                        title="Xóa"
                      >
                        <Icon name="delete" className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1">{item.category}</p>
                </div>

                <div className="flex justify-between items-end mt-2">
                  <p className="text-base font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </p>

                  <span
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${
                      item.stock === 0
                        ? "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        : item.stock < 10
                        ? "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:border-orange-900/30 dark:text-orange-400"
                        : "bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {item.stock === 0
                      ? "Hết Hàng"
                      : item.stock < 10
                      ? `Sắp Hết: ${item.stock}`
                      : `${item.stock} còn lại`}
                  </span>
                </div>
              </div>
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
