// import '../styles/globals.css'
import cookie from "cookie";

import PageLayout from "../components/layout";
import AuthProvider from "../auth/AuthProvider";

import { ApolloProvider } from "@apollo/react-hooks";
import apolloClient from "../apollo/apolloClient";

// function MyApp({ Component, pageProps, apollo }) {
//   return (
//     <ApolloProvider client={apollo}>
//       <PageLayout>
//         <Component {...pageProps} />
//       </PageLayout>
//     </ApolloProvider>
//   );
// }

// export default apolloClient(MyApp)

function MyApp({ Component, pageProps, apollo, user }) {

  //  console.log('user ==>>', user)

  return (
    <ApolloProvider client={apollo} >
      <AuthProvider userData={user}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </AuthProvider>
    </ApolloProvider>
  );
}

const QUERY_USER = {
  query: `
    query {
      user {
        id
        name
        email
        createdProducts {
          id
        }
        carts {
          id
          product {
            description
            imageUrl
            price
          }
          quantity
        }
      }
    }
  `
}

//server
MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }
  // console.log(ctx)
  const { headers } = ctx.req;

  const cookies = headers && cookie.parse(headers.cookie || '')

  const token = cookies && cookies.token

  if (!token) {
    if (router.pathname === '/cart') {
      ctx.res.writeHead(302, {Location: '/signin'})
      ctx.res.end()
    }
    return null
  }

  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_URI,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` || ""
      },
      body: JSON.stringify(QUERY_USER)
    });

    if (response.ok) {
      const result = await response.json()

      return { user: result.data.user }
    } else {
      if (router.pathname === '/cart') {
        ctx.res.writeHead(32, {Location: '/signin'})
        ctx.res.end()
      }

      return null
    }
};

export default apolloClient(MyApp);
