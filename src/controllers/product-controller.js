/*
Controller = consume el repositorio cons sus metodos, genera errores y validaciones
*/

import { productRepository } from "../repositories/product-repository.js";
import { CustomError } from "../utils/custom-error.js";

class ProductController {
  constructor(repository) {
    this.repository = repository;
  }

  // GET /api/products
  getAll = async (req, res, next) => {
    try {


      const {page,limit} = req.query;
      const response = await this.repository.getAll(page,limit); // paginación
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

/*
----------------------------------------------------------------------------
¿Qué es next en Express?

"next" es una función que permite pasar el control al siguiente middleware
en la cadena de ejecución.

Cuando usamos:

    next(error);

Estamos enviando el error al middleware global de manejo de errores
(errorHandler).

Flujo de ejecución:

Request → Controller → next(error) → errorHandler → Response JSON

¿Por qué usamos next(error) y no res.status() aquí?

Porque seguimos el principio de responsabilidad única:

- El Controller decide cuándo hay un error.
- El errorHandler decide cómo responder al cliente.
- El Repository solo accede a datos.

Esto permite:
✔ Centralizar el manejo de errores.
✔ Mantener respuestas HTTP consistentes.
✔ Evitar repetir lógica en cada método.
✔ Mantener arquitectura limpia.

Sin next(error), Express no enviaría el error correctamente
al middleware global.
----------------------------------------------------------------------------
*/
