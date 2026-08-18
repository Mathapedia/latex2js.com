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
		pkg: 'latex2react',
		image: '/images/react.png',
		steps: [
			{
				text: 'Install the library:',
				code: 'npm install latex2react',
				language: 'bash',
			},
			{
				text: 'Import the latex2js CSS file and the LaTeX React component:',
				code: "import 'latex2js/latex2js.css';\nimport { LaTeX } from 'latex2react';",
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
		pkg: 'latex2vue',
		image: '/images/vue.png',
		steps: [
			{
				text: 'Install the library:',
				code: 'npm install latex2vue',
				language: 'bash',
			},
			{
				text: 'Register the Vue 3 plugin (or import the latex component directly where you need it):',
				code: "import { createApp } from 'vue';\nimport LaTeX2Vue from 'latex2vue';\nimport 'latex2js/latex2js.css';\nimport App from './App.vue';\n\nconst app = createApp(App);\napp.use(LaTeX2Vue);\napp.mount('#app');",
				language: 'js',
			},
			{
				text: 'If you are using Nuxt, register it as a client-side plugin in plugins/latex2vue.js instead:',
				code: `import LaTeX2Vue from 'latex2vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(LaTeX2Vue);
});`,
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
