import React, { createContext, useContext, useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { MOCK_PRODUCTS, MOCK_ORDERS } from "./constants";
import { CartItem, Product, Order } from "./types";
import { Toast } from "./components/Components";

// Import Screens
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CheckMailScreen from "./screens/CheckMailScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ChangePasswordSuccessScreen from "./screens/ChangePasswordSuccessScreen";
import AdminProductListScreen from "./screens/AdminProductListScreen";
import AdminAddProductScreen from "./screens/AdminAddProductScreen";
import AdminOrderListScreen from "./screens/AdminOrderListScreen";
import AdminOrderDetailScreen from "./screens/AdminOrderDetailScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminSettingsScreen from "./screens/AdminSettingsScreen";

// --- CONFIGURATION ---
// Point this to your local server.
const API_BASE_URL = "http://localhost/ministore/api";

interface AppContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  addProduct: (product: Omit<Product, "id" | "reviews" | "rating">) => void;
  deleteProduct: (productId: string) => void;
  placeOrder: (order: any) => void;
  showToast: (message: string) => void;
  isLoading: boolean;
  isOfflineMode: boolean; // Flag to indicate if we are using Mock data
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState({ message: "", isVisible: false });

  // Helper to safely parse JSON or return null
  const safeJson = async (response: Response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn("Server response was not JSON:", text);
      throw new Error("Invalid JSON response");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Try to fetch Products
      const prodRes = await fetch(`${API_BASE_URL}/products.php`).catch(
        () => null
      );

      let loadedProducts = null;
      if (prodRes && prodRes.ok) {
        const prodData = await safeJson(prodRes);
        if (Array.isArray(prodData)) {
          loadedProducts = prodData.map((p: any) => ({
            ...p,
            id: p.id.toString(),
            price: parseFloat(p.price),
            stock: parseInt(p.stock),
            originalPrice: p.original_price
              ? parseFloat(p.original_price)
              : undefined,
            rating: p.rating ? parseFloat(p.rating) : 0,
            reviews: p.reviews ? parseInt(p.reviews) : 0,
          }));
        }
      }

      // Try to fetch Orders
      const orderRes = await fetch(`${API_BASE_URL}/orders.php`).catch(
        () => null
      );
      let loadedOrders = null;
      if (orderRes && orderRes.ok) {
        const orderData = await safeJson(orderRes);
        if (Array.isArray(orderData)) {
          loadedOrders = orderData.map((o: any) => ({
            ...o,
            total: parseFloat(o.total),
            items: parseInt(o.items_count || o.items),
          }));
        }
      }

      if (loadedProducts) {
        setProducts(loadedProducts);
        setIsOfflineMode(false);
      } else {
        // If product fetch failed, use Mock and set Offline Mode
        console.log("Using Mock Products");
        setProducts(MOCK_PRODUCTS);
        setIsOfflineMode(true);
      }

      if (loadedOrders) {
        setOrders(loadedOrders);
      } else {
        console.log("Using Mock Orders");
        setOrders(MOCK_ORDERS);
      }
    } catch (error) {
      console.error("Critical Fetch Error:", error);
      setProducts(MOCK_PRODUCTS);
      setOrders(MOCK_ORDERS);
      setIsOfflineMode(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
  };

  const addToCart = (product: Product) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find((p: CartItem) => p.id === product.id);
      if (existing) {
        return prev.map((p: CartItem) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev: CartItem[]) => prev.filter((p: CartItem) => p.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev: CartItem[]) =>
      prev.map((p: CartItem) => {
        if (p.id === id) {
          const newQty = Math.max(1, p.quantity + delta);
          return { ...p, quantity: newQty };
        }
        return p;
      })
    );
  };

  const clearCart = () => setCart([]);

  const addProduct = async (
    newProductData: Omit<Product, "id" | "reviews" | "rating">
  ) => {
    // Optimistic Update
    const tempId = Math.random().toString();
    const newProd = { ...newProductData, id: tempId, rating: 0, reviews: 0 };
    setProducts((prev: Product[]) => [...prev, newProd]);
    navigate("/admin/products");

    if (!isOfflineMode) {
      try {
        await fetch(`${API_BASE_URL}/products.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProductData),
        });
        showToast("Product saved to DB");
        fetchData(); // Sync real ID
      } catch (e) {
        showToast("Saved locally (DB unreachable)");
      }
    } else {
      showToast("Added to local list");
    }
  };

  const deleteProduct = async (productId: string) => {
    setProducts((prev: Product[]) =>
      prev.filter((p: Product) => p.id !== productId)
    );
    if (!isOfflineMode) {
      try {
        await fetch(`${API_BASE_URL}/products.php?id=${productId}`, {
          method: "DELETE",
        });
        showToast("Product deleted from DB");
      } catch (e) {
        showToast("Deleted locally");
      }
    } else {
      showToast("Deleted locally");
    }
  };

  const placeOrder = async (orderData: any) => {
    clearCart();
    if (!isOfflineMode) {
      try {
        await fetch(`${API_BASE_URL}/orders.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            total: orderData.total,
            itemsCount: orderData.items,
            image: orderData.image,
            customerName: "Current User",
          }),
        });
        // Refresh orders in background
        fetch(`${API_BASE_URL}/orders.php`)
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setOrders(
                data.map((o: any) => ({
                  ...o,
                  total: parseFloat(o.total),
                  items: parseInt(o.items_count || o.items),
                }))
              );
            }
          });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addProduct,
        deleteProduct,
        placeOrder,
        showToast,
        isLoading,
        isOfflineMode,
      }}
    >
      {children}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() =>
          setToast((prev: { message: string; isVisible: boolean }) => ({
            ...prev,
            isVisible: false,
          }))
        }
      />
    </AppContext.Provider>
  );
};

// Simple hook to use navigate inside AppProvider but AppProvider is inside Router in the main export
// We need to move Router up or pass navigate function.
// For simplicity in this structure, we handle navigate in screens mostly.
// However, addProduct uses navigate. We can fix this by wrapping the App content.

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper component to use hooks
const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-[#121121] min-h-screen relative shadow-2xl overflow-hidden">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/check-mail" element={<CheckMailScreen />} />

          {/* Main App Routes */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/success" element={<OrderSuccessScreen />} />

          {/* Profile & User Routes */}
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/order-history" element={<OrderHistoryScreen />} />
          <Route path="/change-password" element={<ChangePasswordScreen />} />
          <Route
            path="/change-password-success"
            element={<ChangePasswordSuccessScreen />}
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardScreen />} />
          <Route path="/admin/settings" element={<AdminSettingsScreen />} />
          <Route path="/admin/products" element={<AdminProductListScreen />} />
          <Route
            path="/admin/add-product"
            element={<AdminAddProductScreen />}
          />
          <Route path="/admin/orders" element={<AdminOrderListScreen />} />
          <Route
            path="/admin/orders/:id"
            element={<AdminOrderDetailScreen />}
          />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <ScrollToTop />
        <AppContent />
      </AppProvider>
    </HashRouter>
  );
}
