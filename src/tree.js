import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.array = [...new Set(array)]; // remove duplicates
    this.array = this.array.sort((a, b) => a - b); // sort array
    this.root = this.buildTree(this.array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    if (!root) {
      const node = new Node(value);
      if (!this.root) this.root = node;
      return node;
    }

    if (root.data === value) return root;

    if (value < root.data) root.left = this.insert(value, root.left);
    else root.right = this.insert(value, root.right);
    return root;
  }

  deleteItem(value, root = this.root) {
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
      root.right = this.deleteItem(minNode.data, root.right);
      return root;
    }

    if (value < root.data) root.left = this.deleteItem(value, root.left);
    else root.right = this.deleteItem(value, root.right);
    return root;
  }

  findMin(root) {
    if (!root) return null;
    while (root.left) root = root.left;
    return root;
  }

  find(value, root = this.root) {
    if (root.data === value) return root;

    if (value < root.data) return this.find(value, root.left);
    else return this.find(value, root.right);
  }

  // BFS function
  levelOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback function must be provided.");

    if (!this.root) return;

    const queue = [this.root];
    while (queue.length != 0) {
      const visited = queue.shift();
      callback(visited);
      if (visited.left) queue.push(visited.left);
      if (visited.right) queue.push(visited.right);
    }
  }

  levelOrderRecur(callback, queue = [this.root]) {
    if (typeof callback !== "function")
      throw new Error("Callback function must be provided.");
    if (!this.root) return;

    if (queue.length === 0) return;

    const visited = queue.shift();
    callback(visited);

    if (visited.left) queue.push(visited.left);
    if (visited.right) queue.push(visited.right);
    return this.levelOrderRecur(callback, queue);
  }

  // DFS functions
  preOrder(callback, root = this.root) {
    if (typeof callback !== "function")
      throw new Error("Callback function must be provided.");

    if (!root) return;

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  inOrder(callback, root = this.root) {
    if (typeof callback !== "function")
      throw new Error("Callback function must be provided.");

    if (!root) return;

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (typeof callback !== "function")
      throw new Error("Callback function must be provided.");

    if (!root) return;

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node, h = 0) {
    if (!node) return h - 1;

    const leftHeight = this.height(node.left, h + 1);
    const rightHeight = this.height(node.right, h + 1);

    return Math.max(leftHeight, rightHeight);
  }

  depth(node) {
    let root = this.root;
    let depth = 0;
    while (root) {
      if (root.data === node.data) {
        return depth;
      }
      depth += 1;
      if (node.data < root.data) root = root.left;
      else root = root.right;
    }
    return null;
  }

  depthRecur(node, root = this.root, d = 0) {
    if (!root) return 0;
    if (node === root) return d;

    if (node.data < root.data)
      return this.depthRecur(node, root.left, d + 1);
    else
      return this.depthRecur(node, root.right, d + 1);
  }

  isBalanced() {
    const left = this.root.left;
    const right = this.root.right;
    const diff = Math.abs(this.height(left) - this.height(right));
    if (diff <= 1) return true;
    else return false;
  }
}
