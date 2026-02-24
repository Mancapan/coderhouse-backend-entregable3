/**
 * routes: consume el controlador y sus métodos
 */

import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const router = Router();

router.get("/", cartController.getAll);
router.get("/:cid", cartController.getById);
router.post("/", cartController.create);
router.post("/:cid/products/:pid", cartController.addProduct);
router.delete("/:cid/products/:pid", cartController.removeProduct);
router.delete("/:cid", cartController.clearCart);
router.delete("/:cid/delete", cartController.delete);

export default router;