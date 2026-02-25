/*
repositorio = capa de acceso a los datos (managers)
llama las operaciones de mongoose
*/

import { ProductModel } from "../models/product-model.js";

class ProductRepository {
  constructor(model) {
    this.model = model;
  }

getAll = async (page = 1, limit = 10, sort, query) => {
  const filter = query ? { category: query } : {};
  const options = {
    page,
    limit,
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
  };
  return await this.model.paginate(filter, options);
};

  getById = async (id) => {
    return await this.model.findById(id);
  };

  getByName = async (title) => {
    return await this.model.findOne({ title });
  };

  create = async (body) => {
    return await this.model.create(body);
  };

  update = async (id, body) => {
    return await this.model.findByIdAndUpdate(id, body, {
      returnDocument: true,
    });
  };

  delete = async (id) => {
    return await this.model.findByIdAndDelete(id);
  };
}

export const productRepository = new ProductRepository(ProductModel);
