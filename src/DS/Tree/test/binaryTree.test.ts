import BinaryTree from '../BinaryTree';
import { triggerAsyncId } from 'async_hooks';

let tree = new BinaryTree({
    value: 24,
    left: {
        value: 15,
        left: {
            value: 4
        },
        right: {
            value: 43
        }
    },
    right: {
        value: 27,
        left: {
            value: 87
        },
        right: {
            value: 43
        }
    }
});

console.log(tree.leftHeight(),tree.rightHeight(),tree.height());

console.log(tree.leftCount(),tree.rightCount(),tree.countNodes());

console.log(tree.isFull());

console.log([...tree.preOrder()]);
console.log([...tree.middleOrder()]);
console.log([...tree.postOrder()]);
console.log([...tree.levelOrder()]);

let reversed = tree.reverse();

console.log("反转后：");
console.log([...tree.preOrder()]);
console.log([...tree.middleOrder()]);
console.log([...tree.postOrder()]);
console.log([...tree.levelOrder()]);