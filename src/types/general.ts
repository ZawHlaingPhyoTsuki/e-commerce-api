import { Category, Order , Product, Review, User, WishlistItem } from "@prisma/client";


// _________ Product _____________
export type TProduct = Product;

export type TIdProduct = Product['id']
export type TCreateProduct = Omit<TProduct, "id" | "createdAt" | "updatedAt">;
export type TUpdateProduct = Partial<TCreateProduct>;

// ___________ Category _____________
export type TCategory = Category;

export type TIdCategory = Category['id']
export type TCreateCategory = Omit<TCategory, "id" | "createdAt" | "updatedAt">;
export type TUpdateCategory = Partial<TCreateCategory>;

// ___________ User _____________
export type TUser = User;

export type TIdUser = User['id']
export type TCreateUser = Omit<TUser, "id" | "createdAt" | "updatedAt">;
export type TUpdateUser = Partial<TCreateUser>;

// ___________ Order _____________
export type TOrder = Order;

export type TIdOrder = Order['id']
export type TCreateOrder = Omit<TOrder, "id" | "createdAt" | "updatedAt">;
// export type TUpdateOrder = Partial<TCreateOrder>;


// ___________ Wishlist _____________
export type TWishlistItem = WishlistItem;

export type TIdWishlistItem = WishlistItem['id']
export type TCreateWishlistItem = Omit<TWishlistItem, "id" | "createdAt" | "updatedAt">;
export type TUpdateWishlistItem = Partial<TCreateWishlistItem>;

// ___________ Review _____________
export type TReview = Review;

export type TIdReview = Review['id']
export type TCreateReview = Omit<TReview, "id" | "createdAt" | "updatedAt">;
export type TUpdateReview = Partial<TCreateReview>;