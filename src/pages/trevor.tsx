import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Calculator from "components/Calculator/Calculator";

export default function Page() {
	const { useQuery } = client;
	const generalSettings = useQuery().generalSettings;

	return (
		<>
			<Header
				title={generalSettings.title}
				description={generalSettings.description}
			/>

			<Head>
				<title>Trevor's Page</title>
			</Head>

			<main className="content content-single">
				<div className="wrap">
					<Calculator calculatorName="CUDeposit"></Calculator>
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
