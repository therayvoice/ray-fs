# ray-fs
A library with easy to use, mind blowing file-system tools for NodeJS. Based on FS! with chainable methods, sync first approach, and amazing UX.

# Installation
To install with NPM use:
```
npm i ray-fs --save
```

Then attach it to your file using:
```javascript
const fs = require('ray-fs');

// use code here
```

# Usage
The ray-fs library has the following methods and properties:
1. .value: To return the output of the previous method in the chain.

For example:-
```javascript
fs
  .lsDir() // gets the list of Directories
  .value // returns the list of Directories
```

2. .logVal(): To `console.log()` the output of the previous method in chain.
For example:-
```javascript
fs
  .lsFile() // gets the list of Files
  .logVal() // logs the list of Directories
```

3. .cd(dirName): To change the "working-directory" to `dirName`. A virtual version of shell's `cd`, it does not allow a movement to directories deeper then depth=1. 

4. .ls(): To get a list of all the Files in the "working-directory".

5. .exists(fileURL): To check if a FS item (like a File) exists at `fileURL`.

6. .isFile(fileURL): To check if `fileURL` is a File or not! (a Directory maybe)

7. .isDir(dirURL): To check if `dirURL` is a Direcotry or not!

8. .lsMatches(filterFunction): To get a list of all items in the "working-directory" that matches `filterFunction`.

```javascript
fs
  // To get a list of all items in the "working-directory" that have names ending in ".js"
  .lsMatches(item => /.js$/.test(item))
  .value // To return that list
```

Better written as:

```javascript
fs
  // To get a list of all Javascript Files in the "working-directory"
  .lsMatches(item => fs.isFile(item).value && /.js$/.test(item))
  .value // To return that list
```

9. .lsDir(): To get a list of all Directories in the "working-directory".

10. .lsFile(): To get a list of all Files in the "working-directory".

11. .version(): To get the current version of `ray-fs`.

12. .write(fileURL, content): To write the `content` into the file at `fileURL`.

13. .writeJSON(fileURL, json): To write the `json` into the file at `fileURL`.

14. .read(fileURL).value: To read the content of the file at `fileURL`. The path used must be relative from the root directory of your project, e.g. "./README.md".

15. .readJSON(fileURL).value: To read/import the JSON content of the file at `fileURL`.

16. .readArray(fileURL).value: To read/import the content of the file at `fileURL` as an Array of lines of content.

17. .push(fileURL, content): To add the `content` below the existing content of the file at `fileURL`.

18. .rm(url):  To delete the item at `url`.

19. .cp(url, destinationURL): To copy the item at `url` to `destinationURL`.

20. .mv(url, destinationURL): To move the item at `url` to `destinationURL`.

21. .mkdir(dirName): To create a new Directory named `dirName`.

22. .logDir(): To log the name of the "working-directory".

23. .validFileName(fileName): To check if a file name complies with the file naming rules. (beta version)

24. .validDirName(dirName): To check if a directory name complies with the naming rules. (beta version)

25. .stream(responseBody, filePath, errorCallback, sucessCallback): To pipe a `response.body` to a `filePath`.

Note: The documentation is incomplete, and will be completed soon.

## Chaining Functions
Chain functions to make code more readable!

```javascript
const fs = require('ray-fs');

fs
  .mkdir('myProject')
  .cd('myProject')
  .write('myFile.txt', 'Hello World!')
  .cp('myFile.txt', 'myGreeting.txt')
  .read('myFile.txt')
  .logVal()
  .read('myGreeting.txt')
  .logVal()

```
The .value prop and the .


## Tips
1. Absolute URL's aren't allowed, instead use .cd() to change the "working-directory" first!
2. Chain for the betterment of code, don't chain where it dosen't make sense.
3. This library is not meant to replace `fs`, it is meant to be an alternative way to write code that can also be written with `fs`. This library will allow you to write significaltly shorter and clearer code.

# Comming Soon
1. Async methods.
2. color logs.

