import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { AlertFragment } from '../fragments/Alerts';
import { NavigationMenuItemFragment } from '../fragments/MenuItems';
import { parseHtml } from 'lib/parser';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { locationSettingsContext } from 'components/Locations/locationsContext';
const BaseLayout = dynamic(() => import('components/layout'));
// import BaseLayout from 'components/layout';

export default function Component(props) {
  const { content } = props?.data?.locationsPreview ?? { title: '' };
	// const { locationSettings, setLocationSettings } = useContext(locationSettingsContext);
  const [locationSettings, setLocationSettings] = useState(props?.data?.locationSettings);
  // if (!locationSettings) {
  //   setLocationSettings(props?.data?.locationSettings);
  // }
  return (
    <>
    <BaseLayout props={props}>
			<div id="page" className="container site">
				<main id="main" className="content content-single">
					<article className="entry-content post-content">
            <locationSettingsContext.Provider
              value={{ locationSettings, setLocationSettings }}
            >
              {parseHtml(content ?? "")} 
            </locationSettingsContext.Provider>
					</article>
				</main>
			</div>
    </BaseLayout>
    </>
  );
}
Component.variables = (seedQuery, ctx, extra) => {
  const {databaseId, uri} = seedQuery;
  console.log('Variables');
  console.log(extra?.query?.query?.p);
  return {
    // uri: `${uri}${extra?.query?.params ? `?${JSON.stringify(extra?.query?.params)}`: ''}`,
    cache: new Date().getSeconds().toString(),
    pageId: extra?.query?.query?.p,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};
Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetLocationsData(
    $pageId: String
    $cache: String
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    locationsPreview(pageId: $pageId, cache: $cache) {
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
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphImage {
          mimeType
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
      }
      details {
        address
        city
        lat
        lng
        state
        zip
        contact
        specialMessage
        specialMessageTitle
        specialMessageType
        services
      }
      link
    }

    locationSettings {
      autoLocate
      startLatlng
      searchRadius
      apiBrowserKey
      autoZoomLevel
      mapType
      distanceUnit
      zoomLevel
      urlLabel
      streetview
      startLatlng
      typeControl
      scrollwheel
      controlPosition
      markerIconProps
      startMarker
      storeMarker
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
