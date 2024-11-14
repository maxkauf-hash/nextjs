import { getAllProducts } from "@/actions/products/products-actions";
import Products from "@/components/products/products";
import { ProductsType } from "@/lib/types";

const ProductsPage = async () => {
  const data: Omit<ProductsType[], "creationTimestamp"> =
    await getAllProducts();

  return <Products products={data} />;
};

export default ProductsPage;
