const categorySearchBtn = document.getElementById('category-search-btn');
const mealCategoryList = document.getElementById('meal-category');
const mealCategoryDetailsContent = document.querySelector('.meal-details-content');
const categoryRecipeCloseBtn = document.getElementById('category-recipe-close-btn');

// Event listeners
categorySearchBtn.addEventListener('click', getMealCategories);
mealCategoryList.addEventListener('click', getCategoryRecipe);
categoryRecipeCloseBtn.addEventListener('click', () => {
  mealCategoryDetailsContent.parentElement.classList.remove('showRecipe');
});

// Fetch meal list by category
function getMealCategories() {
  let categoryInput = document.getElementById('category-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryInput}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
              </div>
            </div>
          `;
        });
        mealCategoryList.classList.remove('notFound');
      } else {
        html = "No meals found for this category!";
        mealCategoryList.classList.add('notFound');
      }
      mealCategoryList.innerHTML = html;
    });
}

// Fetch recipe details
function getCategoryRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

// Display recipe details in modal
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
  `;
  mealCategoryDetailsContent.innerHTML = html;
  mealCategoryDetailsContent.parentElement.classList.add('showRecipe');
}