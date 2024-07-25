"use client";
import ProductCard from "@/components/product-card";
import SearchBar from "@/components/search";
import { Iproduct } from "@/interfaces/products-iterfaces";
import { useState } from "react";

type Props = {
  products: Iproduct[];
};
const ProductsInfo: React.FC<Props> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ProductCard product={filteredProducts} />
    </>
  );
};

export default ProductsInfo;
