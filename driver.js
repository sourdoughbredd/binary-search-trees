import { BST } from "./binary-search-tree.js";

function randNumbersArray(n, min, max) {
  if (n == 0) return [];
  return Array.from({ length: n }, () => min + Math.floor(Math.random() * max));
}

console.log("Creating a tree of numbers < 100...");
const array100 = randNumbersArray(10, 0, 100);
const bst = BST(array100);
bst.print();
console.log("Is tree balanced? " + bst.isBalanced());
console.log("Level Order: " + bst.levelOrder());
console.log("Pre Order: " + bst.preOrder());
console.log("In Order: " + bst.inOrder());
console.log("Post Order: " + bst.postOrder());
console.log("Adding 5 numbers greater than 100...");
bst.insert(101);
bst.insert(102);
bst.insert(103);
bst.insert(104);
bst.insert(105);
bst.print();
console.log("Is tree balanced? " + bst.isBalanced());
console.log("Rebalancing the tree...");
bst.rebalance();
bst.print();
console.log("Is tree balanced? " + bst.isBalanced());
console.log("Level Order: " + bst.levelOrder());
console.log("Pre Order: " + bst.preOrder());
console.log("In Order: " + bst.inOrder());
console.log("Post Order: " + bst.postOrder());
