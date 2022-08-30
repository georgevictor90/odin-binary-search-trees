class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(arr) {
    let sortedArr = this.removeDuplicates(this.mergeSort(arr));
    if (sortedArr.length == 0) return null;
    let mid = Math.floor(sortedArr.length / 2);
    let root = new Node(sortedArr[mid]);
    root.left = this.buildTree(sortedArr.slice(0, mid));
    root.right = this.buildTree(sortedArr.slice(mid + 1));
    return root;
  }

  find(value, root = this.root) {
    if (root === null || root.data === value) return root;
    if (root.data < value) return this.find(root.right, value);
    if (root.data > value) return this.find(root.left, value);
  }

  insert(value, root = this.root) {
    if (root == null) {
      root = new Node(value);
      return root;
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  delete(value, root = this.root) {
    if (root == null) return root;
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
      root.data = this.minValue(root.right);
      root.right = this.delete(root.data, root.right);
    }
    return root;
  }

  minValue(root) {
    let minv = root.data;
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
  }

  levelOrder(callback) {
    let result = [];
    if (this.root === null) return result;

    let queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let row = [];
      let rowSize = queue.length;

      while (rowSize > 0) {
        let currentNode = queue.shift();
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }

        callback ? callback(currentNode) : row.push(currentNode.data);
        rowSize--;
      }

      result.push(row);
    }

    if (result[0].length) return result;
  }

  inorder(node = this.root, callback, result = []) {
    if (node === null) return;
    this.inorder(node.left, callback, result);
    callback ? callback(node.data) : result.push(node.data);
    this.inorder(node.right, callback, result);
    if (result.length > 0) return result;
  }

  preorder(node = this.root, callback, result = []) {
    if (node === null) return;
    callback ? callback(node.data) : result.push(node.data);
    this.preorder(node.left, callback, result);
    this.preorder(node.right, callback, result);
    if (result.length > 0) return result;
  }

  postorder(node = this.root, callback, result = []) {
    if (node === null) return;
    this.postorder(node.left, callback, result);
    this.postorder(node.right, callback, result);
    callback ? callback(node.data) : result.push(node.data);
    if (result.length > 0) return result;
  }

  height(node = this.root) {
    if (node === null) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null || node === this.root) return 0;

    let depth = 0;
    let current = this.root;

    while (current !== node) {
      depth++;

      if (current.data > node.data) {
        current = current.left;
      }
      if (current.data < node.data) {
        current = current.right;
      }
    }
    return depth;
  }

  isBalanced(node = this.root) {
    if (!node) return null;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    if (leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1)
      return false;
    return true;
  }

  rebalance(root = this.root) {
    if (this.isBalanced() === true) return;
    this.root = this.buildTree(this.inorder());
  }

  removeDuplicates(sortedArr) {
    return [...new Set(sortedArr)];
  }
  mergeSort(arr) {
    if (arr.length < 2) return arr;
    let half = Math.ceil(arr.length / 2);
    let firstHalf = arr.slice(0, half);
    let secondHalf = arr.slice(half);
    firstHalf = this.mergeSort(firstHalf);
    secondHalf = this.mergeSort(secondHalf);
    return this.merge(firstHalf, secondHalf);
  }
  merge(first, second) {
    let sorted = [];
    while (first.length > 0 && second.length > 0) {
      if (first[0] <= second[0]) {
        sorted.push(first[0]);
        first.shift();
      } else {
        sorted.push(second[0]);
        second.shift();
      }
    }
    while (
      // By now, either first or second array is empty. It remains to empty the other input list.
      first.length > 0
    ) {
      sorted.push(first[0]);
      first.shift();
    }
    while (second.length > 0) {
      sorted.push(second[0]);
      second.shift();
    }
    return sorted;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
