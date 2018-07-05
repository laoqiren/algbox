/*
 * @Author: laoqiren 
 * @Date: 2018-06-28 16:11:46 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-04 20:09:04
 * 
 * Binary Tree Class
 */

import Deque from '../Deque/Deque';

export interface TreeNode {
    value: any;
    left?: TreeNode | null;
    right?: TreeNode | null;
    parent?: TreeNode | null;
}

export enum Relation {
    Equal,
    LeftChild,
    RightChild,
    Parent,
    Nothing
}

// the queue to implement the level of binary tree traversal
const queue = new Deque();

class BinaryTree implements TreeNode{
    public value: any;
    public left: BinaryTree;
    public right: BinaryTree;
    public parent: BinaryTree;
    constructor(node?: TreeNode) {
        this.value = this.left = this.right = null;
        if(node) {
            this.value = node.value;
            if(node.left) {
                this.left = new BinaryTree(node.left);
                this.left.parent = this;
            }
            if(node.right) {
                this.right = new BinaryTree(node.right);
                this.right.parent = this;
            }
        }
    }
    
    /**
     * calculate the tree's height recursively
     *
     * @returns {number}
     * @memberof BinaryTree
     */
    height(): number {
        return Math.max(this.leftHeight(),this.rightHeight());
    }
    leftHeight(): number {
        if(!this.left) {
            return 1;
        }
        return this.left.height() + 1;
    }
    rightHeight(): number {
        if(!this.right) {
            return 1;
        }
        return this.right.height() + 1;
    }
    leftCount(): number {
        if(!this.left) {
            return 1;
        }
        return this.left.countNodes() + 1;
    }
    rightCount(): number {
        if(!this.right) {
            return 1;
        }
        return this.right.countNodes() + 1;
    }

    /**
     *
     * calculate the count of tree's nodes recursively.
     * @returns {number}
     * @memberof BinaryTree
     */
    countNodes(): number {
        return this.leftCount() + this.rightCount() - 1;
    }

    /**
     *
     *
     * @returns {boolean} whether the tree is a complete full tree.
     * @memberof BinaryTree
     */
    isFull(): boolean {
        const height = this.height();
        const nodes = this.countNodes();

        if(nodes === Math.pow(2,height) - 1) {
            return true;
        }
        return false;
    }

    /**
     *
     * implement the preOrder of binary tree traversal recursively
     * @memberof BinaryTree
     */
    * preOrder() {
        yield this.value;
        if(this.left) {
            yield* this.left.preOrder();
        }
        if(this.right) {
            yield* this.right.preOrder();
        }
    }
    * middleOrder() {
        if(this.left) {
            yield* this.left.middleOrder();
        }
        yield this.value;
        if(this.right) {
            yield* this.right.middleOrder();
        }
    }
    * postOrder() {
        if(this.left) {
            yield * this.left.postOrder();
        }
        if(this.right) {
            yield * this.right.postOrder();
        }
        yield this.value;
    }

    /**
     * implement the level of binary tree traversal using queue.
     *  
     * @memberof BinaryTree
     */
    * levelOrder() {
        let queueHead = this;
        while(queueHead) {
            yield queueHead.value;

            queueHead.left && queue.push_back(queueHead.left);
            queueHead.right && queue.push_back(queueHead.right);
            
            queueHead = queue.pop_front();
        }
    }
    findDirectPre() {

    }
    reverse(): BinaryTree {
        let left = this.left,
            right = this.right;

        this.left = right ? right.reverse() : null;
        this.right = left ? left.reverse(): null;
        return this;
    }
    static relation(node1: TreeNode,node2: TreeNode): Relation {
        if(!(node1 && node2)) {
            return Relation.Nothing;
        }
        
        if(node1 === node2) {
            return Relation.Equal;
        }
        if(node1 === node2.left) {
            return Relation.LeftChild;
        }
        if(node1 === node2.right) {
            return Relation.RightChild;
        }
        if(node1 === node2.parent) {
            return Relation.Parent;
        }
        return Relation.Nothing;
    }
}

export default BinaryTree;