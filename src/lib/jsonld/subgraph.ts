import { extractSubgraphs, findReferencingEntities, type JsonLdGraph, type JsonLdEntity } from 'jsonldjs';

/**
 * Pipe function type for JSON-LD graph transformations
 */
type PipeFunction = (graph: JsonLdGraph) => JsonLdGraph;

export interface BidirectionalSubgraphOptions {
	/**
	 * Whether to include entities that reference the root entities (reverse traversal)
	 * @default true
	 */
	includeReferencingEntities?: boolean;

	/**
	 * Filter referencing entities by @type. If specified, only entities with
	 * these types will be included in reverse traversal.
	 * @example ['Organization'] - only include organizations that reference the root
	 */
	referencingEntityTypes?: string[];

	/**
	 * Whether to also extract the full subgraph (forward traversal) for
	 * referencing entities found during reverse traversal.
	 * @default false
	 */
	expandReferencingEntities?: boolean;
}

/**
 * Extract a bidirectional subgraph - both forward and reverse references
 *
 * Forward: Starting from root IDs, find all entities they reference
 * Reverse: Find all entities that reference the root IDs
 *
 * @param graph - The full JSON-LD graph
 * @param rootIds - Starting entity IDs
 * @param options - Configuration options
 * @returns Combined subgraph with both directions
 */
export function extractBidirectionalSubgraph(
	graph: JsonLdGraph,
	rootIds: string[],
	options: BidirectionalSubgraphOptions = {},
): JsonLdGraph {
	const {
		includeReferencingEntities = true,
		referencingEntityTypes,
		expandReferencingEntities = false,
	} = options;

	// Start with forward traversal
	const forwardEntities = extractSubgraphs(graph, rootIds);
	const resultMap = new Map<string, JsonLdEntity>();

	forwardEntities.forEach((entity) => {
		resultMap.set(entity['@id'], entity);
	});

	// Reverse traversal - find entities that reference any of our root IDs
	if (includeReferencingEntities) {
		const referencingIds = new Set<string>();

		for (const rootId of rootIds) {
			const referencing = findReferencingEntities(graph, rootId);

			for (const entity of referencing) {
				// Apply type filter if specified
				if (referencingEntityTypes && referencingEntityTypes.length > 0) {
					const entityType = entity['@type'];
					const types = Array.isArray(entityType) ? entityType : [entityType];
					if (!types.some((t) => referencingEntityTypes.includes(t as string))) {
						continue;
					}
				}

				resultMap.set(entity['@id'], entity);
				referencingIds.add(entity['@id']);
			}
		}

		// Optionally expand referencing entities (get their full subgraphs)
		if (expandReferencingEntities && referencingIds.size > 0) {
			const expandedEntities = extractSubgraphs(graph, Array.from(referencingIds));
			expandedEntities.forEach((entity) => {
				if (!resultMap.has(entity['@id'])) {
					resultMap.set(entity['@id'], entity);
				}
			});
		}
	}

	return Array.from(resultMap.values());
}

/**
 * Create a pipe function for bidirectional subgraph extraction
 *
 * Since pipe() receives the already-filtered graph, this function requires
 * the original full graph to be passed in for reverse lookups.
 *
 * @param fullGraph - The complete JSON-LD graph (needed for reverse lookups)
 * @param rootIds - Starting entity IDs for subgraph extraction
 * @param options - Bidirectional subgraph options
 * @returns A pipe function compatible with jsonldjs config builder
 *
 * @example
 * ```typescript
 * import { jsonldGraph } from '@/data/jsonld';
 *
 * const config = defaultJsonLdConfig
 *   .clearSubgraph()
 *   .pipe(createBidirectionalSubgraphPipe(jsonldGraph, ['software:pgsql-parser'], {
 *     referencingEntityTypes: ['Organization']
 *   }))
 *   .getConfig();
 * ```
 */
export function createBidirectionalSubgraphPipe(
	fullGraph: JsonLdGraph,
	rootIds: string[],
	options: BidirectionalSubgraphOptions = {},
): PipeFunction {
	return (_filteredGraph) => extractBidirectionalSubgraph(fullGraph, rootIds, options);
}
