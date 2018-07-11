import QuickSort from '../QuickSort';

const sourceArr = [6,9,5,8,0,-7,10,9];
const arr1 = new QuickSort(sourceArr);

console.log(arr1.sort());

const arr2 = new QuickSort(sourceArr);

console.log(arr2.partitionInPlace(0, sourceArr.length - 1));