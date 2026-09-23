import { useEffect } from "react";
import useMantlMemberModal from "components/ExternalLinks/useMantlMemberModal";

/**
 * Document-level fallback for parser.js's `applicationType=mantl` handling.
 * parser.js only rewrites anchors it parses out of WordPress content into
 * <ExternalLink>, so any `applicationType=mantl` link that lands in the DOM by
 * another route — third-party scripts/widgets, dangerouslySetInnerHTML markup
 * that bypasses parseHtml, or in-app components (Navbar, Header CTAs,
 * Footer/Nav) that render menu links with next/link directly — would
 * otherwise navigate instead of opening the Member modal. Most notably,
 * next/link's own click handler calls preventDefault() and starts a
 * client-side route change synchronously on click, so this must run in the
 * capture phase, ahead of that handler, or the SPA navigation has already
 * fired before we ever see the event.
 *
 * On a match we stopPropagation() so the anchor's own handler (next/link's
 * router push, or ExternalLink's onClick for parser-rendered links) never
 * runs — we fully replicate that branch here instead, so nothing double-fires.
 */
function GlobalMantlLinkHandler(): null {
  const openMantlModal = useMantlMemberModal();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="applicationType=mantl"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      e.preventDefault();
      e.stopPropagation();
      openMantlModal(anchor.href);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [openMantlModal]);

  return null;
}

export default GlobalMantlLinkHandler;
