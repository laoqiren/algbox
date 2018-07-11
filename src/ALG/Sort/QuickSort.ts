/*
 * @Author: laoqiren 
 * @Date: 2018-07-11 14:29:58 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-11 17:04:45
 */

class QuickSort<T> {
    private arr: T[];
    private length: number;
    private cb: (a: T, b: T) => boolean;
    constructor(sourceArr: T[]) {
        this.arr = [...sourceArr];
        this.length = this.arr.length;
        this.cb = (a, b) => a > b;
    }
    sort(): T[] {
        if(this.length <= 1) {
            return this.arr;
        }

        const callback: (a: T, b: T) => boolean = this.cb;
        const lessArr: T[] = [],
            pivotArr: T[] = [],
            greaterArr: T[] = [];

        const pivo: T = this.arr[0];
        for(let item of this.arr) {
            if(item === pivo) {
                pivotArr.push(item);
            } else if(callback(item, pivo)) {
                greaterArr.push(item);
            } else {
                lessArr.push(item);
            }
        }
        
        return [...new QuickSort(lessArr).sort(), ...pivotArr, ...new QuickSort(greaterArr).sort()];
    }
    partitionInPlace(lowIndex: number, highIndex: number): number {
        if(lowIndex > highIndex) {
            return;
        }
        const pivot: T = this.arr[lowIndex];
        const arr: T[] = this.arr;

        let i: number = lowIndex,
            j: number = highIndex;
        
        while(i !== j) {
            while(arr[j] >= pivot && i < j) {
                j--;
            }
            while(arr[i] <= pivot && i < j) {
                i++;
            }
            
            if(i<j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[lowIndex], arr[i]] = [arr[i], arr[lowIndex]];
        return i;
    }
    sortInPlace(lowIndex: number = 0, highIndex: number = this.length - 1): T[] {
        const arr: T[] = this.arr;
        if(lowIndex < highIndex) {
            const partitionIndex = this.partitionInPlace(lowIndex, highIndex);
            this.sortInPlace(lowIndex, partitionIndex - 1);
            this.sortInPlace(partitionIndex + 1, highIndex);
        }
        return this.arr;
    }
}

export default QuickSort;