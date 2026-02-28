import { CartModel } from "../models/cart-model.js";

class CartRepository {
  constructor(model) {
    this.model = model;
  }

  // POST /api/carts
  create = async () => {
    return await this.model.create({ products: [] });
  };

  // GET /api/carts
  getAll = async () => {
    return await this.model.find().populate("products.product"); 
  };

  // GET /api/carts/:cid
  getById = async (cid) => {
    return await this.model.findById(cid).populate("products.product");
  };

  // POST /api/carts/:cid/products/:pid
  addProduct = async (cid, pid, quantity = 1) => {
    const cart = await this.model.findById(cid);
    if (!cart) return null;

    const qty = Number(quantity);
    const existing = cart.products.find((p) => p.product.toString() === pid);

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.products.push({ product: pid, quantity: qty });
    }

    await cart.save();
    return await cart.populate("products.product");
  };

// PUT /api/carts/:cid/products/:pid
updateProductQuantity = async (cid, pid, quantity) => {
  const cart = await this.model.findById(cid);
  if (!cart) return null;

  const product = cart.products.find((p) => p.product.toString() === pid);
  if (!product) return null;
  product.quantity = quantity;
  await cart.save();
  return await cart.populate("products.product");
};

  // DELETE /api/carts/:cid/products/:pid
  removeProduct = async (cid, pid) => {
    const updated = await this.model.findByIdAndUpdate(
      cid,
      { $pull: { products: { product: pid } } },
      { new: true }
    );

    if (!updated) return null;

    return await updated.populate("products.product");
  };

  // DELETE /api/carts/:cid  (vaciar)
  clearCart = async (cid) => {
    const updated = await this.model.findByIdAndUpdate(
      cid,
      { products: [] },
      { new: true }
    );

    if (!updated) return null;

    return await updated.populate("products.product");
  };

// PUT /api/carts/:cid
updateProducts = async (cid, products) => {
  const updated = await this.model.findByIdAndUpdate(cid,{ products },{ new: true });
  if (!updated) return null;
  return await updated.populate("products.product");
};

  // DELETE /api/carts/:cid/delete (borrar carrito)
  delete = async (cid) => {
    return await this.model.findByIdAndDelete(cid);
  };
}// fin cartRepositiry

export const cartRepository = new CartRepository(CartModel);