import "bulma/css/bulma.css";
import "../styles/globals.css";
import "../styles/colors.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@lib/apollo/client";
import AuthProvider from "../components/Auth/AuthProvider";

const App = ({ Component, pageProps }) => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ApolloProvider>
);

export default App;
