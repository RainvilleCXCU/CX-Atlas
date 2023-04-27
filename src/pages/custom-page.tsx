import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Accordion from "components/Accordion/Accordion";

export default function Page() {
	const { useQuery } = client;
	const generalSettings = useQuery().generalSettings;
	const title = "Heres the title";
	const content = "And this is all of the content here.";

	return (
		<>
			<Header
				title={generalSettings.title}
				description={generalSettings.description}
			/>

			<Head>
				<title>Custom Page - {generalSettings.title}</title>
			</Head>

			<main className="content content-single">
				<div className="wrap">
					<p>
						You can still create pages just as you would in{" "}
						<a
							href="https://nextjs.org/docs/basic-features/pages"
							target="_blank"
							rel="noreferrer"
						>
							Next.js
						</a>
						. Take a look at <code>src/pages/custom-page.tsx</code> for an
						example.
					</p>
					<Accordion title={title} content={content} isOpen={false} />
					<Accordion title={title} content={content} isOpen={false} />
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
