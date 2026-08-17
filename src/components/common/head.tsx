import NextHead from 'next/head';
import { createJsonLdBuilder, type JsonLdConfig } from 'jsonldjs';
import { NextSeo } from 'next-seo';

import { seoConfig } from '@/seo';
import { siteConfig } from '@/config';

interface HeadProps {
	title: string;
	description: string;
	route: `/${string}`;
	images?: {
		url: string;
		alt: string;
		width?: number;
		height?: number;
	}[];
	noindex?: boolean;
	nofollow?: boolean;
	canonicalUrl?: string;
	jsonLdConfig?: JsonLdConfig;
}

export function Head({
	title,
	description,
	route,
	images,
	nofollow = false,
	noindex = false,
	canonicalUrl = '',
	jsonLdConfig,
}: HeadProps) {
	const defaultCanonical = `${siteConfig.site.canonical}${route}`;

	const graph = {
		...seoConfig.openGraph,
		images: images || seoConfig.openGraph.images,
		url: defaultCanonical,
		title,
		description,
	};

	const jsonLdContent = jsonLdConfig ? createJsonLdBuilder().mergeConfig(jsonLdConfig).build() : null;

	return (
		<>
			<NextSeo
				nofollow={nofollow}
				noindex={noindex}
				title={title}
				description={description}
				canonical={canonicalUrl || defaultCanonical}
				openGraph={graph}
				twitter={seoConfig.twitter}
			/>
			{jsonLdContent && (
				<NextHead>
					<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: jsonLdContent }} />
				</NextHead>
			)}
		</>
	);
}
