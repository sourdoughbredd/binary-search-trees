export { mergeSort };

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
