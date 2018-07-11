/*
 * @Author: laoqiren 
 * @Date: 2018-07-11 09:53:01 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-11 14:58:47
 */

class BubbleSort<T> {
    private cb: (a: T, b: T) => boolean;
    private arr: T[];
    private length: number;
    private desc: boolean;
    constructor(sourceArr: T[], desc: boolean = false) {
        this.arr = [...sourceArr];
        this.length = this.arr.length;
        this.desc = desc;
        this.cb = desc ? (a, b) => a < b : (a, b) => a > b;
    }
    sort(cb?: (a: T, b: T) => boolean): T[] {
        const callback: (a: T, b: T) => boolean = cb ? cb : this.cb;
        const arr: T[] = this.arr;
        let swapped: boolean = false;
        
        for(let i=1; i< this.length; i++) {
            swapped = false;
            for(let j=0; j< this.length - i; j++) {
                if(callback(arr[j], arr[j+1])) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    swapped = true;
                }
            }
            if(!swapped) {
                return arr;
            }
        }
        return arr;
    }
    sortBy(keys: string[]): T[] {
        const arr: T[] = this.arr;
        const callback = this.desc ? (a, b) => a < b : (a, b) => a > b;
        let swapped: boolean = false;
        
        for(let i=1; i< this.length; i++) {
            swapped = false;
            for(let j=0; j< this.length - i; j++) {
                const aObj: T = arr[j],
                    bObj: T = arr[j+1];
                let a = aObj[keys[0]],
                    b = bObj[keys[1]];

                for(let key of keys) {
                    if(aObj[key] !== bObj[key]) {
                        a = aObj[key];
                        b = bObj[key];
                        break;
                    }
                }
                
                if(callback(a, b)) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    swapped = true;
                }
            }
            if(!swapped) {
                return arr;
            }
        }
        return arr;
    }
}

export default BubbleSort;