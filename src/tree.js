import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.array = [...new Set(array)]; // remove duplicates
    this.array = this.array.sort((a, b) => a - b); // sort array
    this.root = this.buildTree(this.array);
    this.height = 0;
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }
}
