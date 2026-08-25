import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { mkdirp } from 'mkdirp';

import { siteConfig } from '../config';
import { seoConfig } from '../seo';

const canonical: string = seoConfig.canonical;
const pageObjects: Record<string, PageObject> = {};

const OUT_DIR: string = path.resolve(__dirname, '../../out');
const IGNORE: string[] = ['404', '_document', '_app'];

interface PageObject {
	page: string;
	lastModified: Date;
}

const walkSync = (dir: string): void => {
	// Get all html files of the current directory
	const htmlFiles: string[] = globSync(`${dir}/**/*.html`);

	htmlFiles.forEach((htmlFile: string) => {
		// Retrieve file's stats
		const fileStat = fs.statSync(htmlFile);

		// Construct this file's pathname excluding the outer folder & its extension
		let cleanFileName: string = htmlFile.replace(`${dir}/`, '').replace('.html', '');

		// Any index.js pages will be renamed to /
		if (cleanFileName.match(/\/index$/) || cleanFileName === 'index') {
			cleanFileName = cleanFileName.replace(/\/?index$/, '');
		}

		// The filename only without path
		const exactFileName: string | undefined = cleanFileName.split('/').pop();

		if (exactFileName !== undefined && !IGNORE.includes(exactFileName)) {
			pageObjects[`/${cleanFileName}`] = {
				page: `/${cleanFileName}`,
				lastModified: fileStat.mtime,
			};
		}
	});
};

// Fill `pageObjects`
walkSync(OUT_DIR);

function formatDate(date: Date): string {
	const d = new Date(date);
	let month: string = '' + (d.getMonth() + 1);
	let day: string = '' + d.getDate();
	const year: number = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

const pageSitemapXml: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Object.keys(pageObjects)
		.map(
			(pagePath) => `<url>
    <loc>${canonical}${pagePath}</loc>
    <lastmod>${formatDate(new Date(pageObjects[pagePath].lastModified))}</lastmod>
  </url>`,
		)
		.join('\n')}
</urlset>`;

const sitemapXml: string = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
<loc>${canonical}/sitemaps/pages.xml</loc>
</sitemap>
</sitemapindex>
`;

interface BadAgent {
	text: string;
	bots: string[];
}

const BAD_AGENTS: BadAgent[] = [
	{
		text: 'Search engines only please :) Thanks for obeying robots.txt',
		bots: ['UbiCrawler', 'DOC', 'Zao', 'discobot', 'dotbot', 'yacybot'],
	},
	{
		text: "Dear bots, we don't appreciate you copying site content and providing very little additional value.",
		bots: [
			'sitecheck.internetseer.com',
			'Zealbot',
			'MJ12bot',
			'MSIECrawler',
			'SiteSnagger',
			'WebStripper',
			'WebCopier',
			'Fetch',
			'Offline Explorer',
			'Teleport',
			'TeleportPro',
			'WebZIP',
			'linko',
			'HTTrack',
			'Microsoft.URL.Control',
			'Xenu',
			'larbin',
			'libwww',
			'ZyBORG',
			'Download Ninja',
		],
	},
	{
		text: 'Recursive mode wget is not friendly',
		bots: ['wget', 'grub-client'],
	},
	{
		text: "I realize you don't follow robots.txt, but FYI",
		bots: ['k2spider'],
	},
	{
		text: 'Abusive bots',
		bots: ['NPBot'],
	},
];

const robotsTxt: string = `
#
# Dear bot, crawler or kind technical person who wishes to crawl ${siteConfig.site.host},
#   please email ${siteConfig.emails.support}. We require whitelisting to access our sitemap.
#
#   Thanks in advance! Your friendly Ops Team @ ${siteConfig.company.name}.

${BAD_AGENTS.map(({ text, bots }) => {
	return `
#
# ${text}
#

  ${bots
		.map((bot) => {
			return `
User-agent: ${bot}
Disallow: /`;
		})
		.join('\n')}
  `;
}).join('')}

User-agent: *

${Object.keys(pageObjects)
	.map((pagePath) => `Allow: ${pagePath}$`)
	.join('\n')}

Sitemap: ${canonical}/sitemaps/pages.xml

Host: ${siteConfig.site.host}

`;

fs.writeFileSync('out/sitemap.xml', sitemapXml);
mkdirp.sync('out/sitemaps');
fs.writeFileSync('out/sitemaps/pages.xml', pageSitemapXml);
fs.writeFileSync('out/robots.txt', robotsTxt);
