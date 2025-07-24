function pressKey(char) {
    const input = document.getElementById('calculations');
    input.value += char;
    localStorage.setItem('calculations', input.value);
}

function clearCalc() {
    const input = document.getElementById('calculations');
    input.value = '';
    localStorage.removeItem('calculations');
}

function calculate() {
    const input = document.getElementById('calculations');
    try {
        const result = eval(input.value);
        input.value = result;
        localStorage.setItem('calculations', result);
    } catch (e) {
        alert("Invalid expression");
    }
}