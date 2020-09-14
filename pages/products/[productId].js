import React from "react";

import { useRouter } from "next/router";
import apolloClient from '../../apollo/apolloClient'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const QUERY_PRODUCT = gql`
query QUERY_PRODUCT($id: ID!) {

  product(id: $id) {
    description
    price
    imageUrl
  }
}
`

const Product = () => {
    const route = useRouter()

    const {data, loading, error} = useQuery(QUERY_PRODUCT, {variables: {id: route.query.productId}})

    console.log(useQuery(QUERY_PRODUCT, {variables: {id: route.query.productId}}))
    if (error) return <p>error occurred</p>

    if (loading) return <p>Loading...</p>

  return <div>
    <img src={data.product.imageUrl} width="60%" />
<h3>{data.product.description}</h3>
<h4>$ {data.product.price}</h4>
</div>
};

export default apolloClient(Product);
