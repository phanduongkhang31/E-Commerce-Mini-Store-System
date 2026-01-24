import React, { createContext, useContext, useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  CartItem,
  Product,
  Order,
  User,
  Address,
  Category,
  AdminSettings,
} from "./types";
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
import AdminEditProductScreen from "./screens/AdminEditProductScreen";
import AdminOrderListScreen from "./screens/AdminOrderListScreen";
import AdminOrderDetailScreen from "./screens/AdminOrderDetailScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminSettingsScreen from "./screens/AdminSettingsScreen";
import AdminCategoriesScreen from "./screens/AdminCategoriesScreen";
import AdminCustomersScreen from "./screens/AdminCustomersScreen";
import AdminCustomerDetailScreen from "./screens/AdminCustomerDetailScreen";
import WishlistScreen from "./screens/WishlistScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import PersonalDetailsScreen from "./screens/PersonalDetailsScreen";
import ShippingAddressesScreen from "./screens/ShippingAddressesScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import QRPaymentScreen from "./screens/QRPaymentScreen";

// Language

const API_BASE_URL = "http://localhost/api";

const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  storeName: "MiniStore",
  supportEmail: "help@awesomeshop.com",
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHr7pVeZ-jtMQ3N6mGnJuUPq2b5FNcVYOqBl7LfVek9Nksrzz4xXBybG8fOsEMkzYMLMqdsewmzGZKr9tjq68q4wOtQgxjY-naWAaVGtKYftSG2gNdUax5ll6wGocD8PBGFx4LcTgEqaWbPgANV5a2UMXq2E_IAwjclimaCCnYqHebsNlsaMQCKocNjeE-sMbNGN5heAm8GhdA4pxUpgYEhJiVotgV3L5EearPVvHzskobImiecYK68kr8HC7PyVtd3guoU1z0JwU",
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
    new Set(items.map((item) => item.category).filter(Boolean)),
  );
  return unique.map((name) => ({ id: buildCategoryId(name), name }));
};

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: "admin" | "user") => void;
  loginWithPassword: (
    email: string,
    password: string,
  ) => Promise<"admin" | "user" | null>;
  registerUser: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
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
  updateOrderStatus: (orderId: string, status: Order["status"]) => void; // Mới

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
    const saved = localStorage.getItem("user");
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
    const saved = localStorage.getItem("wishlist");
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

  useEffect(() => {
    let isMounted = true;

    const loadStoreData = async () => {
      setIsLoading(true);
      try {
        const [categoryRes, productRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories.php`),
          fetch(`${API_BASE_URL}/products.php`),
        ]);

        if (!categoryRes.ok || !productRes.ok) {
          throw new Error("API request failed");
        }

        const categoryData = await categoryRes.json();
        const productData = await productRes.json();

        const categoriesFromApi: Category[] = Array.isArray(categoryData)
          ? categoryData.map((item: { id: number | string; name: string }) => ({
              id: String(item.id),
              name: item.name,
            }))
          : [];
        const categoryMap = new Map<number, string>(
          categoriesFromApi.map((cat) => [Number(cat.id), cat.name]),
        );

        const productsFromApi: Product[] = Array.isArray(productData)
          ? productData.map(
              (item: {
                id: number | string;
                category_id: number | string;
                category?: string;
                category_name?: string;
                name: string;
                price: number | string;
                sale_price?: number | string;
                description?: string;
                thumb?: string;
                stock?: number | string;
                rating?: number | string;
                review_count?: number | string;
              }) => {
                const basePrice = Number(item.price) || 0;
                const salePrice = Number(item.sale_price) || 0;
                const hasDiscount =
                  salePrice > 0 && (basePrice === 0 || salePrice < basePrice);
                const finalPrice = hasDiscount ? salePrice : basePrice;

                return {
                  id: String(item.id),
                  name: item.name,
                  price: finalPrice,
                  originalPrice:
                    hasDiscount && basePrice > 0 ? basePrice : undefined,
                  category:
                    item.category ||
                    item.category_name ||
                    categoryMap.get(Number(item.category_id)) ||
                    "Chưa phân loại",
                  rating: Number(item.rating) || 0,
                  reviews: Number(item.review_count) || 0,
                  stock: Number(item.stock) || 0,
                  image: item.thumb || "https://placehold.co/400",
                  description: item.description || "Chưa có mô tả",
                };
              },
            )
          : [];

        let ordersFromApi: Order[] = [];
        try {
          const orderRes = await fetch(`${API_BASE_URL}/orders.php`);
          if (orderRes.ok) {
            const orderData = await orderRes.json();
            ordersFromApi = Array.isArray(orderData)
              ? orderData.map((item: Record<string, unknown>) => {
                  const rawStatus = String(item.status || "").toLowerCase();
                  const status: Order["status"] =
                    rawStatus.includes("ship")
                      ? "Shipped"
                      : rawStatus.includes("deliver")
                      ? "Delivered"
                      : rawStatus.includes("cancel") || rawStatus.includes("huy")
                      ? "Cancelled"
                      : "Processing";

                  return {
                    id: String(
                      item.id ?? item.order_id ?? `ORD-${Math.floor(Math.random() * 10000)}`,
                    ),
                    date: String(item.date ?? item.created_at ?? new Date().toLocaleString()),
                    status,
                    total: Number(item.total ?? item.tongtien ?? 0) || 0,
                    items: Number(item.items ?? item.soluong ?? 1) || 1,
                    image: String(item.image ?? item.hinhanh ?? "https://placehold.co/400"),
                    customer: String(item.customer ?? item.khachhang ?? "Khách"),
                    lineItems: item.lineItems as Order["lineItems"],
                    shippingAddress: String(item.shippingAddress ?? item.shipping_address ?? ""),
                    paymentMethod: String(item.paymentMethod ?? item.payment_method ?? ""),
                    phone: String(item.phone ?? item.sdt ?? ""),
                  };
                })
              : [];
          }
        } catch {
          ordersFromApi = [];
        }

        if (!isMounted) return;
        setCategories(
          categoriesFromApi.length > 0
            ? categoriesFromApi
            : buildDefaultCategories(productsFromApi),
        );
        setProducts(productsFromApi);
        setOrders(ordersFromApi);
        setIsOfflineMode(false);
      } catch {
        if (!isMounted) return;
        setProducts([]);
        setOrders([]);
        setCategories([]);
        setIsOfflineMode(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadStoreData();
    return () => {
      isMounted = false;
    };
  }, [user?.role]);

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
    .map((email: string) => email.trim())
    .filter(Boolean);

  const resolveRoleFromEmail = (email?: string | null): "admin" | "user" => {
    if (!email) return "user";
    return adminEmails.includes(email) ? "admin" : "user";
  };

  type ApiLoginResponse = {
    ok: boolean;
    token?: string;
    user?: {
      id: number | string;
      full_name?: string;
      email?: string;
      is_admin?: number | boolean;
      role?: string | null;
    };
    error?: string;
    message?: string;
  };

  type ApiRegisterResponse = {
    ok: boolean;
    user_id?: number | string;
    error?: string;
    message?: string;
  };

  type ApiCreateProductResponse = {
    id?: number | string;
    error?: string;
    message?: string;
  };

  const apiFetch = async <T,>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    let data: unknown = null;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        (data as { error?: string; message?: string } | null)?.error ||
        (data as { message?: string } | null)?.message ||
        (typeof data === "string" ? data : "");
      throw new Error(errorMessage || `API ${path} failed`);
    }

    return data as T;
  };

  const findCategoryIdByName = (name?: string) => {
    if (!name) return 0;
    const match = categories.find((item) => item.name === name);
    return match ? Number(match.id) : 0;
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
  const loginWithPassword = async (email: string, password: string) => {
    if (!email.trim() || !password) {
      showToast("Vui lòng nhập email và mật khẩu");
      return null;
    }

    try {
      const data = await apiFetch<ApiLoginResponse>("auth_login.php", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!data?.ok || !data.user) {
        throw new Error("Invalid credentials");
      }

      const userEmail = data.user.email ?? "";
      const roleFromDb =
        data.user.role === "admin" || data.user.role === "user"
          ? data.user.role
          : null;
      const role =
        roleFromDb ??
        (data.user.is_admin ? "admin" : resolveRoleFromEmail(userEmail));
      const nextUser: User = {
        id: String(data.user.id),
        name: data.user.full_name || userEmail,
        email: userEmail,
        role,
        avatar: defaultAvatar,
        phone: user?.phone || "",
        addresses: user?.addresses || [],
        authProvider: "local",
      };

      setUser(nextUser);
      return role;
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      showToast(message || "Đăng nhập thất bại");
      return null;
    }
  };

  const registerUser = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    try {
      const data = await apiFetch<ApiRegisterResponse>("auth_register.php", {
        method: "POST",
        body: JSON.stringify({ full_name: fullName, email, password }),
      });

      if (!data?.ok) {
        throw new Error("Register failed");
      }

      showToast("Đăng ký thành công");
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      showToast(message || "Đăng ký thất bại");
      return false;
    }
  };

  const login = (email: string, role: "admin" | "user") => {
    const mockUser: User = {
      id: "u1",
      name: role === "admin" ? "Admin User" : "Sarah Jenkins",
      email: email,
      role: role,
      avatar: defaultAvatar,
      phone: "0901234567",
      birthdate: "01/01/1990",
      addresses: [],
      authProvider: "local",
    };
    setUser(mockUser);
  };

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      showToast("Thiếu cấu hình đăng nhập Google.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const nextUser = buildUserFromFirebase(result.user);
      setUser(nextUser);
      showToast(`Chào mừng ${nextUser.role === "admin" ? "Admin" : "bạn"}!`);
      navigate(nextUser.role === "admin" ? "/admin" : "/");
    } catch (error) {
      showToast("Đăng nhập Google thất bại.");
    }
  };

  const logout = () => {
    if (auth && user?.authProvider === "firebase") {
      signOut(auth).catch(() => undefined);
    }
    setUser(null);
    navigate("/welcome");
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
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Xóa khỏi yêu thích");
        return prev.filter((id) => id !== productId);
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
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
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
      }),
    );
  };

  const clearCart = () => setCart([]);

  // --- Admin Product Logic ---
  const addProduct = async (
    newProductData: Omit<Product, "id" | "reviews" | "rating">,
  ) => {
    try {
      const fallbackCategoryId = categories[0] ? Number(categories[0].id) : 0;
      const categoryId =
        findCategoryIdByName(newProductData.category) || fallbackCategoryId;
      if (!categoryId) {
        showToast("Vui lòng chọn danh mục");
        return;
      }

      const basePrice = newProductData.originalPrice ?? newProductData.price;
      const salePrice = newProductData.originalPrice ? newProductData.price : 0;

      const payload = {
        category_id: categoryId,
        name: newProductData.name,
        price: basePrice,
        sale_price: salePrice,
        description: newProductData.description || "",
        thumb: newProductData.image || "",
        stock: newProductData.stock ?? 0,
      };

      const data = await apiFetch<ApiCreateProductResponse>("product_create.php", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const newProd: Product = {
        id: String(data.id ?? Math.random().toString(36).slice(2, 9)),
        name: newProductData.name,
        price: newProductData.price,
        originalPrice: newProductData.originalPrice,
        category: newProductData.category || "Chưa phân loại",
        image: newProductData.image || "",
        description: newProductData.description || "",
        rating: 0,
        reviews: 0,
        stock: newProductData.stock ?? 0,
      };

      setProducts((prev: Product[]) => [...prev, newProd]);
      showToast("Thêm sản phẩm");
      navigate("/admin/products");
    } catch {
      showToast("Thêm sản phẩm thất bại");
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const payload: Record<string, unknown> = { id };

      if (productData.category) {
        const categoryId = findCategoryIdByName(productData.category);
        if (categoryId) payload.category_id = categoryId;
      }

      if (typeof productData.price === "number") {
        payload.price = productData.originalPrice ?? productData.price;
        payload.sale_price = productData.originalPrice ? productData.price : 0;
      }

      if (typeof productData.stock === "number")
        payload.stock = productData.stock;
      if (typeof productData.name === "string") payload.name = productData.name;
      if (typeof productData.description === "string")
        payload.description = productData.description;
      if (typeof productData.image === "string")
        payload.thumb = productData.image;

      await apiFetch("product_update.php", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...productData } : p)),
      );
      showToast("Đã cập nhật sản phẩm");
    } catch {
      showToast("Cập nhật sản phẩm thất bại");
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await apiFetch(`product_delete.php?id=${productId}`, { method: "GET" });
      setProducts((prev: Product[]) =>
        prev.filter((p: Product) => p.id !== productId),
      );
      showToast("Xóa sản phẩm");
    } catch {
      showToast("Xóa sản phẩm thất bại");
    }
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: buildCategoryId(category.name) };
    setCategories((prev) => [...prev, newCategory]);
    showToast("Đã thêm danh mục");
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    const current = categories.find((item) => item.id === id);
    setCategories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...category } : item)),
    );
    if (current && category.name && current.name !== category.name) {
      setProducts((prev) =>
        prev.map((product) =>
          product.category === current.name
            ? { ...product, category: category.name as string }
            : product,
        ),
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
            : product,
        ),
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
      status: "Processing",
      total: orderData.total,
      items: orderData.items,
      image: orderData.image,
      customer: user?.name || "Guest",
      lineItems: orderData.lineItems,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      phone: orderData.phone,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
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
      a.id === id ? ({ ...a, ...addr } as Address) : a,
    );
    setUser({ ...user, addresses: updatedAddresses });
    showToast("Đã cập nhật địa chỉ");
  };
  const deleteAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses: Address[] = (user.addresses || []).filter(
      (a) => a.id !== id,
    );
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
        user,
        isAuthenticated: !!user,
        login,
        loginWithPassword,
        registerUser,
        loginWithGoogle,
        logout,
        updateUserDetails,
        products,
        categories,
        orders,
        cart,
        wishlist,
        searchQuery,
        adminSettings,
        setSearchQuery,
        toggleWishlist,
        clearWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        updateAdminSettings,
        placeOrder,
        updateOrderStatus,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        showToast,
        isLoading,
        isOfflineMode,
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute requireAuth>
                <CategoriesScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute requireAuth>
                <ProductDetailScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute requireAuth>
                <WishlistScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requireAuth>
                <CartScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute requireAuth>
                <CheckoutScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-qr"
            element={
              <ProtectedRoute requireAuth>
                <QRPaymentScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute requireAuth>
                <OrderSuccessScreen />
              </ProtectedRoute>
            }
          />

          {/* Profile Section */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute requireAuth>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal-details"
            element={
              <ProtectedRoute requireAuth>
                <PersonalDetailsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping-addresses"
            element={
              <ProtectedRoute requireAuth>
                <ShippingAddressesScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute requireAuth>
                <OrderHistoryScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute requireAuth>
                <ChangePasswordScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password-success"
            element={
              <ProtectedRoute requireAuth>
                <ChangePasswordSuccessScreen />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboardScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requireAdmin>
                <AdminSettingsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute requireAdmin>
                <AdminProductListScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute requireAdmin>
                <AdminAddProductScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <ProtectedRoute requireAdmin>
                <AdminEditProductScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requireAdmin>
                <AdminCategoriesScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute requireAdmin>
                <AdminCustomersScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers/:customerId"
            element={
              <ProtectedRoute requireAdmin>
                <AdminCustomerDetailScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute requireAdmin>
                <AdminOrderListScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders/:id"
            element={
              <ProtectedRoute requireAdmin>
                <AdminOrderDetailScreen />
              </ProtectedRoute>
            }
          />

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
