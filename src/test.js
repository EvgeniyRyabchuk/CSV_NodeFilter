

import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

let i = 0; 

function a() {
    setTimeout(() => {
        console.log("========");
        console.log(i);
        i = 1; 
        console.log(i);
        console.log("========"); 
    }, 1000); 
}

a(); 


const rl = readline.createInterface({ input, output });

rl.question('What is your name? ', (name)=>{
    rl.setPrompt(`${name} How old are you? `);
    rl.prompt(); 

    rl.on('line', (age) => { 
        console.log(i);
        if(age<18)
        {
            console.log(`${name.trim()} because you are ${age} years old, you cannot procees`); 
            rl.close(); 
        }
        else
        {
            console.log(`${name.trim()} is great because you are ${age} years old, you can enjoy our services`);		
            rl.close();
        }
    })
})









// var RL = readline.createInterface(process.stdin, process.stdout);
// RL.question('What is your name? ', (name)=>{
//     RL.setPrompt(`${name} How old are you? `);
//     RL.prompt();
//     RL.on('line', (age)=>{
//         if(age<18)
//         {
//             util.log(`${name.trim()} because you are ${age} years old, you cannot procees`);
//             RL.close();
//         }
//         else
//         {
//             util.log(`${name.trim()} is great because you are ${age} years old, you can enjoy our services`);		
//             RL.close();
//         }
//     })
// });