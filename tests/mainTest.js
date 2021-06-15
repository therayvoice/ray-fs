const fs = require('../ray-fs.js');

fs
  .version() // logs the version of ray-fs
  .logVal()
  .cd('.') // changes working-directory to '.' or any other directory
  .ls() // sets .value to a list of items in the working-directory
  .logVal()
  .exists('tests/') // check fs item exists or not, sets .value to true or false
  .logVal()
  .exists('rounds/') 
  .logVal()
  .isFile('README.md') // check fs item File or not, sets .value to true or false
  .logVal()
  .isFile('tests/')
  .logVal()
  .isDir('README.md') // check fs item Directory or not, sets .value to true of false
  .logVal()
  .isDir('tests/')
  .logVal()
  .lsMatches(item=> /.js$/.test(item)) // lists all fs items that match the regex
  .logVal()
  .lsFile() // lists all file items
  .logVal()
  .lsDir() // lists all directory items
  .logVal()
  