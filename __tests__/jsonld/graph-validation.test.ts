/**
 * JSON-LD Graph Validation Tests
 *
 * Tests for graph integrity - checking for missing references,
 * nested entities, orphans, and duplicates.
 */

import { findMissingReferences, findNestedEntities, findOrphans } from 'jsonldjs';

import { jsonldGraph } from '@/data/jsonld';

describe('JSON-LD Graph Validation', () => {
	describe('findMissingReferences', () => {
		it('should find missing references in the graph', () => {
			const missingRefs = findMissingReferences(jsonldGraph);

			if (missingRefs.length > 0) {
				console.log('Missing references found:', missingRefs.length);
				console.log('First 10 missing references:', missingRefs.slice(0, 10));
			}

			expect(missingRefs.sort()).toMatchSnapshot();
		});
	});

	describe('findNestedEntities', () => {
		it('should find nested entities in the graph', () => {
			const nestedEntities = findNestedEntities(jsonldGraph);

			const summary = nestedEntities.map((n) => ({
				parentId: n.parentId,
				property: n.property,
				hasId: n.hasId,
				type: n.nestedEntity['@type'],
			}));

			expect(summary).toMatchSnapshot();
		});
	});

	describe('findOrphans', () => {
		it('should find orphaned entities in the graph', () => {
			const orphans = findOrphans(jsonldGraph);

			if (orphans.length > 0) {
				console.log('Orphaned entities found:', orphans.length);
				console.log('First 10 orphaned entities:', orphans.slice(0, 10));
			}

			expect(orphans.sort()).toMatchSnapshot();
		});
	});

	describe('Graph Integrity', () => {
		it('should track duplicate IDs in the graph', () => {
			const ids = jsonldGraph.map((e) => e['@id']).filter(Boolean);
			const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
			const uniqueDuplicates = [...new Set(duplicates)].sort();

			expect(uniqueDuplicates).toEqual([]);
		});

		it('should have software:latex2js in the graph', () => {
			const latex2js = jsonldGraph.find((e) => e['@id'] === 'software:latex2js');
			expect(latex2js).toBeDefined();
			expect(latex2js?.['@type']).toBe('SoftwareApplication');
		});

		it('should have website:latex2js.com in the graph', () => {
			const website = jsonldGraph.find((e) => e['@id'] === 'website:latex2js.com');
			expect(website).toBeDefined();
			expect(website?.['@type']).toBe('WebSite');
		});

		it('should have no missing references', () => {
			expect(findMissingReferences(jsonldGraph)).toEqual([]);
		});

		it('should have consistent entity count', () => {
			expect({
				totalEntities: jsonldGraph.length,
			}).toMatchSnapshot();
		});
	});
});
