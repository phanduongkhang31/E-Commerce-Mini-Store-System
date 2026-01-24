import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header, Icon, Button , formatVnd } from "../components/Components";
import { useApp } from "../App";

export default function QRPaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { placeOrder } = useApp();

  const { total, orderData } = location.state || { total: 0, orderData: {} };

  const [timeLeft, setTimeLeft] = useState(300);
  const [isPaid, setIsPaid] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerifyPayment = () => {
    if (!orderData || !orderData.id) {
      navigate("/checkout");
      return;
    }
    setIsPaid(true);
    setTimeout(() => {
      placeOrder(orderData);
      navigate("/success", { state: { orderId: orderData.id, total } });
    }, 1500);
  };

  if (isExpired) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
        <Header title="Thanh Toán QR" goBack={() => navigate("/checkout")} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
            <Icon name="error" className="text-5xl text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Mã QR Đã Hết Hạn
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[280px]">
            Vui lòng tạo mã QR mới để tiếp tục thanh toán.
          </p>
          <Button onClick={() => navigate("/checkout")}>Quay lại thanh toán</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1a2e]">
      <Header title="Thanh Toán QR" goBack={() => navigate("/checkout")} />

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Thời gian còn lại</p>
          <div
            className={`text-4xl font-bold ${
              timeLeft < 60 ? "text-red-500 animate-pulse" : "text-primary"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 mb-6">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Quét Mã QR Để Thanh Toán
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sử dụng ứng dụng ngân hàng của bạn
              </p>
            </div>

            <div className="relative bg-white p-4 rounded-xl shadow-inner mb-4">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        Math.random() > 0.5 ? "bg-black dark:bg-white" : "bg-transparent"
                      } rounded-sm`}
                    ></div>
                  ))}
                </div>
                <Icon
                  name="qr_code_2"
                  className="absolute text-black/80 dark:text-white/80 text-[240px] opacity-60"
                />
              </div>
            </div>

            <div className="w-full bg-primary/10 dark:bg-primary/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Số tiền thanh toán</p>
              <p className="text-3xl font-bold text-primary">{formatVnd(total)}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <Icon name="info" className="text-2xl text-blue-500 shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Sau khi thanh toán thành công, nhấn nút <strong>"Xác Nhận"</strong> bên dưới.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Ngân hàng hỗ trợ
          </h4>
          <div className="grid grid-cols-4 gap-3">
            {["Vietcombank", "Techcombank", "VietinBank", "BIDV"].map((bank) => (
              <div
                key={bank}
                className="bg-white dark:bg-[#1e1e2d] rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
              >
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
                  {bank}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-center text-yellow-700 dark:text-yellow-300 mb-2">
            Đây là bản demo. Nhấn để mô phỏng thanh toán thành công.
          </p>
          <button
            type="button"
            onClick={handleVerifyPayment}
            disabled={isPaid}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              isPaid
                ? "bg-green-500 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white active:scale-95"
            }`}
            aria-label="Nút"
            title="Nút"
          >
            {isPaid ? "Đã Thanh Toán" : "Xác Nhận Đã Thanh Toán (Demo)"}
          </button>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-100 dark:border-gray-800 p-4 pb-8">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="flex-1 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            aria-label="Nút"
            title="Nút"
          >
            Hủy
          </button>
          <Button className="flex-1">
            <Icon name="help_outline" className="text-xl mr-2" />
            Cần Hỗ Trợ?
          </Button>
        </div>
      </div>
    </div>
  );
}
