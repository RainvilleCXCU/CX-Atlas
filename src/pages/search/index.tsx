import * as MENUS from 'constants/menus';
import { BlogInfoFragment } from '../../fragments/GeneralSettings';
import { AlertFragment } from 'fragments/Alerts';
import { NavigationMenuItemFragment } from 'fragments/MenuItems';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
const Pagination = dynamic(() => import('components/Pagination'));
const SearchBar = dynamic(() => import('components/Search/SearchBar'));
import SearchListing from 'components/Search/Listing';
import { getNextServerSideProps } from '@faustwp/core';
import { GetServerSidePropsContext } from 'next';

import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Categories from 'components/Posts/categories';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import BaseLayout from 'components/layout';

const POSTS_PER_PAGE = 5;

export default function Component(props) {
  const { query = {} } = useRouter();
  const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
  const { results, total } = props.data.searchwp;
  const currentPage = query?.page?.[0] ? parseInt(query.page[0]) : 1;
  const search = query.s;
  const categories = props?.data?.categories;

  return (
    <>
    <BaseLayout props={props}>
			<main id="main" className="content content-index container">
          <div id="post-wrap" className='cx-search__wrapper search'>
          <div className='cx-search__results'>
              <SearchBar />
              {results && results.map((post) => (
              <SearchListing
                  key={`post-listing=${post.id}` ?? ''}
                  id={`post-${post.id}`}
                  title={post.title}
                  url={post.uri}
                  content={post.excerpt}
                  categories={post.categories?.nodes}
                  featuredImage={post.featuredImage} />
              ))}

              <Pagination currentPage={currentPage} totalResults={parseInt(total)} basePath={`/search`} perPage={POSTS_PER_PAGE} querys={`?s=${search}`} />
          </div>

          <aside className="cx-search__sidebar sidebar">
              <Categories categories={categories?.nodes} />
          </aside>
          </div>
      </main>
    </BaseLayout>
    </>
  );
}
// export default function Component(props) {
  
//   const { query = {} } = useRouter();
//   const { title: siteTitle, description: siteDescription, logo: siteLogo, footerText: footerText, databaseId: databaseId } =
//     props?.data?.generalSettings;
//   const { gtmId, gtmEnabled, hotjarEnabled, hotjarId, personyzeDomains, personyzeEnabled, personyzeId, spectrumId, spectrumEnabled, qualtricsId, qualtricsEnabled, siteimproveId, siteimproveEnabled } = props?.data?.thirdPartySettings;
//   const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
//   const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
//   const { title, content, seo, link, featuredImage } = props?.data?.page ?? { title: '' };
//   const headerSettings = props?.data?.headerSettings; 
//   const { footerUtilities, footerAppIcons, footerSocialIcons } = props?.data?.footerSettings;
//   const { results, total } = props.data.searchwp;
//   const currentPage = query?.page?.[0] ? parseInt(query.page[0]) : 1;
//   const search = query.s;
//   const categories = props?.data?.categories;
//   const activeAlerts = props?.data?.cxAlerts?.nodes?.filter(alert => alert.displayPages.includes(databaseId.toString())) || [];
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState(null);

//   return (
//     <>
//       <SEO
// 				title={title}
// 				metaDesc={seo?.metaDesc}
// 				canonicalURL={seo?.canonical ? seo?.canonical : link} //I'm unsure about this. Changing the canonical URL in Yoast doesn't seem to do anything...
// 				ogLocale={seo?.locale} // Not sure where this is in the page object
// 				ogType={seo?.opengraphType}
// 				ogTitle={seo?.title}
// 				ogDescription={seo?.opengraphDescription}
// 				ogURL={seo?.opengraphUrl}
// 				breadcrumbs={seo?.breadcrumbs}
// 				ogSite_Name={seo?.opengraphSiteName}
// 				published_time={seo?.opengraphPublishedTime}
// 				modified_time={seo?.opengraphModifiedTime}
// 				ogImage={seo?.opengraphImage?.mediaItemUrl}
// 				ogImageWidth={seo?.opengraphImage?.mediaDetails.width}
// 				ogImageHeight={seo?.opengraphImage?.mediaDetails.height}
// 				ogImageType={seo?.opengraphImage?.mimeType}
// 				twitter_card={"summary_large_image"} // Not sure where this is in the page object
// 				twitter_label1={"Est. reading time"} // Not sure where this is in the page object
// 				twitter_data1={seo?.readingTime + " minutes"}
//   />
//   <GTM
//     id={gtmId}
//     enabled={gtmEnabled} />
//   <Personyze
//     id={personyzeId}
//     enabled={personyzeEnabled}
//     domains={personyzeDomains} />
//   {hotjarEnabled &&
//   <HotJar
//     id={hotjarId}
//     enabled={hotjarEnabled} />
//   }
    

//     <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
//       <modalContentContext.Provider value={{modalContent, setModalContent}}>
//         {isModalOpen && modalContent &&
//           <Modal />
//         }
//   {
//     activeAlerts.length > 0 &&
//     <Alert alerts={activeAlerts} />
//   }
// 			<Loading /> 
// 			<Header
// 				title={title}
// 				description={siteDescription}
// 				logo={siteLogo}
//         menuItems={primaryMenu}
//         headerSettings={headerSettings}
// 			/>
// 			<main id="main" className="content content-index container">
//           <div id="post-wrap" className='cx-search__wrapper search'>
//           <div className='cx-search__results'>
//               <SearchBar />
//               {results && results.map((post) => (
//               <SearchListing
//                   key={`post-listing=${post.id}` ?? ''}
//                   id={`post-${post.id}`}
//                   title={post.title}
//                   url={post.uri}
//                   content={post.excerpt}
//                   categories={post.categories?.nodes}
//                   featuredImage={post.featuredImage} />
//               ))}

//               <Pagination currentPage={currentPage} totalResults={parseInt(total)} basePath={`/search`} perPage={POSTS_PER_PAGE} querys={`?s=${search}`} />
//           </div>

//           <aside className="cx-search__sidebar sidebar">
//               <Categories categories={categories?.nodes} />
//           </aside>
//           </div>
//       </main>

// 			<Footer copyrightHolder={footerText} menuItems={footerMenu} logo={siteLogo} footerUtilities={footerUtilities} footerAppIcons={footerAppIcons} footerSocialIcons={footerSocialIcons} />
// 			</modalContentContext.Provider>
//       </isModalOpenContext.Provider>
//       {qualtricsEnabled &&
// 			<Qualtrics
//         id={qualtricsId}
//         enabled={qualtricsEnabled} />
//      }
//      {spectrumEnabled &&
// 			<Spectrum
//         id={spectrumId}
//         enabled={spectrumEnabled} />
//      }
//      {siteimproveEnabled &&
// 			<Siteimprove
//         id={siteimproveId}
//         enabled={siteimproveEnabled} />
//      }
//     </>
//   );
// }

Component.variables = (params) => {
  return {
    searchTerm: params.query.s || '',
    offset: params.query.page ? (POSTS_PER_PAGE * parseInt(params.query.page)).toString() : '0',
    postsPerPage: POSTS_PER_PAGE.toString(),
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetSearchData(
    $searchTerm: String!
    $offset: String!
    $postsPerPage: String!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    searchwp(offset: $offset, postsPerPage: $postsPerPage, terms: $searchTerm) {
      results {
        id
        title
        uri
        excerpt
        categories {
          nodes {
            name
            uri
          }
        }
        featuredImage {
          node {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
      total
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerSettings {
      headerUtilities
      headerUtilitiesMobile
      headerButtons
      headerButtonsMobile
    }
    footerSettings {
      footerUtilities
      footerAppIcons
      footerSocialIcons
    }
    thirdPartySettings {
      ...ThirdPartySettingsFragment
    }
    categories {
      nodes {
        name
        uri
        count
      }
    }

    cxAlerts: cXAlerts {
        edges {
          node{
            ...AlertsFragment
          }
        }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }, first: 255) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;


export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getNextServerSideProps(context, {
      Page: Component,
  });
}