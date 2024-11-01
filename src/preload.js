// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

// Expose only specific functions to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    fetchMealData: async (url) => {
        const response = await fetch(url);
        return response.json();
    }
});
function editMeal(index) {
    const meals = window.api.loadMeals();
    const meal = meals[index];
    const newMealName = prompt('Edit meal name:', meal.name);
    const newMealDate = prompt('Edit meal date:', meal.date);

    if (newMealName && newMealDate) {
        meals[index] = { name: newMealName, date: newMealDate };
        window.api.saveMeals(meals);
        loadMeals();
    }
}

