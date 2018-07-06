import React from 'react';
import { BSTree } from '../../lib/DS/Tree';

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
export default class BSTree_Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: JSON.stringify(obj),
            isBSTree: false,
            preOrder: [],
            middleOrder: [],
            postOrder: [],
            levelOrder: []
        }
    }
    componentDidMount() {
        this.sayTree();
    }
    sayTree() {
        const obj = JSON.parse(this.state.value);
        const isBSTree = BSTree.isBSTree(obj);

        const tree = new BSTree(obj);
        
        this.setState({
            isBSTree,
            preOrder: [...tree.preOrder()],
            middleOrder: [...tree.middleOrder()],
            postOrder: [...tree.postOrder()],
            levelOrder: [...tree.levelOrder()]
        });
    }
    render() {
        return (
            <div>
                <textarea placeholder="请输入一个树状结构的js对象" value={this.state.value} onChange={e=>this.setState({value: e.target.value})} rows={20} cols={40}>
                </textarea>
                <button onClick={()=>this.sayTree()}>修改完成</button>
                是否为二叉查找树：{this.state.isBSTree ? '是' : '不是'}
                {
                    this.state.isBSTree && <div>
                        先序遍历：
                        {
                            this.state.preOrder.map(item=><span>{item},</span>)
                        }
                        中序遍历:
                        {
                            this.state.middleOrder.map(item=><span>{item},</span>)
                        }
                        后序遍历:
                        {
                            this.state.postOrder.map(item=><span>{item},</span>)
                        }
                        层次遍历:
                        {
                            this.state.levelOrder.map(item=><span>{item},</span>)
                        }
                    </div>
                }
            </div>
        )
    }
}