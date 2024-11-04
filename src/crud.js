const fs = require('fs');
const path = require('path');

// Get elements
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var output = document.getElementById('output'); // Added to display the output

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
            output.textContent = "Error creating file: " + err;
            return console.log(err);
        }
        output.textContent = `File "${fileName.value}" was created with content:\n${contents}`;
        console.log("The file was created");
    });
});

// Read file
btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            output.textContent = "Error reading file: " + err;
            return console.log(err);
        }
        fileContents.value = data;
        output.textContent = `Your Grocery Item:"${fileName.value}" content:\n${data}`;
        console.log("The file was read!");
    });
});

// Update file
btnUpdate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err) {
        if (err) {
            output.textContent = "Error updating file: " + err;
            return console.log(err);
        }
        output.textContent = `Your Grocery Item:"${fileName.value}" was updated with content:\n${contents}`;
        console.log("The file was updated");
    });
});

// Delete file
btnDelete.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.unlink(file, function(err) {
        if (err) {
            output.textContent = "Error deleting file: " + err;
            return console.log(err);
        }
        fileName.value = "";
        fileContents.value = "";
        output.textContent = `File "${fileName.value}" was deleted`;
        console.log("The file was deleted!");
    });
});
