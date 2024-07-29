import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Cart ||
  mongoose.model<ICart>("Cart", cartSchema);
