import { useQuery } from "@apollo/client";
import { ME } from "@graphql/auth/queries";
import { withApollo } from "../apollo";

const Me = () => {
  const { loading, error, data } = useQuery(ME);
  if (loading || !data.me) return <div>Loading...</div>;
  if (error) return <div>Error :c</div>;
  return (
    <>
      <div>{data.me.email}</div>
      <div>{data.me.name}</div>
    </>
  );
};

export default withApollo(Me);
