export { Node };

const Node = function (data = null, left = null, right = null) {
  return {
    data,
    left,
    right,
    isLeaf() {
      return this.left === null && this.right === null;
    },
  };
};
