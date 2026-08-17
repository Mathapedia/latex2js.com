// =============================================================================
// Examples registry
// =============================================================================
// Each example is a .tex file in content/examples/, rendered live by LaTeX2JS.
// The slug is the route segment (/examples/<slug>); file is the source file.
// =============================================================================

export interface ExampleMeta {
	slug: string;
	file: string;
	title: string;
	description: string;
	interactive: boolean;
}

export const examples: ExampleMeta[] = [
	{
		slug: 'block-diagram',
		file: '01.tex',
		title: 'System Block Diagram',
		description:
			'A signals-and-systems block diagram with framed subsystems, arrows, and an inline Fourier series equation, drawn entirely with PSTricks.',
		interactive: false,
	},
	{
		slug: 'draggable-vector',
		file: '02.tex',
		title: 'Draggable Vector',
		description:
			'The simplest interactive diagram: a userline vector whose head follows your mouse or touch inside the frame.',
		interactive: true,
	},
	{
		slug: 'vector-functions',
		file: '03.tex',
		title: 'Vector Functions of the Cursor',
		description:
			'Four userline vectors driven by functions of the cursor position — reflections, projections, and trig transforms of your pointer.',
		interactive: true,
	},
	{
		slug: 'complex-plane',
		file: '04.tex',
		title: 'Vectors in the Complex Plane',
		description:
			'An interactive complex-plane diagram with a unit circle, draggable vectors, and conditional expressions controlling their motion.',
		interactive: true,
	},
	{
		slug: 'shaded-integral',
		file: '05.tex',
		title: 'Shaded Integral with a Draggable Bound',
		description:
			'A psplot of sin(x) whose shaded region follows a draggable uservariable — visualizing the integral as you move the bound.',
		interactive: true,
	},
	{
		slug: 'two-variables',
		file: '06.tex',
		title: 'Plots Driven by Two Variables',
		description:
			'Two uservariables driving two psplots at once — drag in the plane and watch both curves respond.',
		interactive: true,
	},
	{
		slug: 'geometric-series',
		file: '07.tex',
		title: 'Geometric Series with a Slider',
		description:
			'A slider controls the number of terms N in a geometric series plot, converging toward 1/(1-α).',
		interactive: true,
	},
	{
		slug: 'function-plot',
		file: '08.tex',
		title: 'Large-Scale Function Plot',
		description: 'A scaled psplot with custom units and axis labels.',
		interactive: false,
	},
	{
		slug: 'interactive-plot',
		file: '09.tex',
		title: 'Interactive Plot with a Variable',
		description: 'Two psplots coupled to a draggable uservariable with custom scaling.',
		interactive: true,
	},
	{
		slug: 'custom-path',
		file: '10.tex',
		title: 'Custom Path Diagram',
		description: 'A pscustom path composing lines and curves into a labeled figure.',
		interactive: false,
	},
	{
		slug: 'unit-circle',
		file: '11.tex',
		title: 'Unit Circle with Draggable Vectors',
		description:
			'Draggable vectors constrained to the unit circle in the complex plane, with dashed projections onto the axes.',
		interactive: true,
	},
	{
		slug: 'sampling-system',
		file: '12.tex',
		title: 'Sampling System Diagram',
		description:
			'A classic sampling block diagram: impulse train, ideal low-pass filter H(ω), and labeled signal paths.',
		interactive: false,
	},
	{
		slug: 'feedback-system',
		file: '13.tex',
		title: 'Interactive Feedback System',
		description:
			'A feedback system diagram combining frames, circles, a psplot, a userline, and four uservariables in one figure.',
		interactive: true,
	},
	{
		slug: 'derivative-story',
		file: '14.tex',
		title: 'A Story Told in Derivatives',
		description:
			'A community example: a playful narrative about derivatives illustrated with sixteen psplots and five interactive variables.',
		interactive: true,
	},
];

export function getExample(slug: string): ExampleMeta | undefined {
	return examples.find((e) => e.slug === slug);
}
