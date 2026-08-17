import Link from 'next/link';

import { Head } from '@/components/common/head';
import { defaultJsonLdConfig } from '@/config';
import { examples } from '@/data/examples';
import { routes } from '@/routes';
import { getPageSeo } from '@/seo';

export default function ExamplesIndex() {
	const seo = getPageSeo('/examples');

	const jsonLdConfig = defaultJsonLdConfig
		.clearSubgraph()
		.subgraph([
			'website:latex2js.com',
			'software:latex2js',
			...examples.map((example) => `webpage:latex2js-example-${example.slug}`),
		])
		.getConfig();

	return (
		<>
			<Head title={seo.title} description={seo.description} route='/examples' jsonLdConfig={jsonLdConfig} />

			<h1 className='text-4xl'>Examples</h1>
			<p className='mt-4 max-w-2xl text-neutral-600'>
				Interactive PSTricks diagrams rendered live in the browser by LaTeX2JS — each with its LaTeX source. Be sure to
				check out the{' '}
				<a href={routes.external.exampleApps} target='_blank' rel='noreferrer' className='underline'>
					example apps on GitHub
				</a>
				!
			</p>

			<ul className='mt-10 grid gap-6 sm:grid-cols-2'>
				{examples.map((example) => (
					<li key={example.slug} className='rounded-lg border border-neutral-200 p-5 hover:border-neutral-400'>
						<Link href={routes.examples.example(example.slug)}>
							<h2 className='text-xl'>{example.title}</h2>
							<p className='mt-2 text-sm text-neutral-600'>{example.description}</p>
							{example.interactive && (
								<p className='mt-3 text-xs uppercase tracking-wide text-neutral-400'>Interactive</p>
							)}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
