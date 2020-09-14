// import '../styles/globals.css'

import PageLayout from "../components/layout";

// import { ApolloProvider } from "@apollo/react-hooks"
// import apolloClient from '../apollo/apolloClient'

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

function MyApp({ Component, pageProps, apollo }) {
  return (
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
  );
}

export default MyApp
