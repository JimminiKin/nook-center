export interface Node {
	readonly id: string;
}

export function isNode(obj: any): obj is Node {
	return 'id' in obj;
}

export function isNodes(objs: any[]): objs is Node[] {
	for (const obj of objs) {
		if (!isNode(obj)) {
			return false;
		}
	}
	return true;
}

export interface PageInfoInterface {
	readonly hasNextPage: boolean;
	readonly hasPreviousPage: boolean;
	readonly startCursor?: string;
	readonly endCursor?: string;
}

export interface Connection<T, TEdge extends Edge<T>> {
	readonly edges: TEdge[];
	readonly pageInfo: PageInfoInterface;
}

export interface Edge<T> {
	cursor: string;
	node: T;
}

export function createConnectionFromFullNodeEdgeList<TEntity extends Node>(
	allPossibleEdges: TEntity[],
	nbEdgesToReturn: number,
	afterCursor: string | null = null,
): Connection<TEntity, Edge<TEntity>> {
	if (!isNodes(allPossibleEdges)) {
		throw Error('All edges must be Node interfaces');
	}
	let startSliceIndex = 0;
	let endSliceIndex = nbEdgesToReturn;
	if (afterCursor) {
		const afterCursorIndex = allPossibleEdges.findIndex((node: Node): boolean => {
			if (node.id.toString() === afterCursor) {
				return true;
			}
			return false;
		});
		if (afterCursorIndex === -1) {
			throw Error(`Cannot find the cursor specified "${afterCursor}" given`);
		} else {
			startSliceIndex = Math.min(afterCursorIndex + 1, allPossibleEdges.length - 1);
			endSliceIndex = startSliceIndex + Math.min(nbEdgesToReturn, allPossibleEdges.length - startSliceIndex);
		}
	}

	const edges: Edge<TEntity>[] = allPossibleEdges.slice(startSliceIndex, endSliceIndex).map(
		(node: TEntity): Edge<TEntity> => {
			if (isNode(node)) {
				// Type narrowing for TS
				return {
					cursor: node.id,
					node: node,
				};
			}
			throw Error('Cannot put something that is not a Node in edges');
		},
	);

	const pageInfo: any = {
		hasPreviousPage: startSliceIndex !== 0,
		hasNextPage: endSliceIndex < allPossibleEdges.length,
		count: allPossibleEdges.length,
	};

	if (edges.length > 0) {
		pageInfo.startCursor = edges[0].cursor;
		pageInfo.endCursor = edges[edges.length - 1].cursor;
	}

	return {
		edges: edges,
		pageInfo: pageInfo,
	};
}

export default {
	Node: {
		__resolveType(item: any) {
			return item.__typename;
		},
	},
};
