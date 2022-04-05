const csv = require('csv-parser'); 
const path = require('path'); 
const fs = require('fs')
const util = require('util')
const Checker = require('./Checker'); 
const lStat = util.promisify(fs.lstat);

async function maxSize(curDir, files) {
    let res; 
    let maxFile = {
        file: null, 
        size: null
    }; 

    for(let i of files) {
        const stats = await lStat(path.resolve(curDir, i)); 
        const size = stats.size; 
        if(size > maxFile.size) {
            maxFile.file = i;
            maxFile.size = size;  
        }
    }

    return maxFile; 
}





function handle(rootPath, filterArgs) {

    const directoryPath = path.resolve(rootPath, 'data'); 

    fs.readdir(directoryPath, async function (err, files) { 
        if (err) {
            return console.log('Unable to scan directory: ' + err); 
        } 

       const biggestFile = await maxSize(path.resolve(rootPath, "data"), files); 
  
        files.forEach(function (file, index, array) { 
            // filtered data 
            const results = [];
            // only files 
            let stats = fs.statSync(path.resolve(rootPath, "data", file));                 
            if(!stats.isFile()) return; 

            fs.createReadStream(path.resolve(rootPath, 'data', file))
            .pipe(csv())
            .on('data', (data) => {
                if(new Checker(data, filterArgs).checkAll()) 
                    results.push(data); 
                }) 
            .on('end', async () => { 
                // create folder output if not exist 
                const outputPath = path.resolve(rootPath, 'output'); 
                
                if (!fs.existsSync(outputPath)) { 
                    fs.mkdirSync(outputPath);
                }
                
                // save each filtered table as separated json file  
                let json = JSON.stringify(results); 
                fs.writeFileSync(path.resolve(outputPath, `result${index+1}.json`), json); 
                
                // create united filtered file of results 
                // if(array.length - 1 == index) {
                    if(biggestFile.file == file) { 
                        fs.readdir(outputPath, async function (err, files) { 
                            
                            files = files.filter((e) => {
                                let stats = fs.statSync(path.resolve(outputPath, e)); 
                                return stats.isFile(); 
                            }); 
    
                            console.log(files);
    
                            let arr = []; 
                            for(let file of files) {
                                const filePath = path.resolve(outputPath, file); 
                                const stats = await lStat(filePath); 
                                console.log(filePath, stats.size); 
                        
                                if(stats.isFile(filePath)) {
                                    const data =  fs.readFileSync(filePath); 
                                    let item = JSON.parse(data); 
                                    arr.push(item); 
                                }
                            }
                            
                            const bundlePath = path.resolve(outputPath, 'bundle'); 
                            // create folder bundle if not exist 
                            if (!fs.existsSync(bundlePath)) {
                                fs.mkdirSync(bundlePath); 
                            } 
                            fs.writeFileSync(path.resolve(bundlePath, `bundle.json`), JSON.stringify(arr));  
                        })
                    }
                
            });
        
        })

    })
    
}

module.exports = {
    handle
};