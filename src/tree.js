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

  insert(root, value) {
    if (!root) {
      const node = new Node(value);
      if (!this.root) this.root = node;
      return node;
    }

    if (root.data === value) return root;

    if (value < root.data) root.left = this.insert(root.left, value);
    else root.right = this.insert(root.right, value);
    return root;
  }

  deleteItem(root, value) {
    if (root.data === value) {
      // 0 children
      if (!root.left && !root.right) return null;

      // 1 child
      if (!root.left) return root.right;
      else if (!root.right) return root.left;

      // 2 children
      // search for min of right subtree
      let minNode = this.findMin(root.right);
      root.data = minNode.data;
      root.right = this.deleteItem(root.right, minNode.data);
      return root;
    }

    if (value < root.data) root.left = this.deleteItem(root.left, value);
    else root.right = this.deleteItem(root.right, value);
    return root;
  }

  findMin(root){
    if(!root) return null;
    while(root.left) root = root.left;
    return root
  }
}
