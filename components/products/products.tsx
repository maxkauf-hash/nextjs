"use client";

import { useState, useEffect } from "react";
import Pagination from "@/components/products/pagination"; // Assurez-vous que le chemin est correct
import { ProductsType } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "../add-to-cart";
import { useCart } from "@/context/cart-provider";

type ExtendedProductType = ProductsType[] & { length: number };

const Products = ({ products }: { products: ProductsType[] }) => {
  const product = products as ExtendedProductType;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useCart();

  useEffect(() => {
    setTotalPages(Math.ceil(product.length / productsPerPage));
  }, [product]);

  // Pagination logic
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = Array.isArray(product)
    ? product.slice(startIndex, startIndex + productsPerPage)
    : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="border rounded-lg shadow p-4">
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
            <div className="flex justify-between">
              <Link href={`/products/${product.id}`}>See details</Link>
              {getItemQuantity(product.id) > 0 ? (
                <div className="flex justify-between">
                  <button onClick={() => increaseCartQuantity(product.id)}>
                    +
                  </button>
                  <button onClick={() => decreaseCartQuantity(product.id)}>
                    -
                  </button>
                </div>
              ) : (
                <AddToCart {...product} />
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
