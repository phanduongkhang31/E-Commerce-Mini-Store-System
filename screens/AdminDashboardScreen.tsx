import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminBottomNav, Icon , formatVnd } from "../components/Components";
import { useApp } from "../App";

const getStatusLabel = (status: string) => {
  if (status === "Processing") return "Đang xử lý";
  if (status === "Shipped") return "Đang giao";
  if (status === "Delivered") return "Đã giao";
  if (status === "Cancelled") return "Đã hủy";
  return status;
};

export default function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { orders, products } = useApp();

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const activeProducts = products.length;
  const lowStockProducts = products.filter((product) => product.stock > 0 && product.stock < 10);
  const outOfStockProducts = products.filter((product) => product.stock === 0);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formattedDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-20">
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1a1929]/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center px-4 py-3 justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {formattedDate}
            </p>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Chào Admin
            </h2>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Thông Báo"
              title="Thông Báo"
            >
              <Icon name="notifications" className="text-[24px]" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-2 w-full p-4 overflow-y-auto no-scrollbar">
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Tổng Doanh Thu
              </p>
              <Icon name="payments" className="text-primary text-[20px]" />
            </div>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {formatVnd(totalRevenue)}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="trending_up" className="text-green-600 text-[16px]" />
              <p className="text-green-600 text-xs font-semibold">+5%</p>
              <p className="text-gray-400 text-xs ml-1">so với tuần trước</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Đơn Hàng
              </p>
              <Icon name="shopping_bag" className="text-primary/70 text-[20px]" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-1">
              {totalOrders}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-green-600 text-xs font-semibold">+12%</p>
              <p className="text-gray-400 text-xs">mới</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Tổng Sản Phẩm
              </p>
              <Icon name="inventory_2" className="text-primary/70 text-[20px]" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-1">
              {activeProducts}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-gray-500 text-xs font-medium">Đang hoạt động</p>
            </div>
          </div>
        </section>

        <section className="mt-2 rounded-xl bg-white dark:bg-[#1e1e2d] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-bold">
                Doanh Thu Tuần
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Hiệu suất 7 ngày gần nhất
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-green-700 dark:text-green-400 text-xs font-bold">
              +5.2% so với tuần trước
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <svg
              fill="none"
              height="120"
              preserveAspectRatio="none"
              viewBox="0 0 400 120"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5048e5" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#5048e5" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path
                d="M0,80 C50,80 50,40 100,40 C150,40 150,90 200,90 C250,90 250,30 300,30 C350,30 350,60 400,60 V120 H0 Z"
                fill="url(#chartGradient)"
              ></path>
              <path
                d="M0,80 C50,80 50,40 100,40 C150,40 150,90 200,90 C250,90 250,30 300,30 C350,30 350,60 400,60"
                fill="none"
                stroke="#5048e5"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
            </svg>
          </div>
          <div className="flex justify-between mt-2 px-1">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
              <p key={day} className="text-gray-400 text-xs font-medium">
                {day}
              </p>
            ))}
          </div>
        </section>

        <div className="mt-4 mb-2 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white text-lg font-bold">
            Thao Tác Nhanh
          </h2>
        </div>
        <section className="flex flex-col gap-3">
          <div
            onClick={() => navigate("/admin/products")}
            className="group flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer"
            aria-label="Quản Lý Sản Phẩm"
            title="Quản Lý Sản Phẩm"
          >
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-1">
                  <Icon name="inventory_2" className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                  Quản Lý Sản Phẩm
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                  Thêm hoặc chỉnh sửa tồn kho
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 group-hover:underline">
                Đến Sản Phẩm <Icon name="arrow_forward" className="text-sm" />
              </div>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByqy6l0mUdwGolxOxM1n_7BVFOT-nVYX3F6abA6rRg5ohA-3EGDCog6byGxKFvjiOYRXHTzxeGV5ma8qfCZEGwpVEs354vNK_W2NkJXGQQhnx2BvzRscL3nk5ZWwErkabw5AO-wP9oAlSzEVYn9eK6p5_4RS9JljaT40A00cO5zjurK8PI2tbCUHmxVT4f7egWqdYhgS8SD5PBQKdYgnmAT30XQ_9IeDKw-SYvvS8vCp1DIB1nXEMOtpqE_kA1kJGeC-P71WftS_o"
              alt="Quản Lý Sản Phẩm"
              className="w-24 sm:w-32 rounded-lg aspect-square object-cover"
            />
          </div>

          <div
            onClick={() => navigate("/admin/orders")}
            className="group flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer"
            aria-label="Quản Lý Đơn Hàng"
            title="Quản Lý Đơn Hàng"
          >
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-1">
                  <Icon name="local_shipping" className="text-purple-600 dark:text-purple-400 text-lg" />
                </div>
                <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                  Quản Lý Đơn Hàng
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                  Theo dõi giao hàng và trạng thái
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 group-hover:underline">
                Xem Đơn Hàng <Icon name="arrow_forward" className="text-sm" />
              </div>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdtrZ20gp4o4Wk0O7cm2EQmPZbMholucgwK0ZO-2CWBViOE80n5gf4IdU5EBSXYTk0XV1ng72nHeyi6-YMQ6Do1KxDqk2UcrM86uTJh4P_Hw_Sg8nxJc-z5vchJF0MfqhVgvUX1zzVUoV4IOUIN-9sZTIfmzoSHYmF7I0ca80nrHBUhJslPSVRznHIWXU5CQF5DpBYEPtQf7be59Klo1ahal4SM92a6yPitYY_MxV_Wv_b6R_OuxKRFT8RtPDiKtG1wuj1Jb8E2h0"
              alt="Quản Lý Đơn Hàng"
              className="w-24 sm:w-32 rounded-lg aspect-square object-cover"
            />
          </div>

          <div
            onClick={() => navigate("/admin/categories")}
            className="group flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer"
            aria-label="Quản Lý Danh Mục"
            title="Quản Lý Danh Mục"
          >
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-1">
                  <Icon name="category" className="text-emerald-600 dark:text-emerald-400 text-lg" />
                </div>
                <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                  Quản Lý Danh Mục
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                  Tạo và chỉnh sửa danh mục sản phẩm
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 group-hover:underline">
                Xem Tất Cả <Icon name="arrow_forward" className="text-sm" />
              </div>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1JwQcDqGZ7cBKrx9ZPF4enAmigfwAScLqU8Z9bK8kP1Nrq3yG0UDvJmH5d6X4ehp3wS6DLQb8gWCFhO3PcbkWvRd7cHEOkfB4vNBUAVasXgY7hcK8yS6VllmbnV2h4pI_eQPSHIXwBPl_w4S5cL3fdMv5K7SgQ2uQ5uBzciw1gTDP2bA3XYn5d0wq6IofCk6Q7qjPRc6gN7FHFbQ6tPP7d0c3eU0mPQ2C1qk68MZefYZ3umB0NjKwDDvWg-3F0_h1Sdj"
              alt="Quản Lý Danh Mục"
              className="w-24 sm:w-32 rounded-lg aspect-square object-cover"
            />
          </div>

          <div
            onClick={() => navigate("/admin/customers")}
            className="group flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer"
            aria-label="Quản Lý Khách Hàng"
            title="Quản Lý Khách Hàng"
          >
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-1">
                  <Icon name="group" className="text-orange-600 dark:text-orange-400 text-lg" />
                </div>
                <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                  Quản Lý Khách Hàng
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                  Theo dõi lịch sử mua hàng
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 group-hover:underline">
                Xem Tất Cả <Icon name="arrow_forward" className="text-sm" />
              </div>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU5v3JQ07cDmJ2i0UwSPLcOb2jM4p30hNVOVREbwwh4xDQ92C9KXJUSYMG0r9p6otzgwPUb1yAK9DaiWmA_0g2g8O-MoCen5X8FQ7qg8T8uTmyJyaZNw1cK8Z9o2rA2c6aXyCqEym8Y1iAT0XlbJ4A8u8NqE7I0WQ9yPpZL2rOQm0sYHkwyQ0QGm2eJQnKnF2gGvv3gkC4xO6mXjVj9bJbD8aFj0wJb5cQEM4F1xE3fQH2kQ7N1vI3p6DQkWmYhQ"
              alt="Quản Lý Khách Hàng"
              className="w-24 sm:w-32 rounded-lg aspect-square object-cover"
            />
          </div>
        </section>

        <section className="mt-6 rounded-xl bg-white dark:bg-[#1e1e2d] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-bold">
                Cảnh Báo Tồn Kho
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Sắp hết hàng: {lowStockProducts.length} - Hết hàng: {outOfStockProducts.length}
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/products")}
              className="text-primary text-sm font-medium"
              aria-label="Xem tồn kho"
              title="Xem tồn kho"
            >
              Xem tồn kho
            </button>
          </div>
          {lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? (
            <p className="text-sm text-gray-500">Tồn kho ổn định</p>
          ) : (
            <div className="space-y-2">
              {[...outOfStockProducts, ...lowStockProducts].slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-800 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-9 rounded-md object-cover border border-gray-100 dark:border-gray-800"
                    />
                    <div>
                      <p className="text-sm font-semibold dark:text-white">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.stock === 0
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
                    }`}
                  >
                    {product.stock === 0 ? "Hết Hàng" : `Sắp Hết ${product.stock}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-6 mb-2 flex items-center justify-between px-1">
          <h2 className="text-gray-900 dark:text-white text-lg font-bold">
            Đơn Hàng Gần Đây
          </h2>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-primary text-sm font-medium"
            aria-label="Xem Tất Cả"
            title="Xem Tất Cả"
          >
            Xem Tất Cả
          </button>
        </div>
        <section className="flex flex-col gap-2 pb-8">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold text-xs">
                  ORD
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Đơn #{order.id}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {formatVnd(order.total)}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
          ))}
        </section>
      </main>

      <AdminBottomNav activeTab="dashboard" />
    </div>
  );
}
