import { JsonLdFilterOptions } from 'jsonldjs';

/**
 * Create a filter for entities created by a specific organization
 */
export function createOrgCreatorFilter(orgId: string): JsonLdFilterOptions {
	return {
		customFilter: (entity) => {
			// Include the org itself
			if (entity['@id'] === orgId) return true;

			// Include entities created by this org
			const creator = entity.creator;
			if (creator) {
				if (Array.isArray(creator)) {
					return creator.some((c) => (typeof c === 'object' ? c['@id'] : c) === orgId);
				}
				const creatorId = typeof creator === 'object' ? creator['@id'] : creator;
				return creatorId === orgId;
			}

			return false;
		},
	};
}

/**
 * Create a filter for an organization and their associated entities
 */
export function createOrgWithRelatedFilter(
	orgId: string,
	options?: {
		includeSoftware?: boolean;
		includeCreativeWorks?: boolean;
		includePeople?: boolean;
		softwareIds?: string[];
	},
): JsonLdFilterOptions {
	const opts = {
		includeSoftware: true,
		includeCreativeWorks: false,
		includePeople: false,
		...options,
	};

	return {
		customFilter: (entity) => {
			// Always include the organization
			if (entity['@id'] === orgId) return true;

			// Include specified software
			if (
				opts.includeSoftware &&
				(entity['@type'] === 'SoftwareApplication' || entity['@type'] === 'SoftwareSourceCode')
			) {
				if (opts.softwareIds) {
					return !!entity['@id'] && opts.softwareIds.includes(entity['@id']);
				}
				// Check if created by this org
				const creator = entity.creator;
				if (creator) {
					if (Array.isArray(creator)) {
						return creator.some((c) => (typeof c === 'object' ? c['@id'] : c) === orgId);
					}
					const creatorId = typeof creator === 'object' ? creator['@id'] : creator;
					return creatorId === orgId;
				}
			}

			// Include creative works by this org
			if (
				opts.includeCreativeWorks &&
				(entity['@type'] === 'CreativeWork' ||
					entity['@type'] === 'Article' ||
					entity['@type'] === 'VideoObject')
			) {
				const author = entity.author || entity.creator || entity.publisher;
				if (author) {
					const authorId = typeof author === 'object' ? author['@id'] : author;
					return authorId === orgId;
				}
			}

			// Include people associated with this org
			if (opts.includePeople && entity['@type'] === 'Person') {
				const worksFor = entity.worksFor || entity.memberOf;
				if (worksFor) {
					if (Array.isArray(worksFor)) {
						return worksFor.some((w) => (typeof w === 'object' ? w['@id'] : w) === orgId);
					}
					const workId = typeof worksFor === 'object' ? worksFor['@id'] : worksFor;
					return workId === orgId;
				}
			}

			return false;
		},
	};
}

/**
 * Common filter presets for Constructive
 */
export const FilterPresets = {
	/** Include only the main organization entity (Constructive) */
	organizationOnly: {
		includeIds: ['org:constructive'],
	} satisfies JsonLdFilterOptions,

	/** Include organization and website */
	organizationAndWebsite: {
		includeIds: ['org:constructive', 'website:constructive.io'],
	} satisfies JsonLdFilterOptions,

	/** Include only software entities */
	softwareOnly: {
		includeTypes: ['SoftwareApplication', 'SoftwareSourceCode'],
	} satisfies JsonLdFilterOptions,

	/** Include only articles */
	articlesOnly: {
		includeTypes: ['Article', 'BlogPosting'],
	} satisfies JsonLdFilterOptions,

	/** Include only creative works (articles, videos, etc.) */
	creativeWorksOnly: {
		includeTypes: ['CreativeWork', 'Article', 'VideoObject', 'BlogPosting'],
	} satisfies JsonLdFilterOptions,

	/** Include only educational content */
	educationOnly: {
		includeTypes: ['Course', 'LearningResource'],
	} satisfies JsonLdFilterOptions,

	/** Exclude images */
	noImages: {
		excludeTypes: ['ImageObject'],
	} satisfies JsonLdFilterOptions,

	/** Include only entities with URLs */
	withUrlsOnly: {
		requiredProperties: ['url'],
	} satisfies JsonLdFilterOptions,

	/** Minimal graph - org and website only */
	minimal: {
		customFilter: (entity) => {
			if (entity['@type'] === 'Organization') {
				return entity['@id'] === 'org:constructive';
			}
			if (entity['@type'] === 'WebSite') {
				return entity['@id'] === 'website:constructive.io';
			}
			return false;
		},
	} satisfies JsonLdFilterOptions,
} satisfies Record<string, JsonLdFilterOptions>;
