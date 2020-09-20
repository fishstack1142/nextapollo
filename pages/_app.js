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

   console.log('user ==>>', user)

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

  console.log('headers')
  console.log(headers)



  const cookies = headers && cookie.parse(headers.cookie || '')
  // console.log('cookies')
  // console.log(cookies)

  const token = cookies && cookies.token
  // console.log('token')
  // console.log(token);

  if (!token) {
    if (router.pathname === '/cart') {
      ctx.res.writeHead(302, {Location: '/signin'})
      ctx.res.end()
    }
    return null
  }

  const response = await fetch(
    "https://graphbasicserver.azurewebsites.net/graphql",
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

      // console.log('result is is')
      // console.log(result)
      return { user: result.data.user }
    } else {
      if (router.pathname === '/cart') {
        ctx.res.writeHead(32, {Location: '/signin'})
        ctx.res.end()
      }

      // console.log('it is null')
      return null
    }
};

export default apolloClient(MyApp);
