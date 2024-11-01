const mealDbApiUrl = "https://www.themealdb.com/api/json/v1/1";
const recipeContainer = document.getElementById("recipe-container");

// Fetch random meals from TheMealDB API
async function fetchRandomMeals() {
    const response = await fetch(`${mealDbApiUrl}/search.php?s`);
    const data = await response.json();
    return data.meals ? shuffleArray(data.meals).slice(0, 15) : []; // Return up to 15 meals
}

// Shuffle the array to get random meals
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetch and display random recipes on page load
async function fetchAndDisplayRandomRecipes() {
    const meals = await fetchRandomMeals();
    displayRecipes(meals);
}

// Display recipes in attractive cards
function displayRecipes(meals) {
    recipeContainer.innerHTML = ""; // Clear previous recipes
    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="showRecipeDetails(${meal.idMeal})">
            <h3>${meal.strMeal}</h3>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
        `;
        recipeContainer.appendChild(card);
    });
}

// Show detailed recipe information
async function showRecipeDetails(mealId) {
    try {
        const response = await fetch(`${mealDbApiUrl}/lookup.php?i=${mealId}`);
        const data = await response.json();
        const meal = data.meals[0];
        displayRecipeDetails(meal);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
}

// Function to display recipe details in a modal or new section
function displayRecipeDetails(meal) {
    const detailsContainer = document.createElement("div");
    detailsContainer.className = "recipe-details";
    detailsContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Category: ${meal.strCategory}</h3>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${getIngredientsList(meal).join('')}
        </ul>
        <button onclick="closeDetails()">Close</button>
    `;
    document.body.appendChild(detailsContainer);
}

// Helper function to generate a list of ingredients
function getIngredientsList(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`);
        }
    }
    return ingredients;
}

// Close the recipe details
function closeDetails() {
    const detailsContainer = document.querySelector(".recipe-details");
    if (detailsContainer) {
        detailsContainer.remove();
    }
}

// Initialize page with random recipes
window.onload = fetchAndDisplayRandomRecipes;
