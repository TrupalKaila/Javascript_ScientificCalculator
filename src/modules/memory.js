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

// Restore memory on page load
window.onload = () => {
    const storedStack = localStorage.getItem('memoryStack');
    if (storedStack) {
        memoryStack = JSON.parse(storedStack);
        renderMemory();
    }
};