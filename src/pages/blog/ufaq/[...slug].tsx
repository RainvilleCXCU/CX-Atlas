import { gql } from '@apollo/client';
import * as MENUS from "../../../constants/menus";
import { BlogInfoFragment } from "../../../fragments/GeneralSettings";
import { NavigationMenuItemFragment } from 'fragments/MenuItems';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import { parseHtml } from "lib/parser";
import { getNextServerSideProps } from "@faustwp/core";
import { GetServerSidePropsContext } from "next";
import { AlertFragment } from 'fragments/Alerts';
import BaseLayout from 'components/layout';

export default function Component(props) {
  
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;

  const {content, title, id} = props?.data.faqBySlug;

  return (
    <BaseLayout props={props}>
      <div id="page" className="container site ufaq-template-default single single-ufaq postid-7374 logged-in admin-bar wp-custom-logo wp-embed-responsive group-blog featured-image-wide customize-support">
          <main id="main" className="content content-single">
              <article className="post-7374 ufaq type-ufaq status-publish hentry ufaq-category-heritage-merger-resource-page post without-featured-image">

                <aside className="sidebar">
                  {blogSidebar &&
                    parseHtml(blogSidebar)
                  }
                </aside>

                <div className='post-content'>
                  <header className='entry-header'>
                    <h1>
                      {parseHtml(title || '')}
                    </h1>
                  </header>
                  <div className='entry-content'>
                    {parseHtml(content || '')}
                  </div>
                </div>
            </article>
        </main>
      </div>
    </BaseLayout>

  );
}
Component.variables = (params) => {
  return {
    slug: params.query.slug[0],
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetMediaCenterData(
    $slug: String
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
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
    faqBySlug(
      faqSlug: $slug
    ) {
      content
      id
      title
    }
    widgetSettings {
        blogtop
        blogSidebar
    }
    
    thirdPartySettings {
      ...ThirdPartySettingsFragment
    }

    cxAlerts: cXAlerts {
      edges {
        node {
          ...AlertsFragment
        }
      }
    }
    footerMenuItems: menuItems(
      where: { location: $footerLocation }
      first: 255
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 255
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res, query } = context;

    return getNextServerSideProps(context, {
        Page: Component,
        props: {
            query
        }
    });
}


