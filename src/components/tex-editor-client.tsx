import { useMemo } from 'react';

import { StreamLanguage } from '@codemirror/language';
import { lintGutter, linter, type Diagnostic } from '@codemirror/lint';
import { stex } from '@codemirror/legacy-modes/mode/stex';
import CodeMirror from '@uiw/react-codemirror';

import type { TexEditorProps } from './tex-editor';

/** TeX/LaTeX highlighting, via CodeMirror's stex stream mode. */
const extensions = [StreamLanguage.define(stex), lintGutter()];

export function TexEditorClient({ value, onChange, onSubmit, placeholder, diagnostics = [] }: TexEditorProps) {
	const diagnosticExtension = useMemo(
		() =>
			linter(
				(view) =>
					diagnostics.map((diagnostic): Diagnostic => {
						const doc = view.state.doc;
						const lineValue = diagnostic.line;
						const hasLine = lineValue !== undefined && Number.isFinite(lineValue);
						const lineNumber = hasLine ? Math.min(Math.max(lineValue, 1), doc.lines) : 1;
						const line = doc.line(lineNumber);
						const column = !hasLine || diagnostic.column === undefined ? 1 : Math.max(diagnostic.column, 1);
						const from = Math.min(Math.max(line.from + column - 1, line.from), line.to);

						return {
							from,
							to: line.to,
							severity: diagnostic.severity,
							message: diagnostic.message,
						};
					}),
				{ delay: 0 },
			),
		[diagnostics],
	);
	const editorExtensions = useMemo(() => [...extensions, diagnosticExtension], [diagnosticExtension]);

	return (
		<div
			className='h-full overflow-hidden rounded-md border border-neutral-300'
			onKeyDown={(event) => {
				if (!onSubmit) return;
				if (event.key !== 'Enter' || !(event.metaKey || event.ctrlKey)) return;
				event.preventDefault();
				onSubmit();
			}}
		>
			<CodeMirror
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				height='100%'
				className='h-full text-sm'
				extensions={editorExtensions}
				basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
			/>
		</div>
	);
}
