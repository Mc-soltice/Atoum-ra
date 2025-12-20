"use client";
import { Product } from "@/types/product";
import Image from "next/image";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="relative w-full h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority={true} // optional for above-the-fold
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
