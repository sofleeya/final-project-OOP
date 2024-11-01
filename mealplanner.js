const fs = require('fs'); // Import the file system module
const path = require('path'); // Import path module

// Path for the meals.txt file under src/mealplanner
const mealsFilePath = path.join(__dirname, 'mealplanner', 'meals.txt');

// Load meals from localStorage and update the UI
function loadMeals() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    const mealList = document.getElementById('mealList');
    mealList.innerHTML = '';

    meals.forEach((meal, index) => {
        const mealItem = document.createElement('li');
        mealItem.classList.add('meal-item');
        mealItem.innerHTML = `
            <div>
                <h3>${meal.name} (${meal.time})</h3>
                <p>Date: ${meal.date}</p>
                <p>Calories Target: ${meal.calories}</p>
            </div>
            <div>
                <button onclick="editMeal(${index})">Edit</button>
                <button onclick="deleteMeal(${index})">Delete</button>
            </div>
        `;
        mealList.appendChild(mealItem);
    });
}

// Save meals to meals.txt file
function saveMealsToFile(meals) {
    fs.writeFileSync(mealsFilePath, JSON.stringify(meals, null, 2));
}

// Add a new meal to the meal planner
let editingIndex = -1; // Global variable to track the meal being edited

// Add a new meal or update an existing one
function addMeal() {
    const mealName = document.getElementById('mealName').value;
    const mealDate = document.getElementById('mealDate').value;
    const mealTime = document.getElementById('mealTime').value;
    const calorieTarget = document.getElementById('calorieTarget').value;

    if (mealName && mealDate && mealTime && calorieTarget) {
        const meals = JSON.parse(localStorage.getItem('meals')) || [];

        if (editingIndex >= 0) {
            // Update existing meal
            meals[editingIndex] = { name: mealName, date: mealDate, time: mealTime, calories: calorieTarget };
            editingIndex = -1; // Reset editing index after updating
        } else {
            // Add new meal
            meals.push({ name: mealName, date: mealDate, time: mealTime, calories: calorieTarget });
        }

        localStorage.setItem('meals', JSON.stringify(meals));
        saveMealsToFile(meals); // Save to file
        loadMeals();
        clearInputs();
    } else {
        alert('Please fill in all fields.');
    }
}

// Start editing a meal
function editMeal(index) {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    const meal = meals[index];

    // Populate input fields with existing meal details
    document.getElementById('mealName').value = meal.name;
    document.getElementById('mealDate').value = meal.date;
    document.getElementById('mealTime').value = meal.time;
    document.getElementById('calorieTarget').value = meal.calories;
    editingIndex = index; // Set the index for editing
}

// Clear input fields
function clearInputs() {
    document.getElementById('mealName').value = '';
    document.getElementById('mealDate').value = '';
    document.getElementById('mealTime').value = '';
    document.getElementById('calorieTarget').value = '';
    editingIndex = -1; // Reset editing index
}

// Load meals on page load
window.onload = loadMeals;


// Delete a meal from the meal planner
function deleteMeal(index) {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(meals));
    saveMealsToFile(meals); // Save to file
    loadMeals();
}

// Clear input fields
function clearInputs() {
    document.getElementById('mealName').value = '';
    document.getElementById('mealDate').value = '';
    document.getElementById('calorieTarget').value = '';
    document.getElementById('mealTime').value = ''; // Clear meal time input
}

// Download meal list as a text file
function downloadMeals() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    let fileContent = "Meal Planner:\n\n";

    meals.forEach(meal => {
        fileContent += `Meal: ${meal.name}, Time: ${meal.time}, Date: ${meal.date}, Calorie Target: ${meal.calories}\n`;
    });

    // Ensure the directory exists or create it
    if (!fs.existsSync(path.join(__dirname, 'mealplanner'))) {
        fs.mkdirSync(path.join(__dirname, 'mealplanner'), { recursive: true });
    }

    // Save the file
    fs.writeFile(mealsFilePath, fileContent, (err) => {
        if (err) {
            console.error('Error saving file:', err);
        } else {
            alert(`Meal list downloaded to ${mealsFilePath}`);
        }
    });
}

// Load meals on page load
window.onload = loadMeals;
