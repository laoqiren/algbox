import BSTree from '../BSTree';

const obj = {
    value: 9,
    left: {
        value: 3,
        left: {
            value: 1
        },
        right: {
            value: 6,
            left: {
                value: 4
            },
            right: {
                value: 8,
                left: {
                    value: 7
                }
            }
        }
    },
    right: {
        value: 10,
        right: {
            value: 14,
            left: {
                value: 13
            }
        }
    }
};

console.log("是否二叉查找树:",BSTree.isBSTree(obj));

let tree = new BSTree(obj);

tree.remove(13);

console.log([...tree.middleOrder()]);

/*
console.log("最大",BSTree.maximum(obj))
console.log("最小",BSTree.minimum(obj))
console.log([...tree.middleOrder()])
let searchResult = tree.search(14);

console.log(searchResult);

let insertResult = tree.insert(9);

console.log(insertResult);

console.log("是否二叉查找树:",BSTree.isBSTree({
    value: 8,
    left: {
        value: 3,
        left: {
            value: 1
        },
        right: {
            value: 6,
            left: {
                value: 4
            },
            right: {
                value: 7
            }
        }
    },
    right: {
        value: 10,
        right: {
            value: 14,
            left: {
                value: 13
            }
        }
    }
}));

*/