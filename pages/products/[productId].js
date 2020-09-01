import React from "react";

import { useRouter } from "next/router";

const product = () => {

    const route = useRouter()

    console.log('====================================');
    console.log(route);
    console.log('====================================');

  return <div>this is sub page :: {route.query.productId}</div>;
};

export default product;
