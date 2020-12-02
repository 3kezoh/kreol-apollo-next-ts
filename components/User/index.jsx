import { useQuery, gql } from "@apollo/client";

const USERS = gql`
  query {
    users {
      id
      email
    }
  }
`;

const User = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :c</p>;

  return data.users.map((user) => (
    <div key={user.id}>
      <p>{user.email}</p>
    </div>
  ));
};

export default User;
