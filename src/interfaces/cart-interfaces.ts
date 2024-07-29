export interface IAddToCart {
  productId: string;
  thumbnail: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem {
  productId: string;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
}
