import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@Auth";
import { Login } from "@components";
import { useApollo } from "@lib/apollo/hooks";
import "bulma/css/bulma.css";
import { AppProps } from "next/app";
import "../styles/colors.css";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
        <Login />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
