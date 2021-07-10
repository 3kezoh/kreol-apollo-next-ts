import { useMeQuery } from "generated/graphql";

const Me = () => {
  const { loading, error, data } = useMeQuery();
  if (loading || !data?.me) return <div>Loading...</div>;
  if (error) return <div>Error :c</div>;
  return (
    <>
      <div>{data.me.id}</div>
      <div>{data.me.name}</div>
    </>
  );
};

export default Me;
