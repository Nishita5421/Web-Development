// const name=require('./utils.js')
// //const name='Nishita'
// console.log(name)


// const fs =require('fs')
// //fs.writeFileSync('notes.js')
 const get_notes=require('./notes.js')
 const chalk=require('chalk');
 console.log(get_notes())

// const validator=require('validator')

// console.log(validator.isEmail('example.com'))

console.log(chalk.green('This text is green in console'));
const command=process.argv[2]
console.log(process.argv)

if(command==='add')
{
    console.log('Adding note')
}
else if(command==='remove')
{
    console.log('Removing Note')
}