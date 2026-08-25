import Link from 'next/link';

import { Head } from '@/components/common/head';
import { routes } from '@/routes';

export default function NotFound() {
	return (
		<>
			<Head title='Page Not Found - LaTeX2JS' description='This page could not be found.' route='/404' noindex />
			<div className='py-20 text-center'>
				<h1 className='text-4xl'>404</h1>
				<p className='mt-4 text-neutral-600'>This page could not be found.</p>
				<p className='mt-6'>
					<Link href={routes.home} className='underline'>
						Back to LaTeX2JS
					</Link>
				</p>
			</div>
		</>
	);
}
