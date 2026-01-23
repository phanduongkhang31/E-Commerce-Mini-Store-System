import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon, Input, Button } from "../components/Components";
import { useApp } from "../App";

export default function AdminEditProductScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, updateProduct, categories } = useApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        image: product.image,
        description: product.description,
      });
    } else {
      navigate("/admin/products");
    }
  }, [id, products, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      setFormData((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert("Vui lòng nhập tên và giá");
      return;
    }

    if (id) {
      updateProduct(id, {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        category: formData.category,
        image: formData.image,
        description: formData.description,
      });
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#121121] w-full max-w-md h-[90vh] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl">
        <div className="flex flex-col items-center pt-3 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="h-1.5 w-10 rounded-full bg-gray-300 dark:bg-gray-700 mb-3"></div>
          <div className="w-full px-4 flex justify-between items-center">
            <div className="w-8"></div>
            <h4 className="font-bold text-lg dark:text-white">Chỉnh Sửa Sản Phẩm</h4>
            <button
              onClick={() => navigate(-1)}
              className="size-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
              aria-label="Hủy"
              title="Hủy"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          <div className="flex flex-col items-center mb-6">
            <div className="size-24 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden mb-2">
              <img
                src={formData.image}
                alt="Xem trước"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "https://placehold.co/400")}
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-primary text-sm font-bold hover:underline"
              aria-label="Chạm để thêm ảnh (dùng ảnh mặc định)"
              title="Chạm để thêm ảnh (dùng ảnh mặc định)"
            >
              Chạm để thêm ảnh (dùng ảnh mặc định)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="URL Hình Ảnh"
            />
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-2 text-xs"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="text-sm font-medium mb-2 block dark:text-white">
                Tên Sản Phẩm
              </span>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </label>
            <div className="flex gap-4">
              <label className="flex-1">
                <span className="text-sm font-medium mb-2 block dark:text-white">
                  Giá
                </span>
                <Input
                  name="price"
                  type="number"
                  icon="attach_money"
                  value={formData.price}
                  onChange={handleChange}
                />
              </label>
              <label className="flex-1">
                <span className="text-sm font-medium mb-2 block dark:text-white">
                  Tồn Kho
                </span>
                <Input name="stock" type="number" value={formData.stock} onChange={handleChange} />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium mb-2 block dark:text-white">
                Danh Mục
              </span>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-12 px-4 appearance-none dark:text-white"
                  aria-label="Danh Mục"
                >
                  {(categories.length > 0
                    ? categories
                    : [
                        { id: "clothing", name: "Clothing" },
                        { id: "electronics", name: "Electronics" },
                        { id: "home", name: "Home" },
                        { id: "beauty", name: "Beauty" },
                      ]
                  ).map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <Icon name="expand_more" />
                </div>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-2 block dark:text-white">
                Mô Tả
              </span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm dark:text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none h-32"
                aria-label="Mô Tả"
              ></textarea>
            </label>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3 bg-white dark:bg-[#121121]">
          <Button onClick={handleSubmit} className="w-full gap-2">
            <Icon name="save" /> Lưu Thay Đổi
          </Button>
        </div>
      </div>
    </div>
  );
}
