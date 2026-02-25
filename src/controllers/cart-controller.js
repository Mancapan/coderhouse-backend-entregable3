/*
Controller = consume el repositorio con sus métodos, genera errores y validaciones
*/

import { cartRepository } from "../repositories/cart-repository.js";
import { CustomError } from "../utils/custom-error.js";

class CartController {
  constructor(repository) {
    this.repository = repository;
  }

  // GET /api/carts
  getAll = async (req, res, next) => {
    try {
      const response = await this.repository.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/carts/:cid
  getById = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await this.repository.getById(cid);
      if (!response) throw new CustomError("Cart NOT found", 404);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/carts
  create = async (req, res, next) => {
    try {
      const response = await this.repository.create();
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/carts/:cid/products/:pid
  addProduct = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const qty = quantity ?? 1;

      if (Number.isNaN(Number(qty)) || Number(qty) < 1) {
        throw new CustomError("Quantity must be a number >= 1", 400);
      }

      const response = await this.repository.addProduct(cid, pid, Number(qty));
      if (!response) throw new CustomError("Cart NOT found", 404);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/carts/:cid/products/:pid
  removeProduct = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const response = await this.repository.removeProduct(cid, pid);
      if (!response) throw new CustomError("Cart NOT found", 404);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/carts/:cid  (vaciar carrito)
  clearCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await this.repository.clearCart(cid);
      if (!response) throw new CustomError("Cart NOT found", 404);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/carts/:cid/delete (borrar carrito completo)
  delete = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await this.repository.delete(cid);
      if (!response) throw new CustomError("Cart NOT found", 404);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const cartController = new CartController(cartRepository);
