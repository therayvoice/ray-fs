const fs = require('fs');
const path = require('path');

const rayFSVersion = "1.0.0";
const rayFSAuthors = "Ray Voice and Anna Voice";

module.exports = {
  value: 0,
  dirInAction: '.',
  log: function(text) {
    console.log("ray-fs:", text);
    return this;
  },
  logVal: function() {
    this.log(this.value);
    return this;
  },
  version: function() {
    this.value = `Version: ${rayFSVersion} developed by ${rayFSAuthors}`;
    return this;
  },
  cd: function(dir) {
    this.dirInAction = path.join(dir);
    this.log(`Changed directory to ${dir}`);
    return this;
  },
  write: function(file, content) {
    fs.writeFileSync(file, content);
    return this;
  },
  writeJSON: function(file, json) {
    this.write(file, JSON.stringify(json, null, 2));
    return this;
  },
  read: function(file) {
    this.value = fs.readFileSync(file, 'utf8');
    return this;
  },
  readJSON: function(file) {
    this.value = JSON.parse(this.read(file));
  },
  push: function(file, content) {
    fs.appendFileSync(file, content);
    return this;
  },
  rm: function(file) {
    fs.rmSync(file);
    return this;
  },
  cp: function(file, destination) {
    fs.copyFileSync(file, destination);
    return this;
  },
  exists: function(file) {
    this.value = fs.existsSync(file);
    return true;
  },
  mkdir: function(file) {
    fs.mkdirSync(file);
    return this;
  },
  exists: function(item) {
    this.value = fs.existsSync(item);
    return this;
  },
  isFile: function(item) {
    this.value = fs.lstatSync(item).isFile();
    return this;
  },
  isDir: function(item) {
    this.value = fs.lstatSync(item).isDirectory();
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
  }
}

