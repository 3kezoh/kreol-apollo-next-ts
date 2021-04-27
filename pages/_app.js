import "bulma/css/bulma.css";
import "../styles/globals.css";
import "../styles/colors.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@apollo";
import { AuthProvider } from "@Auth";

const App = ({ Component, pageProps }) => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ApolloProvider>
);

export default App;
