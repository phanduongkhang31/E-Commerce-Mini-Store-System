import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, AdminBottomNav , formatVnd } from "../components/Components";
import { useApp } from "../App";

export default function AdminOrderListScreen() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [filter, setFilter] = useState("All");

  const filters = useMemo(
    () => [
      { value: "All", label: "Tất Cả" },
      { value: "Processing", label: "Đang xử lý" },
      { value: "Shipped", label: "Đang giao" },
      { value: "Delivered", label: "Đã giao" },
      { value: "Cancelled", label: "Đã hủy" },
    ],
    []
  );

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const getStatusLabel = (status: string) => {
    if (status === "Processing") return "Đang xử lý";
    if (status === "Shipped") return "Đang giao";
    if (status === "Delivered") return "Đã giao";
    if (status === "Cancelled") return "Đã hủy";
    return status;
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#1a1929] px-4 py-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          onClick={() => navigate("/admin")}
          aria-label="Quay lại"
          title="Quay lại"
        >
          <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center dark:text-white">
          Danh Sách Đơn Hàng
        </h2>
        <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Icon name="filter_list" className="text-2xl" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1929] pt-2 pb-4 px-4 shadow-sm z-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {filters.map((status) => {
            const isActive = filter === status.value;
            return (
              <button
                key={status.value}
                onClick={() => setFilter(status.value)}
                className={`h-9 px-5 rounded-full text-sm font-medium shrink-0 border transition-colors ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-transparent"
                }`}
                aria-label={status.label}
                title={status.label}
              >
                {status.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center">
            <div className="bg-white dark:bg-[#1e1e2d] p-6 rounded-full shadow-lg mb-6">
              <Icon name="assignment_late" className="text-5xl text-gray-300" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              Chưa có đơn hàng
            </h3>
            <p className="text-gray-500">Chưa có đơn hàng nào được tạo.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/admin/orders/${order.id}`)}
              className="cursor-pointer flex flex-col bg-white dark:bg-[#1a1929] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-sm">#{order.id}</span>
                    <span className="size-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {order.customer || "Khách"}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs mt-1">{order.date}</span>
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-50 text-green-700"
                      : order.status === "Processing"
                      ? "bg-blue-50 text-blue-700"
                      : order.status === "Shipped"
                      ? "bg-purple-50 text-purple-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {getStatusLabel(order.status)}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative shrink-0">
                  <img
                    src={order.image}
                    alt="Sản Phẩm"
                    className="rounded-lg size-[64px] shadow-inner object-cover"
                  />
                  {order.items > 1 && (
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                      +{order.items - 1}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      {order.items} sản phẩm
                    </p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold">
                      {formatVnd(order.total)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400">
                  Chạm để xem chi tiết
                </span>
                <Icon name="chevron_right" className="text-gray-400 text-[18px]" />
              </div>
            </div>
          ))
        )}
      </main>
      <AdminBottomNav activeTab="orders" />
    </div>
  );
}
