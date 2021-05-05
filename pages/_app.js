import "bulma/css/bulma.css";
import "../styles/globals.css";
import "../styles/colors.css";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@Auth";
import { useApollo } from "@lib/apollo/hooks";

const App = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
