document.addEventListener('DOMContentLoaded', () => {
    let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
    let totalCoins = parseInt(localStorage.getItem('totalCoins')) || 0;
    let autoClickerCount = parseInt(localStorage.getItem('autoClickerCount')) || 0;
    let autoClickerPrice = parseInt(localStorage.getItem('autoClickerPrice')) || 10;
    let clickLevel = parseInt(localStorage.getItem('clickLevel')) || 1;
    let upgradeClickPrice = parseInt(localStorage.getItem('upgradeClickPrice')) || 50;
    let autoClickerLevel = parseInt(localStorage.getItem('autoClickerLevel')) || 1;
    let upgradeAutoClickerPrice = parseInt(localStorage.getItem('upgradeAutoClickerPrice')) || 100;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let experience = parseInt(localStorage.getItem('experience')) || 0;
    let experienceToNextLevel = parseInt(localStorage.getItem('experienceToNextLevel')) || 100;

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

    function saveProgress() {
        localStorage.setItem('coinCount', coinCount);
        localStorage.setItem('totalCoins', totalCoins);
        localStorage.setItem('autoClickerCount', autoClickerCount);
        localStorage.setItem('autoClickerPrice', autoClickerPrice);
        localStorage.setItem('clickLevel', clickLevel);
        localStorage.setItem('upgradeClickPrice', upgradeClickPrice);
        localStorage.setItem('autoClickerLevel', autoClickerLevel);
        localStorage.setItem('upgradeAutoClickerPrice', upgradeAutoClickerPrice);
        localStorage.setItem('level', level);
        localStorage.setItem('experience', experience);
        localStorage.setItem('experienceToNextLevel', experienceToNextLevel);
    }

    function checkLevelUp() {
        while (experience >= experienceToNextLevel) {
            experience -= experienceToNextLevel;
            level++;
            experienceToNextLevel = Math.floor(experienceToNextLevel * 1.5);
        }
    }

    document.getElementById('clickButton').addEventListener('click', (e) => {
        e.preventDefault();
        coinCount += clickLevel;
        totalCoins += clickLevel;
        experience += clickLevel;
        checkLevelUp();
        updateDisplay();
        saveProgress();
    });

    document.getElementById('autoClickerButton').addEventListener('click', (e) => {
        e.preventDefault();
        if (coinCount >= autoClickerPrice) {
            coinCount -= autoClickerPrice;
            autoClickerCount++;
            autoClickerPrice = Math.floor(autoClickerPrice * 1.5);
            updateDisplay();
            saveProgress();
        } else {
            alert('Недостаточно монет для покупки авто-кликера!');
        }
    });

    document.getElementById('upgradeClickButton').addEventListener('click', (e) => {
        e.preventDefault();
        if (coinCount >= upgradeClickPrice) {
            coinCount -= upgradeClickPrice;
            clickLevel++;
            upgradeClickPrice = Math.floor(upgradeClickPrice * 2);
            updateDisplay();
            saveProgress();
        } else {
            alert('Недостаточно монет для улучшения клика!');
        }
    });

    document.getElementById('upgradeAutoClickerButton').addEventListener('click', (e) => {
        e.preventDefault();
        if (coinCount >= upgradeAutoClickerPrice) {
            coinCount -= upgradeAutoClickerPrice;
            autoClickerLevel++;
            upgradeAutoClickerPrice = Math.floor(upgradeAutoClickerPrice * 2);
            updateDisplay();
            saveProgress();
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
        saveProgress();
    }, 1000);

    // Disable zoom on double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    updateDisplay();
});
