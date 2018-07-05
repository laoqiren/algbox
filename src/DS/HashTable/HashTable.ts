/*
 * @Author: laoqiren 
 * @Date: 2018-06-28 15:34:37 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-06-28 20:41:54
 * 
 * hash table class
 */

import LinkedList, { ListNode } from '../LinkedList/LinkedList';

class HashTable {
    private tableSize: number;
    private table: LinkedList[];
    private keys: object;
    constructor(tableSize: number = 32){
        this.tableSize = tableSize;
        this.table = new Array(tableSize).fill(null).map(()=>new LinkedList());
        this.keys = {};
    }
    hash(key: string): number {
        // calculate the code of the key
        let code: number = Array.from(key).reduce((accum,ch)=>{
            return accum + ch.charCodeAt(0);
        }, 0);

        // Residue remainder method to calculate hash value.
        return code % this.tableSize;
    }
    set(key: string, value: any): HashTable {
        const hash: number = this.hash(key);

        this.keys[key] = hash;

        // use LinkedList to solve hash conflicts
        const list: LinkedList = this.table[hash];
        const foundNode: ListNode = list.find(value => value.key === key);

        // if find the key exists, just change the value of it.
        if(foundNode) {
            foundNode.value.value = value;
            return this;
        }

        list.append({
            key,
            value
        });
        return this;
    }
    get(key: string): any {
        const hash = this.keys[key];
        if(!hash) {
            return undefined;
        }
        const list = this.table[hash];
        const foundNode = list.find(value => value.key === key);

        return foundNode.value.value;
    }
    has(key: string): boolean {
        return key in this.keys;
    }
    getKeys(): string [] {
        return Object.keys(this.keys);
    }
}

export default HashTable;