import { WebPage } from 'schema-dts';

export default [
	{
		'@type': 'WebPage',
		'@id': 'webpage:latex2js-sandbox',
		name: 'LaTeX Sandbox',
		description:
			'Edit and render LaTeX and PSTricks in the browser with LaTeX2JS, or start from one of the interactive examples.',
		url: 'https://latex2js.com/sandbox',
		isPartOf: {
			'@id': 'website:latex2js.com',
		},
		about: {
			'@id': 'software:latex2js',
		},
	} satisfies WebPage,
];
