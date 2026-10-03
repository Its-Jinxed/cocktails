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
}
];

const cocktails = [
{
name: "Moscow Mule",

    ingredients: [
        "vodka",
        "fresh-limes",
        "ginger-beer"
    ],

    recipe: [
        "2 oz vodka",
        "½ oz fresh lime juice",
        "4–5 oz ginger beer",
        "Lime wedge"
    ],

    method:
        "Fill a glass with ice. Add vodka and fresh lime juice. Top with ginger beer and gently stir. Garnish with a lime wedge."
},

{
    name: "Cosmopolitan",

    ingredients: [
        "vodka",
        "triple-sec",
        "cranberry-juice",
        "fresh-limes"
    ],

    recipe: [
        "1½ oz vodka",
        "¾ oz triple sec",
        "1 oz cranberry juice",
        "½ oz fresh lime juice"
    ],

    method:
        "Add all ingredients to a shaker with ice. Shake for 10–15 seconds. Strain into a chilled Martini or coupe glass."
},

{
    name: "Sex on the Beach",

    ingredients: [
        "vodka",
        "peach-schnapps",
        "orange-juice",
        "cranberry-juice"
    ],

    recipe: [
        "1½ oz vodka",
        "¾ oz peach schnapps",
        "1½ oz orange juice",
        "1½ oz cranberry juice"
    ],

    method:
        "Fill a glass with ice. Add all ingredients and gently stir. Garnish with an orange slice if desired."
},

{
    name: "Screwdriver",

    ingredients: [
        "vodka",
        "orange-juice"
    ],

    recipe: [
        "2 oz vodka",
        "4–5 oz orange juice"
    ],

    method:
        "Fill a glass with ice. Add vodka and orange juice. Stir gently and garnish with an orange slice if desired."
},

{
    name: "Woo Woo",

    ingredients: [
        "vodka",
        "peach-schnapps",
        "cranberry-juice",
        "fresh-limes"
    ],

    recipe: [
        "1½ oz vodka",
        "¾ oz peach schnapps",
        "1½ oz cranberry juice",
        "½ oz fresh lime juice"
    ],

    method:
        "Add all ingredients to a shaker with ice. Shake for 10–15 seconds. Strain over fresh ice."
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
        "¾ oz simple syrup"
    ],

    method:
        "Add all ingredients to a shaker with ice. Shake for 10–15 seconds. Strain into a chilled coupe or Martini glass."
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
        "½ oz fresh lime juice",
        "4–5 oz Coca-Cola",
        "Lime wedge"
    ],

    method:
        "Fill a glass with ice. Add rum and fresh lime juice. Top with Coca-Cola and gently stir. Garnish with a lime wedge."
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
        "2 oz white rum",
        "¾ oz fresh lime juice",
        "¾ oz simple syrup",
        "8–10 mint leaves",
        "2½–3 oz soda water"
    ],

    method:
        "Add mint and simple syrup to a glass and gently muddle. Add lime juice and rum. Fill with crushed ice and stir. Top with soda water, gently stir again, and garnish with mint and lime."
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
