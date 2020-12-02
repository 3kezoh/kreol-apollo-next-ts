import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import { withApollo } from "../utils";
import AuthProvider from "../components/Auth/authProvider";

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ApolloProvider>
);

export default withApollo(App);
