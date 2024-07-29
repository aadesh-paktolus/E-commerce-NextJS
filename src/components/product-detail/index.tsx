"use client";
import { Iproduct } from "@/interfaces/products-iterfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "../add-to-cart";
import Location from "../icons/location";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Styles from "./product-details.module.scss";

interface ProductDetailsProps {
  product: Iproduct;
}

export default function ProductDetail({ product }: ProductDetailsProps) {
  const [showImage, setshowImage] = useState(product.thumbnail);

  const loadImage = (image: string) => {
    setshowImage(image);
  };
  return (
    <div className={Styles.main_div}>
      <Link href="/products">
        <Button className={Styles.back_btn}>Back</Button>
      </Link>

      <div className={Styles.card_container}>
        <div className={Styles.img_container}>
          <div className={Styles.image}>
            <Image
              src={showImage}
              alt="error_in_detail_page"
              width={300}
              height={300}
            />
          </div>
          <div className={Styles.all_images}>
            {product.images.map((item, index) => (
              <Image
                src={item}
                key={index}
                alt="error_in_detail"
                width={70}
                height={70}
                className={Styles.show_images}
                onClick={() => loadImage(item)}
              />
            ))}
          </div>
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
