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
                document.getElementById("mealImage").src = "";
            }
        } else {
            document.getElementById("demo1").innerHTML = "Category not found.";
            document.getElementById("mealImage").src = "";
        }
    } catch (error) {
        console.error("Error fetching meal data:", error);
    }
}

async function checkIngredient(mealID, ingredient) {
    // Fetch the full details of a meal and check if the ingredient is present
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

function showAllMeals(meals) {
    const resultContainer = document.getElementById("results");
    resultContainer.innerHTML = ""; // Clear previous results

    meals.forEach(meal => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
        .then(response => response.json())
        .then(data => {
            const mealDetail = data.meals[0];
            const mealElement = document.createElement("div");
            mealElement.classList.add("meal-item");

            mealElement.innerHTML = `
                <h3>${mealDetail.strMeal}</h3>
                <p>Category: ${mealDetail.strCategory}</p>
                <img src="${mealDetail.strMealThumb}" alt="Image of ${mealDetail.strMeal}" width="150px">
                <h4>Ingredients:</h4>
                <ul>${getIngredientsList(mealDetail)}</ul>
                <h4>Instructions:</h4>
                ${formatInstructions(mealDetail.strInstructions)}
            `;

            resultContainer.appendChild(mealElement);
        })
        .catch(error => console.error("Error fetching meal details:", error));
    });
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
