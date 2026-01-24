import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav, Header, Icon , formatVnd } from "../components/Components";
import { useApp } from "../App";

export default function CategoriesScreen() {
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist, isLoading } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(unique)];
  }, [products]);

  const getCategoryLabel = (value: string) => {
    if (value === "All") return "Tất Cả";
    if (value === "Clothing") return "Thời trang";
    if (value === "Electronics") return "Điện tử";
    if (value === "Home") return "Nhà cửa";
    if (value === "Beauty") return "Làm đẹp";
    return value;
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesMinPrice = minPrice === "" || p.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || p.price <= Number(maxPrice);
    const matchesRating = Number(minRating) === 0 || p.rating >= Number(minRating);
    const matchesStock = !inStockOnly || p.stock > 0;
    return (
      matchesCategory &&
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating &&
      matchesStock
    );
  });

  const resetFilters = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("0");
    setInStockOnly(false);
    setQuery("");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <Header title="Danh Mục" />
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 pt-4">
          <div className="relative flex items-center w-full h-11 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <div className="flex items-center justify-center pl-3 pr-2 text-gray-500">
              <Icon name="search" className="text-[20px]" />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-full bg-transparent border-none text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-0 focus:outline-none"
              placeholder="Tìm kiếm sản phẩm..."
              aria-label="Tìm kiếm..."
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="pr-3 text-gray-500 hover:text-gray-700"
                aria-label="Hủy"
                title="Hủy"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            )}
          </div>
        </div>

        <section className="w-full overflow-hidden mt-4">
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const label = getCategoryLabel(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-sm font-medium shadow-sm transition-all active:scale-95 ${
                    isActive
                      ? "bg-primary text-white shadow-primary/25"
                      : "bg-white dark:bg-[#1e1e2d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300"
                  }`}
                  aria-label={label}
                  title={label}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="px-4 mt-4">
          <div className="bg-gray-50 dark:bg-[#24243e] rounded-xl border border-gray-100 dark:border-gray-800 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Bộ lọc</h3>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-primary hover:text-primary/80"
                aria-label="Đặt lại"
                title="Đặt lại"
              >
                Đặt lại
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Giá tối thiểu</label>
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  aria-label="Giá tối thiểu"
                  title="Giá tối thiểu"
                  className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Giá tối đa</label>
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="0"
                  aria-label="Giá tối đa"
                  title="Giá tối đa"
                  className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Đánh giá tối thiểu</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  aria-label="Đánh giá tối thiểu"
                  title="Đánh giá tối thiểu"
                  className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white"
                >
                  <option value="0">Bất kỳ</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="4.5">4.5+</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <input
                  id="inStockOnly"
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="inStockOnly" className="text-sm text-gray-700 dark:text-gray-300">
                  Chỉ còn hàng
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {selectedCategory === "All"
                ? "Sản Phẩm"
                : `${selectedCategory} Sản Phẩm`}
            </h2>
            <span className="text-xs text-gray-500">
              {filteredProducts.length} sản phẩm
            </span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 opacity-60">
              <Icon name="search_off" className="text-4xl mb-2" />
              <p>Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group flex flex-col bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer"
                >
                  <div className="aspect-square w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      title="Bỏ khỏi yêu thích"
                      aria-label="Bỏ khỏi yêu thích"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Icon
                        name="favorite"
                        className={`text-[18px] ${wishlist.includes(product.id) ? "text-red-500" : ""}`}
                        filled={wishlist.includes(product.id)}
                      />
                    </button>
                  </div>
                  <div className="p-3 flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Icon name="star" className="text-amber-400 text-[14px] fill" filled />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {product.rating || 0} đánh giá
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-auto pt-2 flex items-end justify-between">
                      <span className="text-base font-bold text-gray-900 dark:text-white">
                        {formatVnd(product.price)}
                      </span>
                      <button
                        type="button"
                        title="Thêm vào giỏ hàng"
                        aria-label="Thêm vào giỏ hàng"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white shadow-sm shadow-primary/30 hover:bg-primary/90 active:scale-90 transition-all"
                      >
                        <Icon name="add" className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <BottomNav activeTab="products" />
    </div>
  );
}
