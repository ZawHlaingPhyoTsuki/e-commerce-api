import { Router } from "express";
import ProductRoute from "./product.router";
import AuthRoute from "./auth.router";
import CategoryRoute from "./category.router";
import WishlistRoute from "./wishlist.router";
import UserRoute from "./user.router";
import OrderRoute from "./order.router";
import ReviewRoute from "./review.router";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/products", ProductRoute);
router.use("/categories", CategoryRoute);
router.use("/wishlist", WishlistRoute);
router.use("/users", UserRoute);
router.use("/orders", OrderRoute);
router.use("/reviews", ReviewRoute);

export default router;
