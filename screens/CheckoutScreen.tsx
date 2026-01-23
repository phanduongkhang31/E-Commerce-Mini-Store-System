import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Input, Button, Icon } from "../components/Components";
import { useApp } from "../App";

type PaymentMethod = "card" | "cash" | "qr";

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { cart, placeOrder, adminSettings } = useApp();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );
  const shipping = 5.0;
  const taxRate = adminSettings.taxRate / 100;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ tên";
    if (!phone.trim() || !/^\+?\d{8,15}$/.test(phone.replace(/\s+/g, ""))) {
      nextErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!address.trim()) nextErrors.address = "Vui lòng nhập địa chỉ";
    if (!city.trim()) nextErrors.city = "Vui lòng nhập thành phố";
    if (!zip.trim()) nextErrors.zip = "Vui lòng nhập mã bưu điện";

    if (paymentMethod === "card") {
      const digits = cardNumber.replace(/\s+/g, "");
      if (!/^\d{13,19}$/.test(digits)) {
        nextErrors.cardNumber = "Số thẻ không hợp lệ";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.trim())) {
        nextErrors.expiry = "Hết hạn phải theo MM/YY";
      }
      if (!/^\d{3,4}$/.test(cvv.trim())) {
        nextErrors.cvv = "CVV không hợp lệ";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleOrder = () => {
    if (cart.length === 0) return;
    if (!validate()) return;

    const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
    const lineItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));
    const shippingAddress = `${address}, ${city} ${zip}`.trim();
    const orderData = {
      id: orderId,
      total,
      items: itemCount,
      image: cart[0]?.image || "",
      lineItems,
      shippingAddress,
      paymentMethod,
      phone,
    };

    if (paymentMethod === "qr") {
      navigate("/payment-qr", { state: { total, orderData } });
      return;
    }

    placeOrder(orderData);
    navigate("/success", { state: { orderId, total } });
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <Header title="Thông tin giao hàng" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-slate-900 dark:text-gray-200 text-sm font-medium">
            Bước 2/3
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Giao hàng & Thanh toán
          </p>
        </div>
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-1.5 w-full overflow-hidden">
          <div className="h-full rounded-full bg-primary w-2/3"></div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-32">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1 mb-4">
          Thông tin giao hàng
        </h3>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
              Họ tên
            </span>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ tên của bạn"
              className={errors.fullName ? "border-red-400 focus:ring-red-200" : ""}
            />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
              Số điện thoại
            </span>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+84 123 456 789"
              className={errors.phone ? "border-red-400 focus:ring-red-200" : ""}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
              Địa chỉ
            </span>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ của bạn"
              className={errors.address ? "border-red-400 focus:ring-red-200" : ""}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </label>
          <div className="flex gap-4">
            <label className="flex-1">
              <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
                Thành phố
              </span>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Chọn thành phố"
                className={errors.city ? "border-red-400 focus:ring-red-200" : ""}
              />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </label>
            <label className="w-28">
              <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
                Mã bưu điện
              </span>
              <Input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Nhập mã bưu điện"
                className={errors.zip ? "border-red-400 focus:ring-red-200" : ""}
              />
              {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
            </label>
          </div>
        </div>

        <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1 mt-6 mb-4">
          Phương thức thanh toán
        </h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {([
            { value: "cash", icon: "payments", label: "Thanh toán khi nhận hàng" },
            { value: "card", icon: "credit_card", label: "Thẻ tín dụng" },
            { value: "qr", icon: "qr_code_2", label: "QR" },
          ] as const).map((method) => {
            const isActive = paymentMethod === method.value;
            return (
              <button
                key={method.value}
                type="button"
                onClick={() => setPaymentMethod(method.value)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl border ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                aria-label={method.label}
                title={method.label}
              >
                {isActive && (
                  <div className="absolute top-2 right-2 text-primary">
                    <Icon name="check_circle" className="text-sm" filled />
                  </div>
                )}
                <Icon
                  name={method.icon}
                  className={`text-3xl mb-1 ${isActive ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}
                />
                <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-gray-600 dark:text-gray-400"}`}>
                  {method.label}
                </span>
              </button>
            );
          })}
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="lock" className="text-green-600 text-sm" />
              <p className="text-xs text-green-600 font-medium">
                Thanh toán an toàn & bảo mật
              </p>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
                Số thẻ tín dụng
              </span>
              <Input
                icon="credit_card"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                className={errors.cardNumber ? "border-red-400 focus:ring-red-200" : ""}
              />
              {errors.cardNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
              )}
            </label>
            <div className="flex gap-4">
              <label className="flex-1">
                <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
                  Hết hạn
                </span>
                <Input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className={errors.expiry ? "border-red-400 focus:ring-red-200" : ""}
                />
                {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
              </label>
              <label className="flex-1">
                <span className="text-sm font-medium text-slate-900 dark:text-gray-300 mb-2 block">
                  CVV
                </span>
                <Input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className={errors.cvv ? "border-red-400 focus:ring-red-200" : ""}
                />
                {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
              </label>
            </div>
          </div>
        )}

        <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1 mt-6 mb-2">
          Tóm tắt đơn hàng
        </h3>
        <div className="bg-white dark:bg-[#1e1e2d] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 object-cover"
              />
              <div className="flex-1">
                <p className="text-slate-900 dark:text-white text-sm font-bold">{item.name}</p>
                <p className="text-gray-500 text-xs">
                  Biến thể: Mặc định x{item.quantity}
                </p>
              </div>
              <p className="text-slate-900 dark:text-white text-sm font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="p-4 flex flex-col gap-2 bg-gray-50 dark:bg-white/5">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Tổng tiền</p>
              <p className="text-slate-900 dark:text-white text-sm font-semibold">
                ${subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Vận Chuyển</p>
              <p className="text-slate-900 dark:text-white text-sm font-semibold">
                ${shipping.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Thuế</p>
              <p className="text-slate-900 dark:text-white text-sm font-semibold">
                ${tax.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Tổng giá</p>
              <p className="text-primary text-lg font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-100 dark:border-gray-800 p-4 pb-8 flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Tổng giá</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            ${total.toFixed(2)}
          </span>
        </div>
        <Button className="flex-1" onClick={handleOrder} disabled={cart.length === 0}>
          Đặt hàng
        </Button>
      </div>
    </div>
  );
}
