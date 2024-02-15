import { getNextServerSideProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import GTM from "components/ThirdParty/gtm";
import HotJar from "components/ThirdParty/hotjar";
import Qualtrics from "components/ThirdParty/qualtrics";
import Spectrum from "components/ThirdParty/spectrum";
import Personyze from "components/ThirdParty/personyze";
import { parseHtml } from "lib/parser";
import { useRouter } from "next/router";

export default function Page({product, productFilters}) {
    const { useQuery } = client;
    const { generalSettings, widgetSettings } = useQuery();
    const widget = widgetSettings?.scheduler;
    return (
        <>
            <Head>
                <title>
                    {`Book a Call`}
                </title>
            </Head>
            <GTM />
            <Personyze />
            <HotJar />
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
                        {parseHtml(widget?.toString() || '')}
                    </article>
                </main>
            </div>

            <Footer copyrightHolder={generalSettings.title} />
            <Qualtrics />
            <Spectrum />
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res, query } = context;
    const product = query.productType || '';
    const productFilters = query.productFilters || '';

    return getNextServerSideProps(context, {
        Page,
        client,
        props: {
            product,
            productFilters
        }
    });
}
