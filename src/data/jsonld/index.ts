import { JsonLdGraph } from 'jsonldjs';

import examples from './examples';
import people from './people';
import software from './software';
import website from './website';

export const jsonldGraph: JsonLdGraph = [...software, ...people, ...website, ...examples];
