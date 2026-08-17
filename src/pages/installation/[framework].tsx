import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { CodeBlock } from '@/components/code-block';
import { Head } from '@/components/common/head';
import { defaultJsonLdConfig } from '@/config';
import { getInstallGuide, installGuides, type InstallGuide } from '@/data/installs';
import { routes } from '@/routes';
import { getPageSeo } from '@/seo';

interface InstallPageProps {
	guide: InstallGuide;
}

export default function InstallPage({ guide }: InstallPageProps) {
	const route = `/installation/${guide.slug}` as const;
	const seo = getPageSeo(route);

	const subgraphIds = ['website:latex2js.com', 'software:latex2js'];
	if (guide.pkg) {
		subgraphIds.push(`software:latex2js-${guide.slug}`);
	}
	const jsonLdConfig = defaultJsonLdConfig.clearSubgraph().subgraph(subgraphIds).getConfig();

	return (
		<>
			<Head title={seo.title} description={seo.description} route={route} jsonLdConfig={jsonLdConfig} />

			<p className='text-sm'>
				<Link href={routes.installation.index} className='underline'>
					← All installation guides
				</Link>
			</p>

			<div className='mt-4 flex items-center gap-4'>
				<img src={guide.image} alt={guide.name} width={50} height={50} />
				<h1 className='text-4xl'>{guide.title}</h1>
			</div>

			<ol className='mt-10 max-w-3xl space-y-8'>
				{guide.steps.map((step, index) => (
					<li key={index}>
						<p>
							<span className='font-serif'>{index + 1}.</span> {step.text}
						</p>
						{step.code && (
							<div className='mt-3'>
								<CodeBlock code={step.code} />
							</div>
						)}
					</li>
				))}
			</ol>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: installGuides.map((guide) => ({ params: { framework: guide.slug } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<InstallPageProps> = ({ params }) => {
	const guide = getInstallGuide(params?.framework as string);
	if (!guide) {
		return { notFound: true };
	}

	return {
		props: {
			guide,
		},
	};
};
