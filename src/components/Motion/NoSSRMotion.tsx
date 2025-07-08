import { useState, useEffect } from 'react'

import { LazyMotion, domAnimation } from "framer-motion";

function NoSSRMotion({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Return nothing on server, full content on client
  if (!hasMounted) {
    return null
  }

  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

export default NoSSRMotion;