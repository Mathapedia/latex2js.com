import { JsonLdGraph } from 'jsonldjs';

import examples from './examples';
import sandbox from './sandbox';
import people from './people';
import publications from './publications';
import software from './software';
import videos from './videos';
import website from './website';

export const jsonldGraph: JsonLdGraph = [
	...software,
	...people,
	...website,
	...publications,
	...videos,
	...examples,
	...sandbox,
];
