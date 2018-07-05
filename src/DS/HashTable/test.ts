import HashTable from './HashTable';

const table = new HashTable(30);

table.set('luoxia',21);
table.set('luoxia',22);

console.log(table.hash('luoxia'));
console.log(table.get('luoxia'));