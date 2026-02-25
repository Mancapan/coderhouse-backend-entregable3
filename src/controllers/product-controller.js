/*
Controller = consume el repositorio cons sus metodos, genera errores y validaciones
*/

import { productRepository } from "../repositories/product-repository.js";
import { CustomError } from "../utils/custom-error.js";

class ProductController {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, sort, query } = req.query;
      const response = await this.repository.getAll(page, limit, sort, query);

      // armar query string base para los links ej: http://localhost:8080/api/products?limit=2&page=3
      const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
      const queryStr = `limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`;

      res.status(200).json({
        status: "success",
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage
          ? `${baseUrl}api/products?${queryStr}&page=${response.prevPage}`
          : null,
        nextLink: response.hasNextPage
          ? `${baseUrl}api/products?${queryStr}&page=${response.nextPage}`
          : null,
      });
    } catch (error) {
      next(error);
    }
  }; // fin getall

  // GET /api/products/:id
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.repository.getById(id);
      if (!response) throw new CustomError("Product NOT found", 404);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // GET /api/products/:title
  getByName = async (req, res, next) => {
    try {
      const { title } = req.params;

      const response = await this.repository.getByName(title);

      if (!response) throw new CustomError("Product NOT found", 404);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }; // fin getBYname

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
      if (!response) throw new CustomError("Product NOT found", 404);
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
      if (!response) throw new CustomError("Product NOT found", 404);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productRepository);
