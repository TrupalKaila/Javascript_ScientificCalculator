const angleModes = ["DEG", "RAD", "GRAD"];
let currentAngleIndex = 0;

function toggleAngleMode() {
    currentAngleIndex = (currentAngleIndex + 1) % angleModes.length;
    document.getElementById("angleModeBtn").textContent = angleModes[currentAngleIndex];
}

function calculate() {
    const input = document.getElementById('calculations');
    try {
        const expression = input.value;
        const result = math.evaluate(expression);
        input.value = result;
        localStorage.setItem('calculations', result);

        // Store history
        addToHistory(expression, result);
    } catch (e) {
        alert("Invalid expression");
    }
}

function addToHistory(expression, result) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.unshift({ expression, result }); // Add newest at the top
    if (history.length > 50) history = history.slice(0, 50); // Limit history
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    let history = JSON.parse(localStorage.getItem('history')) || [];
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(li);
    });
}

// Call renderHistory() on page load
document.addEventListener('DOMContentLoaded', renderHistory);

function toggleSign() {
    const input = document.getElementById('calculations');
    let value = input.value;

    // If input is empty or 0, toggle to negative 0
    if (value === "0" || value === "") {
        value = "-";
    }
    // If it's a single number (like 25 or -25), just toggle sign
    else if (!isNaN(value)) {
        value = parseFloat(value) * -1;
    }
    // If it ends with a number, try to find the last number in the string and negate it
    else {
        const match = value.match(/(-?\d+\.?\d*)$/);
        if (match) {
            const number = match[0];
            const negated = parseFloat(number) * -1;
            value = value.slice(0, match.index) + negated;
        }
    }

    input.value = value;
    localStorage.setItem('calculations', value);
}


function clearCalc() {
    const input = document.getElementById('calculations');
    input.value = '0'; // show 0 after clear
    localStorage.setItem('calculations', '0'); // also reset in localStorage
}

let isExponential = false; // tracks current display format
let lastNumericValue = null; // stores base number before switching

function toggleExponential() {
    const input = document.getElementById('calculations');
    let value = input.value;

    if (!isExponential) {
        // Convert to exponential if value is valid
        if (!isNaN(value) && value !== "") {
            lastNumericValue = parseFloat(value); // save original number
            input.value = lastNumericValue.toExponential(5);
            isExponential = true;
        }
    } else {
        // Revert back to normal
        if (lastNumericValue !== null) {
            input.value = lastNumericValue.toString();
            isExponential = false;
        }
    }

    localStorage.setItem('calculations', input.value);
}


function calculateLn() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value) || value <= 0) {
        alert("Invalid input for ln");
        return;
    }
    let result = Math.log(value);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateLog() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value) || value <= 0) {
        alert("Invalid input for log");
        return;
    }
    let result = Math.log10(value);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateReciprocal() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value) || value === 0) {
        alert("Invalid input for reciprocal");
        return;
    }
    let result = 1 / value;
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateSqrt() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value) || value < 0) {
        alert("Invalid input for square root");
        return;
    }
    let result = Math.sqrt(value);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateSquare() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value)) {
        alert("Invalid input for square");
        return;
    }
    let result = value * value;
    input.value = result;
    localStorage.setItem('calculations', result);
}

let isSecond = false;

function toggleSecond() {
    isSecond = !isSecond;
    const secondBtn = document.getElementById('secondBtn');
    if (isSecond) {
        secondBtn.classList.add('second-active');
    } else {
        secondBtn.classList.remove('second-active');
    }

    // x^2 <-> x^3
    const squareBtn = document.getElementById('squareBtn');
    if (isSecond) {
        squareBtn.innerHTML = 'x<sup>3</sup>';
        squareBtn.onclick = calculateCube;
    } else {
        squareBtn.innerHTML = 'x<sup>2</sup>';
        squareBtn.onclick = calculateSquare;
    }

    // sqrt <-> cubicroot
    const sqrtBtn = document.getElementById('sqrtBtn');
    if (isSecond) {
        sqrtBtn.innerHTML = '&sup3;&radic;x';
        sqrtBtn.onclick = calculateCbrt;
    } else {
        sqrtBtn.innerHTML = '&sup2;&radic;x';
        sqrtBtn.onclick = calculateSqrt;
    }

    // x^y <-> y√x
    const powerBtn = document.getElementById('powerBtn');
    if (isSecond) {
        powerBtn.innerHTML = 'y&radic;x';
        powerBtn.onclick = calculateYRoot;
    } else {
        powerBtn.innerHTML = 'x<sup>y</sup>';
        powerBtn.onclick = function() { pressKey('^'); };
    }

    // 10^x <-> 2^x
    const tenPowerBtn = document.getElementById('tenPowerBtn');
    if (isSecond) {
        tenPowerBtn.innerHTML = '2<sup>x</sup>';
        tenPowerBtn.onclick = calculateTwoPowerX;
    } else {
        tenPowerBtn.innerHTML = '10<sup>x</sup>';
        tenPowerBtn.onclick = function() { pressKey('10^'); };
    }

    // log <-> logy(x)
    const logBtn = document.getElementById('logBtn');
    if (isSecond) {
        logBtn.innerHTML = 'log<sub>y</sub>(x)';
        logBtn.onclick = calculateLogY;
    } else {
        logBtn.innerHTML = 'log';
        logBtn.onclick = calculateLog;
    }

    // ln <-> e^x
    const lnBtn = document.getElementById('lnBtn');
    if (isSecond) {
        lnBtn.innerHTML = 'e<sup>x</sup>';
        lnBtn.onclick = calculateExp;
    } else {
        lnBtn.innerHTML = 'ln';
        lnBtn.onclick = calculateLn;
    }
}

// Add these functions:
function calculateCube() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value)) {
        alert("Invalid input for cube");
        return;
    }
    let result = Math.pow(value, 3);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateCbrt() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value)) {
        alert("Invalid input for cube root");
        return;
    }
    let result = Math.cbrt(value);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateYRoot() {
    const input = document.getElementById('calculations');
    let x = parseFloat(input.value);
    let y = prompt("Enter root degree (y):");
    y = parseFloat(y);
    if (isNaN(x) || isNaN(y) || y === 0) {
        alert("Invalid input for y√x");
        return;
    }
    let result = Math.pow(x, 1/y);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateTwoPowerX() {
    const input = document.getElementById('calculations');
    let x = parseFloat(input.value);
    if (isNaN(x)) {
        alert("Invalid input for 2^x");
        return;
    }
    let result = Math.pow(2, x);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateLogY() {
    const input = document.getElementById('calculations');
    let x = parseFloat(input.value);
    let y = prompt("Enter base (y):");
    y = parseFloat(y);
    if (isNaN(x) || isNaN(y) || y <= 0 || x <= 0) {
        alert("Invalid input for logy(x)");
        return;
    }
    let result = Math.log(x) / Math.log(y);
    input.value = result;
    localStorage.setItem('calculations', result);
}

function clearHistory() {
    localStorage.removeItem('history');
    renderHistory();
}