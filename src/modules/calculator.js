function calculate() {
    const input = document.getElementById('calculations');
    let expression = input.value.trim();

    // Check for yroot operation: x yroot y
    const yrootMatch = expression.match(/^(-?\d+(\.\d+)?)\s*yroot\s*(-?\d+(\.\d+)?)$/i);
    if (yrootMatch) {
        const x = parseFloat(yrootMatch[1]);
        const y = parseFloat(yrootMatch[3]);
        if (isNaN(x) || isNaN(y) || y === 0) {
            alert("Invalid input for y√x");
            return;
        }
        const result = Math.pow(x, 1 / y);
        input.value = result;
        localStorage.setItem('calculations', result);
        addToHistory(expression, result);
        return;
    }

    // Default: normal calculation
    try {
        const result = math.evaluate(expression);
        input.value = result;
        localStorage.setItem('calculations', result);
        addToHistory(expression, result);
    } catch (e) {
        alert("Invalid expression");
    }
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

// Update your calculate() function to handle yroot
function calculate() {
    const input = document.getElementById('calculations');
    let expression = input.value.trim();

    // Check for yroot operation: x yroot y
    const yrootMatch = expression.match(/^(-?\d+(\.\d+)?)\s*yroot\s*(-?\d+(\.\d+)?)$/i);
    if (yrootMatch) {
        const x = parseFloat(yrootMatch[1]);
        const y = parseFloat(yrootMatch[3]);
        if (isNaN(x) || isNaN(y) || y === 0) {
            alert("Invalid input for y√x");
            return;
        }
        const result = Math.pow(x, 1 / y);
        input.value = result;
        localStorage.setItem('calculations', result);
        addToHistory(expression, result);
        return;
    }

    // Default: normal calculation
    try {
        const result = math.evaluate(expression);
        input.value = result;
        localStorage.setItem('calculations', result);
        addToHistory(expression, result);
    } catch (e) {
        alert("Invalid expression");
    }
}

function clearHistory() {
    localStorage.removeItem('history');
    renderHistory();
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



// yroot(x)
//logy(x)
//->deg