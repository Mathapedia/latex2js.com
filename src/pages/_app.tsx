import '@/styles/globals.css';
import 'latex2js/latex2js.css';

import type { AppProps } from 'next/app';
import { Arbutus_Slab } from 'next/font/google';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import { Layout } from '@/components/common/layout';
import { seoConfig } from '@/seo';

const arbutusSlab = Arbutus_Slab({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-arbutus-slab',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={`${arbutusSlab.variable} contents`}>
			<NextHead>
				<link rel='icon' type='image/png' href='/favicon.png' />
			</NextHead>
			<DefaultSeo openGraph={seoConfig.openGraph} twitter={seoConfig.twitter} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
}
