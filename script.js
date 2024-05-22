let ingredientCount = 0;
let dishCount = 0;

document.getElementById('ingredientButton').addEventListener('click', () => {
    ingredientCount++;
    document.getElementById('ingredientCount').textContent = ingredientCount;
});

document.getElementById('cookButton').addEventListener('click', () => {
    if (ingredientCount >= 10) {
        ingredientCount -= 10;
        dishCount++;
        document.getElementById('ingredientCount').textContent = ingredientCount;
        document.getElementById('dishCount').textContent = dishCount;
    } else {
        alert('Недостаточно ингредиентов!');
    }
});
