const obj = require('./en.json');
const naturalSort = require('natural-sort');
let arr = [];
let output = {};
for(let i in obj) {
  arr.push(i);
}
const sorted = arr.sort(naturalSort());
arr.map(function(str) {
  output[str] = obj[str];
})
console.log(output);