"use client";
import { FC, useState } from "react";
import { CardDescription, CardSpan } from "../ui/card";
import Styles from "./card.module.scss";

interface ISeemoreLess {
  description: string;
}

const SeeMoreLess: FC<ISeemoreLess> = ({ description }) => {
  const [count, setCount] = useState<number | undefined>(50);
  const [flag, setFlag] = useState(false);
  const handleSeeMoreLess = () => {
    if (flag) {
      setFlag(false);
      setCount(50);
    } else {
      setFlag(true);
      setCount(undefined);
    }
  };

  return (
    <CardDescription className={Styles.description}>
      {description.slice(0, count)}{" "}
      <CardSpan onClick={handleSeeMoreLess} className={Styles.see_more}>
        {flag ? "See Less" : "See More"}
      </CardSpan>
    </CardDescription>
  );
};

export default SeeMoreLess;
