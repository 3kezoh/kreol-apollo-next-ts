const { useMutation } = require("@apollo/client");
const { SIGNUP } = require("../../graphql/auth/mutations");

const useSignup = (onCompleted, onError) => useMutation(SIGNUP, { onCompleted, onError });

export default useSignup;
