import React, { useMemo, useState } from "react";
import { Header, Icon, BottomNav } from "../components/Components";
import { useApp } from "../App";

export default function OrderHistoryScreen() {
  const { orders, products, addToCart } = useApp();
  const [activeFilter, setActiveFilter] = useState<"all" | "Processing" | "Shipped" | "Delivered" | "Cancelled">("all");

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter, orders]);

  const statusLabels: Record<"Processing" | "Shipped" | "Delivered" | "Cancelled", string> = {
    Processing: "Đang xử lý",
    Shipped: "Đang giao",
    Delivered: "Đã giao",
    Cancelled: "Đã hủy",
  };

  const handleReorder = (orderImage: string) => {
    const product = products.find((item) => item.image === orderImage);
    if (!product) return;
    addToCart(product);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header title="Lịch Sử Đơn Hàng" />
      
      <div className="bg-white dark:bg-[#1a1929] pt-2 pb-4 px-4 shadow-sm z-10">
         <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`h-9 px-5 rounded-full text-sm font-medium shadow-sm shrink-0 border border-transparent ${
                activeFilter === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
              aria-label="Tất Cả"
              title="Tất Cả"
            >
              Tất Cả
            </button>
            {(["Processing", "Shipped", "Delivered", "Cancelled"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`h-9 px-5 rounded-full text-sm font-medium shrink-0 border border-transparent ${
                    activeFilter === status
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                  aria-label={statusLabels[status]}
                  title={statusLabels[status]}
                >
                  {statusLabels[status]}
                </button>
            ))}
         </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {filteredOrders.length === 0 ? (
           <div className="flex flex-col items-center justify-center pt-20 text-center">
              <div className="bg-white dark:bg-[#1e1e2d] p-6 rounded-full shadow-lg mb-6"><Icon name="shopping_bag" className="text-5xl text-gray-300" /></div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Chưa có đơn hàng</h3>
              <p className="text-gray-500">Bạn chưa đặt đơn hàng nào.</p>
           </div>
        ) : (
           filteredOrders.map((order) => (
             <div key={order.id} className="flex flex-col bg-white dark:bg-[#1a1929] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex flex-col">
                      <span className="text-primary font-semibold text-sm mb-0.5">Đơn #{order.id}</span>
                      <span className="text-gray-500 text-xs">{order.date}</span>
                   </div>
                   <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium 
                      ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                        order.status === 'Shipped' ? 'bg-purple-50 text-purple-700' : 'bg-red-50 text-red-700'}`}>
                      <Icon name={order.status === 'Processing' ? 'sync' : order.status === 'Cancelled' ? 'cancel' : order.status === 'Shipped' ? 'local_shipping' : 'check_circle'} className="text-[16px]" />
                      {statusLabels[order.status]}
                   </div>
                </div>
                <div className="flex gap-4 items-center">
                   <div className="relative shrink-0">
                      <img src={order.image} alt="Order item" className="rounded-lg size-[64px] shadow-inner object-cover" />
                      {order.items > 1 && <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">+{order.items - 1}</div>}
                   </div>
                   <div className="flex flex-1 flex-col justify-center">
                       <div className="flex items-center justify-between mt-1">
                          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                            {order.items} sản phẩm
                          </p>
                          <p className="text-slate-900 dark:text-white text-lg font-bold">${order.total.toFixed(2)}</p>
                       </div>
                   </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <button
                      className="text-primary text-sm font-medium"
                      onClick={() => handleReorder(order.image)}
                      aria-label="Thêm vào giỏ hàng"
                      title="Thêm vào giỏ hàng"
                    >
                      Thêm vào giỏ hàng
                    </button>
                    <div className="flex items-center text-gray-400 text-sm font-medium">
                      Chi Tiết Đơn Hàng <Icon name="chevron_right" className="text-[18px]" />
                    </div>
                </div>
             </div>
           ))
        )}
      </main>
      <BottomNav activeTab="profile" /> 
    </div>
  );
}
