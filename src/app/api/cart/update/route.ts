import connectToDatabase from "@/lib/db";
import Cart, { ICartItem } from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Product from "../../../../models/Products";

export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized User." }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId: session.user.email });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found." }, { status: 404 });
    }

    const item = cart.items.find(
      (item: ICartItem) => item.productId === productId
    );
    if (!item) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    item.quantity = quantity;
    item.price = product.price * quantity;

    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Can't remove item form cart." },
      { status: 500 }
    );
  }
}
