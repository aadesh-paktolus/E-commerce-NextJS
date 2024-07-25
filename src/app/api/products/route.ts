import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "../../../models/Products";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    const products = await Product.find({}).lean();

    if (products.length === 0) {
      return NextResponse.json({ error: "No Products found" }, { status: 404 });
    } else {
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Unable to fetch products" },
      { status: 500 }
    );
  }
}
