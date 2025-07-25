function pressKey(char) {
    const input = document.getElementById('calculations');
    const operators = ['+', '-', '*', '/'];

    let current = input.value;

    // If input is 0 and user presses a number
    if (current === "0" && !operators.includes(char)) {
        current = char;
    }
    // If last character is an operator and user presses another operator
    else if (operators.includes(current.slice(-1)) && operators.includes(char)) {
        current = current.slice(0, -1) + char; // Replace last operator
    }
    else {
        current += char; // Otherwise append
    }

    input.value = current;
    localStorage.setItem('calculations', current);
}

function backspaceKey() {
    const input = document.getElementById('calculations');
    let current = input.value;

    // Remove last character
    current = current.slice(0, -1);

    // If empty after delete, set to 0
    if (current === "") current = "0";

    input.value = current;
    localStorage.setItem('calculations', current);
}

document.addEventListener('keydown', function (event) {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '(', ')', '.'];

    if (validKeys.includes(event.key)) {
        pressKey(event.key);
    } else if (event.key === 'Backspace') {
        backspaceKey();
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape') {
        clearCalc();
    }
});
