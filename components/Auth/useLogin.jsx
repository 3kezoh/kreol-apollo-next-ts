import { useMutation } from "@apollo/client";
import { LOGIN } from "@apollo/auth/mutations";

const useLogin = (onCompleted, onError) => useMutation(LOGIN, { onCompleted, onError });

export default useLogin;
