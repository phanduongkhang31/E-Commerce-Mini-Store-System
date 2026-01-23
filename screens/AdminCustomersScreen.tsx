import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminBottomNav, Icon } from "../components/Components";
import { useApp } from "../App";

type CustomerSummary = {
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
};

export default function AdminCustomersScreen() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [search, setSearch] = useState("");

  const customers = useMemo(() => {
    const map = new Map<string, CustomerSummary>();
    orders.forEach((order) => {
      const name = order.customer || "Khách";
      const existing = map.get(name);
      const email = `customer_${order.id.toLowerCase()}@example.com`;
      if (!existing) {
        map.set(name, {
          name,
          email,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrderDate: order.date,
        });
      } else {
        map.set(name, {
          ...existing,
          totalOrders: existing.totalOrders + 1,
          totalSpent: existing.totalSpent + order.total,
          lastOrderDate: new Date(order.date) > new Date(existing.lastOrderDate)
            ? order.date
            : existing.lastOrderDate,
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const filtered = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

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
          Khách Hàng
        </h2>
        <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
          <Icon name="more_vert" className="text-2xl" />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1a1a2e] sticky top-[60px] z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="search" className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm khách hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#252538] text-gray-900 dark:text-white text-sm rounded-lg pl-10 p-2.5 border-none focus:ring-2 focus:ring-primary/50"
            aria-label="Tìm kiếm..."
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Hủy"
              title="Hủy"
            >
              <Icon name="close" className="text-sm" />
            </button>
          )}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-24 gap-3 flex flex-col">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-3">
              <Icon name="group" className="text-4xl text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">Chưa có khách hàng</p>
            <p className="text-sm text-gray-400 mt-1">Chưa có đơn hàng nào được tạo.</p>
          </div>
        ) : (
          filtered.map((customer) => (
            <div
              key={customer.name}
              className="group flex items-center gap-4 bg-white dark:bg-[#1e1e2d] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md"
            >
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm dark:text-white truncate">{customer.name}</p>
                <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                  <span>
                    Đơn hàng: {customer.totalOrders}
                  </span>
                  <span>
                    Tổng chi: ${customer.totalSpent.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Đơn gần nhất: {customer.lastOrderDate}
                </p>
              </div>
              <Icon name="chevron_right" className="text-gray-400 text-[18px]" />
            </div>
          ))
        )}
      </main>

      <div className="bg-white dark:bg-[#1a1a2e] border-t border-gray-100 dark:border-gray-800">
        <AdminBottomNav activeTab="dashboard" />
      </div>
    </div>
  );
}
