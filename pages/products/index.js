import React from "react";
import Link from 'next/link'

const fakeData = [
  {
    id: 1,
    description: "Product A",
    price: 100,
  },
  {
    id: 2,
    description: "Product B",
    price: 100,
  },
  {
    id: 3,
    description: "Product C",
    price: 100,
  },
];

function products() {
  return (
    <>
      {fakeData.map(product => (
        <Link key={product.id} href='/products/[productId]' as={`/products/${product.id}`}>
          <a>
            <div>{product.description}</div>
          </a>
        </Link>
      ))}
    </>
  );
}

export default products;
