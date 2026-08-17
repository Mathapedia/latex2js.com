import Link from 'next/link';

import { Head } from '@/components/common/head';
import { defaultJsonLdConfig } from '@/config';
import { installGuides } from '@/data/installs';
import { routes } from '@/routes';
import { getPageSeo } from '@/seo';

export default function InstallationIndex() {
	const seo = getPageSeo('/installation');

	const jsonLdConfig = defaultJsonLdConfig
		.clearSubgraph()
		.subgraph(['website:latex2js.com', 'software:latex2js', 'software:latex2js-react', 'software:latex2js-vue'])
		.getConfig();

	return (
		<>
			<Head title={seo.title} description={seo.description} route='/installation' jsonLdConfig={jsonLdConfig} />

			<h1 className='text-4xl'>Installation</h1>
			<p className='mt-4 max-w-2xl text-neutral-600'>
				LaTeX2JS ships adapters for the frameworks you already use. Pick yours:
			</p>

			<ul className='mt-10 grid gap-6 sm:grid-cols-3'>
				{installGuides.map((guide) => (
					<li key={guide.slug} className='rounded-lg border border-neutral-200 p-6 text-center hover:border-neutral-400'>
						<Link href={routes.installation[guide.slug]}>
							<img src={guide.image} alt={guide.name} width={60} height={60} className='mx-auto' />
							<h2 className='mt-4 text-xl'>{guide.name}</h2>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
