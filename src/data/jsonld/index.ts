import { JsonLdGraph } from 'jsonldjs';

import examples from './examples';
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
];
