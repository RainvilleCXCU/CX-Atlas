import Sticky from "components/common/sticky";
import { useRouter } from "next/router";

export interface CTAProps {
  id?: string;
  animationSpeed?: number;
  disableDismiss?: boolean;
  topThreshold?: number;
  bottomThreshold?: number;
  position?: string;
  children?: React.ReactNode;
}

function CTABar({ id = "CTABar", animationSpeed = 300, disableDismiss = false, position = "bottom", topThreshold = 0.1, bottomThreshold = 0.1, children = <></> }: CTAProps): JSX.Element {
  const router = useRouter();
  const pageURI = router.asPath;
  const stickyId = `${id}-${pageURI.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <Sticky id={stickyId} position={position} disableDismiss={disableDismiss} animationSpeed={animationSpeed} topThreshold={topThreshold} bottomThreshold={bottomThreshold}>
      {children}
    </Sticky>
  );
}

export default CTABar;
