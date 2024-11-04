const { contextBridge, ipcRenderer } = require('electron');

// Expose only specific functions to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    fetchMealData: async (url) => {
        const response = await fetch(url);
        return response.json();
    }
});
// preload.js
const fs = require('fs');
const path = require('path');
const { contextBridge } = require('electron');

const mealFilePath = path.join(__dirname, 'mealPlanner.json');

// Helper function to read/write data
function readData() {
    if (fs.existsSync(mealFilePath)) {
        return JSON.parse(fs.readFileSync(mealFilePath));
    }
    return [];
}

function writeData(data) {
    fs.writeFileSync(mealFilePath, JSON.stringify(data, null, 2));
}

// Exposing CRUD functions
contextBridge.exposeInMainWorld('mealPlannerAPI', {
    addMeal: (meal) => {
        const data = readData();
        data.push(meal);
        writeData(data);
    },
    getMeals: () => readData(),
    updateMeal: (index, updatedMeal) => {
        const data = readData();
        data[index] = updatedMeal;
        writeData(data);
    },
    deleteMeal: (index) => {
        const data = readData();
        data.splice(index, 1);
        writeData(data);
    },
});
