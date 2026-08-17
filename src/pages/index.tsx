import Image from 'next/image';
import Link from 'next/link';

import { Head } from '@/components/common/head';
import { Latex } from '@/components/latex';
import { defaultJsonLdConfig } from '@/config';
import { routes } from '@/routes';
import { getPageSeo } from '@/seo';

import photo from '../../public/images/photo.png';

const lifeEquation = String.raw`
$$\frac{\delta}{\delta u} \int_{birth}^{death} f(life) du = \mbox{your life}$$
`;

const essay = String.raw`
\begin{pspicture}(0,-3)(8,3)
\rput(0,0){$x(t)$}
\rput(4,1.5){$f(t)$}
\rput(4,-1.5){$g(t)$}
\rput(8.2,0){$y(t)$}
\rput(1.5,-2){$h(t)$}
\psframe(1,-2.5)(7,2.5)
\psframe(3,1)(5,2)
\psframe(3,-1)(5,-2)
\rput(4,0){$X_k = \frac{1}{p} \sum \limits_{n=\langle p\rangle}x(n)e^{-ik\omega_0n}$}
\psline{->}(0.5,0)(1.5,0)
\psline{->}(1.5,1.5)(3,1.5)
\psline{->}(1.5,-1.5)(3,-1.5)
\psline{->}(6.5,1.5)(6.5,0.25)
\psline{->}(6.5,-1.5)(6.5,-0.25)
\psline{->}(6.75,0)(7.75,0)
\psline(1.5,-1.5)(1.5,1.5)
\psline(5,1.5)(6.5,1.5)
\psline(5,-1.5)(6.5,-1.5)
\psline(6,-1.5)(6.5,-1.5)
\pscircle(6.5,0){0.25}
\psline(6.25,0)(6.75,0)
\psline(6.5,0.5)(6.5,-0.5)
\end{pspicture}

Many of us think our thoughts using a language of some sort---there is usually some voice in our minds. Language in some ways, makes us who we are. Some even argue in the world of cognitive science that language is the foundation of our consciousness.


An author who has in their minds representations of intelligent concepts should be able to freely express herself through language with free association---digital expressions of these ideas in some cases requires total control of the computer and all of its processes.


The vision behind the personal computer was that any person could have full command of the functions of their device. I think this vision has come true to some degree, but not fully when it comes to creating graphics, especially mathematical diagrams online.


Does the common mathematician or professor have the ability to express concepts through web technology? The Web has its own language, and the goal of this project is to help blur the lines between what authoring the mathematical Web should be like and typesetting beautiful Math.


If you know \LaTeX, then get ready to author interactive diagrams in real-time (try using mouse or touch to interact with diagrams).


What matters most is minimizing the distance between our expression of an idea and the execution of that idea. For example, I can describe a vector at $(0,0)$ and initial value of the head at $(2,2)$ that will follow a user touch or mouse event. This will produce the following interaction:


\begin{center}
\begin{pspicture}(-2,-2)(2,2)
\psframe(-2,-2)(2,2)
\userline[linewidth=1.5 pt]{->}(0,0)(2,2)
\end{pspicture}
\end{center}


This was as easy as using this \TeX, which many math professors could understand.

\begin{verbatim}
\begin{pspicture}(-2,-2)(2,2)
\psframe(-2,-2)(2,2)
\userline[linewidth=1.5 pt]{->}(0,0)(2,2)
\end{pspicture}
\end{verbatim}

If you specify more arguments, you can create functions for the head and and tail of the vector, which each takes the current $x$ and $y$ position of the users finger or cursor as they move and produces the following interaction:

\begin{center}
\begin{pspicture}(-2,-2)(2,2)
\psframe(-2,-2)(2,2)
\userline[linewidth=2pt,linecolor=green]{->}(0,0)(2,2){-x}{-y}
\userline[linewidth=2pt,linecolor=red]{->}(0,0)(2,2){0}{y}
\userline[linewidth=2pt,linecolor=purple]{->}(0,0)(2,2){-x}{cos(y)}
\userline[linewidth=2pt,linecolor=lightblue]{->}(0,0)(2,2)(sin(x)}{-y}
\end{pspicture}
\end{center}

2 extra arguments provide functions for the head, 4 extra arguments allows you to control both and tail

\begin{verbatim}
\userline[linewidth=2pt,linecolor=green]{->}(0,0)(2,2){-x}{-y}
\userline[linewidth=2pt,linecolor=red]{->}(0,0)(2,2){0}{y}
\userline[linewidth=2pt,linecolor=purple]{->}(0,0)(2,2){-x}{cos(y)}
\userline[linewidth=2pt,linecolor=lightblue]{->}(0,0)(2,2)(sin(x)}{-y}
\end{verbatim}

I can also draw a more complex version, and start to make more useful diagrams to describe vectors:

\begin{center}
\begin{pspicture}(-5,-5)(5,5)

% y-axis
\rput(0.3,3.75){ $Im$ }
\psline{->}(0,-3.75)(0,3.75)

% x-axis
\rput(3.75,0.3){ $Re$ }
\psline{->}(-3.75,0)(3.75,0)

% the circle
\pscircle(0,0){ 3 }


 % new vector
\rput(2.3,1){$e^{i\omega}-\alpha$}
\userline[linewidth=1.5 pt]{->}(1.500,0.000)(2.121,2.121)
\userline[linewidth=1.5 pt,linecolor=blue]{->}(0,0.000)(2.121,2.121){(x>0) ? 3 * cos( atan(-y/x) ) : -3 * cos( atan(-y/x) ) }{ (x>0) ? -3 * sin( atan(-y/x) ) : 3 * sin( atan(-y/x) )}

\userline[linewidth=1.5 pt,linestyle=dashed](-1.500,0.000)(2.121,2.121){x}{0}{x}{y}
\userline[linewidth=1.5 pt,linestyle=dashed](-1.500,0.000)(2.121,2.121){0}{y}{x}{y}

\rput(-0.75,-4.25){$1+\alpha$}
\rput(2.25,-4.25){$1-\alpha$}
\psline{<->}(-3,-4)(1.5,-4)
\psline{<->}(1.5,-4)(3,-4)
\psline[linestyle=dashed](3,-4.5)(3,0)
\psline[linestyle=dashed](-3,-4.5)(-3,0)
\psline[linestyle=dashed](1.5,-4.5)(1.5,0)


\end{pspicture}
\end{center}
`;

const frameworks = [
	{ label: 'Vue', href: routes.installation.vue, image: '/images/vue.png' },
	{ label: 'React', href: routes.installation.react, image: '/images/react.png' },
	{ label: 'HTML5', href: routes.installation.html5, image: '/images/html5.png' },
];

export default function Home() {
	const seo = getPageSeo('/');

	return (
		<>
			<Head
				title={seo.title}
				description={seo.description}
				route='/'
				jsonLdConfig={defaultJsonLdConfig.getConfig()}
			/>

			<section className='text-center'>
				<h1 className='text-5xl'>LaTeX2JS</h1>
				<p className='mt-4 text-xl text-neutral-600'>
					Author interactive math equations and diagrams online using LaTeX and PSTricks
				</p>
			</section>

			<section className='mt-10 flex justify-center'>
				<Image src={photo} alt='Interactive LaTeX2JS diagrams rendered on multiple devices' className='max-w-full' />
			</section>

			<section className='mx-auto mt-10 max-w-2xl text-center'>
				<p>
					This project is the frontend-only version of the code that originated from{' '}
					<a href={routes.external.mathapedia} target='_blank' rel='noreferrer' className='underline'>
						Mathapedia
					</a>{' '}
					to enable real-time, dynamic authorship of mathematical ebooks.
				</p>
				<Latex content={lifeEquation} />
			</section>

			<section className='mt-10 text-center'>
				<p className='text-neutral-600'>Proud to support the best</p>
				<div className='mt-4 flex items-center justify-center gap-6'>
					{frameworks.map((framework) => (
						<Link key={framework.label} href={framework.href} title={`LaTeX2JS for ${framework.label}`}>
							<img src={framework.image} alt={framework.label} width={50} height={50} />
						</Link>
					))}
				</div>
			</section>

			<section className='mx-auto mt-12 max-w-2xl space-y-8 text-center'>
				<div>
					<h3 className='text-2xl'>Installation</h3>
					<p className='mt-2'>
						Install LaTeX2JS for{' '}
						<Link href={routes.installation.react} className='underline'>
							React
						</Link>
						,{' '}
						<Link href={routes.installation.vue} className='underline'>
							Vue
						</Link>
						, or{' '}
						<Link href={routes.installation.html5} className='underline'>
							plain HTML5
						</Link>
						.
					</p>
				</div>
				<div>
					<h3 className='text-2xl'>Examples</h3>
					<p className='mt-2'>
						Get inspired, and make sure you see{' '}
						<Link href={routes.examples.index} className='underline'>
							the PSTricks examples here
						</Link>
						!
					</p>
				</div>
				<div>
					<h3 className='text-2xl'>Get Started</h3>
					<p className='mt-2'>
						Check out the{' '}
						<a href={routes.external.exampleApps} target='_blank' rel='noreferrer' className='underline'>
							example apps on GitHub
						</a>
						, or play in the{' '}
						<a href={routes.external.sandbox} target='_blank' rel='noreferrer' className='underline'>
							sandbox
						</a>
						.
					</p>
				</div>
				<div>
					<h3 className='text-2xl'>Documentation</h3>
					<p className='mt-2'>
						There is also quite a bit of documentation{' '}
						<a href={routes.external.docs} target='_blank' rel='noreferrer' className='underline'>
							here
						</a>
						.
					</p>
				</div>
			</section>

			<hr className='my-12 border-neutral-200' />

			<section>
				<Latex content={essay} />
			</section>
		</>
	);
}
