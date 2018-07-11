import BubbleSort from '../BubbleSort';

const arr = new BubbleSort([1,8,0,2,6,7,3,6], true);

const result = arr.sort();
console.log(result);

const arr2 = new BubbleSort([
    {
        name: 'luoxia',
        year: 21,
        score: 99
    },{
        name: 'jack',
        year: 23,
        score: 91
    },{
        name: 'Maria',
        year: 20,
        score: 99
    },{
        name: 'Nike',
        year: 22,
        score: 100
    },{
        name: 'Mike',
        year: 22,
        score: 99
    }
]);

const r1 = arr2.sort((a, b) => {
    return a.score < b.score;
})
console.log(r1);

const r2 = arr2.sortBy(['score','year'])
console.log(r2);
