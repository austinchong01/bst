import Tree from "./tree.js";

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

function createRandomArray(n, min, max) {
  const randomArray = [];
  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}

function print(node) {
  return console.log(node.data);
}

const array = createRandomArray(10, 0, 100);
console.log("Array: [" + array + "]");
console.log("");

const tree = new Tree(array);
prettyPrint(tree.root);
console.log("");

console.log("Balanced: " + tree.isBalanced());
console.log("");

console.log("levelOrder:");
tree.levelOrderRecur(print);

console.log("");
console.log("preOrder:");
tree.preOrder(print);

console.log("");
console.log("inOrder:");
tree.inOrder(print);

console.log("");
console.log("postOrder:");
tree.postOrder(print);

console.log("");
tree.insert(11);
tree.insert(10);
tree.insert(9);
tree.insert(8);
tree.insert(7);
tree.insert(6);
prettyPrint(tree.root);
console.log("Balanced: " + tree.isBalanced());
console.log("");

tree.rebalance();
console.log("Rebalanced Tree: ")
prettyPrint(tree.root);
console.log("Balanced: " + tree.isBalanced());
console.log("");

console.log("levelOrder:");
tree.levelOrderRecur(print);

console.log("");
console.log("preOrder:");
tree.preOrder(print);

console.log("");
console.log("inOrder:");
tree.inOrder(print);

console.log("");
console.log("postOrder:");
tree.postOrder(print);
