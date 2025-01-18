const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = '';
let calculationHistory = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else if (value === '←') {
            backspace();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function appendNumber(value) {
    if (value === '.' && currentInput.includes('.')) return;

    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }

    updateDisplay();
}

function setOperator(op) {
    if (currentInput === '') return;

    if (previousInput && operator) {
        calculateResult();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    display.textContent = `${previousInput} ${operator}`;
}

function calculateResult() {
    if (!previousInput || !currentInput || !operator) return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    let result;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
    }

    calculationHistory = `${previousInput} ${operator} ${currentInput} = ${result}`;
    operator = '';
    previousInput = '';
    currentInput = result.toString();
    
    updateDisplay();
    updateHistory();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    if (currentInput === '0' && !operator) {
        display.textContent = currentInput;
    } else {
        display.textContent = currentInput;
    }
}

function updateHistory() {
    history.textContent = calculationHistory;
}
