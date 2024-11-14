import { ProductsType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const ProductDetails = ({ product }: { product: ProductsType }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="border rounded-lg shadow p-4">
          <Image
            src={product.photo}
            alt={product.name}
            className="w-full h-48 object-cover rounded"
            width={100}
            height={100}
          />
          <h2 className="text-lg font-bold mt-2">{product.name}</h2>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-green-600 font-semibold">{product.price} €</p>
          <Link href="/cart">Add to cart</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
