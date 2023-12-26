function mergeSort(array) {
  if (array.length <= 1) return array;
  const middle = Math.floor(array.length / 2);
  // Sort left half
  const sortedLeft = mergeSort(array.slice(0, middle));
  // Sort right half
  const sortedRight = mergeSort(array.slice(middle));
  // Merge
  return merge(sortedLeft, sortedRight);
}

function merge(a, b) {
  const mergedArray = [];
  while (a.length > 0 && b.length > 0) {
    if (a[0] <= b[0]) {
      mergedArray.push(a.shift());
    } else {
      mergedArray.push(b.shift());
    }
  }
  // If there's any leftovers, concatenate em
  return [...mergedArray, ...a, ...b];
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

// BINARY SEARCH TREE

const Node = function (data = null, left = null, right = null) {
  return {
    data,
    left,
    right,
    isLeaf() {
      return left == null && right == null;
    },
  };
};

const BST = function (array = null) {
  let root;

  // Initialize BST
  if (array === null) {
    root = null;
  } else {
    uniqueSorted = mergeSort(removeDuplicates(array));
    root = buildTree(uniqueSorted);
  }

  // Inserts an element into the tree
  function insertVal(value) {
    root = insertRec(root, value);
  }

  // Deletes a balue from the tree
  function deleteVal(value) {
    root = deleteRec(root, value);
  }

  // Prints a graphical representation of the tree
  function print() {
    prettyPrint(root);
  }

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
      // Found the value. Delete it by replacing with it's subtree predecessor.
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
    // Find the predecssor and swap with root
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

  return { root, insertVal, deleteVal, print };
};

// TESTING
const bst = BST([0, 1, 2, 3, 4, 5, 6]);
bst.print();
console.log("Deleting 4...");
bst.deleteVal(4);
console.log();
console.log();
bst.print();
console.log("Deleting 1...");
bst.deleteVal(1);
console.log();
console.log();
bst.print();
console.log("Deleting 3...");
bst.deleteVal(3);
console.log();
console.log();
bst.print();
console.log("Deleting 100 (nonexistent)...");
bst.deleteVal(100);
console.log();
console.log();
bst.print();
console.log("Deleting rest...");
bst.deleteVal(5);
bst.deleteVal(2);
bst.deleteVal(0);
bst.deleteVal(6);
console.log();
console.log();
bst.print();
console.log("Adding 1...");
bst.insertVal(1);
console.log();
console.log();
bst.print();

// const bstIn = BST();
// bstIn.insert(4);
// bstIn.insert(1);
// bstIn.insert(7);
// bstIn.insert(0);
// bstIn.insert(2);
// bstIn.insert(5);
// bstIn.insert(8);
// bstIn.print();
