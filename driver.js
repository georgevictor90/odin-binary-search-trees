import Tree from "./binarySearchTree.js";

const minLength = 3;
const maxLength = 12;

const minNum = 0;
const maxNum = 100;

////Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function createRandomArray(length) {
  if (!length) return null;
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(getRandomIntInclusive(minNum, maxNum));
  }
  return arr;
}

let len = getRandomIntInclusive(minLength, maxLength);

let array = createRandomArray(len);
console.log(array);

let tree = new Tree(array);
console.log("Tree created");
tree.prettyPrint();

////Confirm that the tree is balanced by calling isBalanced

console.log("Tree is balanced: " + tree.isBalanced() + "\n", "\n");

////Print out all elements in level, pre, post, and in order

function printAll(tree) {
  console.log(`Level order: ${tree.levelOrder()}`);
  console.log(`Inorder: ${tree.inorder()}`);
  console.log(`Preorder: ${tree.preorder()}`);
  console.log(`Postorder: ${tree.postorder()}`);
  console.log("\n");
}

printAll(tree);

////Unbalance the tree by adding several numbers > 100

tree.insert(106);
tree.insert(121);
tree.insert(111);
tree.insert(160);
console.log("Tree unbalanced");
tree.prettyPrint();

////Confirm that the tree is unbalanced by calling isBalanced

console.log("Tree is balanced: " + tree.isBalanced() + "\n", "\n");

////Balance the tree by calling rebalance
tree.rebalance();
console.log("Tree rebalanced");
tree.prettyPrint();

////Confirm that the tree is balanced by calling isBalanced
console.log("Tree is balanced: " + tree.isBalanced() + "\n", "\n");

////Print out all elements in level, pre, post, and in order
printAll(tree);
