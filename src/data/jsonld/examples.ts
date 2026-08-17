import { examples } from '@/data/examples';
import { canonical } from '@/seo';

// One CreativeWork per interactive example page, generated from the examples
// registry so the graph stays in lockstep with the routes.
export default examples.map((example) => ({
	'@type': 'CreativeWork' as const,
	'@id': `webpage:latex2js-example-${example.slug}`,
	name: example.title,
	description: example.description,
	url: `${canonical}/examples/${example.slug}`,
	genre: 'Interactive PSTricks example',
	exampleOfWork: {
		'@id': 'software:latex2js',
	},
	creator: {
		'@id': 'person:danlynch',
	},
}));
