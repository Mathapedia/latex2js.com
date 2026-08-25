export function CodeBlock({ code }: { code: string }) {
	return (
		<pre className='overflow-x-auto rounded-md bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-100'>
			<code>{code}</code>
		</pre>
	);
}
