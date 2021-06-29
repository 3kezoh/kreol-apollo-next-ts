import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { APOLLO_STATE_PROP_NAME } from "@lib/apollo/config";

const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: any) => {
  const _pageProps = { ...pageProps };
  if (_pageProps?.props) {
    _pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return _pageProps;
};

export default addApolloState;
