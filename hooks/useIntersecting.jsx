import { useEffect, useState } from "react";

const useIntersecting = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const callback = ([entry]) => setIntersecting(entry.isIntersecting);

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default useIntersecting;
