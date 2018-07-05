import Deque from './Deque';


const queue = new Deque([5,7,9]);

queue.push_back(66);

console.log(queue.pop_front());