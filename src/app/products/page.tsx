import ProductsInfo from "@/components/product-info";
import { getAllProducts } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Grocery and Electronics products available",
};

export default async function AllProducts() {
  const allProducts = await getAllProducts();

  if (!allProducts || allProducts.length === 0) {
    return <h1>No Product Found</h1>;
  }

  return <ProductsInfo products={allProducts} />;
}
