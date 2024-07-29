import connectToDatabase from "@/lib/db";
import Cart, { ICartItem } from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
  }

  const { productId, name, price, thumbnail, quantity } = await req.json();
  if (!productId || !name || !price || !quantity) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    let cart = await Cart.findOne({ userId: session.user.email });
    console.log(cart);

    if (!cart) {
      cart = new Cart({ userId: session.user.email, items: [] });
    }

    const prevItem = cart.items.find(
      (item: ICartItem) => item.productId === productId
    );

    if (prevItem) {
      const updatedQuantity = quantity + prevItem?.quantity;
      prevItem.price = updatedQuantity * price;
      prevItem.quantity = updatedQuantity;
    } else {
      const updatedPrice = price * quantity;
      cart.items.push({
        productId,
        name,
        price: updatedPrice,
        quantity,
        thumbnail,
      });
    }

    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to add item to cart" },
      { status: 500 }
    );
  }
}
