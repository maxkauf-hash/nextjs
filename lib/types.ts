export type ProductsType = {
  id: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  quantity: number;
};

export type UsersType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  zip: string;
  city: string;
  phone: string;
};

export type OrdersType = {
  userId: string;
  totalAmount: number;
  status: string;
};

export type OrderDetailsType = {
  orderId: string;
  productId: string;
  quantity: number;
  total: number;
};

export type SessionType = {
  expiresAt: Date;
  userId: string;
};

export type RegisterType = {
  message: string;
};

export type SessionContextType = {
  user: UsersType | null;
  loading: boolean;
  setUser: (user: UsersType | null) => void;
};

export type SessionPayload = {
  sessionId: string;
  expiresAt: Date;
  userId: string;
};

export type CartItem = {
  id: string;
  quantity: number;
};

export type CartContextType = {
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  removeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};
