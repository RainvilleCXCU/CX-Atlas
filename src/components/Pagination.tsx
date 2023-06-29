import Link from 'next/link';
import type { WPPageInfo } from 'client';

interface NextPageNavigationProps {
  href: string;
}

function NextPageNavigation(props: NextPageNavigationProps) {
  return (
    <Link href={props.href} aria-label={'Next page.'} className='page-next page-numbers'>
      &gt;
    </Link>
  );
}

interface PreviousPageNavigationProps {
  href: string;
}

function PreviousPageNavigation(props: PreviousPageNavigationProps) {
  return (
    <Link href={props.href} aria-label={'Previous page.'} className='page-prev page-numbers'>
      &lt;
    </Link>
  );
}

export interface PaginationProps {
  totalResults: number;
  perPage: number;
  currentPage: number;
  basePath: string;
  buffer?: number;
  querys?: string;
}

export default function Pagination({ totalResults, currentPage = 1, basePath, perPage = 5, buffer = 2, querys = ''}: PaginationProps) {
  const previousPageUrl = currentPage - 1 > 1 ? `${basePath}/page/${currentPage - 1}/${querys && querys}` : `${basePath}${querys && querys}`;
  const nextPageUrl = `${basePath}/page/${currentPage + 1}/${querys && querys}`;
  const pages = Math.ceil(totalResults/perPage);
  
  const endPage = currentPage + buffer > pages ? pages: currentPage + buffer;
  const startPage = currentPage - buffer < 1 ? 1 : currentPage - buffer;
  
  const hasPrevious = currentPage > 1;
  const hasMore = currentPage < endPage;


  const getNumberLinks = () => {
    let links = [];
    if(startPage >= 2) {
      links.push(<Link href={`${basePath}/page/1/${querys && querys}`} className='page-numbers' key={`pagination-1`}>1</Link>);
      if(startPage > 2) {
        links.push(<span className='page-numbers dots' key={`pagination-begin-dots`}>...</span>);
      }
    }
    for(let p = startPage; p <= endPage; p++) {
        if(p === currentPage) {
          links.push(<span className='page-numbers current' key={`pagination-${p}`}>{p}</span>)
        } else {
          links.push(<Link href={p > 1 ? `${basePath}/page/${p}/${querys && querys}` : basePath} className='page-numbers' key={`pagination-${p}`}>{p}</Link>);
        }
    }
    if(endPage <= pages - 1) {
      if(endPage < pages - 1) {
        links.push(<span className='page-numbers dots' key={`pagination-end-dots`}>...</span>);
      }
      links.push(<Link href={`${basePath}/page/${pages}/${querys && querys}`} className='page-numbers' key={`pagination-${pages}`}>{pages}</Link>);
    }
    return links;
  }

  return (
    <nav className="pagination navigation" aria-label="Pagination">
      <div className="nav-links">
          {hasPrevious && (
              <PreviousPageNavigation href={previousPageUrl} />
          )}

          {getNumberLinks()}

          {hasMore && (
              <NextPageNavigation href={nextPageUrl} />
          )}
      </div>
    </nav>
  );
}
