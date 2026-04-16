import Sticky from "components/common/sticky";
import { useRouter } from "next/router";

export interface CTAProps {
  id?: string;
  animationSpeed?: number;
  disableDismiss?: boolean;
  scrollDownEnterThreshold?: number;
  scrollDownExitThreshold?: number;
  scrollUpEnterThreshold?: number;
  scrollUpExitThreshold?: number;
  position?: string;
  children?: React.ReactNode;
  stayVisible?: boolean;
  expandBottomSiblings?: number;
  hideAboveOffset?: number;
}

function CTABar({ 
  id = "CTABar", 
  animationSpeed = 300, 
  disableDismiss = false, 
  position = "bottom", 
  scrollDownEnterThreshold = 50,
  scrollDownExitThreshold = 90,
  scrollUpEnterThreshold = 90,
  scrollUpExitThreshold = 50,
  stayVisible = false, 
  expandBottomSiblings = 0, 
  hideAboveOffset, 
  children = <></> 
}: CTAProps): JSX.Element {
  const router = useRouter();
  const pageURI = router.asPath;
  const stickyId = `${id}-${pageURI.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <Sticky 
      id={stickyId} 
      position={position} 
      disableDismiss={disableDismiss} 
      animationSpeed={animationSpeed} 
      scrollDownEnterThreshold={scrollDownEnterThreshold}
      scrollDownExitThreshold={scrollDownExitThreshold}
      scrollUpEnterThreshold={scrollUpEnterThreshold}
      scrollUpExitThreshold={scrollUpExitThreshold}
      stayVisible={stayVisible} 
      expandBottomSiblings={expandBottomSiblings} 
      hideAboveOffset={hideAboveOffset}
    >
      {children}
    </Sticky>
  );
}

export default CTABar;
