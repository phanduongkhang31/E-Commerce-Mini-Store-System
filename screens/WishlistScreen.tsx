import React from "react";
import { useNavigate } from "react-router-dom";
import { Header, Icon, BottomNav , formatVnd } from "../components/Components";
import { useApp } from "../App";

export default function WishlistScreen() {
  const navigate = useNavigate();
  const { products, wishlist, toggleWishlist, addToCart, clearWishlist } = useApp();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleClearWishlist = () => {
    if (!window.confirm("Bạn có chắc muốn xóa hết danh sách yêu thích không?")) return;
    clearWishlist();
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
        <Header title="Danh sách yêu thích" />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-pink-50 dark:bg-pink-900/20">
            <Icon name="favorite" className="text-5xl text-pink-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Chưa có sản phẩm yêu thích
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[260px]">
            Hãy thêm sản phẩm vào yêu thích để mua sau.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all"
            aria-label="Khám phá ngay"
            title="Khám phá ngay"
          >
            Khám phá ngay
          </button>
        </main>
        <BottomNav activeTab="products" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <Header title="Danh sách yêu thích" />

      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {wishlistProducts.length} sản phẩm
          </p>
          <button
            onClick={handleClearWishlist}
            className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
            aria-label="Xóa tất cả"
            title="Xóa tất cả"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-100 dark:border-gray-800"
            >
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="aspect-square w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 size-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-red-500 hover:bg-white dark:hover:bg-black transition-all"
                  aria-label="Bỏ khỏi yêu thích"
                  title="Bỏ khỏi yêu thích"
                >
                  <Icon name="favorite" className="text-xl" />
                </button>
              </div>

              <div className="p-3 flex flex-col gap-2">
                <h3
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="font-semibold text-sm line-clamp-2 text-slate-900 dark:text-white cursor-pointer hover:text-primary transition-colors"
                >
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  <Icon name="star" className="text-yellow-400 text-base" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-400">
                    ({product.reviews} đánh giá)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-primary">
                      {formatVnd(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatVnd(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-all"
                    aria-label="Thêm vào giỏ hàng"
                    title="Thêm vào giỏ hàng"
                  >
                    <Icon name="add_shopping_cart" className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav activeTab="products" />
    </div>
  );
}
