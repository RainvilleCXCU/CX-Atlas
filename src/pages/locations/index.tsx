import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import parseHtml from "../../lib/parser";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import LocationListing from 'components/Locations/listing';
import Styleguide from 'components/Styles/styleguide';

export default function Page() {
  const { useQuery } = client;
  const { usePage } = client;
  const generalSettings = useQuery().generalSettings;
  const wpslSettings = useQuery().locationsSettings;

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true)
    fetch('/wp-admin/admin-ajax.php?action=store_search&lat=44.9810012&lng=-89.7192132&max_results=25&search_radius=25&autoload=1')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
        logo={generalSettings.logo}
      />

      <Head>
        <title>Custom Page - {generalSettings.title}</title>
        <Styleguide />
      </Head>

      <main className="content content-single">
        <div className="wrap">
          <p>
            You can still create pages just as you would in{' '}
            <a
              href="https://nextjs.org/docs/basic-features/pages"
              target="_blank"
              rel="noreferrer">
              Next.js
            </a>
            <div id="wpsl-wrap" className="wpsl-store-below">
              <div id="wpsl-result-list">
                <div id="wpsl-stores">
                  <ul>
                    {data?.map((location, index) => {
                      return <li key={location.id} data-store-id={location.id}>
                        <LocationListing
                          id={location.id}
                          address={location.address}
                          city={location.city}
                          state={location.state}
                          zip={location.zip}
                          lat={location.lat}
                          lng={location.lng}
                          distance={location.disance}
                          logo={generalSettings.logo}
                        />
                      </li>
                    })}
                  </ul>

                </div>
              </div>
            </div>
            . Take a look at <code>src/pages/custom-page.tsx</code> for an
            example.
          </p>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
