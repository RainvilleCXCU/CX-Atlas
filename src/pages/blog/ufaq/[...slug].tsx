import { gql } from '@apollo/client';
import * as MENUS from "../../../constants/menus";
import { BlogInfoFragment } from "../../../fragments/GeneralSettings";
import { NavigationMenuItemFragment } from 'fragments/MenuItems';
import { ThirdPartySettingsFragment } from 'fragments/ThirdParty';
import { parseHtml } from "lib/parser";
import { getNextStaticProps } from "@faustwp/core";
import { GetStaticPropsContext } from "next";
import { AlertFragment } from 'fragments/Alerts';
import BaseLayout from 'components/layout';
import { useRouter } from 'next/router';

export default function Component(props) {
  
  const { blogtop, blogSidebar } = props?.data?.widgetSettings;

  const {content, title, id} = props?.data.faqBySlug;
  const router = useRouter();

  // Force clear loading immediately during render
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_DISABLE_TERM_REDIRECTS !== 'true') {
  setTimeout(() => {
      if (router?.events) {
      console.log('Clearing loading via immediate setTimeout');
      router.events.emit('routeChangeComplete', window.location.pathname);
      router.events.emit('routeChangeError', window.location.pathname);
      }
  }, 0);
  }

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
  // Handle both static and dynamic contexts, ensuring slug is always valid
  const slug = params?.params?.slug?.[0] || params?.params?.query?.slug?.[0] || null;  
  return {
    slug: slug,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${ThirdPartySettingsFragment}
  ${AlertFragment}
  query GetFAQ(
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

    cxAlerts: cXAlerts(first: 50) {
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

export async function getStaticPaths() {
  // For now, we'll use fallback: 'blocking' to generate pages on-demand
  // In the future, you could query all FAQ slugs here if needed
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;

    // Ensure slug is always defined to avoid serialization errors
    const sanitizedParams = {
        ...params,
        slug: params?.slug || null
    };

    return getNextStaticProps(context, {
        Page: Component,
        props: {
            query: sanitizedParams
        },
        revalidate: process.env.NEXT_PUBLIC_PAGE_REVALIDATION
          ? parseInt(process.env.NEXT_PUBLIC_PAGE_REVALIDATION)
          : 60 // Default revalidation of 60 seconds
    });
}


