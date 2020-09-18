import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// import apolloClient from '../../apollo/apolloClient'

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

const QUERY_PRODUCTS = gql`
  query {
    products {
      id
      description
      price
      imageUrl
      user{
        name
      }
    }
  }
`;

function Products() {
  const {data, loading, error} = useQuery(QUERY_PRODUCTS);

  console.log(useQuery(QUERY_PRODUCTS))

  if (error) return <p>error, please try again later people</p>;

  if (loading) return <p>Loading...</p>



  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: '1fr 1fr 1fr',
              textAlign: "center",
        }}
      >
        {data.products.map(product => (
          <div
            key={product.id}
            style={{
              display: "grid",
              textAlign: "center",
              margin: "40px"
            }}
          >
            <Link href="/products/[productId]" as={`/products/${product.id}`}>
              <a>
                <img src={product.imageUrl} width="60%" />
              </a>
            </Link>
            <h3>{product.description}</h3>
            <h4>$ {product.price}</h4>
            <h5>seller : {product.user.name}</h5>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}

// export default apolloClient(Products);

export default Products;
