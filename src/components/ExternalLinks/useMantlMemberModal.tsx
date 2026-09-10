import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import { isModalOpenContext, modalContentContext } from "components/Modal/modalContext";
import { Store } from "context/store";
import Member, { MANTL_MEMBER_SCREEN_QUERY } from "components/Products/Member";

/**
 * Shared "open the mantl member modal" action for ExternalLink (parser-rendered
 * links) and GlobalMantlLinkHandler (everything else). Rather than opening the
 * modal immediately and letting Member's own useQuery show a loading state
 * inside it, this fetches the WordPress-authored mantlMemberScreen widget
 * up front — showing the site's page-loading overlay (via Store's
 * `mantlLoading`, read by components/common/loading) while it resolves — and
 * only opens the modal once that content is in hand, passing it as
 * `widgetHtml` so Member renders the final content on first paint instead of
 * flashing its own loading state.
 *
 * The overlay's CSS only shows while `document.body` carries `is-navigating`
 * (see _loading.scss) — normally toggled by Loading's own router-event
 * listener — so this toggles that same class directly; the `mantlLoading`
 * flag alone only controls whether Loading mounts the (otherwise
 * display:none) overlay markup, not its visibility.
 */
function useMantlMemberModal(): (href: string) => void {
  const { setIsModalOpen } = useContext(isModalOpenContext);
  const { setModalContent } = useContext(modalContentContext);
  const [, setState] = useContext(Store);
  const client = useApolloClient();

  return (href: string) => {
    const url = new URL(href, window.location.origin);
    const account = url.searchParams.get('account') ?? undefined;
    const productcode = url.searchParams.get('productcode') ?? undefined;

    setState((prev) => ({ ...prev, mantlLoading: true }));
    document.body.classList.add('is-navigating');

    const openWith = (widgetHtml: string | null) => {
      setState((prev) => ({ ...prev, mantlLoading: false }));
      document.body.classList.remove('is-navigating');
      setModalContent({
        component: <Member widgetHtml={widgetHtml} account={account} productcode={productcode} />,
        maxWidth: '861px'
      });
      setIsModalOpen(true);
    };

    client
      .query({
        query: MANTL_MEMBER_SCREEN_QUERY,
        variables: { account, productcode },
        fetchPolicy: 'network-only',
      })
      .then((result) => openWith(result?.data?.widgetSettings?.mantlMemberScreen ?? null))
      .catch(() => openWith(null));
  };
}

export default useMantlMemberModal;
