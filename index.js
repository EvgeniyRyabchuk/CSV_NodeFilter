



const csv = require('csv-parser'); 
const path = require('path'); 
const fs = require('fs')
const util = require('util')
const directoryPath = path.resolve(__dirname, 'data') 
const lStat = util.promisify(fs.lstat);
const csvHanler = require("./src/csvHandle") 



csvHanler.handle(process.cwd(), {
    city: [
        "Белгород", 
        
    ]
}); 

console.log("Hello world!"); 

// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });


// fs.createReadStream('data/othercities-73519000065-79106652331.csv')
//   .pipe(csv())
//   .on('data', (data) => data.address_city == "Белгород" && results.push(data)) 
//   .on('end', () => {
//     console.log(results);
//     // [
//     //   { NAME: 'Daffy Duck', AGE: '24' }, 
//     //   { NAME: 'Bugs Bunny', AGE: '22' } 
//     // ]
//   });