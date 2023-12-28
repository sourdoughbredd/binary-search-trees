import { Node } from "./node.js";
import { mergeSort } from "./merge-sort.js";
import { Queue } from "./queue.js";

export { BST };

function removeDuplicates(array) {
  return [...new Set(array)];
}

const BST = function (array = null) {
  let root;

  // Initialize BST
  if (array === null) {
    root = null;
  } else {
    const uniqueSorted = mergeSort(removeDuplicates(array));
    root = buildTree(uniqueSorted);
  }

  // Inserts an element into the tree
  function insert(value) {
    root = insertRec(root, value);
  }

  // Deletes a value from the tree
  function deleteVal(value) {
    root = deleteRec(root, value);
  }

  // Returns the node containing the specified value
  function find(value) {
    return findRec(root, value);
  }

  // Default callback for traversals
  const defaultCallback = (node) => node.data;

  // Level-Order Traversal
  function levelOrder(callback = defaultCallback) {
    const results = [];
    const q = Queue();
    q.enqueue(root);
    while (!q.isEmpty()) {
      // Dequeue next node run through callback
      const dq = q.dequeue();
      results.push(callback(dq));
      // Queue its children
      if (dq.left != null) q.enqueue(dq.left);
      if (dq.right != null) q.enqueue(dq.right);
    }
    return results;
  }

  // Pre-Order Traversal
  function preOrder(callback = defaultCallback) {
    return preOrderRec(root, callback);
  }

  // In-Order Traversal
  function inOrder(callback = defaultCallback) {
    return inOrderRec(root, callback);
  }

  // Post-Order Traversal
  function postOrder(callback = defaultCallback) {
    return postOrderRec(root, callback);
  }

  // Returns height of a node
  function height(node) {
    if (node == null) return null;
    if (node.isLeaf()) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
  }

  // Returns the depth of a node
  function depth(node) {
    if (node == null) return null;
    return depthRec(root, node);
  }

  // Returns true if the tree is balanced, false otherwise
  function isBalanced() {
    return isBalancedRec(root);
  }

  function isBalancedRec(root) {
    if (root == null) return true;
    return (
      Math.abs(height(root.left) - height(root.right)) <= 1 &&
      isBalancedRec(root.left) &&
      isBalancedRec(root.right)
    );
  }

  // Rebalances an unbalanced tree
  function rebalance() {
    if (isBalanced()) return;
    const orderedValues = inOrder(); // so we don't have to sort
    root = buildTree(orderedValues);
  }

  // Prints a graphical representation of the tree
  function print() {
    prettyPrint(root);
  }

  const output = {
    root,
    insert,
    delete: deleteVal,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
    print,
  };

  ///////// PRIVATE HELPERS

  function buildTree(a) {
    if (a.length <= 0) {
      return null;
    }
    // Get middle as root and build trees to left and right
    const mid = Math.floor((a.length - 1) / 2);
    const data = a[mid];
    const left = buildTree(a.slice(0, mid));
    const right = buildTree(a.slice(mid + 1));
    return Node(data, left, right);
  }

  function insertRec(root, value) {
    if (root === null) {
      return Node(value);
    }
    if (value == root.data) {
      // already in the tree
      return root;
    }
    if (value < root.data) {
      // belongs in left subtree
      root.left = insertRec(root.left, value);
    } else {
      // belongs in right subtree
      root.right = insertRec(root.right, value);
    }
    return root;
  }

  function deleteRec(root, value) {
    if (root == null) {
      // not found
      return root;
    }
    if (value < root.data) {
      root.left = deleteRec(root.left, value);
    } else if (value > root.data) {
      root.right = deleteRec(root.right, value);
    } else {
      // Value found at root. Delete it by replacing with it's subtree predecessor.
      root = replaceWithPredecessor(root);
    }
    return root;
  }

  function replaceWithPredecessor(root) {
    if (root.isLeaf()) {
      // leaf node
      return null;
    }
    if (root.left == null) {
      // no predecessor. connect to right
      return root.right;
    }
    // Find the predecessor and swap with root
    let prevNode = root;
    let predecessorNode = root.left;
    while (predecessorNode.right != null) {
      prevNode = predecessorNode;
      predecessorNode = predecessorNode.right;
    }
    const predecessorValue = predecessorNode.data;
    if (prevNode === root) {
      // Handle special case where predecessor right below the root
      prevNode.left = predecessorNode.left;
    } else {
      prevNode.right = predecessorNode.left;
    }
    root.data = predecessorValue;
    return root;
  }

  function findRec(root, value) {
    if (root == null || root.data == value) {
      // Found value or finished search without finding
      return root;
    }
    if (value < root.data) {
      return findRec(root.left, value);
    } else {
      return findRec(root.right, value);
    }
  }

  function preOrderRec(root, callback) {
    if (root == null) {
      return [];
    }
    const result = callback(root);
    const left = preOrderRec(root.left, callback);
    const right = preOrderRec(root.right, callback);
    return [result, ...left, ...right];
  }

  function inOrderRec(root, callback) {
    if (root == null) {
      return [];
    }
    const left = inOrderRec(root.left, callback);
    const result = callback(root);
    const right = inOrderRec(root.right, callback);
    return [...left, result, ...right];
  }

  function postOrderRec(root, callback) {
    if (root == null) {
      return [];
    }
    const left = postOrderRec(root.left, callback);
    const right = postOrderRec(root.right, callback);
    const result = callback(root);
    return [...left, ...right, result];
  }

  function depthRec(root, node) {
    if (root === null || node === root) return 0;
    return (
      1 +
      (node.data < root.data
        ? depthRec(root.left, node)
        : depthRec(root.right, node))
    );
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return output;
};

// TESTING BALANCE
// const bst = BST([0, 1, 2, 3, 4, 5, 6]);
// bst.print();
// console.log("Balanced? " + bst.isBalanced());
// console.log("Adding lots of high numbers...");
// bst.insert(7);
// bst.insert(8);
// bst.insert(9);
// bst.print();
// console.log("Balanced? " + bst.isBalanced());
// console.log("Rebalancing the tree...");
// bst.rebalance();
// bst.print();

// TESTING HEIGHT/DEPTH
// const bst = BST([0, 1, 2, 3, 4, 5, 6]);
// bst.print();
// const node3 = bst.find(3);
// const node4 = bst.find(4);
// const nodeWhat = bst.find(100000);
// console.log("height of 3: " + bst.height(node3));
// console.log("depth of 3: " + bst.depth(node3));
// console.log("height of 4: " + bst.height(node4));
// console.log("depth of 4: " + bst.depth(node4));
// console.log("height of nonexistent node: " + bst.height(nodeWhat));
// console.log("depth of nonexistent node: " + bst.depth(nodeWhat));

// TESTING TRAVERSALS
// const bst = BST([0, 1, 2, 3, 4, 5, 6]);
// bst.print();
// console.log("Level Order : " + bst.levelOrder());
// console.log(
//   "Level Order Squared : " + bst.levelOrder((node) => node.data * node.data)
// );
// console.log("Pre-Order : " + bst.preOrder());
// console.log(
//   "Pre-Order Squared : " + bst.preOrder((node) => node.data * node.data)
// );
// console.log("In-Order : " + bst.inOrder());
// console.log(
//   "In-Order Squared : " + bst.inOrder((node) => node.data * node.data)
// );
// console.log("Post-Order : " + bst.postOrder());
// console.log(
//   "Post-Order Squared : " + bst.postOrder((node) => node.data * node.data)
// );

// TESTING FIND
// const bst = BST([0, 1, 2, 3, 4, 5, 6]);
// bst.print();
// console.log(bst.find(5));
// console.log(bst.find(10000));

// A demonstration of JS pass by copy of reference rules
// (you can modify the contents of the object but you can not overwrite the reference with a new object)
// let node5 = bst.find(5);
// console.log("Changing 5 to 50 using the Node returned by find()...");
// node5.data = 50;
// bst.print();
// console.log(
//   "Trying to reassign the Node returned by find() to a new leaf Node with data=500..." +
//     "(this should not work because of JS pass by COPY of reference rules)"
// );
// node5 = Node(500);
// bst.print();
