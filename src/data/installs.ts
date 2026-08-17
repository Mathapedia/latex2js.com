// =============================================================================
// Installation guides
// =============================================================================
// Structured data for the /installation pages. Consumed by the pages, the
// JSON-LD graph (HowTo), and the llms.txt generator.
// =============================================================================

export interface InstallStep {
	text: string;
	code?: string;
	language?: string;
}

export interface InstallGuide {
	slug: 'react' | 'vue' | 'html5';
	name: string;
	title: string;
	pkg?: string;
	image: string;
	steps: InstallStep[];
}

export const installGuides: InstallGuide[] = [
	{
		slug: 'react',
		name: 'React',
		title: 'LaTeX2JS for React',
		pkg: '@latex2js/react',
		image: '/images/react.png',
		steps: [
			{
				text: 'Install the library:',
				code: 'npm install @latex2js/react',
				language: 'bash',
			},
			{
				text: 'Import the latex2js CSS file and the LaTeX React component:',
				code: "import 'latex2js/latex2js.css';\nimport { LaTeX } from '@latex2js/react';",
				language: 'tsx',
			},
			{
				text: 'Load your TeX into the content property. Enjoy!',
				code: `const tex = String.raw\`
\\begin{center}
\\begin{pspicture}(-2,-2)(2,2)
\\psframe(-2,-2)(2,2)
\\userline[linewidth=1.5 pt]{->}(0,0)(2,2)
\\end{pspicture}
\\end{center}
\`;

export default function App() {
  return <LaTeX content={tex} />;
}`,
				language: 'tsx',
			},
		],
	},
	{
		slug: 'vue',
		name: 'Vue',
		title: 'LaTeX2JS for Vue',
		pkg: '@latex2js/vue',
		image: '/images/vue.png',
		steps: [
			{
				text: 'Install the library:',
				code: 'npm install @latex2js/vue',
				language: 'bash',
			},
			{
				text: 'Register the plugin. If you are using Nuxt, add a plugin in ~plugins/latex2js.js:',
				code: "import Vue from 'vue';\nimport VueLaTeX2JS from '@latex2js/vue';\nVue.use(VueLaTeX2JS);",
				language: 'js',
			},
			{
				text: 'Add the CSS and plugin in your nuxt.config.js:',
				code: `css: [
  'latex2js/latex2js.css',
],
plugins: [
  { src: '~plugins/latex2js.js', ssr: false },
],`,
				language: 'js',
			},
			{
				text: 'Now you have a latex component! Set the content property and have a go:',
				code: '<latex :content="someVariable" />',
				language: 'html',
			},
		],
	},
	{
		slug: 'html5',
		name: 'HTML5',
		title: 'LaTeX2JS for plain HTML5',
		image: '/images/html5.png',
		steps: [
			{
				text: 'Download the JS and CSS bundles from the LaTeX2JS repository (bundle/latex2html5.bundle.js and bundle/latex2js.css) and include them in your page:',
				code: `<html>
  <head>
    <link rel="stylesheet" href="/path/to/latex2js.css">
    <script src="/path/to/latex2html5.bundle.js"></script>
  </head>`,
				language: 'html',
			},
			{
				text: 'Write your LaTeX inside script tags with type set to "text/latex":',
				code: `<body>
  <script type="text/latex">
    you can write any \\LaTeX here!
  </script>`,
				language: 'html',
			},
			{
				text: 'Towards the end of your HTML page, call the init method:',
				code: `  <script>
    LaTeX2HTML5.init();
  </script>
</body>
</html>`,
				language: 'html',
			},
		],
	},
];

export function getInstallGuide(slug: string): InstallGuide | undefined {
	return installGuides.find((g) => g.slug === slug);
}
