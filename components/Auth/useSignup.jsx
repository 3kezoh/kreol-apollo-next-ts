import { useMutation } from "@apollo/client";
import { SIGNUP } from "@graphql/auth/mutations";

const useSignup = (onCompleted, onError) => useMutation(SIGNUP, { onCompleted, onError });

export default useSignup;
