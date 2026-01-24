import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon, Button , formatVnd } from "../components/Components";
import { useApp } from "../App";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processing":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "Shipped":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    case "Delivered":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "Cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const statusIcon: Record<string, string> = {
  Processing: "sync",
  Shipped: "local_shipping",
  Delivered: "check_circle",
  Cancelled: "cancel",
};

export default function AdminOrderDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders, updateOrderStatus } = useApp();
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const order = orders.find((o) => o.id === id);

  const statusLabel = useMemo(() => {
    if (!order) return "";
    if (order.status === "Processing") return "Đang xử lý";
    if (order.status === "Shipped") return "Đang giao";
    if (order.status === "Delivered") return "Đã giao";
    if (order.status === "Cancelled") return "Đã hủy";
    return order.status;
  }, [order]);

  if (!order) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-background-light dark:bg-background-dark">
        <Icon name="error" className="text-4xl text-gray-400 mb-2" />
        <p className="text-gray-500">Không tìm thấy đơn hàng</p>
        <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4">
          Quay lại
        </Button>
      </div>
    );
  }

  const handleStatusUpdate = (status: string) => {
    updateOrderStatus(order.id, status as any);
    setIsStatusMenuOpen(false);
  };

  const shippingCost = 5.0;
  const lineItems = order.lineItems && order.lineItems.length > 0 ? order.lineItems : null;
  const lineItemsTotal = lineItems
    ? lineItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;
  const subTotal = lineItems ? lineItemsTotal : order.total - shippingCost;

  const statusOptions = [
    { value: "Processing", label: "Đang xử lý" },
    { value: "Shipped", label: "Đang giao" },
    { value: "Delivered", label: "Đã giao" },
    { value: "Cancelled", label: "Đã hủy" },
  ];
  const paymentLabel =
    order.paymentMethod === "card"
      ? "Thẻ tín dụng"
    : order.paymentMethod === "cash"
      ? "Thanh toán khi nhận hàng"
    : order.paymentMethod === "qr"
      ? "QR"
      : order.paymentMethod || "Thẻ tín dụng";

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#1a1929] px-4 py-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Quay lại"
          title="Quay lại"
        >
          <Icon name="arrow_back_ios_new" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center dark:text-white">
          Chi Tiết Đơn Hàng #{order.id}
        </h2>
        <button
          className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          aria-label="In"
          title="In"
        >
          <Icon name="print" />
        </button>
      </div>

      <main className="flex-1 overflow-y-auto p-4 gap-4 flex flex-col pb-24">
        <div className="relative z-20">
          <div
            onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
            className="bg-white dark:bg-[#1e1e2d] p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.99] transition-transform hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className={`size-12 rounded-full flex items-center justify-center ${getStatusColor(
                  order.status
                )}`}
              >
                <Icon name={statusIcon[order.status] as string} className="text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Trạng Thái Hiện Tại
                </p>
                <p className="font-bold text-base dark:text-white">{statusLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary text-sm font-bold bg-primary/5 px-3 py-1.5 rounded-lg">
              Cập Nhật Trạng Thái <Icon name="expand_more" />
            </div>
          </div>

          {isStatusMenuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#1e1e2d] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up origin-top">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleStatusUpdate(status.value)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0 font-medium text-sm flex justify-between items-center transition-colors"
                  aria-label={status.label}
                  title={status.label}
                >
                  <span
                    className={`dark:text-white ${
                      order.status === status.value ? "font-bold text-primary" : ""
                    }`}
                  >
                    {status.label}
                  </span>
                  {order.status === status.value && <Icon name="check" className="text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2 px-1">
            Thông Tin Khách Hàng
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4">
            <img
              src={`https://i.pravatar.cc/150?u=${order.id}`}
              alt="Khách Hàng"
              className="size-12 rounded-full shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base truncate dark:text-white">
                {order.customer || "Khách"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                customer_{order.id.toLowerCase()}@example.com
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Gọi khách hàng"
                title="Gọi khách hàng"
              >
                <Icon name="call" className="text-[20px]" />
              </button>
              <button
                className="size-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Gửi email"
                title="Gửi email"
              >
                <Icon name="mail" className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2 px-1">
            Sản Phẩm ({order.items})
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
            {lineItems ? (
              lineItems.map((item) => (
                <div key={item.id} className="p-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-16 rounded-lg border border-gray-100 dark:border-gray-700 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm line-clamp-1 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">ID: {item.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm dark:text-white">
                      {formatVnd((item.price * item.quantity))}
                    </p>
                    <span className="inline-block bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Số Lượng: {item.quantity}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 flex gap-4 items-center">
                <img
                  src={order.image}
                  alt="Sản Phẩm"
                  className="size-16 rounded-lg border border-gray-100 dark:border-gray-700 object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm line-clamp-1 dark:text-white">
                    Sản phẩm #{order.id.split("-")[1]}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">ID: {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm dark:text-white">
                    {formatVnd(subTotal)}
                  </p>
                  <span className="inline-block bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 mt-1">
                    Số Lượng: {order.items}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2 px-1">
            Địa Chỉ Giao Hàng
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex gap-3">
            <div className="mt-1">
              <Icon name="location_on" className="text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-sm dark:text-white mb-1">
                Địa chỉ giao hàng
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {order.shippingAddress || "123 Market Street, Suite 400, San Francisco, CA 94103"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2 px-1">
            Phương Thức Thanh Toán
          </h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Icon name="credit_card" />
            </div>
            <div>
              <p className="text-sm font-medium dark:text-white">{paymentLabel}</p>
              {order.phone && (
                <p className="text-xs text-gray-500 mt-1">
                  Số điện thoại: {order.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1e2d] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 mt-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tạm Tính</span>
            <span className="font-medium dark:text-white">{formatVnd(subTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Vận Chuyển</span>
            <span className="font-medium dark:text-white">{formatVnd(shippingCost)}</span>
          </div>
          <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
          <div className="flex justify-between text-lg">
            <span className="font-bold dark:text-white">Tổng</span>
            <span className="font-bold text-primary">{formatVnd(order.total)}</span>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 bg-white dark:bg-[#1e1e2d] border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20 backdrop-blur-md bg-opacity-95">
        {order.status === "Processing" && (
          <Button
            onClick={() => handleStatusUpdate("Shipped")}
            className="w-full gap-2 shadow-lg shadow-primary/25"
          >
            <Icon name="local_shipping" /> Đánh dấu đã giao
          </Button>
        )}
        {order.status === "Shipped" && (
          <Button
            onClick={() => handleStatusUpdate("Delivered")}
            className="w-full gap-2 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25 text-white"
          >
            <Icon name="check_circle" /> Đánh dấu đã nhận
          </Button>
        )}
        {(order.status === "Delivered" || order.status === "Cancelled") && (
          <Button variant="secondary" className="w-full gap-2 cursor-not-allowed opacity-70">
            <Icon name="lock" /> Đơn hàng đã hoàn tất
          </Button>
        )}
      </div>
    </div>
  );
}
