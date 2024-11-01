let editingIndex = -1; // Keep track of the item being edited

// Load grocery items from localStorage and update the UI
function loadGroceryItems() {
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    const groceryList = document.getElementById('groceryList');
    groceryList.innerHTML = '';

    groceryItems.forEach((item, index) => {
        const itemElement = document.createElement('li');
        itemElement.classList.add('grocery-item');
        itemElement.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div>
                <button onclick="startEditGroceryItem(${index})">Edit</button>
                <button onclick="deleteGroceryItem(${index})">Delete</button>
            </div>
        `;
        groceryList.appendChild(itemElement);
    });
}

// Add or update a grocery item
function addGroceryItem() {
    const groceryItem = document.getElementById('groceryItem').value;
    const groceryQuantity = document.getElementById('groceryQuantity').value;

    if (groceryItem && groceryQuantity) {
        const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];

        if (editingIndex >= 0) {
            // Update existing item
            groceryItems[editingIndex] = { name: groceryItem, quantity: groceryQuantity };
            editingIndex = -1; // Reset editing index after updating
        } else {
            // Add new item
            groceryItems.push({ name: groceryItem, quantity: groceryQuantity });
        }

        localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
        loadGroceryItems();

        // Clear input fields
        document.getElementById('groceryItem').value = '';
        document.getElementById('groceryQuantity').value = '';
    } else {
        alert('Please enter both item name and quantity.');
    }
}

// Start editing a grocery item
function startEditGroceryItem(index) {
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    const item = groceryItems[index];

    document.getElementById('groceryItem').value = item.name;
    document.getElementById('groceryQuantity').value = item.quantity;
    editingIndex = index; // Set the item index for editing
}

// Delete a grocery item
function deleteGroceryItem(index) {
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    groceryItems.splice(index, 1); // Remove the item at the given index
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
    loadGroceryItems();
}

// Load items on page load
window.onload = loadGroceryItems;

const fs = require('fs');
const path = require('path');

function downloadGroceryList() {
    const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
    let fileContent = "Grocery List:\n\n";

    groceryItems.forEach(item => {
        fileContent += `Item: ${item.name}, Quantity: ${item.quantity}\n`;
    });

    // Define the target directory path (e.g., src/grocery list)
    const targetDir = path.join(__dirname, 'grocery list');

    // Ensure the directory exists or create it
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Define the file path
    const filePath = path.join(targetDir, 'groceryItems.txt');

    // Write the file to the specified path
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error saving file:', err);
        } else {
            console.log(`File saved to ${filePath}`);
            alert(`File saved to ${filePath}`);
        }
    });
}
