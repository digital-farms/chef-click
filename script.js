let coinCount = 0;
let totalCoins = 0;
let autoClickerCount = 0;
let autoClickerPrice = 10;
let clickLevel = 1;
let upgradeClickPrice = 50;
let autoClickerLevel = 1;
let upgradeAutoClickerPrice = 100;
let level = 1;
let experience = 0;
let experienceToNextLevel = 100;

// Обновление отображаемых данных
function updateDisplay() {
    document.getElementById('coinCount').textContent = coinCount;
    document.getElementById('totalCoins').textContent = totalCoins;
    document.getElementById('autoClickerCount').textContent = autoClickerCount;
    document.getElementById('autoClickerPrice').textContent = autoClickerPrice;
    document.getElementById('clickLevel').textContent = clickLevel;
    document.getElementById('upgradeClickPrice').textContent = upgradeClickPrice;
    document.getElementById('autoClickerLevel').textContent = autoClickerLevel;
    document.getElementById('upgradeAutoClickerPrice').textContent = upgradeAutoClickerPrice;
    document.getElementById('level').textContent = level;
    document.getElementById('experience').textContent = experience;
    document.getElementById('experienceToNextLevel').textContent = experienceToNextLevel;
}

// Функция клика для заработка монет
document.getElementById('clickButton').addEventListener('click', () => {
    coinCount += clickLevel;
    totalCoins += clickLevel;
    experience += clickLevel;
    checkLevelUp();
    updateDisplay();
});

// Функция покупки авто-кликера
document.getElementById('autoClickerButton').addEventListener('click', () => {
    if (coinCount >= autoClickerPrice) {
        coinCount -= autoClickerPrice;
        autoClickerCount++;
        autoClickerPrice = Math.floor(autoClickerPrice * 1.5); // Увеличение цены авто-кликера
        updateDisplay();
    } else {
        alert('Недостаточно монет для покупки авто-кликера!');
    }
});

// Функция улучшения клика
document.getElementById('upgradeClickButton').addEventListener('click', () => {
    if (coinCount >= upgradeClickPrice) {
        coinCount -= upgradeClickPrice;
        clickLevel++;
        upgradeClickPrice = Math.floor(upgradeClickPrice * 2); // Увеличение цены улучшения клика
        updateDisplay();
    } else {
        alert('Недостаточно монет для улучшения клика!');
    }
});

// Функция улучшения авто-кликера
document.getElementById('upgradeAutoClickerButton').addEventListener('click', () => {
    if (coinCount >= upgradeAutoClickerPrice) {
        coinCount -= upgradeAutoClickerPrice;
        autoClickerLevel++;
        upgradeAutoClickerPrice = Math.floor(upgradeAutoClickerPrice * 2); // Увеличение цены улучшения авто-кликера
        updateDisplay();
    } else {
        alert('Недостаточно монет для улучшения авто-кликера!');
    }
});

// Авто-кликер
setInterval(() => {
    coinCount += autoClickerCount * autoClickerLevel;
    totalCoins += autoClickerCount * autoClickerLevel;
    experience += autoClickerCount * autoClickerLevel;
    checkLevelUp();
    updateDisplay();
}, 1000); // Каждую секунду добавляются монеты в зависимости от количества авто-кликеров

// Функция проверки уровня
function checkLevelUp() {
    while (experience >= experienceToNextLevel) {
        experience -= experienceToNextLevel;
        level++;
        experienceToNextLevel = Math.floor(experienceToNextLevel * 1.5); // Увеличение опыта для следующего уровня
    }
}

// Начальное обновление отображаемых данных
updateDisplay();
