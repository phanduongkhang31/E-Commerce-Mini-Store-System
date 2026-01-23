import React, { createContext, useContext, useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, signOut, type User as FirebaseUser } from "firebase/auth";
import { MOCK_PRODUCTS, MOCK_ORDERS } from "./constants";
import { CartItem, Product, Order, User, Address, Category, AdminSettings } from "./types";
import { Toast } from "./components/Components";
import { ProtectedRoute } from "./components/ProtectedRoute"; // Import ProtectedRoute
import { auth, googleProvider } from "./firebase";
import defaultAvatar from "./assets/avatar-default.svg";

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
import AdminEditProductScreen from "./screens/AdminEditProductScreen"; // Mới
import AdminOrderListScreen from "./screens/AdminOrderListScreen";
import AdminOrderDetailScreen from "./screens/AdminOrderDetailScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminSettingsScreen from "./screens/AdminSettingsScreen";
import AdminCategoriesScreen from "./screens/AdminCategoriesScreen";
import AdminCustomersScreen from "./screens/AdminCustomersScreen";
import WishlistScreen from "./screens/WishlistScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import PersonalDetailsScreen from "./screens/PersonalDetailsScreen";
import ShippingAddressesScreen from "./screens/ShippingAddressesScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import QRPaymentScreen from "./screens/QRPaymentScreen";

// Language

const API_BASE_URL = "http://localhost/ministore/api";

const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  storeName: "MiniStore",
  supportEmail: "help@awesomeshop.com",
  logo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAHr7pVeZ-jtMQ3N6mGnJuUPq2b5FNcVYOqBl7LfVek9Nksrzz4xXBybG8fOsEMkzYMLMqdsewmzGZKr9tjq68q4wOtQgxjY-naWAaVGtKYftSG2gNdUax5ll6wGocD8PBGFx4LcTgEqaWbPgANV5a2UMXq2E_IAwjclimaCCnYqHebsNlsaMQCKocNjeE-sMbNGN5heAm8GhdA4pxUpgYEhJiVotgV3L5EearPVvHzskobImiecYK68kr8HC7PyVtd3guoU1z0JwU",
  currency: "USD",
  taxRate: 8.5,
  pushEnabled: true,
  emailEnabled: false,
};

const buildCategoryId = (name: string) => {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base || `cat-${Math.random().toString(36).slice(2, 8)}`;
};

const buildDefaultCategories = (items: Product[]) => {
  const unique = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean))
  );
  return unique.map((name) => ({ id: buildCategoryId(name), name }));
};

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: 'admin' | 'user') => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUserDetails: (details: Partial<User>) => void;
  
  products: Product[];
  categories: Category[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  adminSettings: AdminSettings;
  
  setSearchQuery: (query: string) => void;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  
  addProduct: (product: Omit<Product, "id" | "reviews" | "rating">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void; // Mới
  deleteProduct: (productId: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  
  placeOrder: (order: any) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void; // Mới
  
  // Address logic (simplified for context)
	addAddress: (addr: Omit<Address, "id">) => void;
	updateAddress: (id: string, addr: Partial<Omit<Address, "id">>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  showToast: (message: string) => void;
  isLoading: boolean;
  isOfflineMode: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// Re-export shared types for screens that import from "../App"
export type { Address };

const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  // Auth State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem("adminSettings");
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_SETTINGS;
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
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

  // --- Mock Data Loading ---
  useEffect(() => {
    // Simulate API Load
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setOrders(MOCK_ORDERS);
      setIsLoading(false);
      setIsOfflineMode(true);
    }, 500);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("adminSettings", JSON.stringify(adminSettings));
  }, [adminSettings]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (categories.length === 0 && products.length > 0) {
      setCategories(buildDefaultCategories(products));
    }
  }, [categories.length, products]);

  const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  const resolveRoleFromEmail = (email?: string | null): "admin" | "user" => {
    if (!email) return "user";
    return adminEmails.includes(email) ? "admin" : "user";
  };

  const buildUserFromFirebase = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    name: firebaseUser.displayName || "Google User",
    email: firebaseUser.email || "",
    role: resolveRoleFromEmail(firebaseUser.email),
    avatar: firebaseUser.photoURL || defaultAvatar,
    phone: firebaseUser.phoneNumber || undefined,
    addresses: [],
    authProvider: "firebase",
  });

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser((current) => {
        if (firebaseUser) return buildUserFromFirebase(firebaseUser);
        if (current?.authProvider === "firebase") return null;
        return current;
      });
    });

    return () => unsubscribe();
  }, []);

  // --- Auth Logic ---
  const login = (email: string, role: 'admin' | 'user') => {
    const mockUser: User = {
      id: 'u1',
      name: role === 'admin' ? 'Admin User' : 'Sarah Jenkins',
      email: email,
      role: role,
      avatar: defaultAvatar,
      phone: '0901234567',
      birthdate: '01/01/1990',
      addresses: [],
      authProvider: "local",
    };
    setUser(mockUser);
  };

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      showToast("Thi?u c?u h?nh ??ng nh?p Google.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const nextUser = buildUserFromFirebase(result.user);
      setUser(nextUser);
      showToast(`Ch?o m?ng ${nextUser.role === "admin" ? "Admin" : "b?n"}!`);
      navigate(nextUser.role === "admin" ? "/admin" : "/");
    } catch (error) {
      showToast("??ng nh?p Google th?t b?i.");
    }
  };

  const logout = () => {
    if (auth && user?.authProvider === "firebase") {
      signOut(auth).catch(() => undefined);
    }
    setUser(null);
    navigate('/welcome');
  };

  const updateUserDetails = (details: Partial<User>) => {
    if (user) setUser({ ...user, ...details });
    showToast("Đã cập nhật hồ sơ");
  };

  // --- Feature Logic ---
  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Xóa khỏi yêu thích");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Thêm vào yêu thích");
        return [...prev, productId];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast("Đã xóa yêu thích");
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
    showToast(`Thêm ${product.name} vào giỏ hàng`);
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

  // --- Admin Product Logic ---
  const addProduct = async (newProductData: Omit<Product, "id" | "reviews" | "rating">) => {
    const tempId = Math.random().toString(36).substr(2, 9);
    const newProd = { ...newProductData, id: tempId, rating: 0, reviews: 0 };
    setProducts((prev: Product[]) => [...prev, newProd]);
    if (newProductData.category) {
      setCategories((prev) => {
        if (prev.some((cat) => cat.name === newProductData.category)) return prev;
        return [...prev, { id: buildCategoryId(newProductData.category), name: newProductData.category }];
      });
    }
    showToast("Thêm sản phẩm");
    navigate("/admin/products");
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
    const nextCategory = productData.category;
    if (nextCategory) {
      setCategories((prev) => {
        if (prev.some((cat) => cat.name === nextCategory)) return prev;
        return [...prev, { id: buildCategoryId(nextCategory), name: nextCategory }];
      });
    }
    showToast("Đã cập nhật sản phẩm");
  };

  const deleteProduct = async (productId: string) => {
    setProducts((prev: Product[]) => prev.filter((p: Product) => p.id !== productId));
    showToast("Xóa sản phẩm");
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: buildCategoryId(category.name) };
    setCategories((prev) => [...prev, newCategory]);
    showToast("Đã thêm danh mục");
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    const current = categories.find((item) => item.id === id);
    setCategories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...category } : item))
    );
    if (current && category.name && current.name !== category.name) {
      setProducts((prev) =>
        prev.map((product) =>
          product.category === current.name
            ? { ...product, category: category.name as string }
            : product
        )
      );
    }
    showToast("Đã cập nhật danh mục");
  };

  const deleteCategory = (id: string) => {
    const category = categories.find((item) => item.id === id);
    setCategories((prev) => prev.filter((item) => item.id !== id));
    if (category) {
      setProducts((prev) =>
        prev.map((product) =>
          product.category === category.name
            ? { ...product, category: "Chưa phân loại" }
            : product
        )
      );
    }
    showToast("Đã xóa danh mục");
  };

  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    setAdminSettings((prev) => ({ ...prev, ...settings }));
  };

  // --- Order Logic ---
  const placeOrder = async (orderData: any) => {
    clearCart();
    const newOrder: Order = {
      id: orderData?.id || `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleString(),
      status: 'Processing',
      total: orderData.total,
      items: orderData.items,
      image: orderData.image,
      customer: user?.name || "Guest",
      lineItems: orderData.lineItems,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      phone: orderData.phone,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Đã cập nhật trạng thái đơn hàng #${orderId}`);
  };

  // --- Address Logic Mock ---
	const addAddress = (addr: Omit<Address, "id">) => {
    if (!user) return;
		const newAddr: Address = { ...addr, id: Math.random().toString() };
		const updatedAddresses: Address[] = [...(user.addresses || []), newAddr];
		setUser({ ...user, addresses: updatedAddresses });
    showToast("Thêm địa chỉ");
  };
	const updateAddress = (id: string, addr: Partial<Omit<Address, "id">>) => {
		if (!user) return;
		const updatedAddresses: Address[] = (user.addresses || []).map((a) =>
			a.id === id ? ({ ...a, ...addr } as Address) : a
		);
		setUser({ ...user, addresses: updatedAddresses });
		showToast("Đã cập nhật địa chỉ");
	};
	const deleteAddress = (id: string) => {
		if (!user) return;
		const updatedAddresses: Address[] = (user.addresses || []).filter((a) => a.id !== id);
		setUser({ ...user, addresses: updatedAddresses });
		showToast("Xóa địa chỉ");
	};
	const setDefaultAddress = (id: string) => {
		if (!user) return;
		const updatedAddresses: Address[] = (user.addresses || []).map((a) => ({
			...a,
			isDefault: a.id === id,
		}));
		setUser({ ...user, addresses: updatedAddresses });
		showToast("Đặt địa chỉ mặc định");
	};

  return (
    <AppContext.Provider
      value={{
        user, isAuthenticated: !!user, login, loginWithGoogle, logout, updateUserDetails,
        products, categories, orders, cart, wishlist, searchQuery, adminSettings,
        setSearchQuery, toggleWishlist, clearWishlist, addToCart, removeFromCart, updateQuantity, clearCart,
        addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory, updateAdminSettings,
        placeOrder, updateOrderStatus,
        addAddress, updateAddress, deleteAddress, setDefaultAddress,
        showToast, isLoading, isOfflineMode,
      }}
    >
      {children}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </AppContext.Provider>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Wrapper
const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-[#121121] min-h-screen relative shadow-2xl overflow-hidden">
        <Routes>
           {/* Public Routes */}
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/check-mail" element={<CheckMailScreen />} />

          {/* User Protected Routes */}
          <Route path="/" element={<ProtectedRoute requireAuth><HomeScreen /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute requireAuth><CategoriesScreen /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute requireAuth><ProductDetailScreen /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute requireAuth><WishlistScreen /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute requireAuth><CartScreen /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute requireAuth><CheckoutScreen /></ProtectedRoute>} />
          <Route path="/payment-qr" element={<ProtectedRoute requireAuth><QRPaymentScreen /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute requireAuth><OrderSuccessScreen /></ProtectedRoute>} />
          
          {/* Profile Section */}
          <Route path="/profile" element={<ProtectedRoute requireAuth><ProfileScreen /></ProtectedRoute>} />
          <Route path="/personal-details" element={<ProtectedRoute requireAuth><PersonalDetailsScreen /></ProtectedRoute>} />
          <Route path="/shipping-addresses" element={<ProtectedRoute requireAuth><ShippingAddressesScreen /></ProtectedRoute>} />
          <Route path="/order-history" element={<ProtectedRoute requireAuth><OrderHistoryScreen /></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute requireAuth><ChangePasswordScreen /></ProtectedRoute>} />
          <Route path="/change-password-success" element={<ProtectedRoute requireAuth><ChangePasswordSuccessScreen /></ProtectedRoute>} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboardScreen /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettingsScreen /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute requireAdmin><AdminProductListScreen /></ProtectedRoute>} />
          <Route path="/admin/add-product" element={<ProtectedRoute requireAdmin><AdminAddProductScreen /></ProtectedRoute>} />
          <Route path="/admin/edit-product/:id" element={<ProtectedRoute requireAdmin><AdminEditProductScreen /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute requireAdmin><AdminCategoriesScreen /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute requireAdmin><AdminCustomersScreen /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute requireAdmin><AdminOrderListScreen /></ProtectedRoute>} />
          <Route path="/admin/orders/:id" element={<ProtectedRoute requireAdmin><AdminOrderDetailScreen /></ProtectedRoute>} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
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
