import { JsonLdGraph } from 'jsonldjs';

import examples from './examples';
import people from './people';
import software from './software';
import videos from './videos';
import website from './website';

export const jsonldGraph: JsonLdGraph = [...software, ...people, ...website, ...videos, ...examples];
