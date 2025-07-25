const angleModes = ["DEG", "RAD", "GRAD"];
let currentAngleIndex = 0;

function toggleAngleMode() {
    currentAngleIndex = (currentAngleIndex + 1) % angleModes.length;
    document.getElementById("angleModeBtn").textContent = angleModes[currentAngleIndex];
}

function calculate() {
    const input = document.getElementById('calculations');
    try {
        const result = math.evaluate(input.value);
        input.value = result;
        localStorage.setItem('calculations', result);
    } catch (e) {
        alert("Invalid expression");
    }
}

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
