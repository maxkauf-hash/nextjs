import { getAllProducts } from "@/actions/products/products-actions";
import CartList from "@/components/cart";
import Payement from "@/components/payement";

export default async function Page() {
  const products = await getAllProducts();
  return (
    <section className="text-black">
      <CartList products={products} />
      <Payement />
    </section>
  );
}
