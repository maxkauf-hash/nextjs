import { getProducts } from "@/actions/products/products-actions";
import ProductDetails from "@/components/products/product-details";
import { ProductsType } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data: ProductsType = (await getProducts(id)) as ProductsType;
  return <ProductDetails product={data} />;
}
