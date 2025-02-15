import { Router } from "express";
import ProductRoute from "./product.router";
import AuthRoute from "./auth.router";
import CategoryRoute from "./category.router";
import WishlistRoute from "./wishlist.router";
import UserRoute from "./user.router";
import OrderRoute from "./order.router";
import ReviewRoute from "./review.router";
import cartRoute from "./cart.router";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/products", ProductRoute);
router.use("/categories", CategoryRoute);
router.use("/wishlists", WishlistRoute);
router.use("/users", UserRoute);
router.use("/orders", OrderRoute);
router.use("/reviews", ReviewRoute);
router.use("/carts", cartRoute)

export default router;
