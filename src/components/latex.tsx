import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

// LaTeX2JS manipulates the DOM and loads MathJax, so it must only render on
// the client — never during static export.
const LaTeXClient = dynamic(() => import('latex2react').then((m) => m.LaTeX), {
	ssr: false,
	loading: () => <div className='py-8 text-center text-sm text-neutral-400'>Rendering LaTeX…</div>,
});

/**
 * A pspicture renders at the fixed pixel size its TeX coordinates give it, so on
 * a narrow screen it overflows and the whole page zooms out. Zoom each picture
 * down to the width it has; `zoom` (unlike a transform) shrinks its layout box
 * too, and the absolutely positioned MathJax labels scale along with it.
 */
function useFitPictures() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = ref.current;
		if (!root) return;

		const fit = () => {
			root.querySelectorAll<HTMLElement>('.pspicture').forEach((picture) => {
				const natural = parseFloat(picture.style.width);
				const available = picture.parentElement?.clientWidth ?? 0;
				if (!natural || !available) return;
				const scale = Math.min(1, available / natural);
				picture.style.zoom = scale < 1 ? String(scale) : '';
			});
		};

		fit();
		const resizes = new ResizeObserver(fit);
		resizes.observe(root);
		const renders = new MutationObserver(fit);
		renders.observe(root, { childList: true, subtree: true });
		return () => {
			resizes.disconnect();
			renders.disconnect();
		};
	}, []);

	return ref;
}

export function Latex({ content }: { content: string }) {
	const ref = useFitPictures();

	return (
		<div ref={ref} className='latex2js-content'>
			<LaTeXClient content={content} />
		</div>
	);
}
