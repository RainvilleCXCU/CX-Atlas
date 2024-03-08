import { getNextStaticProps } from '@faustwp/core';
import { GetStaticPropsContext } from 'next';
import Page from '..';

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
	const { locationCat, location } = context.params;

	if (!(locationCat === 'find-location')) {
		return {
			notFound: true,
		};
	}
	console.log(`Location: ${location}`)

	return getNextStaticProps(context, {
		Page,
		revalidate: parseInt(process.env.PAGE_REVALIDATION) ? parseInt(process.env.PAGE_REVALIDATION) : null,
	});
}

export function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}