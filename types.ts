
export interface Product {
    id: string;
name: string;
price: number;
originalPrice?: number;
category: string;
image: string;
rating: number;
reviews: number;
stock: number;
description: string;
}

export interface CartItem extends Product {
quantity: number;
selectedVariant?: string;
}

export interface OrderItem {
id: string;
name: string;
image: string;
price: number;
quantity: number;
}

export interface Order {
id: string;
date: string;
status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
total: number;
items: number;
image: string;
customer?: string;
lineItems?: OrderItem[];
shippingAddress?: string;
paymentMethod?: string;
phone?: string;
}

export interface User {
id: string;
name: string;
email: string;
role: 'admin' | 'user';
authProvider?: 'firebase' | 'local'; // Thêm role
avatar: string;
phone?: string;
birthdate?: string;
addresses?: Address[];
}

export interface Category {
id: string;
name: string;
description?: string;
}

export interface AdminSettings {
storeName: string;
supportEmail: string;
logo: string;
currency: string;
taxRate: number;
pushEnabled: boolean;
emailEnabled: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault?: boolean;
}
