const { useMutation } = require("@apollo/client");
const { LOGIN } = require("../../graphql/auth/mutations");

const useLogin = (onCompleted, onError) => useMutation(LOGIN, { onCompleted, onError });

export default useLogin;
