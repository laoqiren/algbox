# Algbox

算法盒子，顾名思义，是一个有关算法的工具库，它的目的是为`JavaScript`社区提供强大的算法基础生态，包含了常用算法、数据结构的实现。

在线文档：[http://algbox.luoxia.me/](http://algbox.luoxia.me/)，文档分为四个部分：

* 数据结构类
* 传统算法类
* 机器学习算法类(基于[mlhelper](https://github.com/laoqiren/mlhelper))
* 使用`algbox`解决生产问题

## Install 安装

```
npm i algbox
```

## 按需引入

```js
const BSTree = require('algbox/lib/DS').BSTree;

const AdaBoost = require('mlhelper/lib/ML').AdaBoost;
```

## 开发

```
yarn dev
```

## 编译

```
yarn build
```

## 测试
```
yarn test
```

## 本地文档
```
yarn docz:dev
```
打开`localhost:3000`查看本地文档