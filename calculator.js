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

    // If input is empty or 0, toggle to 0
    if (value === "0" || value === "") {
        value = "0";
    }
    // If it's a single number (like 25 or -25), just toggle sign
    else if (!isNaN(value)) {
        value = parseFloat(value) * -1;
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
        powerBtn.onclick = function () { pressKey('^'); };
    }

    // 10^x <-> 2^x
    const tenPowerBtn = document.getElementById('tenPowerBtn');
    if (isSecond) {
        tenPowerBtn.innerHTML = '2<sup>x</sup>';
        tenPowerBtn.onclick = calculateTwoPowerX;
    } else {
        tenPowerBtn.innerHTML = '10<sup>x</sup>';
        tenPowerBtn.onclick = function () { pressKey('10^'); };
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
        lnBtn.onclick = function () { calculateEpowX() };
    } else {
        lnBtn.innerHTML = 'ln';
        lnBtn.onclick = calculateLn;
    }
}

function calculateAbs() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);

    if (isNaN(value)) {
        alert("Enter a valid number");
        return;
    }

    let result = Math.abs(value);
    input.value = result;
    localStorage.setItem('calculations', result)
}

function calculateEpowX() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);

    if (isNaN(value)) {
        alert("Enter a valid number.");
        return;
    }

    const result = Math.exp(value); // e^x
    input.value = result;
    localStorage.setItem('calculations', result);
}

function calculateExp() {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);

    if (isNaN(value)) {
        alert("Enter a valid number.");
        return;
    }

    var result = value.toExponential(value.length);
    input.value = result;
    localStorage.setItem('calculations', result);
}

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
    let result = Math.pow(x, 1 / y);
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

const angleModes = ["DEG", "RAD", "GRAD"];
let currentAngleIndex = 0;
function toggleAngleMode() {
    currentAngleIndex = (currentAngleIndex + 1) % 3;
    document.getElementById("angleModeBtn").textContent = angleModes[currentAngleIndex];
}

let isSecondInverse = false;
let isHyperbolic = false;

function toggleSecondInverse() {
    isSecondInverse = !isSecondInverse;
    document.getElementById('secondInverseBtn').classList.toggle('secondInverse-active');
    updateTrigButtons();
}

function toggleHyperbolic() {
    isHyperbolic = !isHyperbolic;
    document.getElementById('hyperbolicBtn').classList.toggle('secondInverse-active');
    updateTrigButtons();
}

function updateTrigButtons() {
    const buttonname = [
        { id: 'sin', base: 'sin' },
        { id: 'cos', base: 'cos' },
        { id: 'tan', base: 'tan' },
        { id: 'sec', base: 'sec' },
        { id: 'csc', base: 'csc' },
        { id: 'cot', base: 'cot' }
    ];

    buttonname.forEach(({ id, base }) => {
        const el = document.getElementById(id);

        let label = base;
        let funcName = base;

        // Apply hyperbolic
        if (isHyperbolic) {
            funcName += 'h';  // e.g., sinh, cosh
            label += 'h';
        }

        // Apply inverse
        if (isSecondInverse) {
            funcName = 'a' + funcName; // e.g., asinh
            label += '<sup>-1</sup>';
        }

        el.innerHTML = label;
        el.onclick = () => calculateTrig(funcName);
    });
}

function calculateTrig(funcName) {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value))
        return alert("Enter a valid number.");

    let result;

    const isInverse = funcName.startsWith('a');
    const isHyperbolic = funcName.includes('h');

    if (!isInverse && !isHyperbolic) {
        // Convert to radians
        switch (angleModes[currentAngleIndex]) {
            case "DEG":
                value = value * Math.PI / 180;
                break;
            case "GRAD":
                value = value * Math.PI / 200;
                break;
        }
    }

    try {
        switch (funcName) {
            //Basic trigo
            case 'sin':
                result = Math.sin(value);
                break;
            case 'cos':
                result = Math.cos(value);
                break;
            case 'tan':
                result = Math.tan(value);
                break;
            case 'sec':
                result = 1 / Math.cos(value);
                break;
            case 'csc':
                result = 1 / Math.sin(value);
                break;
            case 'cot': result = 1 / Math.tan(value); break;

            //hyperbolic trigo
            case 'sinh': result = Math.sinh(value); break;
            case 'cosh': result = Math.cosh(value); break;
            case 'tanh': result = Math.tanh(value); break;
            case 'csch': result = 1 / Math.sinh(value); break;
            case 'sech': result = 1 / Math.cosh(value); break;
            case 'coth': result = Math.cosh(value) / Math.sinh(value); break;

            //inverse and hyperbolic trigo
            case 'asinh': result = Math.asinh(value); break;
            case 'acosh': result = Math.acosh(value); break;
            case 'atanh': result = Math.atanh(value); break;
            case 'asech': result = Math.acosh(1 / value); break;
            case 'acsch': result = Math.asinh(1 / value); break;
            case 'acoth': result = Math.atanh(1 / value); break;

            //inverse trigo
            case 'asin': result = Math.asin(value); break;
            case 'acos': result = Math.acos(value); break;
            case 'atan': result = Math.atan(value); break;
            case 'asec': result = Math.acos(1 / value); break;
            case 'acsc': result = Math.asin(1 / value); break;
            case 'acot': result = Math.atan(1 / value); break;

            default:
                alert("Unknown function: " + funcName);
                return;
        }

        // Convert back to angle unit if inverse and not hyperbolic
        if (isInverse && !isHyperbolic) {
            switch (angleModes[currentAngleIndex]) {
                case "DEG": result = result * 180 / Math.PI; break;
                case "GRAD": result = result * 200 / Math.PI; break;
            }
        }

        input.value = result;
        localStorage.setItem('calculations', result);
    } catch (e) {
        alert("Math error.");
    }
}
function convertToDMS() {
    const input = document.getElementById('calculations');
    let decimal = parseFloat(input.value);

    if (isNaN(decimal)) {
        alert("Enter a valid decimal degree value.");
        return;
    }

    const degrees = Math.floor(decimal);
    const minutesFloat = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(2);

    const result = `${degrees}° ${minutes}'${seconds}"`;
    input.value = result;
    return result;
}

// function convertToDecimalDegrees() {
//     const input = document.getElementById('calculations');
//     const value = input.value;

//     const match = value.match(/(\d+)[°\s]+(\d+)[']+(\d+(\.\d+)?)[\"]/);

//     if (!match) {
//         alert("Enter a valid DMS format like 12° 30' 0\"");
//         return;
//     }

//     const degrees = parseInt(match[1]);
//     const minutes = parseInt(match[2]);
//     const seconds = parseFloat(match[3]);

//     const decimal = degrees + minutes / 60 + seconds / 3600;
//     input.value = decimal;
//     return decimal;
// }

function basicFun(operationName) {
    const input = document.getElementById('calculations');
    let value = parseFloat(input.value);
    if (isNaN(value))
        return alert("Enter a valid number.");

    let result;

    switch (operationName) {
        case 'absolute':
            result = Math.abs(value);
            break;

        case 'floor':
            result = Math.floor(value);
            break;

        case 'ceil':
            result = Math.ceil(value);
            break;

        case 'random':
            result = Math.random(value);
            break;

        case 'toDMS':
            result = convertToDMS();
            break;

        // case 'toDEG':
        //     result = convertToDecimalDegrees();
        //     break;
    }

    input.value = result;
    localStorage.setItem('calculations', result);
    console.log(result);
}
let memoryStack = [];

// Show History or Memory
function showSection(section) {
    document.getElementById('historySection').classList.add('d-none');
    document.getElementById('memorySection').classList.add('d-none');

    if (section === 'history') {
        document.getElementById('historySection').classList.remove('d-none');
    } else if (section === 'memory') {
        document.getElementById('memorySection').classList.remove('d-none');
        renderMemory(); // update memory display when opened
    }
}

// MS – Store to memory stack
function memoryStore() {
    const value = parseFloat(document.getElementById('calculations').value);
    if (!isNaN(value)) {
        memoryStack.push(value);
        localStorage.setItem('memoryStack', JSON.stringify(memoryStack));
        renderMemory();
    }
}

// MR – Recall last memory
function memoryRecall() {
    if (memoryStack.length > 0) {
        document.getElementById('calculations').value = memoryStack[memoryStack.length - 1];
    }
}

// MC – Clear all memory
function memoryClear() {
    memoryStack = [];
    localStorage.removeItem('memoryStack');
    renderMemory();
}

// M+ – Add to last memory value
function memoryAdd() {
    const val = parseFloat(document.getElementById('calculations').value);
    if (!isNaN(val) && memoryStack.length > 0) {
        memoryStack[memoryStack.length - 1] += val;
        localStorage.setItem('memoryStack', JSON.stringify(memoryStack));
        renderMemory();
    }
}

// M- – Subtract from last memory value
function memorySubtract() {
    const val = parseFloat(document.getElementById('calculations').value);
    if (!isNaN(val) && memoryStack.length > 0) {
        memoryStack[memoryStack.length - 1] -= val;
        localStorage.setItem('memoryStack', JSON.stringify(memoryStack));
        renderMemory();
    }
}

// Render memory values in UI
function renderMemory() {
    const list = document.getElementById('memoryList');
    list.innerHTML = '';

    memoryStack.forEach((val, index) => {
        const li = document.createElement('li');
        li.textContent = `M${index + 1}: ${val}`;
        list.appendChild(li);
    });

    document.getElementById('memoryDisplay').textContent =
        memoryStack.length ? memoryStack[memoryStack.length - 1] : '0';
}

// History clear (already present)
function clearHistory() {
    document.getElementById('historyList').innerHTML = "";
    localStorage.removeItem('history');
}

// Restore memory on page load
window.onload = () => {
    const storedStack = localStorage.getItem('memoryStack');
    if (storedStack) {
        memoryStack = JSON.parse(storedStack);
        renderMemory();
    }
};

// yroot(x)
//logy(x)
//->deg