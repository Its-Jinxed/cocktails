```javascript
// ==========================================
// INGREDIENTS
// ==========================================

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


// ==========================================
// COCKTAILS
// ==========================================

const cocktails = [
    {
        name: "Moscow Mule",
        ingredients: [
            "vodka",
            "fresh-limes",
            "ginger-beer"
        ]
    },

    {
        name: "Cosmopolitan",
        ingredients: [
            "vodka",
            "triple-sec",
            "cranberry-juice",
            "fresh-limes"
        ]
    },

    {
        name: "Sex on the Beach",
        ingredients: [
            "vodka",
            "peach-schnapps",
            "orange-juice",
            "cranberry-juice"
        ]
    },

    {
        name: "Screwdriver",
        ingredients: [
            "vodka",
            "orange-juice"
        ]
    },

    {
        name: "Woo Woo",
        ingredients: [
            "vodka",
            "peach-schnapps",
            "cranberry-juice",
            "fresh-limes"
        ]
    },

    {
        name: "Daiquiri",
        ingredients: [
            "white-rum",
            "fresh-limes",
            "simple-syrup"
        ]
    },

    {
        name: "Cuba Libre",
        ingredients: [
            "white-rum",
            "coca-cola",
            "fresh-limes"
        ]
    },

    {
        name: "Mojito",
        ingredients: [
            "white-rum",
            "fresh-limes",
            "simple-syrup",
            "fresh-mint",
            "soda-water"
        ]
    }
];


// ==========================================
// SAVED AVAILABILITY
// ==========================================

const STORAGE_KEY = "cocktailIngredientAvailability";

let availability = loadAvailability();

function loadAvailability() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        return JSON.parse(saved);
    }

    // First time opening the app:
    // everything is available.
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


// ==========================================
// INGREDIENTS UI
// ==========================================

const ingredientsList = document.getElementById("ingredientsList");

function renderIngredients() {
    ingredientsList.innerHTML = "";

    ingredients.forEach(ingredient => {
        const label = document.createElement("label");
        label.className = "ingredient";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = availability[ingredient.id];

        checkbox.addEventListener("change", () => {
            availability[ingredient.id] = checkbox.checked;

            saveAvailability();
            renderCocktails();
            updateIngredientCount();
        });

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
            status.textContent = checkbox.checked
                ? "Available"
                : "Out";
        });

        label.appendChild(checkbox);
        label.appendChild(checkboxVisual);
        label.appendChild(name);
        label.appendChild(status);

        ingredientsList.appendChild(label);
    });
}


// ==========================================
// COCKTAIL UI
// ==========================================

const cocktailsList = document.getElementById("cocktailsList");

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

function renderCocktails() {
    cocktailsList.innerHTML = "";

    const availableCocktails = cocktails.filter(
        cocktail => getMissingIngredients(cocktail).length === 0
    );

    const unavailableCocktails = cocktails.filter(
        cocktail => getMissingIngredients(cocktail).length > 0
    );

    // Available cocktails first
    availableCocktails.forEach(cocktail => {
        cocktailsList.appendChild(
            createCocktailCard(cocktail, true)
        );
    });

    // Then unavailable cocktails
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

    const top = document.createElement("div");
    top.className = "cocktail-top";

    const name = document.createElement("div");
    name.className = "cocktail-name";
    name.textContent = cocktail.name;

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

    card.appendChild(top);
    card.appendChild(ingredientText);

    if (!isAvailable) {
        const missing = getMissingIngredients(cocktail);

        const missingText = document.createElement("div");
        missingText.className = "missing";

        missingText.textContent =
            "Missing: " +
            missing.map(getIngredientName).join(", ");

        card.appendChild(missingText);
    }

    return card;
}


// ==========================================
// COUNTERS
// ==========================================

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


// ==========================================
// RESET
// ==========================================

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


// ==========================================
// START APP
// ==========================================

renderIngredients();
renderCocktails();
updateIngredientCount();
```
