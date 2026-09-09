import { useContext, useEffect } from "react";
import { isModalOpenContext, modalContentContext } from "components/Modal/modalContext";
import Member from "components/Products/Member";

/**
 * Document-level fallback for parser.js's `applicationType=mantl` handling.
 * parser.js only rewrites anchors it parses out of WordPress content into
 * <ExternalLink>, so any `applicationType=mantl` link that lands in the DOM by
 * another route (third-party scripts/widgets, dangerouslySetInnerHTML markup
 * that bypasses parseHtml, etc.) would otherwise navigate normally instead of
 * opening the Member modal. This listens for clicks on the whole document and
 * replicates ExternalLink's mantl branch for any such link, wherever it came
 * from.
 *
 * Relies on bubble order: an anchor's own React/Preact click handler (e.g.
 * ExternalLink, attached directly on that node) always runs before a
 * document-level bubble listener, so checking `defaultPrevented` here skips
 * links already handled that way instead of opening the modal twice.
 */
function GlobalMantlLinkHandler(): null {
  const { setIsModalOpen } = useContext(isModalOpenContext);
  const { setModalContent } = useContext(modalContentContext);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="applicationType=mantl"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      e.preventDefault();
      const url = new URL(anchor.href, window.location.origin);
      const account = url.searchParams.get('account') ?? undefined;
      const productCode = url.searchParams.get('productcode') ?? undefined;
      setModalContent({
        component: <Member account={account} productcode={productCode} />,
        maxWidth: '861px'
      });
      setIsModalOpen(true);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [setIsModalOpen, setModalContent]);

  return null;
}

export default GlobalMantlLinkHandler;
