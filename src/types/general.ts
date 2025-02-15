import {
  CartItem,
  Category,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Review,
  User,
  WishlistItem,
} from "@prisma/client";

// _________ Product _____________
export type TProduct = Product;
export type TIdProduct = Product["id"];
export type TCreateProduct = Omit<TProduct, "id" | "createdAt" | "updatedAt">;
export type TUpdateProduct = Partial<TCreateProduct>;

// ___________ Category _____________
export type TCategory = Category;
export type TIdCategory = Category["id"];
export type TCreateCategory = Omit<TCategory, "id" | "createdAt" | "updatedAt">;
export type TUpdateCategory = Partial<TCreateCategory>;

// ___________ User _____________
export type TUser = User;
export type TIdUser = User["id"];
export type TCreateUser = Omit<TUser, "id" | "createdAt" | "updatedAt">;
export type TUpdateUser = Partial<TCreateUser>;

// ___________ Order _____________
export type TOrder = {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type TIdOrder = TOrder["id"];
export type TCreateOrder = {
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
};
export type TUpdateOrderStatus = {
  status: OrderStatus;
};

// ___________ Wishlist _____________
export type TWishlistItem = WishlistItem;
export type TIdWishlistItem = WishlistItem["id"];
export type TCreateWishlistItem = Omit<
  TWishlistItem,
  "id" | "createdAt" | "updatedAt"
>;

// ___________ Cart _____________
export type TCartItem = CartItem;
export type TIdCartItem = TCartItem["id"];
export type TCreateCartItem = Omit<TCartItem, "id" | "createdAt" | "updatedAt">;
export type TUpdateCartItem = Omit<
  TCartItem,
  "createdAt" | "updatedAt" | "productId"
>;

// ___________ Review _____________
export type TReview = Review;
export type TIdReview = TReview["id"];
export type TUpdateReview = Omit<TReview, "createdAt" | "updatedAt">;
export type TCreateReview = Omit<TReview, "id" | "createdAt" | "updatedAt">;
