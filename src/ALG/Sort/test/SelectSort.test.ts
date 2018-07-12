import SelectSort from '../SelectSort';

const sourceArr = [1,8,-5,3,6,2,8,9];

const arr = new SelectSort(sourceArr);

const result = arr.sort();

console.log(result);