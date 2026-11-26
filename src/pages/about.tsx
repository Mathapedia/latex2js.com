import { Head } from '@/components/common/head';
import { defaultJsonLdConfig } from '@/config';
import { routes } from '@/routes';
import { getPageSeo } from '@/seo';

const linkClass = 'underline';

export default function About() {
	const seo = getPageSeo(routes.about);

	const jsonLdConfig = defaultJsonLdConfig
		.clearSubgraph()
		.subgraph([
			'website:latex2js.com',
			'software:latex2js',
			'thesis:danlynch-digital-publishing',
			'person:danlynch',
			'person:babak-ayazifar',
			'person:edward-a-lee',
		])
		.getConfig();

	return (
		<>
			<Head title={seo.title} description={seo.description} route={routes.about} jsonLdConfig={jsonLdConfig} />

			<h1 className='text-4xl'>About</h1>

			<section className='mt-6 max-w-2xl space-y-4 text-neutral-700'>
				<p>
					LaTeX2JS is the frontend of{' '}
					<a href={routes.external.mathapedia} target='_blank' rel='noreferrer' className={linkClass}>
						Mathapedia
					</a>
					, a platform for authoring interactive mathematical ebooks with LaTeX and PSTricks.
				</p>
				<p>
					Mathapedia was{' '}
					<a href='https://danlynch.com' target='_blank' rel='noreferrer' className={linkClass}>
						Dan Lynch
					</a>
					&apos;s UC Berkeley EECS{' '}
					<a href={routes.external.mathapediaProject} target='_blank' rel='noreferrer' className={linkClass}>
						master&apos;s project
					</a>
					, co-advised by{' '}
					<a href={routes.external.babakAyazifar} target='_blank' rel='noreferrer' className={linkClass}>
						Prof. Babak Ayazifar
					</a>{' '}
					and{' '}
					<a href={routes.external.edwardLee} target='_blank' rel='noreferrer' className={linkClass}>
						Prof. Edward A. Lee
					</a>
					. The ideas behind it are written up in the thesis{' '}
					<a href={routes.external.thesis} target='_blank' rel='noreferrer' className={linkClass}>
						The Art of Digital Publishing
					</a>{' '}
					(UCB/EECS-2012-268).
				</p>
				<p>
					Math rendering is powered by{' '}
					<a href={routes.external.mathjax} target='_blank' rel='noreferrer' className={linkClass}>
						MathJax
					</a>
					.
				</p>
			</section>
		</>
	);
}
