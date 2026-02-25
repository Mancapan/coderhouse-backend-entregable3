import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, index: true }, // titulo del producto indexado
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true, trim: true }, // codigo unique indexado
    price: { type: Number, required: true, min: 0 },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false },
);

ProductSchema.plugin(mongoosePaginate); // plugin de paginación

export const ProductModel = model("Product", ProductSchema, "productos");
