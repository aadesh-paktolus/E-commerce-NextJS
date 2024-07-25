"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Cart from "../icons/cart";
import Styles from "./navbar.module.scss";

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <header className={Styles.header}>
      <Link href="/products">
        <div className={Styles.logo}>
          <h1>ShopClues.in</h1>
        </div>
      </Link>
      <div className={Styles.navbar}>
        {!session && !loading && <h3 className={Styles.text}>Login</h3>}

        {!session && !loading && <h3 className={Styles.text}>Signup</h3>}

        {session && (
          <h3
            className={Styles.text}
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </h3>
        )}

        <div className={Styles.mobile_cart}>
          <Cart />
        </div>
      </div>
    </header>
  );
}