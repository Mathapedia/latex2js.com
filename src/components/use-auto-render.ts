import { useCallback, useEffect, useRef, useState } from 'react';

import type { TexDiagnostic } from './lint-tex';

const autoRenderDelay = 400;

function useDebouncedValue(value: string, delay: number) {
	const valueRef = useRef(value);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const [debouncedValue, setDebouncedValue] = useState(value);
	valueRef.current = value;

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			setDebouncedValue(valueRef.current);
		}, delay);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [value, delay]);

	const flush = useCallback((nextValue?: string) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		const valueToFlush = nextValue ?? valueRef.current;
		valueRef.current = valueToFlush;
		setDebouncedValue(valueToFlush);
	}, []);

	return { debouncedValue, flush };
}

export function useAutoRender(source: string, initialRendered = source) {
	const { debouncedValue, flush } = useDebouncedValue(source, autoRenderDelay);
	const [rendered, setRendered] = useState(initialRendered);
	const [diagnostics, setDiagnostics] = useState<TexDiagnostic[]>([]);
	const requestRef = useRef(0);

	useEffect(() => {
		const request = ++requestRef.current;
		let active = true;

		const update = async () => {
			const { lintTex } = await import('./lint-tex');
			const nextDiagnostics = lintTex(debouncedValue);
			if (!active || request !== requestRef.current) return;

			setDiagnostics(nextDiagnostics);
			if (!nextDiagnostics.some((diagnostic) => diagnostic.severity === 'error')) {
				setRendered(debouncedValue);
			}
		};

		void update();

		return () => {
			active = false;
		};
	}, [debouncedValue]);

	const renderNow = useCallback((nextSource?: string) => flush(nextSource), [flush]);

	return { rendered, diagnostics, renderNow };
}
