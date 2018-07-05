import LinkedList from '../LinkedList/LinkedList';

class Stack {
    private list: LinkedList;
    constructor(defaultItems: any[] = []) {
        this.list = new LinkedList(defaultItems);
    }
    push(value: any): Stack {
        this.list.append(value);
        return this;
    }
    pop(): Stack {
        this.list.deleteTail();
        return this;
    }
    size(): number {
        return this.list.getLength();
    }
}

export default Stack;