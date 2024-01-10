import { getNextServerSideProps, getNextStaticProps } from '@faustjs/next';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import Page from '..';
import { client } from 'client';
import apolloClient from 'apolloClient';
import { gql } from '@apollo/client';
import { LocationSettingsFragment } from 'fragments/LocationSettings';
import { useRouter } from 'next/router';

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
	const { locationCat, location } = context.params;

	// const { location } = context.query;

	if (!(locationCat === 'find-location')) {
		return {
			notFound: true,
		};
	}
	console.log(`Location: ${location}`)

	return getNextStaticProps(context, {
		Page,
		client,
		revalidate: parseInt(process.env.PAGE_REVALIDATION) ? parseInt(process.env.PAGE_REVALIDATION) : null,
	});
}

export function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}


// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	const { req, res, query } = context;
// 	const { locationCat } = context.params;
// 	const { location } = query;

// 	if (!(locationCat === 'find-location')) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	console.log(`Location: ${location}`)

// 	const { data } = await apolloClient.query({
// 		query: gql`
// 			${LocationSettingsFragment}
// 			query LocationSettings {
// 				locationSettings {
// 					...LocationSettingsFragment
// 				}
// 			}
// 		`,
// 	});
// 	const locationSettings = data.locationSettings;
// 	// const location = query?.location;
// 	return getNextServerSideProps(context, {
// 		Page,
// 		client,
// 		props: {
// 			locationSettings: data.locationSettings,
// 			location: location,
// 		},
// 	});
// }