import fs from 'fs';
import path from 'path';
import { useEffect, useState } from 'react';

import type { GetStaticProps } from 'next';

import { Head } from '@/components/common/head';
import { Latex } from '@/components/latex';
import { defaultJsonLdConfig } from '@/config';
import { examples } from '@/data/examples';
import { routes } from '@/routes';
import { getPageSeo } from '@/seo';

interface SandboxExample {
	slug: string;
	title: string;
	source: string;
}

interface SandboxPageProps {
	exampleSources: SandboxExample[];
}

export default function Sandbox({ exampleSources }: SandboxPageProps) {
	const seo = getPageSeo(routes.sandbox);
	const [tex, setTex] = useState('');
	const [rendered, setRendered] = useState('');

	useEffect(() => {
		const prefix = '#tex=';
		if (!window.location.hash.startsWith(prefix)) return;

		try {
			const source = decodeURIComponent(window.location.hash.slice(prefix.length));
			setTex(source);
			setRendered(source);
		} catch {
			// Ignore malformed deep-link hashes and leave the editor empty.
		}
	}, []);

	const loadExample = (slug: string) => {
		const example = exampleSources.find((item) => item.slug === slug);
		if (!example) return;
		setTex(example.source);
		setRendered(example.source);
	};

	return (
		<>
			<Head
				title={seo.title}
				description={seo.description}
				route={routes.sandbox}
				jsonLdConfig={defaultJsonLdConfig
					.clearSubgraph()
					.subgraph(['website:latex2js.com', 'software:latex2js', 'webpage:latex2js-sandbox'])
					.getConfig()}
			/>

			<h1 className='text-4xl'>LaTeX Sandbox</h1>
			<p className='mt-4 max-w-2xl text-neutral-600'>
				Type LaTeX + HTML in the box below and render it live. Powered by LaTeX2JS and MathJax.
			</p>

			<label className='mt-6 block text-sm font-medium' htmlFor='example'>
				Load an example
			</label>
			<select
				id='example'
				className='mt-2 w-full rounded-md border border-neutral-300 bg-neutral-50 p-3 text-sm'
				defaultValue=''
				onChange={(event) => loadExample(event.target.value)}
			>
				<option value='' disabled>
					Choose an example…
				</option>
				{exampleSources.map((example) => (
					<option key={example.slug} value={example.slug}>
						{example.title}
					</option>
				))}
			</select>

			<textarea
				className='mt-6 h-64 w-full rounded-md border border-neutral-300 bg-neutral-50 p-4 font-mono text-sm'
				value={tex}
				onChange={(event) => setTex(event.target.value)}
				spellCheck={false}
				placeholder={'\\begin{pspicture}(-2,-2)(2,2)\n\\psframe(-2,-2)(2,2)\n\\userline[linewidth=1.5 pt]{->}(0,0)(2,2)\n\\end{pspicture}'}
			/>

			<button
				className='mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-700'
				onClick={() => setRendered(tex)}
			>
				Render
			</button>

			{rendered && (
				<div className='mt-10'>
					<Latex key={rendered} content={rendered} />
				</div>
			)}
		</>
	);
}

export const getStaticProps: GetStaticProps<SandboxPageProps> = () => {
	return {
		props: {
			exampleSources: examples.map((example) => ({
				slug: example.slug,
				title: example.title,
				source: fs.readFileSync(path.join(process.cwd(), 'content/examples', example.file), 'utf-8'),
			})),
		},
	};
};
