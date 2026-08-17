import fs from 'fs';
import path from 'path';

import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { CodeBlock } from '@/components/code-block';
import { Head } from '@/components/common/head';
import { Latex } from '@/components/latex';
import { defaultJsonLdConfig } from '@/config';
import { examples, getExample, type ExampleMeta } from '@/data/examples';
import { routes } from '@/routes';

interface ExamplePageProps {
	example: ExampleMeta;
	source: string;
}

export default function ExamplePage({ example, source }: ExamplePageProps) {
	const route = `/examples/${example.slug}` as const;

	const jsonLdConfig = defaultJsonLdConfig
		.clearSubgraph()
		.subgraph(['website:latex2js.com', 'software:latex2js', `webpage:latex2js-example-${example.slug}`])
		.getConfig();

	return (
		<>
			<Head
				title={`${example.title} - LaTeX2JS Examples`}
				description={example.description}
				route={route}
				jsonLdConfig={jsonLdConfig}
			/>

			<p className='text-sm'>
				<Link href={routes.examples.index} className='underline'>
					← All examples
				</Link>
			</p>
			<h1 className='mt-4 text-4xl'>{example.title}</h1>
			<p className='mt-4 max-w-2xl text-neutral-600'>{example.description}</p>
			{example.interactive && (
				<p className='mt-2 text-sm text-neutral-500'>
					This diagram is interactive — use your mouse or touch to play with it.
				</p>
			)}

			<div className='mt-10'>
				<Latex content={source} />
			</div>

			<h2 className='mt-12 text-2xl'>Source</h2>
			<div className='mt-4'>
				<CodeBlock code={source.trim()} />
			</div>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: examples.map((example) => ({ params: { exampleId: example.slug } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<ExamplePageProps> = ({ params }) => {
	const example = getExample(params?.exampleId as string);
	if (!example) {
		return { notFound: true };
	}

	const source = fs.readFileSync(path.join(process.cwd(), 'content/examples', example.file), 'utf-8');

	return {
		props: {
			example,
			source,
		},
	};
};
