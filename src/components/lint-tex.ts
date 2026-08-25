import Latex2JS from 'latex2js';

export type TexDiagnosticSeverity = 'error' | 'warning';

export interface TexDiagnostic {
	severity: TexDiagnosticSeverity;
	message: string;
	line?: number;
	column?: number;
}

let parser: Latex2JS | undefined;

export function lintTex(source: string): TexDiagnostic[] {
	try {
		parser ??= new Latex2JS();
		parser.parse(source);
		return (parser.lastDiagnostics ?? []).map((diagnostic) => ({
			severity: diagnostic.severity,
			message: diagnostic.message,
			line: diagnostic.line,
			column: diagnostic.column,
		}));
	} catch (error) {
		return [
			{
				severity: 'error',
				message: error instanceof Error ? error.message : String(error),
			},
		];
	}
}
