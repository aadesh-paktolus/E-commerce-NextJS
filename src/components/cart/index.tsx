"use client";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/interfaces/cart-interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Styles from "./cart.module.scss";

const Cart = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCartCount, setTotalCartCount] = useState<number>(0);
  const router = useRouter();

  const fetchCartApi = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      setCartData(data.items);
    } else {
      setCartData([]);
    }
    return res;
  };

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      await fetchCartApi();
    } catch (error) {
      setCartData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalCount = () => {
    const total = cartData.reduce((prev: number, curr: CartItem) => {
      return prev + curr.price;
    }, 0);
    setTotalCartCount(total);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotalCount();
  }, [cartData]);

  const removeCart = async (productId: string) => {
    const res = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      setCartData(cartData.filter((item) => item.productId !== productId));
      toast.success("Item removed successfully from cart.");
    } else {
      toast.error("Can not remove item from cart.");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const res = await fetch("/api/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (res.ok) {
      await fetchCartApi();
    } else {
      toast.error("Cannot update quantity.");
    }
  };

  if (isLoading) {
    return <p className={Styles.empty}>Loading Cart Data...</p>;
  }

  return (
    <>
      <div className={Styles.cart_main}>
        <Button onClick={() => router.back()} className={Styles.back_btn}>
          Back
        </Button>
        {cartData.length === 0 ? (
          <p className={Styles.empty}>Your cart is empty.</p>
        ) : (
          cartData.map((item) => {
            return (
              <Card key={item.productId} className={Styles.card_container}>
                <CardHeader className={Styles.img_name}>
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <CardTitle className={Styles.title}>{item.name}</CardTitle>
                </CardHeader>

                <div className={Styles.price_container}>
                  <p className={Styles.price}>
                    <b>${Math.floor(item.price)}/-</b>
                  </p>
                </div>

                <CardContent className={Styles.card_content}>
                  <Button
                    className={Styles.btn}
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <div className={Styles.quantity}>{item.quantity}</div>
                  <Button
                    className={Styles.btn}
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </CardContent>

                <CardFooter className={Styles.remove_container}>
                  <Button
                    className={Styles.remove_btn}
                    onClick={() => removeCart(item.productId)}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
      {cartData.length === 0 ? (
        "hi"
      ) : (
        <div className={Styles.cart_totalcount}>
          <h2>Total Count: ${totalCartCount}/-</h2>
        </div>
      )}
    </>
  );
};

export default Cart;
