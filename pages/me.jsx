import { useQuery } from "@apollo/client";
import { withApollo } from "../apollo";
import { ME } from "../graphql/auth/queries";

const Me = () => {
  const { loading, error, data } = useQuery(ME);
  if (loading || !data.me) return <div>Loading...</div>;
  if (error) return <div>Error :c</div>;
  return <div>{data.me.email}</div>;
};

export default withApollo(Me);
