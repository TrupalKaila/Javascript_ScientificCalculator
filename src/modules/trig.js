
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