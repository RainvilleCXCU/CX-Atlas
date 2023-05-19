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
import parseHtml from 'lib/parser';
import apolloClient from 'apolloClient';
import { gql } from '@apollo/client';

export interface PageProps {
    page: PageType | PageType['preview']['node'] | null | undefined;
}

export default function Page({ product, type, minor }) {
    const { usePosts, useQuery } = client;
    const { generalSettings, widgetSettings } = useQuery();
    const widget = ((type && type == 'start') ? widgetSettings?.applyStart : minor == 'no' ? widgetSettings?.applyNow : widgetSettings?.applyNowMinor) || ''

    return (
        <>
            <Head>
                <title>
                    {`Apply ${type} : ${product.displayName} - ${generalSettings.title}`}
                </title>
            </Head>
            <Header
                title={generalSettings.title}
                description={generalSettings.description}
                showButtons={false}
                showNavigation={false}
                showSearch={false}
                showUtilityNav={false}
            />

            <GTM />

            <div id="page" className="container site">
                <main id="main" className="content content-single">
                    <article className="entry-content">
                        {parseHtml(widget)}
                    </article>
                </main>
            </div>

            {/* <Footer copyrightHolder={generalSettings.title} /> */}
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

    console.log(`Products: ${data.products.edges.length}`);
    console.log(`Req: ${req.url}`)


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
        console.log('Minor accounts not available');
        return getNextServerSideProps(context, {
            Page,
            client,
            redirect: {
                destination: `/apply-now/?account=${query.account}&minor=no`,
                permanent: false,
            }
        });
    } else if (!minor && product.minorMemberApplyNowURL != '' && type != 'start') {
        console.log('Start Over');
        // return getNextServerSideProps(context, {
        //     Page,
        //     client,
        //     redirect: {
        //         destination: `/apply-start/?account=${query.account}`,
        //         permanent: false,
        //     }
        // });
    } else if (minor && minor == 'yes' && product.minorMemberApplyNowURL == '' && type == 'now') {
        console.log('Change Minor to now, not available');
        // return getNextServerSideProps(context, {
        //     Page,
        //     client,
        //     redirect: {
        //         destination: `/apply-now/?account=${query.account}&minor=no`,
        //         permanent: false,
        //     }
        // });
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