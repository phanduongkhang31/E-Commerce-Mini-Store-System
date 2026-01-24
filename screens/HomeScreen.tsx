import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav, Icon } from "../components/Components";
import { useApp } from "../App";

export default function HomeScreen() {
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    products,
    categories,
    isLoading,
    searchQuery,
    setSearchQuery,
    wishlist,
    toggleWishlist,
  } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cartCount = cart.reduce((total: number, item: any) => {
    const qty = typeof item?.quantity === "number" ? item.quantity : 1;
    return total + qty;
  }, 0);

  const categoryOptions = useMemo(() => {
    const base = [{ value: "All", label: "Tất cả" }];
    if (categories.length === 0) {
      return base.concat([
        { value: "Thời trang", label: "Thời trang" },
        { value: "Điện tử", label: "Điện tử" },
        { value: "Nhà cửa", label: "Nhà cửa" },
      ]);
    }
    return base.concat(
      categories.map((category) => ({
        value: category.name,
        label: category.name,
      }))
    );
  }, [categories]);

  const formatVnd = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSeeAll = () => {
    navigate("/categories");
  };

  return (
    <div className="pb-20">
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#121121]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary">
              <Icon name="storefront" className="text-[20px]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-text-main-light dark:text-white">
              MiniStore
            </h1>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Giỏ hàng"
            title="Giỏ hàng"
          >
            <Icon name="shopping_cart" className="text-text-main-light dark:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-semibold ring-2 ring-white dark:ring-[#121121]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="relative flex items-center w-full h-11 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <div className="flex items-center justify-center pl-3 pr-2 text-gray-500">
              <Icon name="search" className="text-[20px]" />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full bg-transparent border-none text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-0 focus:outline-none"
              placeholder="Tìm kiếm sản phẩm..."
              aria-label="Tìm kiếm..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="pr-3 text-gray-500 hover:text-gray-700"
                aria-label="Hủy"
                title="Hủy"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-5 pt-4">
        <section className="px-4">
          <div className="relative overflow-hidden rounded-xl bg-white dark:bg-[#1e1e2d] shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col">
              <div className="w-full h-40 bg-gray-200 relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEqv7Ovy_fObC9urp99qvOQaZG5jtheb76_9NAzN1lhrswx2HHRZq-_NwKYYkD7chYtoMfqtATM4I1erC74u8NFcJKb0c7BnWj0GXNrv_hT7A36zg7LjjNTLaTYpyKvDtS7Ho-5Jwn0LtCRe6Ef5-0NaFuWq5YBoZCwfYnXuXxd4YtQ9Y9j_VAVWIy-5D8rumBYAFYFbr5oaGffrxJgA3stjjXkTv_QR9Lbln0U-U5eSbVbpYmhaj9eJ9EmYo49zd_Ql9NMjlGpYM"
                  alt="Mini Store Sale Banner"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="flex flex-col justify-center p-5">
                <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold tracking-wide text-primary uppercase bg-primary/10 rounded-md w-fit">
                  Sản phẩm nổi bật
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                  MiniStore
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Sản phẩm nổi bật
                </p>
                <button
                  onClick={handleSeeAll}
                  className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors shadow-md shadow-primary/20"
                  aria-label="Sản phẩm nổi bật"
                  title="Sản phẩm nổi bật"
                >
                  Sản phẩm nổi bật
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full overflow-hidden">
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
            {categoryOptions.map((category) => {
              const isActive = selectedCategory === category.value;
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-sm font-medium shadow-sm transition-all active:scale-95 ${
                    isActive
                      ? "bg-primary text-white shadow-primary/25"
                      : "bg-white dark:bg-[#1e1e2d] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300"
                  }`}
                  aria-label={category.label}
                  title={category.label}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {selectedCategory === "All"
                ? "Sản phẩm nổi bật"
                : `${selectedCategory} sản phẩm`}
            </h2>
            <button
              onClick={handleSeeAll}
              className="text-xs font-medium text-primary hover:text-primary/80"
              aria-label="Sản phẩm"
              title="Sản phẩm"
            >
              Sản phẩm
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 opacity-60">
              <Icon name="search_off" className="text-4xl mb-2" />
              <p>Không tìm thấy sản phẩm.</p>
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
      <BottomNav activeTab="home" />
    </div>
  );
}
