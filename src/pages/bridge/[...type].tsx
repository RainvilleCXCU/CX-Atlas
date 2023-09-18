import { client, Page as PageType, PageIdType } from 'client';
import { Footer, Header, Pagination, Posts } from 'components';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import GTM from 'components/ThirdParty/gtm';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { getNextServerSideProps, getNextStaticProps, is404 } from '@faustjs/next';
// import { getProductByName } from 'lib/data/products';
import { parseHtml, parseShortcode } from 'lib/parser';
import apolloClient from 'apolloClient';
import { gql } from '@apollo/client';
import HotJar from 'components/ThirdParty/hotjar';
import Qualtrics from 'components/ThirdParty/qualtrics';
import Spectrum from 'components/ThirdParty/spectrum';

export interface PageProps {
    page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page({ product, type, minor }) {
    const { usePosts, useQuery } = client;
    const { generalSettings, widgetSettings } = useQuery();

    const productInfo = { account: product.title };
    let widget = ((type && type == 'start') ? widgetSettings?.applyStart(productInfo) : minor == 'no' ? widgetSettings?.applyNow(productInfo) : widgetSettings?.applyNowMinor(productInfo)) || ''

    widget = widget.replace(/account=none/gi, `account=${product.title.replace(' ', '-').toLowerCase()}`);

    return (
        <>
            <Head>
                <title>
                    {`Apply ${type} : ${product.displayName} - ${generalSettings.title}`}
                </title>
            </Head>
            <GTM />
            <HotJar />
            <span id='cx-bridge'>
                <Header
                    title={generalSettings.title}
                    description={generalSettings.description}
                    showButtons={false}
                    showNavigation={false}
                    showSearch={false}
                    showUtilityNav={false}
                />


                <div id="page" className="container site">
                    <main id="main" className="content content-single">
                        <article className="entry-content">
                            {parseHtml(widget)}
                        </article>
                    </main>
                </div>
            </span>

            {/* <Footer copyrightHolder={generalSettings.title} /> */}
			<Qualtrics />
			<Spectrum />
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res, query } = context;

    const account = query.account?.toString().replace('-', ' ');
    const type = query.type || '';
    const minor = query.minor || '';

    const { data } = await apolloClient.query({
        query: gql`
        query Products {
            products(where: {title: "${account}"}) {
              edges {
                node {
                    id
                    title
                    displayName
                    bookNowURL
                    accurateDate
                    loanBasedAmount
                    memberApplyNowURL
                    minorMemberApplyNowURL
                    minorNonMemberApplyNowURL
                    nonMemberApplyNowURL
                    productPageURL
                }
              }
            }
          }
      `,
    });
    const product = data.products.edges[0]?.node;

    if (data.products.edges.length == 0) {
        return getNextServerSideProps(context, {
            Page,
            client,
            redirect: {
                destination: `/open-an-account/`,
                permanent: false,
            }
        });
    } else if (product.minorMemberApplyNowURL == '' && type == 'start') {
        // console.log('Minor accounts not available');
        return getNextServerSideProps(context, {
            Page,
            client,
            redirect: {
                destination: `/apply-now/?account=${query.account}&minor=no`,
                permanent: false,
            }
        });
    } else if (!minor && product.minorMemberApplyNowURL != '' && type != 'start') {
        // console.log('Start Over');
        return getNextServerSideProps(context, {
            Page,
            client,
            redirect: {
                destination: `/apply-start/?account=${query.account}`,
                permanent: false,
            }
        });
    } else if (minor && minor == 'yes' && product.minorMemberApplyNowURL == '' && type == 'now') {
        // console.log('Change Minor to now, not available');
        return getNextServerSideProps(context, {
            Page,
            client,
            redirect: {
                destination: `/apply-now/?account=${query.account}&minor=no`,
                permanent: false,
            }
        });
    } else {
    }
    return getNextServerSideProps(context, {
        Page,
        client,
        props: {
            product,
            type,
            minor
        }
    });
}