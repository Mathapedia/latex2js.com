import { WebSite } from 'schema-dts';

export default [
	{
		'@type': 'WebSite',
		'@id': 'website:latex2js.com',
		url: 'https://latex2js.com',
		name: 'LaTeX2JS',
		description: 'Author interactive math equations and diagrams online using LaTeX and PSTricks.',
		mainEntity: {
			'@id': 'software:latex2js',
		},
		publisher: {
			'@id': 'org:constructive',
		},
	},
] satisfies WebSite[];
