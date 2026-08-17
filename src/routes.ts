// ==== App routes ====
export const routes = {
	home: '/',
	examples: {
		index: '/examples',
		example: (exampleId: string) => `/examples/${exampleId}` as const,
	},
	installation: {
		index: '/installation',
		react: '/installation/react',
		vue: '/installation/vue',
		html5: '/installation/html5',
	},
	external: {
		github: 'https://github.com/Mathapedia/LaTeX2JS',
		exampleApps: 'https://github.com/Mathapedia/LaTeX2JS/tree/main/examples',
		npm: 'https://www.npmjs.com/package/latex2js',
		sandbox: 'https://mathapedia.com/latex',
		docs: 'https://mathapedia.com/books/31/sections/176',
		mathapedia: 'https://mathapedia.com',
		mathjax: 'https://www.mathjax.org',
	},
} as const;
