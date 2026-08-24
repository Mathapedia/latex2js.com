// =============================================================================
// SEO Configuration
// =============================================================================
// Central place for all SEO-related content and metadata.
// Edit page-specific SEO in the `pages` object below.
// =============================================================================

export const site = {
	url: 'https://latex2js.com',
	name: 'LaTeX2JS',
	twitterHandle: '@mathapedia',
};

export const canonical = site.url;

// -----------------------------------------------------------------------------
// Page SEO Interface
// -----------------------------------------------------------------------------

export interface PageSeo {
	title: string;
	description: string;
	ogImage?: string;
}

// -----------------------------------------------------------------------------
// Page-Specific SEO
// -----------------------------------------------------------------------------
// Add new pages here. The key should match the route path.
// -----------------------------------------------------------------------------

export const pages: Record<string, PageSeo> = {
	'/': {
		title: 'LaTeX2JS - Interactive Math Equations and Diagrams',
		description:
			'Author interactive math equations and diagrams online using LaTeX and PSTricks. LaTeX2JS renders pspicture environments, draggable vectors, sliders, and live plots directly in the browser.',
	},
	'/examples': {
		title: 'Examples - LaTeX2JS',
		description:
			'Interactive PSTricks examples rendered live by LaTeX2JS: block diagrams, draggable vectors, slider-driven plots, and more — each with its LaTeX source.',
	},
	'/installation': {
		title: 'Installation - LaTeX2JS',
		description:
			'Install LaTeX2JS for React, Vue, or plain HTML5. Render interactive LaTeX and PSTricks diagrams in your own app in minutes.',
	},
	'/installation/react': {
		title: 'React Installation - LaTeX2JS',
		description:
			'Use the latex2react package to render interactive LaTeX and PSTricks diagrams in React applications.',
	},
	'/installation/vue': {
		title: 'Vue Installation - LaTeX2JS',
		description:
			'Use the latex2vue plugin to render interactive LaTeX and PSTricks diagrams in Vue and Nuxt applications.',
	},
	'/installation/html5': {
		title: 'HTML5 Installation - LaTeX2JS',
		description:
			'Drop the LaTeX2HTML5 bundle into any HTML page and render interactive LaTeX and PSTricks diagrams with a single script tag.',
	},
};

// -----------------------------------------------------------------------------
// Default OG Image
// -----------------------------------------------------------------------------

export const defaultOgImage = {
	url: `${canonical}/images/share.jpg`,
	width: 1024,
	height: 768,
	alt: 'LaTeX2JS',
};

// -----------------------------------------------------------------------------
// Computed SEO Config (used by next-seo)
// -----------------------------------------------------------------------------

export const seoConfig = {
	siteUrl: site.url,
	title: pages['/'].title,
	canonical,
	description: pages['/'].description,
	openGraph: {
		type: 'website',
		url: site.url,
		title: pages['/'].title,
		description: pages['/'].description,
		site_name: site.name,
		images: [defaultOgImage],
	},
	twitter: {
		handle: site.twitterHandle,
		site: site.twitterHandle,
		cardType: 'summary_large_image',
	},
};

// -----------------------------------------------------------------------------
// Helper to get SEO for a route (with fallback to home)
// -----------------------------------------------------------------------------

export function getPageSeo(route: string): PageSeo {
	return pages[route] ?? pages['/'];
}
