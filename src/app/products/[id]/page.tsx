import ProductDetail from "@/components/product-detail";
import { getProductDetails } from "@/lib/api";

interface IParams {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({ params }: IParams) {
  const productId = params.id;
  const { result } = await getProductDetails(productId);
  if (!result) {
    return <div>Product not found</div>;
  }
  return <ProductDetail product={result} />;
}
