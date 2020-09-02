import React from "react";
import Link from "next/link";

const fakeData = [
  {
    id: 1,
    description: "Product A",
    price: 100,
    url:
      "https://imagescater.blob.core.windows.net/caterimage/single_orange.jpg",
  },
  {
    id: 2,
    description: "Product B",
    price: 100,
    url:
      "https://imagescater.blob.core.windows.net/caterimage/single_apple.jpg",
  },
  {
    id: 3,
    description: "Product C",
    price: 100,
    url: "https://imagescater.blob.core.windows.net/caterimage/red_apple.jpg",
  },
];

function products() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {fakeData.map(product => (
          <div key={product.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
          >
            <Link href="/products/[productId]" as={`/products/${product.id}`}>
              <a>
                <img src={product.url} width="60%" />
              </a>
            </Link>
            <h3>{product.description}</h3>
            <h4>{product.price}</h4>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default products;
