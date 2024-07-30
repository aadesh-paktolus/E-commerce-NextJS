"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Iproduct } from "@/interfaces/products-iterfaces";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import AddToCartButton from "../add-to-cart";
import Location from "../icons/location";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import Styles from "./product-details.module.scss";

interface ProductDetailsProps {
  product: Iproduct;
}

export default function ProductDetail({ product }: ProductDetailsProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className={Styles.main_div}>
      <Link href="/products">
        <Button className={Styles.back_btn}>Back</Button>
      </Link>

      <div className={Styles.card_container}>
        <div className={Styles.img_container}>
          <Carousel
            plugins={[plugin.current]}
            className={Styles.carousel}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {product.images.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className={Styles.carousel_container}>
                    <Card className={Styles.carousel_card}>
                      <CardContent className={Styles.card_content}>
                        <Image
                          src={image}
                          alt="product images"
                          width={300}
                          height={400}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className={Styles.info_container}>
          <h2>{product.title}</h2>
          <p className={Styles.description}>{product.description}</p>
          <div className={Styles.rating}>
            <h5>Rating:</h5>
            <h5>{product.rating}⭐</h5>
          </div>
          <Separator />

          <div className={Styles.discount_price}>
            <h3>-{product.discountPercentage}%</h3>
            <h3>
              <sup>₹</sup>
              {product.price}
            </h3>
          </div>
          <p className={Styles.mrp_price}>
            M.R.P.: <del>₹{product.price}</del>
          </p>

          <div className={Styles.taxes}>
            <p>Inclusive of all taxes</p>
            <p>
              <b>EMI</b> starts at ₹456. No Cost EMI available.
            </p>
          </div>
          <Separator />

          <div className={Styles.add_cart}>
            <p className={Styles.delivery}>
              FREE delivery <b>29 - 31 July.</b> Order within{" "}
              <span>11 hrs 15 mins.</span>
            </p>

            <div className={Styles.address}>
              <Location />
              <p>Delivering to Pune 411001 - Update Location</p>
            </div>

            <h4 className={Styles.stock}>In stock - {product.stock} Pieces</h4>

            <AddToCartButton
              productId={product._id}
              name={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
              stock={product.stock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
