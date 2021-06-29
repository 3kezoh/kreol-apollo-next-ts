import { useRouter } from "next/router";
import { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return null;
};

export default Success;
