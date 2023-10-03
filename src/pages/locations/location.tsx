import { getNextServerSideProps, getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import GTM from "components/ThirdParty/gtm";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "components/Map/map";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "apolloClient";
import { LocationPageFragment } from "fragments/LocationDetails";
import PageTitle from "components/Blocks/PageTitle";
import Container from "components/Blocks/Container";
import Columns from "components/Blocks/Columns";
import Column from "components/Blocks/Column";
import HotJar from "components/ThirdParty/hotjar";
import Qualtrics from "components/ThirdParty/qualtrics";
import Spectrum from "components/ThirdParty/spectrum";
import { Store } from 'context/store';
import { useRouter } from "next/router";
import Personyze from "components/ThirdParty/personyze";
import { parseHtml } from "lib/parser";
import { LocationSettingsFragment } from "fragments/LocationSettings";

export default function Page({ locationSettings, locationDetails }) {
	const { useQuery } = client;
	const { query = {}, push } = useRouter();
	const [state, setState] = useContext(Store);
	const { generalSettings } = useQuery();

	useEffect(() => {
		setState({
			...state,
			locationDetails: {
				...state.locationDetails,
			}
		});
	}, [locationDetails]);

	return (
		<>
			<Header
				title={generalSettings.title}
				description={generalSettings.description}
				logo={generalSettings.logo}
			/>

			<Head>
				<title>{`Locations - ${generalSettings.title}`}</title>
			</Head>
			<GTM />
			<Personyze />
			<HotJar />
			<div id="page" className="container site">
				<main className="content content-single">
					<article className="entry-content">
						<Container align="full" classNames={`no-margin`}>
							<Columns classNames={`no-margin`}>
								<Column>
									<PageTitle heading={locationDetails?.title ? locationDetails.title : 'No Location Found'} />
								</Column>
							</Columns>
						</Container>
						{ parseHtml(locationDetails.content || '') }

						<Container align="full" classNames={`no-margin`}>
							<Columns classNames={`no-margin`}>
								<Column>
									<Wrapper apiKey={locationSettings.apiBrowserKey}>
										<Map lat={locationDetails.lat} lng={locationDetails.lng} locationSettings={locationSettings}  markers={[
											{
												...locationDetails.details,
												id: locationDetails.id
											}]}/>
									</Wrapper>
								</Column>
							</Columns>
						</Container>
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
	const location = query?.location;

	const { data } = await apolloClient.query({
		query: gql`
		${LocationPageFragment}
		${LocationSettingsFragment}
        query LocationDetails {
			locations(where: {name: "${location}"})  {
				nodes {
					...LocationPageFragment
				}
			}
			locationSettings {
				...LocationSettingsFragment
			}
          }
      `,
	});
	const locationDetails = data.locations.nodes[0] ? data.locations.nodes[0] : [];
	return getNextServerSideProps(context, {
		Page,
		client,
		props: {
			locationSettings: data.locationSettings,
			locationDetails: locationDetails
		}
	});
}
