import { useMutation } from "@apollo/client";
import { SIGNUP } from "@apollo/auth/mutations";

const useSignup = (onCompleted, onError) => useMutation(SIGNUP, { onCompleted, onError });

export default useSignup;
