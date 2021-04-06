import "bulma/css/bulma.css";
import "../styles/globals.css";
import "../styles/colors.css";
import { ApolloProvider } from "@apollo/client";
import { withApollo } from "../apollo";
import AuthProvider from "../components/Auth/AuthProvider";

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ApolloProvider>
);

export default withApollo(App);
