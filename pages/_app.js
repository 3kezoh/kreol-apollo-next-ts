import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
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
