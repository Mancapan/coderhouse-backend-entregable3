/**
 * routes: consume el controlador y sus metodos
 * 
 */

import { Router } from "express";
import { productController } from "../controllers/product-controller.js";

const router = Router();


/*
console.log("getAll:", typeof productController.getAll);
console.log("getById:", typeof productController.getById);
console.log("getByName:", typeof productController.getByName);
console.log("create:", typeof productController.create);
console.log("update:", typeof productController.update);
console.log("delete:", typeof productController.delete);
*/

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.get("/name/:title",productController.getByName);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;



