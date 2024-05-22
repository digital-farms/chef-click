document.addEventListener('DOMContentLoaded', () => {
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

    const coinCountElement = document.getElementById('coinCount');
    const totalCoinsElement = document.getElementById('totalCoins');
    const autoClickerCountElement = document.getElementById('autoClickerCount');
    const autoClickerPriceElement = document.getElementById('autoClickerPrice');
    const clickLevelElement = document.getElementById('clickLevel');
    const upgradeClickPriceElement = document.getElementById('upgradeClickPrice');
    const autoClickerLevelElement = document.getElementById('autoClickerLevel');
    const upgradeAutoClickerPriceElement = document.getElementById('upgradeAutoClickerPrice');
    const levelElement = document.getElementById('level');
    const experienceElement = document.getElementById('experience');
    const experienceToNextLevelElement = document.getElementById('experienceToNextLevel');

    function updateDisplay() {
        coinCountElement.textContent = coinCount;
        totalCoinsElement.textContent = totalCoins;
        autoClickerCountElement.textContent = autoClickerCount;
        autoClickerPriceElement.textContent = autoClickerPrice;
        clickLevelElement.textContent = clickLevel;
        upgradeClickPriceElement.textContent = upgradeClickPrice;
        autoClickerLevelElement.textContent = autoClickerLevel;
        upgradeAutoClickerPriceElement.textContent = upgradeAutoClickerPrice;
        levelElement.textContent = level;
        experienceElement.textContent = experience;
        experienceToNextLevelElement.textContent = experienceToNextLevel;
    }

    document.getElementById('clickButton').addEventListener('click', () => {
        coinCount += clickLevel;
        totalCoins += clickLevel;
        experience += clickLevel;
        checkLevelUp();
        updateDisplay();
    });

    document.getElementById('autoClickerButton').addEventListener('click', () => {
        if (coinCount >= autoClickerPrice) {
            coinCount -= autoClickerPrice;
            autoClickerCount++;
            autoClickerPrice = Math.floor(autoClickerPrice * 1.5);
            updateDisplay();
        } else {
            alert('Недостаточно монет для покупки авто-кликера!');
        }
    });

    document.getElementById('upgradeClickButton').addEventListener('click', () => {
        if (coinCount >= upgradeClickPrice) {
            coinCount -= upgradeClickPrice;
            clickLevel++;
            upgradeClickPrice = Math.floor(upgradeClickPrice * 2);
            updateDisplay();
        } else {
            alert('Недостаточно монет для улучшения клика!');
        }
    });

    document.getElementById('upgradeAutoClickerButton').addEventListener('click', () => {
        if (coinCount >= upgradeAutoClickerPrice) {
            coinCount -= upgradeAutoClickerPrice;
            autoClickerLevel++;
            upgradeAutoClickerPrice = Math.floor(upgradeAutoClickerPrice * 2);
            updateDisplay();
        } else {
            alert('Недостаточно монет для улучшения авто-кликера!');
        }
    });

    setInterval(() => {
        coinCount += autoClickerCount * autoClickerLevel;
        totalCoins += autoClickerCount * autoClickerLevel;
        experience += autoClickerCount * autoClickerLevel;
        checkLevelUp();
        updateDisplay();
    }, 1000);

    function checkLevelUp() {
        while (experience >= experienceToNextLevel) {
            experience -= experienceToNextLevel;
            level++;
            experienceToNextLevel = Math.floor(experienceToNextLevel * 1.5);
        }
    }

    updateDisplay();
});
