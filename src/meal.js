function buttonClicked() {
    const menu = document.getElementById("menu_input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${menu}`)
        .then((response) => response.json())
        .then((data) => {
            const meal = data.meals[0];

            // Display meal image
            document.getElementById("meal-image").src = meal.strMealThumb;

            // Display meal name, category, and area
            document.getElementById("demo1").innerHTML = `Menu: ${meal.strMeal}`;
            document.getElementById("demo2").innerHTML = `Category: ${meal.strCategory}`;
            document.getElementById("demo3").innerHTML = `Area: ${meal.strArea}`;

            // Display category description
            // Assuming "Category description" refers to an optional field in the API data.
            const categoryDescription = meal.strTags ? `Description: ${meal.strCategoryDescription}` : "No description available.";
            document.getElementById("demo5").innerHTML = categoryDescription;

            // Generate ingredients list with measurements
            let ingredientsList = "<ul>";
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && measure) {
                    ingredientsList += `<li>${measure} ${ingredient}</li>`;
                }
            }
            ingredientsList += "</ul>";
            document.getElementById("demo6").innerHTML = ingredientsList;

            // Format and display instructions as an ordered list
            const steps = meal.strInstructions.split(/(?:\. |\n|\r)/);
            let formattedInstructions = "<ol>";
            steps.forEach(step => {
                if (step) formattedInstructions += `<li>${step}</li>`;
            });
            formattedInstructions += "</ol>";
            document.getElementById("demo7").innerHTML = formattedInstructions;

            // Display YouTube link
            const youtubeLink = meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>` : "No video available.";
            document.getElementById("demo8").innerHTML = youtubeLink;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            alert("Meal not found. Please try another search.");
        });
}
