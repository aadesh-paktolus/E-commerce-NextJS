import connectToDatabase from "@/lib/db";
import Cart from "@/models/Cart";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId: session.user.email });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch cart" },
      { status: 500 }
    );
  }
}
