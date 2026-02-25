/*
repositorio = capa de acceso a los datos (managers)
llama las operaciones de mongoose
*/

import { ProductModel } from "../models/product-model.js";

class ProductRepository {
  constructor(model) {
    this.model = model;
  }

  getAll = async (page = 1, limit=10) => {
    return await this.model.paginate({},{page,limit});
  };

  getById = async (id) => {
    return await this.model.findById(id);
  };

  getByName = async (title) => {
    return await this.model.findOne({ title }).explain();
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

/*
---------------------------------------------------------------------------
Manejo de errores en el Repository
---------------------------------------------------------------------------

En el Repository NO se transforman los errores (NO usar new Error(error)).

¿Por qué?

- El repository es únicamente la capa de acceso a datos.
- Su responsabilidad es ejecutar operaciones contra la base de datos.
- No debe decidir cómo responder al cliente.
- No debe modificar el tipo original del error (ej: CastError, ValidationError).

Si hacemos:

    throw new Error(error);

Estamos perdiendo:
- El tipo real del error (CastError, ValidationError, etc.)
- Información útil para el middleware global ./middlewares/error-handler.js
- La posibilidad de manejar errores específicos correctamente

Por eso, si se usa try-catch aquí, solo se re-lanza el error original:

    throw error;

De esta forma:

1) El error natural de Mongoose se conserva.
2) El Controller puede decidir si convertirlo en CustomError.
3) El errorHandler global puede interceptarlo y formatear la respuesta HTTP.

Arquitectura aplicada:

Repository  →  Controller  →  Middleware (errorHandler)
     ↑              ↑
  Solo datos     Lógica y validación

El manejo final de errores HTTP se centraliza en el middleware global,
no en el repository.
---------------------------------------------------------------------------
*/
