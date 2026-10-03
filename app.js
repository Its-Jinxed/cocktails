const ingredients = [
{
id: "vodka",
name: "Vodka"
},
{
id: "white-rum",
name: "White Rum"
},
{
id: "triple-sec",
name: "Triple Sec"
},
{
id: "peach-schnapps",
name: "Peach Schnapps"
},
{
id: "fresh-limes",
name: "Fresh Limes"
},
{
id: "fresh-mint",
name: "Fresh Mint"
},
{
id: "simple-syrup",
name: "Simple Syrup"
},
{
id: "ginger-beer",
name: "Ginger Beer"
},
{
id: "coca-cola",
name: "Coca-Cola"
},
{
id: "soda-water",
name: "Soda Water"
},
{
id: "orange-juice",
name: "Orange Juice"
},
{
id: "cranberry-juice",
name: "Cranberry Juice"
}

];


const cocktails = [
{
    name: "Sex on the Beach",

    ingredients: [
        "vodka",
        "peach-schnapps",
        "orange-juice",
        "cranberry-juice"
    ],

    recipe: [
        "1.5 oz vodka",
        "0.5 oz peach schnapps",
        "2 oz orange juice",
        "2 oz cranberry juice"
    ],

    method:
        "Fill a highball glass with ice. Add all ingredients and gently stir. Garnish with an orange slice."
},

{
    name: "Woo Woo",

    ingredients: [
        "vodka",
        "peach-schnapps",
        "cranberry-juice"
    ],

    recipe: [
        "2 oz vodka",
        "1 oz peach schnapps",
        "4 oz cranberry juice"
    ],

    method:
        "Add all ingredients to a shaker with ice. Shake for 10–15 seconds. Strain into a highball glass filled with ice. Garnish with a lime wedge."
},

{
    name: "Cosmopolitan",

    ingredients: [
        "vodka",
        "triple-sec",
        "fresh-limes",
        "cranberry-juice"
    ],

    recipe: [
        "2 oz vodka",
        "1 oz triple sec",
        "1 oz fresh lime juice",
        "1 oz cranberry juice"
    ],

    method:
        "Add all ingredients to a shaker with ice. Shake for 10–15 seconds. Strain into a Martini or coupe glass. Garnish with a lime wedge/wheel, or citrus peel twist."
},

{
    name: "Moscow Mule",

    ingredients: [
        "vodka",
        "fresh-limes",
        "ginger-beer"
    ],

    recipe: [
        "2 oz vodka",
        "0.5 oz fresh lime juice",
        "4 oz ginger beer",
        "Lime wedge"
    ],

    method:
        "Fill a short with ice (traditionally copper mug). Add vodka and fresh lime juice. Top with ginger beer and gently stir. Garnish with a lime wedge."
},

{
    name: "Screwdriver",

    ingredients: [
        "vodka",
        "orange-juice"
    ],

    recipe: [
        "2 oz vodka",
        "4 oz orange juice"
    ],

    method:
        "Fill a highball glass with ice. Add vodka and orange juice. Stir gently.Garnish with an orange slice."
},

{
    name: "Mojito",

    ingredients: [
        "white-rum",
        "fresh-limes",
        "simple-syrup",
        "fresh-mint",
        "soda-water"
    ],

    recipe: [
        "1.5 oz white rum",
        "0.75 oz fresh lime juice",
        "0.75 oz simple syrup",
        "5 mint leaves",
        "2–3 oz soda water"
    ],

    method:
        "Add mint and simple syrup to shaker and gently muddle. Add lime juice and rum. Fill with ice and shake. Start a highball glass with some soda water and fill with ice, then strain into the glass. Garnish with a mint sprig."
},

{
    name: "Daiquiri",

    ingredients: [
        "white-rum",
        "fresh-limes",
        "simple-syrup"
    ],

    recipe: [
        "2 oz white rum",
        "1 oz fresh lime juice",
        "0.75 oz simple syrup"
    ],

    method:
        "Simple syrup first in shaker. Add rum and lime juice with ice. Shake for 10–15 seconds. Strain into a chilled coupe or Martini glass. Garnish with lime twist/wheel/wedge."
},

{
    name: "Cuba Libre",

    ingredients: [
        "white-rum",
        "coca-cola",
        "fresh-limes"
    ],

    recipe: [
        "2 oz white rum",
        "0.5 oz fresh lime juice",
        "4 oz Coca-Cola",
        "Lime wedge"
    ],

    method:
        "Fill a glass with ice. Add rum and fresh lime juice. Top with Coca-Cola and gently stir. Garnish with a lime wedge."
}

];


const STORAGE_KEY = "cocktailIngredientAvailability";

let availability = loadAvailability();

function loadAvailability() {
const saved = localStorage.getItem(STORAGE_KEY);

if (saved) {
    return JSON.parse(saved);
}

const initialAvailability = {};

ingredients.forEach(ingredient => {
    initialAvailability[ingredient.id] = true;
});

return initialAvailability;

}

function saveAvailability() {
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(availability)
);
}

const ingredientsList = document.getElementById("ingredientsList");

function renderIngredients() {
ingredientsList.innerHTML = "";

ingredients.forEach(ingredient => {
    const label = document.createElement("label");
    label.className = "ingredient";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = availability[ingredient.id];

    const checkboxVisual = document.createElement("span");
    checkboxVisual.className = "checkbox";

    const name = document.createElement("span");
    name.className = "ingredient-name";
    name.textContent = ingredient.name;

    const status = document.createElement("span");
    status.className = "ingredient-status";
    status.textContent = checkbox.checked
        ? "Available"
        : "Out";

    checkbox.addEventListener("change", () => {
        availability[ingredient.id] = checkbox.checked;

        status.textContent = checkbox.checked
            ? "Available"
            : "Out";

        saveAvailability();
        renderCocktails();
        updateIngredientCount();
    });

    label.appendChild(checkbox);
    label.appendChild(checkboxVisual);
    label.appendChild(name);
    label.appendChild(status);

    ingredientsList.appendChild(label);
});

}

function getIngredientName(id) {
const ingredient = ingredients.find(
ingredient => ingredient.id === id
);

return ingredient ? ingredient.name : id;

}

function getMissingIngredients(cocktail) {
return cocktail.ingredients.filter(
ingredientId => !availability[ingredientId]
);
}

const cocktailsList = document.getElementById("cocktailsList");

function renderCocktails() {
cocktailsList.innerHTML = "";

const availableCocktails = cocktails.filter(
    cocktail => getMissingIngredients(cocktail).length === 0
);

const unavailableCocktails = cocktails.filter(
    cocktail => getMissingIngredients(cocktail).length > 0
);

availableCocktails.forEach(cocktail => {
    cocktailsList.appendChild(
        createCocktailCard(cocktail, true)
    );
});

unavailableCocktails.forEach(cocktail => {
    cocktailsList.appendChild(
        createCocktailCard(cocktail, false)
    );
});

updateCocktailCount(availableCocktails.length);

}

function createCocktailCard(cocktail, isAvailable) {
const card = document.createElement("div");

card.className = isAvailable
    ? "cocktail available"
    : "cocktail unavailable";

const header = document.createElement("div");
header.className = "cocktail-header";

const top = document.createElement("div");
top.className = "cocktail-top";

const name = document.createElement("div");
name.className = "cocktail-name";

name.textContent = cocktail.name;

const arrow = document.createElement("span");
arrow.className = "expand-icon";
arrow.textContent = "▼";

name.appendChild(arrow);

const status = document.createElement("div");
status.className = "cocktail-status";
status.textContent = isAvailable
    ? "AVAILABLE"
    : "UNAVAILABLE";

top.appendChild(name);
top.appendChild(status);

const ingredientText = document.createElement("div");
ingredientText.className = "cocktail-ingredients";

ingredientText.textContent = cocktail.ingredients
    .map(getIngredientName)
    .join(" · ");

header.appendChild(top);
header.appendChild(ingredientText);

if (!isAvailable) {
    const missing = getMissingIngredients(cocktail);

    const missingText = document.createElement("div");
    missingText.className = "missing";

    missingText.textContent =
        "Missing: " +
        missing.map(getIngredientName).join(", ");

    header.appendChild(missingText);
}

const recipe = document.createElement("div");
recipe.className = "recipe";

const recipeTitle = document.createElement("div");
recipeTitle.className = "recipe-title";
recipeTitle.textContent = "Recipe";

const recipeList = document.createElement("ul");
recipeList.className = "recipe-list";

cocktail.recipe.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    recipeList.appendChild(listItem);
});

const methodTitle = document.createElement("div");
methodTitle.className = "method-title";
methodTitle.textContent = "Method";

const method = document.createElement("div");
method.className = "method";
method.textContent = cocktail.method;

recipe.appendChild(recipeTitle);
recipe.appendChild(recipeList);
recipe.appendChild(methodTitle);
recipe.appendChild(method);

header.addEventListener("click", () => {
    card.classList.toggle("expanded");
});

card.appendChild(header);
card.appendChild(recipe);

return card;

}

const ingredientCount = document.getElementById("ingredientCount");
const cocktailCount = document.getElementById("cocktailCount");

function updateIngredientCount() {
const availableCount = ingredients.filter(
ingredient => availability[ingredient.id]
).length;

ingredientCount.textContent =
    `${availableCount} / ${ingredients.length} available`;

}

function updateCocktailCount(count) {
cocktailCount.textContent =
`${count} ${count === 1 ? "cocktail" : "cocktails"} available`;
}

const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", () => {
const confirmed = confirm(
"Reset all ingredients to available?"
);

if (!confirmed) {
    return;
}

ingredients.forEach(ingredient => {
    availability[ingredient.id] = true;
});

saveAvailability();
renderIngredients();
renderCocktails();
updateIngredientCount();

});

renderIngredients();
renderCocktails();
updateIngredientCount();
