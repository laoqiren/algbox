import LinkedList from '../LinkedList/LinkedList';

class Deque {
    private list: LinkedList;
    constructor(defaultItems: any[] = []){
        this.list = new LinkedList(defaultItems);
    }
    push_back(value: any): Deque {
        this.list.append(value);
        return this;
    }
    push_front(value: any): Deque {
        this.list.prepend(value);
        return this;
    }
    pop_back(): any {
        return this.list.deleteTail();
    }
    pop_front(): any {
        return this.list.deleteHead();
    }
    size(): number {
        return this.list.getLength();
    }
    front(): any {
        return this.list.getHead();
    }
    back(): any {
        return this.list.getTail();
    }
    getLength(): number {
        return this.list.getLength();
    }
}

export default Deque;