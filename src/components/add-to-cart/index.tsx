import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import { IAddToCart } from "@/interfaces/cart-interfaces";
import { toast } from "sonner";
import Styles from "./add-to-cart.module.scss";

const AddToCartButton: React.FC<IAddToCart> = ({
  productId,
  thumbnail,
  name,
  price,
  stock,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: "cookie",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          thumbnail,
          name,
          price,
          quantity,
        }),
      });

      if (res.ok) {
        toast.success("Successfully added to cart", {
          duration: 5000,
        });
      } else {
        const errorData = await res.json();
        toast.error(`Failed to add to cart: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <>
      <div className={Styles.first}>
        <span className={Styles.span_text}>Quantity: </span>
        <div className={Styles.btns_quantity}>
          <Button
            className={Styles.btn}
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          >
            -
          </Button>
          <div className={Styles.quantity}>{quantity}</div>
          <Button
            className={Styles.btn}
            onClick={() => setQuantity((prev) => Math.min(prev + 1, stock))}
          >
            +
          </Button>
        </div>
      </div>
      <div className={Styles.second}>
        <Button className={Styles.add_to_cart} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default AddToCartButton;
