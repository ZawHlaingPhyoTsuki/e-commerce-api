import { z } from "zod";

// ____________ User ____________
export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["USER", "ADMIN"]).optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  }),
});

// ____________ Product ____________
export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().positive("Price must be a positive number"),
    categoryId: z.string().optional(),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
    images: z.array(z.string()).optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    categoryId: z.string().optional(),
    stock: z
      .number()
      .int()
      .nonnegative("Stock must be a non-negative integer")
      .optional(),
    images: z.array(z.string()).optional(),
  }),
});

// ____________ Order ____________
export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string(),
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
        price: z.number().positive("Price must be a positive number"),
      })
    ),
    totalAmount: z.number().positive("Total amount must be a positive number"),
    status: z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]).optional(),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    items: z
      .array(
        z.object({
          productId: z.string(),
          quantity: z
            .number()
            .int()
            .positive("Quantity must be a positive integer"),
          price: z.number().positive("Price must be a positive number"),
        })
      )
      .optional(),
    totalAmount: z
      .number()
      .positive("Total amount must be a positive number")
      .optional(),
    status: z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]).optional(),
  }),
});

// ___________ REVIEWS ___________
export const createReviewSchema = z.object({
  body: z.object({
    userId: z.string(),
    productId: z.string(),
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: z.string().optional(),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5")
      .optional(),
    comment: z.string().optional(),
  }),
});

// ________________ WISHLIST ______________
export const createWishlistSchema = z.object({
  body: z.object({
    userId: z.string(),
    productId: z.string(),
  }),
});

export const updateWishlistSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    productId: z.string().optional(),
  }),
});

// ________________ CATEGORY ______________
export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().optional(),
  }),
});

// ________________ PAYMENT ______________
export const createPaymentSchema = z.object({
  body: z.object({
    orderId: z.string(),
    amount: z.number().positive("Amount must be a positive number"),
    paymentMethod: z.string(),
    status: z.enum(["PENDING", "COMPLETED", "FAILED"]).optional(),
  }),
});

export const updatePaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive("Amount must be a positive number").optional(),
    paymentMethod: z.string().optional(),
    status: z.enum(["PENDING", "COMPLETED", "FAILED"]).optional(),
  }),
});

// ________________ CART ITEM ______________
export const createCartItemSchema = z.object({
  body: z.object({
    userId: z.string(),
    productId: z.string(),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
  }),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z
      .number()
      .int()
      .positive("Quantity must be a positive integer")
      .optional(),
  }),
});

// ________________ ORDER ITEM ______________
export const createOrderItemSchema = z.object({
  body: z.object({
    orderId: z.string(),
    productId: z.string(),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    price: z.number().positive("Price must be a positive number"),
  }),
});

export const updateOrderItemSchema = z.object({
  body: z.object({
    quantity: z
      .number()
      .int()
      .positive("Quantity must be a positive integer")
      .optional(),
    price: z.number().positive("Price must be a positive number").optional(),
  }),
});
