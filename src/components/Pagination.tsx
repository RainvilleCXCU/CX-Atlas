import Link from 'next/link';
import type { WPPageInfo } from 'client';

interface NextPageNavigationProps {
  href: string;
}

function NextPageNavigation(props: NextPageNavigationProps) {
  return (
    <Link href={props.href} aria-label={'Next page.'} className='page-next page-numbers'>
      Next &gt;
    </Link>
  );
}

interface PreviousPageNavigationProps {
  href: string;
}

function PreviousPageNavigation(props: PreviousPageNavigationProps) {
  return (
    <Link href={props.href} aria-label={'Previous page.'} className='page-prev page-numbers'>
      &lt; Prev
    </Link>
  );
}

export interface PaginationProps {
  pageInfo;
  perPage: number;
  currentPage: number;
  basePath: string;
  buffer?: number;
}

export default function Pagination({ pageInfo, currentPage = 1, basePath, perPage = 5, buffer = 2 }: PaginationProps) {
  const previousPageUrl = currentPage - 1 > 1 ? `${basePath}/page/${currentPage - 1}` : basePath;
  const nextPageUrl = `${basePath}/page/${currentPage + 1}`;
  const pages = Math.ceil(pageInfo.offsetPagination.total/perPage);
  console.log(`Pages: ${pages}`)

  const endPage = currentPage + buffer > pages ? pages: currentPage + buffer;
  const startPage = currentPage - buffer < 1 ? 1 : currentPage - buffer;



  const getNumberLinks = () => {
    let links = [];
    for(let p = startPage; p <= endPage; p++) {
        if(p === currentPage) {
          links.push(<span className='page-numbers current' key={`pagination-${p}`}>{p}</span>)
        } else {
          links.push(<Link href={p > 1 ? `${basePath}/page/${p}` : basePath} className='page-numbers' key={`pagination-${p}`}>{p}</Link>);
        }
    }
    return links;
  }

  return (
    <nav className="pagination navigation" aria-label="Pagination">
      <div className="nav-links">
          {pageInfo.offsetPagination.hasPrevious && (
              <PreviousPageNavigation href={previousPageUrl} />
          )}

          {getNumberLinks()}

          {pageInfo.offsetPagination.hasMore && (
              <NextPageNavigation href={nextPageUrl} />
          )}
      </div>
    </nav>
  );
}
