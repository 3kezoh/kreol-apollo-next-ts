import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    window.close();
  }, []);

  return null;
};

export default Success;
