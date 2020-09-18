// import '../styles/globals.css'

import PageLayout from "../components/layout";
import AuthProvider from "../auth/AuthProvider";

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
    <AuthProvider>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </AuthProvider>
  );
}

export default MyApp;
