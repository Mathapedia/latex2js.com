import Link from 'next/link';
import { ReactNode } from 'react';

import { routes } from '@/routes';

const navLinks = [
	{ label: 'Home', href: routes.home },
	{ label: 'Sandbox', href: routes.sandbox },
	{ label: 'Examples', href: routes.examples.index },
	{ label: 'Installation', href: routes.installation.index },
];

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='flex min-h-screen flex-col'>
			<header className='border-b border-neutral-200'>
				<nav className='mx-auto flex max-w-4xl items-center justify-between px-4 py-4'>
					<Link href={routes.home} className='font-serif text-xl'>
						LaTeX2JS
					</Link>
					<div className='flex items-center gap-5 text-sm'>
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href} className='hover:underline'>
								{link.label}
							</Link>
						))}
						<a href={routes.external.github} target='_blank' rel='noreferrer' className='hover:underline'>
							GitHub
						</a>
					</div>
				</nav>
			</header>
			<main className='mx-auto w-full max-w-4xl flex-1 px-4 py-10'>{children}</main>
			<footer className='border-t border-neutral-200'>
				<div className='mx-auto max-w-4xl space-y-2 px-4 py-8 text-center text-sm text-neutral-500'>
					<p>
						Powered by{' '}
						<a href={routes.external.mathjax} target='_blank' rel='noreferrer' className='underline'>
							MathJax
						</a>
						{' · '}
						Originated from{' '}
						<a href={routes.external.mathapedia} target='_blank' rel='noreferrer' className='underline'>
							Mathapedia
						</a>
					</p>
					<p>
						<a href='https://danlynch.com' target='_blank' rel='noreferrer' className='underline'>
							Dan Lynch
						</a>{' '}
						© LaTeX2JS 2012–{new Date().getFullYear()}
					</p>
				</div>
			</footer>
		</div>
	);
}
