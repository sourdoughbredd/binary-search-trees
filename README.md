# binary-search-trees

## Introduction

This project implements a Binary Search Tree (BST) in JavaScript, providing a fundamental data structure with efficient methods for inserting, deleting, and searching for nodes. BSTs are widely used due to their dynamic nature and the ability to maintain a sorted sequence of data. This implementation was specifically designed for and tested on storing numbers in the binary search tree, but it may work with other data types as well.

## Table of Contents

- [Usage](#usage)
- [Features](#features)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributors](#contributors)

## Usage

The Binary Search Tree (BST) can be easily integrated into your JavaScript projects. Below are the steps and examples on how to use the BST in your code:

1. **Importing and Creating a Tree:**
   Begin by importing the `BST` class from the `binary-search-tree.js` file and create an instance of the BST. You can initialize the BST with an array of values or start with an empty tree.

   ```javascript
   import { BST } from "./binary-search-tree.js";

   // Initialize BST with an array of numbers
   const initialValues = [20, 9, 25, 5, 12, 30];
   const bst = BST(initialValues);

   // Alternatively, start with an empty BST
   const bstEmpty = BST();
   ```

2. **Inserting Elements:**
   To insert elements into your BST, use the `insert` method. This method will add the element in the correct position to maintain the BST property.

   ```javascript
   bst.insert(15);
   bst.insert(22);
   ```

3. **Deleting Elements:**
   To remove elements from the BST, use the `delete` method. This method will find and remove the element, ensuring the BST property is retained after removal.

   ```javascript
   bst.delete(9);
   bst.delete(20);
   ```

4. **Finding Elements:**
   If you need to check whether an element is in the tree, use the `find` method. It will return the node if it exists, or `null` if it doesn't.

   ```javascript
   const node = bst.find(15);
   if (node !== null) {
     console.log("Node found:", node);
   } else {
     console.log("Node not found.");
   }
   ```

5. **Traversing the Tree:**
   The BST provides several methods for traversing the tree, such as `inOrder`, `preOrder`, `postOrder`, and `levelOrder`. These methods can be used to process or print the values in a specific order.

   ```javascript
   // In-order traversal
   console.log("In-order:", bst.inOrder());

   // Pre-order traversal
   console.log("Pre-order:", bst.preOrder());

   // Post-order traversal
   console.log("Post-order:", bst.postOrder());

   // Level-order (breadth-first) traversal
   console.log("Level-order:", bst.levelOrder());
   ```

6. **Checking Tree Properties:**
   Use the `isBalanced` method to check if the tree is balanced and the `height` method to determine the height of a node or the entire tree.

   ```javascript
   console.log("Is tree balanced?", bst.isBalanced());
   console.log("Height of tree:", bst.height());
   ```

7. **Balancing the Tree:**
   If your BST becomes unbalanced, you can rebalance it using the `rebalance` method.

   ```javascript
   bst.rebalance();
   ```

8. **Visualizing the Tree:**
   To print and visualize the current structure of the tree, use the `print` method.

   ```javascript
   bst.print();
   ```

By following these steps, you can effectively use the Binary Search Tree in your projects for efficient data storage and retrieval. Remember to handle edge cases and ensure that your usage of the BST fits the needs of your specific application.

## Features

- Efficient data storage, retrieval, and manipulation.
- Dynamic tree structure maintaining a sorted sequence of nodes.
- Various traversal methods to navigate through the tree.

## API Reference

### BinarySearchTree

#### `getRoot()`

**Description**: Retrieves the root node of the binary search tree.

#### `insert(value)`

**Description**: Inserts a new value into the binary search tree at the correct position to maintain BST properties.

#### `delete(value)`

**Description**: Removes the node with the specified value from the binary search tree, adjusting the tree to maintain BST properties.

#### `find(value)`

**Description**: Searches for a node with the specified value and returns the node if found; otherwise, returns `null`.

#### `levelOrder(function)`

**Description**: Traverses the tree in level order (breadth-first traversal) and applies the given function to each node. Returns an array of values in level order if no function is provided.

#### `preOrder(function)`

**Description**: Traverses the tree in pre-order (root, left, right) and applies the given function to each node. Returns an array of values in pre-order if no function is provided.

#### `inOrder(function)`

**Description**: Traverses the tree in in-order (left, root, right) and applies the given function to each node. Returns an array of values in in-order if no function is provided.

#### `postOrder(function)`

**Description**: Traverses the tree in post-order (left, right, root) and applies the given function to each node. Returns an array of values in post-order if no function is provided.

#### `height(node)`

**Description**: Computes the height of the tree or the height of the specified node. The height is the number of edges on the longest path from the node to a leaf.

#### `depth(node)`

**Description**: Computes the depth of the specified node, defined as the number of edges from the node to the tree's root.

#### `isBalanced()`

**Description**: Checks if the tree is balanced, where the height of two subtrees of any node never differs by more than one.

#### `rebalance()`

**Description**: Rebalances the tree if it is found to be unbalanced, rearranging the nodes to ensure balanced properties.

#### `print()`

**Description**: Prints a visual representation of the tree, aiding in debugging and visualization of the tree structure.

## Examples

The `driver.js` file provides examples of how to use the Binary Search Tree:

```javascript
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
```

This example demonstrates creating a Binary Search Tree with random numbers, printing the tree, and displaying various traversals and properties of the tree.

## Contributors

Created and maintained by Brett Bussell.
