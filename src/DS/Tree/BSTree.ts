/*
 * @Author: laoqiren 
 * @Date: 2018-07-02 20:24:44 
 * @Last Modified by: laoqiren
 * @Last Modified time: 2018-07-05 19:16:29
 */

import BinaryTree, { TreeNode, Relation } from './BinaryTree';

class BSTree extends BinaryTree {
    public value: number;
    public left: BSTree;
    public right: BSTree;
    public parent: BSTree;
    constructor(node?: TreeNode) {
        super(node);
        this.value = this.left = this.right = null;
        if(node && BSTree.isBSTree(node)) {
            this.value = node.value;
            if(node.left) {
                this.left = new BSTree(node.left);
                this.left.parent = this;
            }
            if(node.right) {
                this.right = new BSTree(node.right);
                this.right.parent = this;
            }
        }
    }
    search(value: number): TreeNode {
        const currentValue: number = this.value;

        if(value === currentValue) {
            return this;
        }
        if(value < currentValue && this.left) {
            return this.left.search(value);
        }
        if(value > currentValue && this.right) {
            return this.right.search(value);
        }
        
        return null;
    }
    insert(value: number): boolean {
        const currentValue: number = this.value;
        if(!currentValue) {
            this.value = value;
            return true;
        }
        if(currentValue === value) {
            return false;
        }
        if(value < currentValue) {
            if(this.left) {
                return this.left.insert(value);
            }
            this.left = new BSTree({
                value
            });
            return true;
        }
        if(value > currentValue) {
            if(this.right) {
                return this.right.insert(value);
            }
            this.right = new BSTree({
                value
            });
            return true;
        }
        return false;
    }
    remove(value: number): boolean {
        const currentValue: number = this.value;
        
        if(value === currentValue) {
            BSTree.removeNode(this);
            return true;
        }
        if(value < currentValue) {
            return this.left ? this.left.remove(value) : false;
        }
        return this.right ? this.right.remove(value) : false;
    }
    static removeNode(node: BSTree) {
        const relation: Relation = BinaryTree.relation(node, node.parent);

        // if the node is a leaf node, just delete it and change its parent's child point.
        if(!node.left && !node.right) {
            if(relation === Relation.LeftChild) {
                node.parent.left = null;
            } else if(relation === Relation.RightChild) {
                node.parent.right = null;
            } else {
                // if the node is the root node, just delete it.
                node.value = null;
            }
            return;
        }

        // if the node has just one child
        if(!(node.left && node.right)) {
            const onlyChild = node.left || node.right;
            if(relation === Relation.LeftChild) {
                node.parent.left = onlyChild;
                onlyChild.parent = node.parent;
            } else if(relation === Relation.RightChild) {
                node.parent.right = onlyChild;
                onlyChild.parent = node.parent;
            } else {
                // if the node is the root node, replace it with it's child.
                node.value = onlyChild.value;
                node.left = onlyChild.left;
                node.right = onlyChild.right;
                onlyChild.left && (onlyChild.left.parent = node);
                onlyChild.right && (onlyChild.right.parent = node);
            }
            return;
        }
        
        // if the node has both left child and right child
        let predecessor: TreeNode = BSTree.tree_predecessor(node);
        node.value = predecessor.value;
        if(predecessor.parent !== node) {
            predecessor.parent.right = predecessor.left;
        } else {
            predecessor.parent.left = predecessor.left;
        }

    }
    
    /**
     *
     * Find the direct precursor of the specified node
     * @static
     * @param {BSTree} node
     * @returns {TreeNode}
     * @memberof BSTree
     */
    static tree_predecessor(node: BSTree): TreeNode {
        if(node.left) {
            return node.left.maximumNode();
        }
        
        let pNode: TreeNode = node.parent,
            pThis: TreeNode = node;

        while(pNode && pThis === pNode.left) {
            pThis = pNode;
            pNode = pNode.parent;
        }
        return pNode;
    }

    /**
     *
     * Lookup direct successor of a specified node
     * @static
     * @param {BSTree} node
     * @returns {TreeNode}
     * @memberof BSTree
     */
    static tree_successor(node: BSTree): TreeNode {
        if(node.left) {
            return node.right.minimumNode();
        }
        
        let pNode: TreeNode = node.parent,
            pThis: TreeNode = node;

        while(pNode && pThis === pNode.right) {
            pThis = pNode;
            pNode = pNode.parent;
        }
        return pNode;
    }
    maximumNode(): TreeNode {
        let result: TreeNode = this,
            pNode: TreeNode = this;

        while(pNode.right) {
            result = pNode.right;
            pNode = pNode.right;
        }
        return result;
    }
    minimumNode(): TreeNode {
        let result: TreeNode = this,
            pNode: TreeNode = this;

        while(pNode.left) {
            result = pNode.left;
            pNode = pNode.left;
        }
        return result;
    }
    static maximum(node: TreeNode): number {
        let compares: number[] = [node.value];
        
        if(node.left) {
            compares.push(BSTree.maximum(node.left));
        }
        if(node.right) {
            compares.push(BSTree.maximum(node.right));
        }
        return Math.max(...compares);
    }
    static minimum(node: TreeNode): number {
        let compares: number[] = [node.value];
        
        if(node.left) {
            compares.push(BSTree.minimum(node.left));
        }
        if(node.right) {
            compares.push(BSTree.minimum(node.right));
        }
        return Math.min(...compares);
    }
    static isBSTree(node: TreeNode): boolean {
        if(!node) {
            return true;
        }
        
        if(node.left && node.value < BSTree.maximum(node.left)) {
            return false;
        }
        if(node.right && node.value > BSTree.minimum(node.right)) {
            return false;
        }
        
        return BSTree.isBSTree(node.left) && BSTree.isBSTree(node.right);
    }
}


export default BSTree;