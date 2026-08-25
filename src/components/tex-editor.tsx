import dynamic from 'next/dynamic';

// CodeMirror (and @codemirror/view underneath it) reaches for the DOM as it
// loads, so the whole editor — widget and language mode alike — is imported
// only on the client. Every page using it is statically exported.
const TexEditorClient = dynamic(() => import('./tex-editor-client').then((m) => m.TexEditorClient), {
	ssr: false,
	loading: () => (
		<div className='h-full rounded-md border border-neutral-300 bg-neutral-50 p-4 font-mono text-sm text-neutral-400'>
			Loading editor…
		</div>
	),
});

export interface TexEditorProps {
	value: string;
	onChange: (value: string) => void;
	/** Fired on Cmd/Ctrl+Enter, so a render doesn't need a trip to the button. */
	onSubmit?: () => void;
	placeholder?: string;
}

export function TexEditor(props: TexEditorProps) {
	return <TexEditorClient {...props} />;
}
