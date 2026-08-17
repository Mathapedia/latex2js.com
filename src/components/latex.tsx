import dynamic from 'next/dynamic';

// LaTeX2JS manipulates the DOM and loads MathJax, so it must only render on
// the client — never during static export.
const LaTeXClient = dynamic(() => import('@latex2js/react').then((m) => m.LaTeX), {
	ssr: false,
	loading: () => <div className='py-8 text-center text-sm text-neutral-400'>Rendering LaTeX…</div>,
});

export function Latex({ content }: { content: string }) {
	return (
		<div className='latex2js-content'>
			<LaTeXClient content={content} />
		</div>
	);
}
