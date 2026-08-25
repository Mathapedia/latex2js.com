/**
 * JSON-LD Test Utilities
 *
 * Helper functions for testing JSON-LD output.
 * Snapshots are kept lean by extracting only @id and @type properties.
 */

import { type JsonLdGraph, type JsonLdEntity } from 'jsonldjs';

/**
 * Extract only @id properties from entities for lean snapshots
 */
export function extractIds(entities: JsonLdEntity[]): string[] {
	return entities
		.map((e) => e['@id'])
		.filter((id): id is string => typeof id === 'string')
		.sort();
}

/**
 * Extract @id and @type for more detailed snapshots
 */
export function extractIdsAndTypes(entities: JsonLdEntity[]): { id: string; type: string | string[] }[] {
	return entities
		.map((e) => ({
			id: e['@id'],
			type: e['@type'] as string | string[],
		}))
		.filter((e): e is { id: string; type: string | string[] } => typeof e.id === 'string')
		.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Group entities by @type
 */
export function groupByType(entities: JsonLdEntity[]): Record<string, string[]> {
	const grouped: Record<string, string[]> = {};

	for (const entity of entities) {
		const type = entity['@type'];
		const id = entity['@id'];

		if (!id) continue;

		const types = Array.isArray(type) ? type : [type];
		for (const t of types) {
			if (t) {
				if (!grouped[t]) grouped[t] = [];
				grouped[t].push(id);
			}
		}
	}

	// Sort IDs within each type
	for (const type of Object.keys(grouped)) {
		grouped[type].sort();
	}

	return grouped;
}

/**
 * Create a summary of the JSON-LD graph
 */
export interface JsonLdSummary {
	totalEntities: number;
	entityIds: string[];
	byType: Record<string, string[]>;
}

export function createJsonLdSummary(entities: JsonLdEntity[]): JsonLdSummary {
	return {
		totalEntities: entities.length,
		entityIds: extractIds(entities),
		byType: groupByType(entities),
	};
}

/**
 * Filter entities that have usesSoftware referencing a specific software ID
 */
export function findOrganizationsUsingSoftware(entities: JsonLdEntity[], softwareId: string): string[] {
	return entities
		.filter((entity) => {
			if (entity['@type'] !== 'Organization') return false;
			const usesSoftware = entity.usesSoftware;
			if (!usesSoftware) return false;

			const refs = Array.isArray(usesSoftware) ? usesSoftware : [usesSoftware];
			return refs.some((ref) => {
				const refId = typeof ref === 'string' ? ref : ref?.['@id'];
				return refId === softwareId;
			});
		})
		.map((e) => e['@id'] as string)
		.sort();
}
