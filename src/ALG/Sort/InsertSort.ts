/*
 * @Author: laoqiren 
 * @Date: 2018-07-12 11:20:49 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-12 11:25:47
 */

class InsertSort<T> {
    private arr: T[];
    private length: number;
    constructor(sourceArr: T[]) {
        this.arr = [...sourceArr];
        this.length = this.arr.length;
    }
    sort(): T[] {
        const arr: T[] = this.arr;
        for(let i=0; i<this.length; i++) {
            let pIndex: number = i;
            while(arr[pIndex - 1] && arr[pIndex] < arr[pIndex - 1]) {
                [arr[pIndex], arr[pIndex - 1]] = [arr[pIndex - 1], arr[pIndex]];
                pIndex--;
            }
        }
        return this.arr;
    }
}

export default InsertSort;