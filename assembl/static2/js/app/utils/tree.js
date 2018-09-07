// @flow

type NodeType = {
  id: string,
  ancestors: Array<string>,
  [string]: any
};

type TreeType<T> = {
  roots: Array<T>,
  descendants: Array<T>
};

/**
 * @param {T: NodeType} The type of the nodes
 * @param {T} The root node.
 * @param {Array<T>} An array of nodes.
 * @returns {Array<T>} Returns the direct child nodes of the root.
 */
export function getChildren<T: NodeType>(rootNode: T, nodes: Array<T>): Array<T> {
  return nodes.filter(node => node.ancestors && node.ancestors.includes(rootNode.id));
}

/**
 * @param {T: NodeType} The type of the nodes
 * @param {Array<T>} An array of nodes.
 * @returns {{roots: Array<T>, descendants: Array<T>}} Returns the partial tree composed of all the root nodes and their children.
 */
export function getPartialTree<T: NodeType>(nodes: Array<T>): TreeType<T> {
  let ids = nodes.map(node => node.id);
  const roots = nodes.filter(node => !node.ancestors || node.ancestors.every(a => !ids.includes(a)));
  ids = roots.map(node => node.id);
  const descendants = nodes.filter(node => !ids.includes(node.id));
  return {
    roots: roots,
    descendants: descendants
  };
}

/**
 * @param {T: NodeType} The type of the nodes
 * @param {Array<T>} An array of nodes.
 * @returns {Array<T>} Returns the tree composed of all the root nodes and their children.
 */
export function getTree<T: NodeType>(nodes: Array<T>, childrenName: string = 'children'): Array<T> {
  const { roots, descendants } = getPartialTree(nodes);
  let tree = roots;
  if (descendants.length > 0) {
    const treeRoots = getTree(descendants);
    tree = roots.map((item) => {
      const newItem = { ...item, [childrenName]: [] };
      // $FlowFixMe
      newItem.children = getChildren(item, treeRoots);
      return newItem;
    });
  } else {
    tree = roots.map(item => ({ ...item, [childrenName]: [] }));
  }
  return tree;
}