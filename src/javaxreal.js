function buttonClicked() {   
    const menu = document.getElementById("menu_input").value;
    
    // Ensure URL is inside backticks
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${menu}`)
    .then((response) => response.json())
    .then((data) => {
        if (!data.meals) {
            document.getElementById("demo1").innerHTML = "No meal found.";
            return;
        }

        const meal = data.meals[0];
        const name = meal.strMeal;
        const category = meal.strCategory;
        const instructions = meal.strInstructions;
        const imageUrl = meal.strMealThumb;

        // Display meal name, category, and image
        document.getElementById("demo1").innerHTML = `Menu: ${name}`;
        document.getElementById("demo2").innerHTML = `Category: ${category}`;
        document.getElementById("meal-image").src = imageUrl;
        document.getElementById("meal-image").style.display = "block"; // Ensure image is visible
        
        // Generate ingredients list
        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
        }
        document.getElementById("demo3").innerHTML = `<ul>${ingredientsList}</ul>`;
        
        // Format instructions as a list of steps
        const steps = instructions.split(/(?:\. |\n|\r)/);
        let formattedInstructions = "<ol>";
        steps.forEach(step => {
            if (step.trim()) {
                formattedInstructions += `<li>${step}</li>`;
            }
        });
        formattedInstructions += "</ol>";
        document.getElementById("demo4").innerHTML = formattedInstructions;
    })
    .catch((error) => {
        console.error("Error fetching meal data:", error);
        document.getElementById("demo1").innerHTML = "Error fetching meal data.";
    });
}
