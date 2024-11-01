function buttonClicked() {
    const category = document.getElementById("category_input").value;
    const ingredient = document.getElementById("ingredient_input").value;

    // Fetch meals by category first
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.meals) {
            // Filter meals by ingredient
            const filteredMeals = data.meals.filter(meal => {
                return checkIngredient(meal.idMeal, ingredient);
            });
            if (filteredMeals.length > 0) {
                // Display first filtered meal
                showMealDetails(filteredMeals[0].idMeal);
            } else {
                document.getElementById("demo1").innerHTML = "No meals found with the specified category and ingredient.";
                document.getElementById("mealImage").src = "";
            }
        } else {
            document.getElementById("demo1").innerHTML = "Category not found.";
            document.getElementById("mealImage").src = "";
        }
    })
    .catch(error => {
        console.error("Error fetching meal data:", error);
    });
}

function checkIngredient(mealID, ingredient) {
    // Fetch the full details of a meal and check if the ingredient is present
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(data => {
        for (let i = 1; i <= 20; i++) {
            if (data.meals[0][`strIngredient${i}`]?.toLowerCase() === ingredient.toLowerCase()) {
                return true;
            }
        }
        return false;
    });
}

function showMealDetails(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        document.getElementById("demo1").innerHTML = `Menu: ${meal.strMeal}`;
        document.getElementById("demo2").innerHTML = `Category: ${meal.strCategory}`;
        
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
        }
        document.getElementById("demo3").innerHTML = `<ul>${ingredientsList}</ul>`;

        const instructions = meal.strInstructions.split(/(?:\. |\n|\r)/);
        let formattedInstructions = "<ol>";
        for (let step of instructions) {
            if (step) formattedInstructions += `<li>${step}</li>`;
        }
        formattedInstructions += "</ol>";
        document.getElementById("demo4").innerHTML = formattedInstructions;

        document.getElementById("mealImage").src = meal.strMealThumb;
        document.getElementById("mealImage").alt = `Image of ${meal.strMeal}`;
    })
    .catch(error => console.error("Error fetching meal details:", error));
}









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
                // Display the first filtered meal
                showMealDetails(validMeals[0].idMeal);
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

function showMealDetails(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        document.getElementById("demo1").innerHTML = `Menu: ${meal.strMeal}`;
        document.getElementById("demo2").innerHTML = `Category: ${meal.strCategory}`;
        
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
        }
        document.getElementById("demo3").innerHTML = `<ul>${ingredientsList}</ul>`;

        const instructions = meal.strInstructions.split(/(?:\. |\n|\r)/);
        let formattedInstructions = "<ol>";
        for (let step of instructions) {
            if (step) formattedInstructions += `<li>${step}</li>`;
        }
        formattedInstructions += "</ol>";
        document.getElementById("demo4").innerHTML = formattedInstructions;

        document.getElementById("mealImage").src = meal.strMealThumb;
        document.getElementById("mealImage").alt = `Image of ${meal.strMeal}`;
    })
    .catch(error => console.error("Error fetching meal details:", error));
}
