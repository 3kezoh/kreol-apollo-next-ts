import { useEffect, useState } from "react";

const useIntersecting = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const callback = ([entry]) => setIntersecting(entry.isIntersecting);

  const observer = new IntersectionObserver(callback);

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default useIntersecting;
