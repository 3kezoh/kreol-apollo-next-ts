import { useMutation } from "@apollo/client";
import { LOGIN } from "@graphql/auth/mutations";

const useLogin = (onCompleted, onError) => useMutation(LOGIN, { onCompleted, onError });

export default useLogin;
