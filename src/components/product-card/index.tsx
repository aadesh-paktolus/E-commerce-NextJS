"use client";
import { Iproduct } from "@/interfaces/products-iterfaces";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import OutlineHeart from "../icons/outline-heart";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import Styles from "./card.module.scss";
import SeeMoreLess from "./see-more-less";

interface IProductData {
  product: Iproduct[];
}

const ProductCard: FC<IProductData> = ({ product }) => {
  return (
    <div className={Styles.main_div}>
      {product.map((item) => {
        return (
          <Card className={Styles.card_container} key={item._id}>
            <CardHeader>
              <div className={Styles.image_container}>
                <Image
                  alt="error_in_list_page"
                  src={item.thumbnail}
                  className={Styles.image}
                  width={200}
                  height={200}
                />
              </div>
              <Separator />
              <div className={Styles.title_heart}>
                <CardTitle>{item.title}</CardTitle>
                <OutlineHeart />
              </div>

              <SeeMoreLess description={item.description} />
            </CardHeader>
            <CardContent>
              <div className={Styles.price_discount}>
                <h4>${item.price}/-</h4>
                <h4>{item.discountPercentage}%</h4>
              </div>

              <div className={Styles.rating}>
                <h5>Rating:</h5>
                <h5>{item.rating}⭐</h5>
              </div>

              <div className={Styles.stocks}>
                <h5>Stock:</h5>
                <h5>{item.stock}</h5>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/products/${item._id}`}>
                <Button className={Styles.add_to_cart}>Details</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductCard;
