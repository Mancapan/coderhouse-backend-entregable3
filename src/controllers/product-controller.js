import { productRepository } from "../repositories/product-repository.js";

class ProductController {
  constructor(repository) {
    this.repository = repository;
  }

  // GET /api/products
  getAll = async (req, res, next) => {
    try {
      const response = await this.repository.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/products/:id
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.repository.getById(id);
      if (!response) throw new Error("Product NOT found");
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/products
  create = async (req, res, next) => {
    try {
      const response = await this.repository.create(req.body);
      res.status(201).json(response); // (mejor 201 para create)
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/products/:id
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.repository.update(id, req.body);
      if (!response) throw new Error("Product NOT found");
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/products/:id
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.repository.delete(id);
      if (!response) throw new Error("Product NOT found");
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productRepository);
