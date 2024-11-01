const fs = require('fs');
const path = require('path');

// Get elements
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

// Define path to store files
let pathName = path.join(__dirname, 'Files');

// Ensure the directory exists
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName);
}

// Create file
btnCreate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err) {
        if (err) {
            return console.log(err);
        }
        alert(fileName.value + " was created");
        console.log("The file was created");
    });
});

// Read file
btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.readFile(file, function(err, data) {
        if (err) {
            return console.log(err);
        }
        fileContents.value = data;
        console.log("The file was read!");
    });
});

// Update file
btnUpdate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err) {
        if (err) {
            return console.log(err);
        }
        alert(fileName.value + " was updated");
        console.log("The file was updated");
    });
});

// Delete file
btnDelete.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.unlink(file, function(err) {
        if (err) {
            return console.log(err);
        }
        fileName.value = "";
        fileContents.value = "";
        alert(fileName.value + " was deleted");
        console.log("The file was deleted!");
    });
});