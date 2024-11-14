import { ProductsType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-provider";

const AddToCart = (product: ProductsType) => {
  const { increaseCartQuantity } = useCart();

  return (
    <Button onClick={() => increaseCartQuantity(product.id)}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
