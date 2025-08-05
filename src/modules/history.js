
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

// History clear (already present)
function clearHistory() {
    document.getElementById('historyList').innerHTML = "";
    localStorage.removeItem('history');
}
