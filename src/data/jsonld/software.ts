export default [
	{
		'@type': 'SoftwareApplication',
		'@id': 'software:latex2js',
		name: 'LaTeX2JS',
		alternateName: ['LaTeX2HTML5'],
		url: 'https://latex2js.com',
		startDate: '2013-10',
		applicationCategory: ['math', 'latex'],
		operatingSystem: 'Web',
		description:
			'A JavaScript LaTeX rendering engine that brings LaTeX and PSTricks to the browser: pspicture environments, draggable vectors, sliders, and live plots, with equations typeset by MathJax. Originally launched as LaTeX2HTML5 and reached #3 trending on GitHub.',
		creator: {
			'@id': 'person:danlynch',
		},
		isPartOf: {
			'@id': 'software:mathapedia',
		},
		isBasedOn: [{ '@id': 'thesis:danlynch-digital-publishing' }],
		softwareRequirements: [{ '@id': 'software:mathjax' }],
		video: [{ '@id': 'video:latex2html5-proposal' }],
		sameAs: [
			'https://github.com/Mathapedia/LaTeX2JS',
			'https://www.npmjs.com/package/latex2js',
		],
	},
	{
		'@type': 'SoftwareSourceCode',
		'@id': 'software:latex2js-react',
		name: 'latex2react',
		description: 'React bindings for LaTeX2JS: render interactive LaTeX and PSTricks diagrams with the <LaTeX /> component.',
		url: 'https://latex2js.com/installation/react',
		codeRepository: 'https://github.com/Mathapedia/LaTeX2JS',
		programmingLanguage: 'TypeScript',
		runtimePlatform: 'React',
		isPartOf: {
			'@id': 'software:latex2js',
		},
		sameAs: ['https://www.npmjs.com/package/latex2react'],
	},
	{
		'@type': 'SoftwareSourceCode',
		'@id': 'software:latex2js-vue',
		name: 'latex2vue',
		description: 'Vue bindings for LaTeX2JS: render interactive LaTeX and PSTricks diagrams with the <latex> component.',
		url: 'https://latex2js.com/installation/vue',
		codeRepository: 'https://github.com/Mathapedia/LaTeX2JS',
		programmingLanguage: 'TypeScript',
		runtimePlatform: 'Vue',
		isPartOf: {
			'@id': 'software:latex2js',
		},
		sameAs: ['https://www.npmjs.com/package/latex2vue'],
	},
	{
		'@type': 'WebApplication',
		'@id': 'software:mathapedia',
		name: 'Mathapedia',
		url: 'https://mathapedia.com',
		description:
			'An educational platform enabling non-technical authors to express scientific ideas via TeX & HTML5.',
		creator: {
			'@id': 'person:danlynch',
		},
	},
	{
		'@type': 'SoftwareApplication',
		'@id': 'software:mathjax',
		name: 'MathJax',
		url: 'https://www.mathjax.org',
		description: 'A JavaScript display engine for mathematics that works in all browsers.',
	},
];
