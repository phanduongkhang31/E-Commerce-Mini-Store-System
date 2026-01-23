import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../components/Components";
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

export default function AdminCustomerDetailScreen() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { orders } = useApp();

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

  const customer = customers.find((item) => item.id === customerId);
  const customerOrders = useMemo(() => {
    if (!customer) return [] as Order[];
    return [...customer.orders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [customer]);

  if (!customer) {
    return (
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
        <div className="flex items-center bg-white dark:bg-[#1a1a2e] px-4 py-3 justify-between sticky top-0 z-30 shadow-sm border-b border-gray-100 dark:border-gray-800">
          <button
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-900 dark:text-white"
            onClick={() => navigate("/admin/customers")}
            aria-label="Back"
            title="Back"
          >
            <Icon name="arrow_back" className="text-2xl" />
          </button>
          <h2 className="text-lg font-bold flex-1 text-center dark:text-white">Customer</h2>
          <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
            <Icon name="more_vert" className="text-2xl" />
          </div>
        </div>
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Customer not found.</p>
        </main>
      </div>
    );
  }

  const averageOrder = customer.totalOrders
    ? customer.totalSpent / customer.totalOrders
    : 0;

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="flex items-center bg-white dark:bg-[#1a1a2e] px-4 py-3 justify-between sticky top-0 z-30 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-900 dark:text-white"
          onClick={() => navigate("/admin/customers")}
          aria-label="Back"
          title="Back"
        >
          <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center dark:text-white">Customer</h2>
        <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
          <Icon name="more_vert" className="text-2xl" />
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1a1a2e] border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-bold dark:text-white">{customer.name}</p>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-[#1a1a2e] border-b border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 dark:bg-[#24243e] border border-gray-100 dark:border-gray-800 p-3 text-center">
            <p className="text-xs text-gray-500">Orders</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{customer.totalOrders}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#24243e] border border-gray-100 dark:border-gray-800 p-3 text-center">
            <p className="text-xs text-gray-500">Spent</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${customer.totalSpent.toFixed(2)}</p>
          </div>
          <div className="rounded-xl bg-gray-50 dark:bg-[#24243e] border border-gray-100 dark:border-gray-800 p-3 text-center">
            <p className="text-xs text-gray-500">Avg</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${averageOrder.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Last order: {customer.lastOrderDate}</p>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-24 gap-3 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4">Orders</h3>
        {customerOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 opacity-60">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-3">
              <Icon name="shopping_bag" className="text-4xl text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">No orders yet</p>
          </div>
        ) : (
          customerOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 bg-white dark:bg-[#1e1e2d] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div>
                <p className="text-sm font-semibold dark:text-white">Order #{order.id}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
                <p className="text-xs text-gray-500">Status: {order.status}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                <button
                  onClick={() => navigate(`/admin/orders/${order.id}`)}
                  className="text-xs text-primary font-semibold"
                  aria-label="View order"
                  title="View order"
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
