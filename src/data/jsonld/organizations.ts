import type { EnrichedOrganization } from './types';

export default [
	{
		'@id': 'org:constructive',
		'@type': 'Organization',
		name: 'Constructive',
		alternateName: 'Interweb, Inc.',
		url: 'https://constructive.io',
		logo: 'https://constructive.io/logo.svg',
		sameAs: [
			'https://github.com/constructive-io',
			'https://x.com/constructive_io',
			'https://www.linkedin.com/company/constructive-io/',
		],
		founder: [
			{
				'@id': 'person:danlynch',
			},
		],
	},
] as EnrichedOrganization[];
