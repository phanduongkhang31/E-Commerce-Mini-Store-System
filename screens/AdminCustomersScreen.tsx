import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminBottomNav, Icon } from "../components/Components";
import { useApp } from "../App";
import { Order } from "../types";

type CustomerSummary = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  lastOrderTimestamp: number;
  orders: Order[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function AdminCustomersScreen() {
  const navigate = useNavigate();
  const { orders } = useApp();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "spend" | "orders">("recent");

  const customers = useMemo(() => {
    const map = new Map<string, CustomerSummary>();
    orders.forEach((order) => {
      const name = order.customer || "Guest";
      const key = name.toLowerCase().trim() || "guest";
      const emailLocal = slugify(name) || "guest";
      const email = `${emailLocal}@example.com`;
      const existing = map.get(key);
      const timestamp = new Date(order.date).getTime();

      if (!existing) {
        map.set(key, {
          id: slugify(name) || "guest",
          name,
          email,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrderDate: order.date,
          lastOrderTimestamp: timestamp,
          orders: [order],
        });
      } else {
        map.set(key, {
          ...existing,
          totalOrders: existing.totalOrders + 1,
          totalSpent: existing.totalSpent + order.total,
          lastOrderDate:
            timestamp > existing.lastOrderTimestamp ? order.date : existing.lastOrderDate,
          lastOrderTimestamp: Math.max(existing.lastOrderTimestamp, timestamp),
          orders: [...existing.orders, order],
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const filtered = customers.filter((customer) => {
    const term = search.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term)
    );
  });

  const sorted = useMemo(() => {
    const next = [...filtered];
    if (sortBy === "recent") {
      next.sort((a, b) => b.lastOrderTimestamp - a.lastOrderTimestamp);
    } else if (sortBy === "spend") {
      next.sort((a, b) => b.totalSpent - a.totalSpent);
    } else {
      next.sort((a, b) => b.totalOrders - a.totalOrders);
    }
    return next;
  }, [filtered, sortBy]);

  const totalOrders = customers.reduce((sum, item) => sum + item.totalOrders, 0);
  const totalRevenue = customers.reduce((sum, item) => sum + item.totalSpent, 0);

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="flex items-center bg-white dark:bg-[#1a1a2e] px-4 py-3 justify-between sticky top-0 z-30 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-900 dark:text-white"
          onClick={() => navigate("/admin")}
          aria-label="Back"
          title="Back"
        >
          <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center dark:text-white">Customers</h2>
        <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
          <Icon name="more_vert" className="text-2xl" />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1a1a2e] sticky top-[60px] z-20 border-b border-gray-100 dark:border-gray-800 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 dark:bg-[#24243e] border border-gray-100 dark:border-gray-800 p-3 text-center">
            <p className="text-xs text-gray-500">Customers</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{customers.length}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#24243e] border border-gray-100 dark:border-gray-800 p-3 text-center">
            <p className="text-xs text-gray-500">Orders</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{totalOrders}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#24243e] border border-gray-100 dark:border-gray-800 p-3 text-center">
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="search" className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#252538] text-gray-900 dark:text-white text-sm rounded-lg pl-10 p-2.5 border-none focus:ring-2 focus:ring-primary/50"
              aria-label="Search customers"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Clear"
                title="Clear"
              >
                <Icon name="close" className="text-sm" />
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "spend" | "orders")}
            className="bg-gray-100 dark:bg-[#252538] text-gray-900 dark:text-white text-sm rounded-lg px-3 border-none focus:ring-2 focus:ring-primary/50"
            aria-label="Sort by"
          >
            <option value="recent">Recent</option>
            <option value="spend">Top spend</option>
            <option value="orders">Most orders</option>
          </select>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-24 gap-3 flex flex-col">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-3">
              <Icon name="group" className="text-4xl text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No customers yet</p>
            <p className="text-sm text-gray-400 mt-1">Orders will create customer records.</p>
          </div>
        ) : (
          sorted.map((customer) => (
            <div
              key={customer.id}
              className="group flex items-start gap-4 bg-white dark:bg-[#1e1e2d] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md"
            >
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm dark:text-white truncate">{customer.name}</p>
                <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                  <span>Orders: {customer.totalOrders}</span>
                  <span>Spend: ${customer.totalSpent.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Last order: {customer.lastOrderDate}
                </p>
              </div>
              <button
                onClick={() => navigate(`/admin/customers/${customer.id}`)}
                className="text-xs font-semibold text-primary hover:text-primary/80"
                aria-label="View"
                title="View"
              >
                View
              </button>
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
