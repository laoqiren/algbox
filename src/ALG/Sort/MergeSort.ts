/*
 * @Author: laoqiren 
 * @Date: 2018-07-12 09:56:26 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-12 10:49:23
 */

class MergeSort<T> {
    private arr: T[];
    private length: number;
    constructor(sourceArr: T[]) {
        this.arr = [...sourceArr];
        this.length = this.arr.length;
    }
    sort(): T[] {
        if(this.length <= 1) {
            return this.arr;
        }
        const partition: number = Math.floor(this.length / 2),
            leftArr: T[] = this.arr.slice(0, partition),
            rightArr: T[] = this.arr.slice(partition, this.length);
        
        const leftSorted: T[] = new MergeSort(leftArr).sort(),
            rightSorted: T[] = new MergeSort(rightArr).sort();

        return this.merge(leftSorted, rightSorted);
    }
    merge(leftArr: T[], rightArr: T[]): T[] {
        let result: T[] = [];
        while(leftArr.length && rightArr.length) {
            if(leftArr[0] <= rightArr[0]) {
                result.push(leftArr.shift());
            } else {
                result.push(rightArr.shift());
            }
        }
        if(leftArr.length) {
            result = result.concat(leftArr);
        }
        if(rightArr.length) {
            result = result.concat(rightArr);
        }
        return result;
    }
}

export default MergeSort;