let mealPlans = [];

function addMealPlan(meal) {
    mealPlans.push(meal);
    displayMealPlans();
}

function updateMealPlan(index, updatedMeal) {
    mealPlans[index] = updatedMeal;
    displayMealPlans();
}

function deleteMealPlan(index) {
    mealPlans.splice(index, 1);
    displayMealPlans();
}

function displayMealPlans() {
    const plannerContainer = document.getElementById('planner-container');
    plannerContainer.innerHTML = '';
    mealPlans.forEach((meal, index) => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-plan-item';
        mealDiv.innerHTML = `
            <h3>${meal.name}</h3>
            <button onclick="editMealPlan(${index})">Edit</button>
            <button onclick="deleteMealPlan(${index})">Delete</button>
        `;
        plannerContainer.appendChild(mealDiv);
    });
}
