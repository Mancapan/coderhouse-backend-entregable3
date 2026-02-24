import { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product", // <-- nombre del MODELO, NO el de la colección
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const CartModel = model("Cart", CartSchema, "carts");