import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const OptimalNoPrefetchLink = ({ href, children, onClick, replace = false, ...props }) => {
  const router = useRouter();
  
  useEffect(() => {
    const originalPrefetch = router.prefetch;
    router.prefetch = (url, options) => {
      if (url === href) return Promise.resolve();
      return originalPrefetch.call(router, url, options);
    };
    
    return () => { router.prefetch = originalPrefetch; };
  }, [router, href]);
  const handleClick = e => {
    if(onClick) {
        onClick();
    }
    e.preventDefault();
    if (replace) {
      router.replace(href)
    } else {
      router.push(href)
    }
  }
  return (
    <a 
      href={href} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default OptimalNoPrefetchLink;