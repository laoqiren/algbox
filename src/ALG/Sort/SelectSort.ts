/*
 * @Author: laoqiren 
 * @Date: 2018-07-12 10:55:55 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-12 11:05:46
 */

class SelectSort<T> {
    private arr: T[];
    private length: number;
    constructor(sourceArr: T[]) {
        this.arr = [...sourceArr];
        this.length = this.arr.length;
    }
    sort(): T[] {
        const arr: T[] = this.arr;
        for(let i= 0; i< this.length - 1; i++) {
            let minIndex = i;
            for(let j= i + 1; j< this.length; j++) {
                if(arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if(minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            }
        }
        return this.arr;
    }
}

export default SelectSort;