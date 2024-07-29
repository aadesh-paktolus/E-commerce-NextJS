import connectToDatabase from "@/lib/db";
import Cart, { ICartItem } from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
  }

  const { productId } = await req.json();

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId: session.user.email });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found." }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      (item: ICartItem) => item.productId === productId
    );
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Can't remove item form cart." },
      { status: 500 }
    );
  }
}
