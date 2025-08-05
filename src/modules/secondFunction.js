
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
    let value = input.value.trim();
    // Only add yroot if not already present
    if (!value.includes('yroot')) {
        if (value === "" || isNaN(Number(value))) {
            alert("Enter a valid number for x first.");
            return;
        }
        input.value = value + ' yroot ';
        input.focus();
    }
}
