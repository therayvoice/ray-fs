const fs = require('fs');
const path = require('path');

const rayFSVersion = "2.1.7";
const rayFSAuthors = "Ray Voice and Anna Voice";

/* Follow the Developers @RayShortHead @AnnaShortHead */
/*
 * Debugging Tips:
 * 1. An Errer stating something like "output must me sting" may mean that you
 * have forget to add .value after a method.
 * 2. Use Classes or lambda functions to clean up this code
 * */

/*
 * More features Comming Soon:
 * 1. .cpALL()
 * 2. .mvAll()
 * 3. .readAsArray() // reads each line as a seperate item of an Array
 * 4. .readTextAsJSON() // same as #3, but converts each line into a JSON Object prop
 * 5. forceCopy() // to overwrite if a file already exists at destinationURL
 * 6. etc.
 * */

module.exports = {
  value: 0,
  dirInAction: '.',
  log: function() {
    console.log("ray-fs:", arguments);
    return this;
  },
  logVal: function() {
    this.log(this.value);
    return this;
  },
  logDir: function() {
    this.log(this.dirInAction);
    return this;
  },
  version: function() {
    this.value = `Version: ${rayFSVersion} developed by ${rayFSAuthors}`;
    return this;
  },
  cd: function(dir) {
    console.log(`attempt to change at ${dir} from ${this.dirInAction} and ${path.dirname(dir)}`)
    //const newDirName = this.relPath(dir).value;
    // check this function again, it needs to virtually navigate to other directories
    const newDirName = path.join(this.dirInAction,dir);
    if (this.exists(newDirName).value && this.isDir(newDirName).value) {
      this.dirInAction = newDirName;//this.relPath(this.joinPath(dir).value).value;
      this.log(`Changed directory to ${dir}`);
    } else {
      this.log("No Such File or Directory!");
    }
    return this;
  },
  relPath: function(file) {
    this.value = this.joinPath(`${this.dirInAction}/${file}`).value;
    return this;
  },
  write: function(file, content) {
    fs.writeFileSync(this.relPath(file).value, content);
    return this;
  },
  writeJSON: function(file, json) {
    this.write(file, JSON.stringify(json, null, 2));
    return this;
  },
  read: function(file) {
    //this.value = fs.readFileSync(this.relPath(file).value, 'utf8'); // investigate a removal of this.relpath, the philosophy of ray-net promotes the rule-of-thumb that file paths should be resolved in the shallowest modules
    this.value = fs.readFileSync(file, 'utf8');
    return this;
  },
  readJSON: function(file) {
    this.value = JSON.parse(this.read(file).value); //added .value
    return this;
  },
  readArray: function(file) {
    this.value = this.read(file).value.split('\n');
    return this;
  },
  push: function(file, content) {
    fs.appendFileSync(this.relPath(file).value, content);
    return this;
  },
  rm: function(url) {
    const urlToRemove = this.relPath(url).value;
    if (this.exists(urlToRemove).value) {
      if (this.isFile(url).value) fs.unlinkSync(this.relPath(url).value, ()=>{});
      else if (this.isDir(url).value) fs.rmdir(this.relPath(url).value, ()=>{});
    } else {
      this.log(`The ${url} does not exist!`);
    }
    return this;
  },
  cp: function(url, destination) {
    const urlToCopy = this.relPath(url).value;
    const destinationURL = this.relPath(destination).value;
    if (!this.exists(urlToCopy).value) {
      this.log(`The ${url} does not exist!`);
    } else if (this.exists(destinationURL).value) {
      this.log(`The ${destinationURL} already exists!`);
    } else {
      fs.copyFileSync(this.relPath(url).value, this.relPath(destination).value);
    }
    return this;
  },
  mv: function(url, destination) {
      this.cp(url, destination);
      this.rm(url);
    return this;
  },
  joinPath: function(url) {
    // use the rest/spread operateor after testing to take in multiple args
    this.value = path.join(url);
    return this;
  },
  exists: function(file) {
    //this.value = fs.existsSync(this.relPath(file).value); // test it again, it is the reason cp is not working for highter directories
    this.value = fs.existsSync(file);
    return this;
  },
  mkdir: function(dirName) {
    const dirToCreate = this.relPath(dirName).value;
    if (this.exists(dirToCreate).value) {
      this.log(`The directory ${dirName} already exists!`);
    } else {
      fs.mkdirSync(dirToCreate);
    }
    return this;
  },
  isFile: function(item) {
    this.value = fs.lstatSync(this.relPath(item).value).isFile();
    return this;
  },
  isDir: function(item) {
    this.value = fs.lstatSync(this.relPath(item).value).isDirectory();
    return this;
  },
  ls: function() {
    this.value = fs.readdirSync(this.dirInAction);
    return this;
  },
  lsMatches: function(matchingFilter) {
    const matchedList = this
	                  .ls(this.dirInAction)
	                  .value
	                  .filter(matchingFilter);
    this.value = matchedList;
    return this;
  }, 
  lsFile: function() {
    const filesList = this
		        .lsMatches(item => this
				             .isFile(item)
				             .value)
		        .value;
    this.value = filesList;
    return this;
  },
  lsDir: function() {
    const dirList = this
		        .lsMatches(item => this
				             .isDir(item)
				             .value)
		        .value;
    this.value = dirList;
    return this;
  },
  validFileName: function(fileName) {
    //this method is not fully dependable, i'll use a lookahead to modify it later
    const validFileNameRegex = /\w\.[a-zA-Z0-9]+$/;
    this.value = validFileNameRegex.test(fileName);
    return this;
  },
  validDirName: function(dirName) {
    //this method is not fully dependable
    const validDirNameRegex = /\w+/;
    this.value = validDirNameRegex.test(dirName);
    return this;
  },
  stream: function(responseBody, filePath, errorCallback, sucessCallback) { // old name, new body
    // To avoid Anachronisms each file is stored as a temp, when completed is renamed to the mainFile
    const tempPath = `${filePath}.tmp`;
    const fileStream = fs.createWriteStream(tempPath);
    responseBody.pipe(fileStream);
    responseBody.on("error", ()=>{
      console.log("Error: Stream Faild!");
      if (errorCallback !== undefined) errorCallback();	
      this.rm(tempPath);   
    });
    fileStream.on("finish", ()=>{
      console.log("Stream Sucessful!");
      if (sucessCallback !== undefined) sucessCallback();
      this.mv(tempPath, filePath); 
    });
    return this;
  },
  streamAsync: function(responseBody, filePath, errorCallback, sucessCallback) { // New with old `stream` body
    // It is possible for the file stream to be incomplete after signal is lost,
    // To avoid Anachronisms like this make sure to delete the file in the error callback
    const fileStream = fs.createWriteStream(filePath);
    responseBody.pipe(fileStream);
    responseBody.on("error", ()=>{
      console.log("Error: Stream Faild!");
      if (errorCallback !== undefined) errorCallback();	
    });
    fileStream.on("finish", ()=>{
      console.log("Stream Sucessful!");
      if (sucessCallback !== undefined) sucessCallback();
    });
    return this;
  },
  initDir: function (dir) {
    if (!this.exists(dir).value) this.mkdir(dir);
    else console.log(`ray-fs log: A directory named ${dir} already Exists!`);
    return this;
  },
  initDirs: function (...dirs) {
    dirs.forEach(dir => {
      this.initDir(dir);
    });
    return this;
  },
  initFile: function (file, content) {
    if (typeof(content) === "object") {
      if (!this.exists(file).value) this.writeJSON(file, content);
    } else if (typeof(content) === "string"){
      if (!this.exists(file).value) this.write(file, content);
    } else {
      console.log("ray-fs error: content nither object nor string!");
    }
    return this;
  }
}

