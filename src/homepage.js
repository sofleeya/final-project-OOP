// Display meal details in a dedicated section
function buttonClicked() {
    const mealCategory = document.getElementById("menu_input").value;

    if (mealCategory) {
        fetchMealsByCategory(mealCategory); // Implement a function for fetching by category
    } else {
        alert("Please enter a meal category to search.");
    }
}

document.addEventListener("DOMContentLoaded", fetchRandomMeals);

async function fetchRandomMeals() {
    const mealContainer = document.getElementById("random-meals");
    mealContainer.innerHTML = ''; // Clear previous content

    for (let i = 0; i < 20; i++) {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const data = await response.json();
            const meal = data.meals[0];
            displayMeal(meal, mealContainer);
        } catch (error) {
            console.error("Error fetching random meal:", error);
        }
    }
}

// // Display each meal in a card with a button to show recipe details
// function displayMeal(meal, container) {
//     const mealCard = document.createElement("div");
//     mealCard.classList.add("meal-card");

//     mealCard.innerHTML = `
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
//         <h2>${meal.strMeal}</h2>
//         <p>${meal.strCategory} - ${meal.strArea}</p>
//         <button class="recipe-btn" onclick="showMealDetails(${meal.idMeal})">Get Recipe</button>
//     `;

//     container.appendChild(mealCard);
// }



// Fetch meal details by meal ID and display them in the dedicated section
async function showMealDetails(mealId) {
    const mealDetailsContainer = document.getElementById("meal-details");
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        const meal = data.meals[0];

        mealDetailsContainer.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image-large">
            <h2>${meal.strMeal}</h2>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <h3>Ingredients:</h3>
            <ul>${getIngredientsList(meal)}</ul>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
            <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
        `;
    } catch (error) {
        console.error("Error fetching meal details:", error);
    }
}

// Helper function to get ingredients and measurements as a list
function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}

// Display each meal in a card with a button to show recipe details
function displayMeal(meal, container) {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");

    mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strCategory} - ${meal.strArea}</p>
        <button class="recipe-btn" onclick="showMealDetails(${meal.idMeal})">Get Recipe</button>
    `;

    container.appendChild(mealCard);
}

// Fetch meal details by meal ID and display them in the modal
async function showMealDetails(mealId) {
    const modalDetailsContainer = document.getElementById("modalDetails");
    const modal = document.getElementById("mealModal");

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        const meal = data.meals[0];

        modalDetailsContainer.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image-large">
            <h2>${meal.strMeal}</h2>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <h3>Ingredients:</h3>
            <ul>${getIngredientsList(meal)}</ul>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
            <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>
        `;

        // Show the modal
        modal.style.display = "block";
    } catch (error) {
        console.error("Error fetching meal details:", error);
    }
}

// Close modal function
function closeModal() {
    document.getElementById("mealModal").style.display = "none";
}

// Helper function to get ingredients and measurements as a list
function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}

