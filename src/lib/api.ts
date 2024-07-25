import Product from "@/models/Products";
import connectToDatabase from "./db";

export async function getAllProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export async function getProductDetails(id: string) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const data = await response.json();

  if (data.success) {
    return data;
  } else {
    throw new Error("something went wrong");
  }
}
