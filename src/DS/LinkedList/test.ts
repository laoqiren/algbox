import LinkedList from './LinkedList';


let list = new LinkedList([]);

list.append("maria");

list.prepend("jack");
list.append("wow");

list.insert(2,"hello")

let foundNode = list.find(nodeValue=>nodeValue==='jack')

console.log(list.toArray());