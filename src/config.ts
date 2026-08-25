import { createJsonLdConfig } from 'jsonldjs';

import { jsonldGraph } from '@/data/jsonld';

import { site, canonical } from './seo';

const siteAddress = new URL(site.url);

export const siteConfig = {
	company: {
		nick: 'LaTeX2JS',
		name: 'Constructive',
	},
	site: {
		siteUrl: site.url,
		www: `www.${siteAddress.host}`,
		host: siteAddress.host,
		canonical,
	},
	emails: {
		support: 'support@constructive.io',
	},
};

export const defaultJsonLdConfig = createJsonLdConfig()
	.baseGraph(jsonldGraph)
	.subgraph(['software:latex2js', 'website:latex2js.com']);

export const socialLinks = {
	github: 'https://github.com/Mathapedia/LaTeX2JS',
	twitter: 'https://x.com/mathapedia',
};
