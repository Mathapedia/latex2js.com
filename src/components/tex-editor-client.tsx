import { StreamLanguage } from '@codemirror/language';
import { stex } from '@codemirror/legacy-modes/mode/stex';
import CodeMirror from '@uiw/react-codemirror';

import type { TexEditorProps } from './tex-editor';

/** TeX/LaTeX highlighting, via CodeMirror's stex stream mode. */
const extensions = [StreamLanguage.define(stex)];

export function TexEditorClient({ value, onChange, onSubmit, placeholder }: TexEditorProps) {
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
				extensions={extensions}
				basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
			/>
		</div>
	);
}
