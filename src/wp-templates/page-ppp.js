import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { NavigationMenuItemFragment } from '../fragments/MenuItems';
import { parseHtml } from 'lib/parser';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import dynamic from 'next/dynamic';
const BaseLayout = dynamic(() => import('components/layout'));

export default function Component(props) {
  const { content } = props?.data?.postPreview ?? { title: '' };

  return (
    <>
    <BaseLayout props={props}>
			<div id="page" className="container site">
				<main id="main" className="content content-single">
					<article className="entry-content post-content">
						{parseHtml(content ?? "")}
					</article>
				</main>
			</div>
    </BaseLayout>
    </>
  );
}

Component.variables = (seedQuery, ctx, extra) => {
  const {databaseId, uri} = seedQuery;
  return {
    // uri: `${uri}${extra?.query?.params ? `?${JSON.stringify(extra?.query?.params)}`: ''}`,
    cache: new Date().getSeconds().toString(),
    pageId: extra?.query?.query?.page_id,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetPagePreviewData(
    $pageId: String
    $cache: String
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    postPreview(pageId: $pageId, cache: $cache) {
      title
      content
      databaseId
      seo {
          canonical
          metaDesc
          breadcrumbs {
            text,
            url
          }
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphType
          opengraphUrl
          title
          opengraphSiteName
          opengraphImage {
            mimeType
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
      link
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

    cxAlerts: cXAlerts {
      nodes {
        ...AlertsFragment
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
