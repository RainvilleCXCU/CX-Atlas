// components/layout.js

import Footer from './Footer/Footer'
import Header from './Header/Header';
import Head from 'next/head';
import GTM from './ThirdParty/gtm';
import { client } from 'client';
import { addCSSAsset } from 'lib/enqueuedFiles';
import parseHtml from 'lib/parser';

export default function Layout({ page, children = <></> }) {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;

    const enqueuedStylesheets = page.enqueuedStylesheets().edges;
    return (
        <>
            <Head>
                <title>
                    {page?.title()} - {generalSettings.title}
                </title>
            </Head>
            <GTM />
            <Header
                title={generalSettings.title}
                description={generalSettings.description}
                logo={generalSettings.logo}
            />  
            <div id="page" className='container site'>
                <main className="content content-single">
                    <article className='entry-content'>
                        {parseHtml(page?.content() ?? '')}
                    </article>
                </main>
            </div>

            <Footer copyrightHolder={generalSettings.title} />
        </>
    )
}