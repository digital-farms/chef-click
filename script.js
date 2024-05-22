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
    const clickLevelElement = document.getElementById('clickLevel');
    const levelElement = document.getElementById('level');
    const experienceElement = document.getElementById('experience');
    const experienceToNextLevelElement = document.getElementById('experienceToNextLevel');

    function updateDisplay() {
        coinCountElement.textContent = coinCount;
        totalCoinsElement.textContent = totalCoins;
        autoClickerCountElement.textContent = autoClickerCount;
        clickLevelElement.textContent = clickLevel;
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

    function showCoinPopup(amount, x, y) {
        const popup = document.createElement('div');
        popup.className = 'coin-popup';
        popup.textContent = `+${amount}`;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 2000);
    }

    document.getElementById('clickButton').addEventListener('click', (e) => {
        e.preventDefault();
        coinCount += clickLevel;
        totalCoins += clickLevel;
        experience += clickLevel;
        checkLevelUp();
        updateDisplay();
        saveProgress();
        const rect = e.target.getBoundingClientRect();
        showCoinPopup(clickLevel, rect.left + rect.width / 2, rect.top);
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

    function autoClick() {
        coinCount += autoClickerCount * autoClickerLevel;
        totalCoins += autoClickerCount * autoClickerLevel;
        experience += autoClickerCount * autoClickerLevel;
        checkLevelUp();
        updateDisplay();
        saveProgress();
    }

    setInterval(autoClick, 1000);

    updateDisplay();
});
