/*
 * @Author: laoqiren 
 * @Date: 2018-06-20 10:51:00 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-06-28 15:45:42
 * 
 * LinkedList class
 */

/**
 *
 * Linked List node structure
 * @interface ListNode
 */
export interface ListNode {
    value: any;
    next: null | ListNode;
    prev: null | ListNode;
}

/**
 * Iterator result interface
 *
 * @interface IterationResult
 */
interface IterationResult {
    value: any;
    done: boolean;
}

class LinkedList {
    private items: any[];
    private length: number;
    public head: ListNode | null;
    public tail: ListNode | null;
    private current: ListNode | null;
    
    constructor(defaultItems: any[] = []){
        this.items = [...defaultItems];
        this.length = 0;
        this.head = this.tail = null;
        
        // create a non-empty link list when default items has been given
        this.items.forEach(value=>{
            this.append(value);
        });
        this.current = this.head;
    }
    /**
     *
     * create the head node of the link list
     * @param {*} value
     * @returns {LinkedList}
     * @memberof LinkedList
     */
    createHead(value: any): LinkedList{
        this.head = this.tail = {
            value,
            next: null,
            prev: null
        };
        this.head.next = this.head.prev = this.tail;
        this.current = this.head;

        this.length++;
        return this;
    }
    append(value: any): LinkedList{
        // when link list is empty, create head node first
        if(!this.head){
            return this.createHead(value);
        }
        let newNode: ListNode = {
            value,
            next: this.head,
            prev: this.tail
        };

        this.tail.next = newNode;
        this.tail = newNode;
        this.head.prev = this.tail;
        this.length++;
        return this;
    }
    prepend(value: any): LinkedList{
        // when the link list is empty, just create a head node.
        if(!this.head){
            return this.createHead(value);
        }
        let newNode: ListNode = {
            value,
            next: this.head,
            prev: this.tail
        }
        this.head.prev = newNode;
        this.head = newNode;
        this.tail.next = this.head;
        this.length++;
        return this;
    }
    insert(pos: number, value: any): LinkedList {
        let pi: number = 0,
            pNode: ListNode = this.head;
        
        // when the link list is empty or the position to insert is larger than the list's length, just append a new node at the tail of the list.
        if(!pNode || pos > this.length - 1){
            return this.append(value);
        }
        // when the position to insert is 0, just prepend it.
        if(pos <= 0){
            return this.prepend(value);
        }
        
        // to find the place to insert
        while(pi < pos - 1){
            pNode = pNode.next;
            pi++;
        }
        
        let newNode: ListNode = {
            value,
            next: pNode.next,
            prev: pNode
        };
        pNode.next.prev = newNode;
        pNode.next = newNode;
        this.length++;
        
        return this;
    }
    
    /**
     * custom iterator of the link list
     *
     * @returns
     * @memberof LinkedList
     */
    [Symbol.iterator]() {
        return this;
    }
    next(): IterationResult {
        let current: ListNode = this.current;

        if(current){
            let value: any = current.value;
            this.current = current.next;
            return {
                value,
                done: false
            };
        }
        return {
            value: undefined,
            done: true
        };
    }

    /**
     *
     * iterator in the opposite direction
     * @returns {IterationResult}
     * @memberof LinkedList
     */
    prev(): IterationResult {
        let current: ListNode = this.current;
        if(current){
            let value: any = current.value;
            this.current = current.prev;
            return {
                value,
                done: false
            };
        }
        return {
            value: undefined,
            done: true
        };
    }
    delete(pos: number): any {
        let pi: number = 0,
            pNode: ListNode = this.head;
        
        if(pos <= 0){
            return this.deleteHead();
        }
        if(pos >= this.length - 1){
            return this.deleteTail();
        }

        // find the place to delete
        while(pi < pos - 1){
            pNode = pNode.next;
            pi++;
        }

        let deleted = pNode.next;

        // if the current pointer points to the deleted node, points to the prev node.
        if(this.current == pNode.next){
            this.current = pNode;
        }
        
        pNode.next.next.prev = pNode;
        pNode.next = pNode.next.next;
        this.length--;
        
        return deleted.value;
    }
    deleteHead(): any{
        if(!this.head) {
            return null;
        }
        let deleted: ListNode = this.head;

        if(this.length === 1){
            this.head = this.tail = this.current = null;
            this.length = 0;
            return deleted.value;
        }
        // if the current pointer ponits to the deleted head node, points to the next node.
        if(this.current == this.head){
            this.current == this.head.next;
        }
        this.head.next.prev = this.tail;
        this.tail.next = this.head.next;
        this.head = this.head.next;
        this.length--;
        return deleted.value;
    }
    deleteTail(): any {
        if(!this.head) {
            return null;
        }

        let deleted: ListNode = this.tail;

        if(this.length === 1){
            this.head = this.tail = this.current = null;
            this.length = 0;
            return deleted.value;
        }
        // if the current pointer ponits to the deleted tail node, points to the prev node.
        if(this.current == this.tail){
            this.current == this.tail.prev;
        }
        this.tail.prev.next = this.head;
        this.head.prev = this.tail.prev;
        this.tail = this.tail.prev;
        this.length--;
        return deleted.value;
    }
    find(cb: (nodeValue: any) => boolean): ListNode {
        if(this.length === 0) {
            return null;
        }
        let pNode: ListNode = this.head;
        if(cb(pNode.value)) {
            return pNode;
        }
        while(pNode != this.head){
            if(cb(pNode.value)) {
                return pNode;
            }
            pNode = pNode.next;
        }
        return null;
    }
    /**
     *
     * link another link list to the tail of current link list
     * @param {LinkedList} list
     * @returns {LinkedList}
     * @memberof LinkedList
     */
    link(list: LinkedList): LinkedList {
        // prevent to change another list.
        let copyLink: LinkedList = new LinkedList(list.toArray());

        copyLink.head.prev = this.tail;
        copyLink.tail.next = this.head;

        this.tail.next = copyLink.head;
        this.head.prev = copyLink.tail;

        this.tail = copyLink.tail;
        return this;
    }

    /**
     *
     * transfer the link list to an array
     * @param {boolean} [fromCurrent=false] whether to start at the current pointer
     * @returns {any[]}
     * @memberof LinkedList
     */
    toArray(fromCurrent: boolean = false): any[] {
        if(this.length === 0) {
            return [];
        }
        
        let boundary: ListNode = fromCurrent ? this.current : this.head,
            result = [],
            pNode: ListNode = boundary;
        result.push(pNode.value);
        pNode = pNode.next;
        
        // when the pointer comes to the boundary node, return the array
        while(pNode != boundary){
            result.push(pNode.value);
            pNode = pNode.next;
        }
        return result;
    }
    getLength(): number {
        return this.length;
    }
    getCurrent(): any {
        return this.current.value;
    }
    getHead(): any {
        return this.head.value;
    }
    getTail(): any {
        return this.tail.value;
    }
}


export default LinkedList;