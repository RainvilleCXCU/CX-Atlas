import Link from 'next/link';
import type { WPPageInfo } from 'client';

interface NextPageNavigationProps {
  href: string;
}

function NextPageNavigation(props: NextPageNavigationProps) {
  return (
    <Link href={props.href} aria-label={'Next page.'} className='next page-numbers'>
      Next Page
    </Link>
  );
}

interface PreviousPageNavigationProps {
  href: string;
}

function PreviousPageNavigation(props: PreviousPageNavigationProps) {
  return (
    <Link href={props.href} aria-label={'Previous page.'} className='prev page-numbers'>Previous Page
    </Link>
  );
}

export interface PaginationProps {
  pageInfo;
  perPage: number;
  currentPage: number;
  basePath: string;
}

export default function Pagination({ pageInfo, currentPage = 1, basePath, perPage = 5 }: PaginationProps) {
  const previousPageUrl = currentPage - 1 > 1 ? `${basePath}/page/${currentPage - 1}` : basePath;
  const nextPageUrl = `${basePath}/page/${currentPage + 1}`;
  const pages = pageInfo.offsetPagination.total/perPage;
  const startPage = currentPage - 2 < 1 ? 1 : currentPage - 2;

  console.log(`Pages: ${pages} - total: ${pageInfo.offsetPagination.total} - perPage: ${perPage}`)
  const getNumberLinks = () => {
    let links = [];
    for(let p = startPage; p < pages; p++) {
        if(p === currentPage) {
          links.push(<span className='pages-numbers current' key={`pagination-${p}`}>{p}</span>)
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
