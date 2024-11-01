async function buttonClicked() {
    const category = document.getElementById("category_input").value;
    const ingredient = document.getElementById("ingredient_input").value;

    try {
        // Fetch meals by category first
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();

        if (data.meals) {
            // Use Promise.all to fetch and filter asynchronously
            const filteredMeals = await Promise.all(
                data.meals.map(async (meal) => {
                    const hasIngredient = await checkIngredient(meal.idMeal, ingredient);
                    return hasIngredient ? meal : null;
                })
            );

            // Remove null values from filtered meals
            const validMeals = filteredMeals.filter(meal => meal !== null);

            if (validMeals.length > 0) {
                // Display all filtered meals
                showAllMeals(validMeals);
            } else {
                document.getElementById("demo1").innerHTML = "No meals found with the specified category and ingredient.";
                document.getElementById("results").innerHTML = ""; // Clear results
            }
        } else {
            document.getElementById("demo1").innerHTML = "Category not found.";
            document.getElementById("results").innerHTML = ""; // Clear results
        }
    } catch (error) {
        console.error("Error fetching meal data:", error);
    }
}

async function checkIngredient(mealID, ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        const data = await response.json();
        if (data.meals) {
            for (let i = 1; i <= 20; i++) {
                if (data.meals[0][`strIngredient${i}`]?.toLowerCase() === ingredient.toLowerCase()) {
                    return true;
                }
            }
        }
        return false;
    } catch (error) {
        console.error("Error fetching meal details:", error);
        return false;
    }
}

// Display meal images and names based on search
function showAllMeals(meals) {
    const resultContainer = document.getElementById("results");
    resultContainer.innerHTML = ""; // Clear previous results

    meals.forEach(meal => {
        // Create meal item card for image and title only
        const mealElement = document.createElement("div");
        mealElement.classList.add("meal-item");

        mealElement.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image" data-id="${meal.idMeal}">
            <h3 class="meal-title">${meal.strMeal}</h3>
        `;

        // Add click event on the image to load recipe details
        mealElement.querySelector(".meal-image").addEventListener("click", () => {
            displayMealDetails(meal.idMeal);
        });

        resultContainer.appendChild(mealElement);
    });
}

// Display detailed recipe card with ingredients, instructions, and video link
async function displayMealDetails(mealID) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        const data = await response.json();
        const mealDetail = data.meals[0];

        // Create detailed meal card
        const mealDetailContainer = document.createElement("div");
        mealDetailContainer.classList.add("meal-detail-card");

        mealDetailContainer.innerHTML = `
            <button class="close-button" onclick="closeMealDetails()">×</button>
            <h3>${mealDetail.strMeal}</h3>
            <img src="${mealDetail.strMealThumb}" alt="${mealDetail.strMeal}" class="meal-image-large">
            <p class="meal-category">Category: ${mealDetail.strCategory}</p>
            <h4>Ingredients:</h4>
            <ul class="ingredient-list">${getIngredientsList(mealDetail)}</ul>
            <h4>Instructions:</h4>
            <div class="meal-instructions">${formatInstructions(mealDetail.strInstructions)}</div>
            <a href="${mealDetail.strYoutube}" target="_blank" class="youtube-link">Watch Recipe Video</a>
        `;

        document.body.appendChild(mealDetailContainer); // Append card to body for modal effect
        document.body.style.overflow = 'hidden'; // Disable background scroll
    } catch (error) {
        console.error("Error fetching meal details:", error);
    }
}

// Close recipe details card
function closeMealDetails() {
    const mealDetailCard = document.querySelector(".meal-detail-card");
    if (mealDetailCard) {
        mealDetailCard.remove();
        document.body.style.overflow = 'auto'; // Re-enable background scroll
    }
}

function getIngredientsList(meal) {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}

function formatInstructions(instructions) {
    const steps = instructions.split(/(?:\. |\n|\r)/);
    let formattedInstructions = "<ol>";
    for (let step of steps) {
        if (step) formattedInstructions += `<li>${step}</li>`;
    }
    formattedInstructions += "</ol>";
    return formattedInstructions;
}
