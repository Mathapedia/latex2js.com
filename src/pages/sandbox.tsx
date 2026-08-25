import fs from 'fs';
import path from 'path';
import { useEffect, useState } from 'react';

import type { GetStaticProps } from 'next';
import Link from 'next/link';

import { Head } from '@/components/common/head';
import { Latex } from '@/components/latex';
import { TexEditor } from '@/components/tex-editor';
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

const placeholder = [
	'\\begin{pspicture}(-2,-2)(2,2)',
	'\\psframe(-2,-2)(2,2)',
	'\\userline[linewidth=1.5 pt]{->}(0,0)(2,2)',
	'\\end{pspicture}',
].join('\n');

export default function Sandbox({ exampleSources }: SandboxPageProps) {
	const seo = getPageSeo(routes.sandbox);
	const [tex, setTex] = useState('');
	const [rendered, setRendered] = useState('');
	const [editorOpen, setEditorOpen] = useState(true);

	const render = () => setRendered(tex);

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

			<div className='flex flex-wrap items-center justify-between gap-3'>
				<h1 className='text-2xl'>LaTeX Sandbox</h1>
				<div className='flex items-center gap-3 text-sm'>
					<button
						className='rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-500'
						onClick={() => setEditorOpen(!editorOpen)}
					>
						{editorOpen ? 'Hide editor' : 'Show editor'}
					</button>
					<button
						className='rounded-md bg-neutral-900 px-3 py-1.5 text-white hover:bg-neutral-700'
						onClick={render}
					>
						Render
					</button>
				</div>
			</div>

			<p className='mt-2 max-w-2xl text-sm text-neutral-600'>
				Write LaTeX and PSTricks, then render it live. Powered by LaTeX2JS and MathJax.
			</p>

			<label className='mt-4 block text-sm font-medium' htmlFor='example'>
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

			<div className='mt-4 grid min-h-0 flex-1 gap-4 lg:grid-cols-2'>
				{editorOpen && (
					<div className='min-h-[24rem] lg:min-h-0'>
						<TexEditor value={tex} onChange={setTex} onSubmit={render} placeholder={placeholder} />
					</div>
				)}
				<div
					className={`min-h-0 overflow-auto rounded-md border border-neutral-200 p-6 ${
						editorOpen ? '' : 'lg:col-span-2'
					}`}
				>
					{rendered ? (
						/* Remount on each render so LaTeX2JS reprocesses the new source. */
						<Latex key={rendered} content={rendered} />
					) : (
						<p className='text-sm text-neutral-500'>
							The render appears here — hit Render (or ⌘/Ctrl+Enter). Start from an{' '}
							<Link href={routes.examples.index} className='underline'>
								example
							</Link>{' '}
							if you'd like something to take apart.
						</p>
					)}
				</div>
			</div>
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
