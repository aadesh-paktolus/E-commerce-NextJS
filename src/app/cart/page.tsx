import Cart from "@/components/cart";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  return <Cart />;
};

export default CartPage;
