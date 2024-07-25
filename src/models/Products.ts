import mongoose, { Schema } from "mongoose";
import { Iproduct } from "../interfaces/products-iterfaces";

const productSchema = new Schema<Iproduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model<Iproduct>("Product", productSchema);

export default Product;
