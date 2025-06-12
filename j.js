const display = document.querySelector('.display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace');

let firstNumber = '';
let operator = '';
let secondNumber = '';
let resultDisplayed = false;

// Math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error: Divide by 0';
  }
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
    default:
      return null;
  }
}

// Update display
function updateDisplay(value) {
  display.textContent = value;
}

// Handle digit input
digitButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (resultDisplayed) {
      firstNumber = '';
      secondNumber = '';
      operator = '';
      resultDisplayed = false;
    }
    if (!operator) {
      firstNumber += button.textContent;
      updateDisplay(firstNumber);
    } else {
      secondNumber += button.textContent;
      updateDisplay(secondNumber);
    }
  });
});

// Handle operator input
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (firstNumber && secondNumber && operator) {
      const result = operate(operator, firstNumber, secondNumber);
      if (typeof result === 'string') {
        updateDisplay(result);
        firstNumber = '';
      } else {
        firstNumber = result.toFixed(8).replace(/\.?0+$/, '');
        updateDisplay(firstNumber);
      }
      secondNumber = '';
      resultDisplayed = true;
    }
    operator = button.dataset.operator;
  });
});

// Handle equals
equalsButton.addEventListener('click', () => {
  if (firstNumber && secondNumber && operator) {
    const result = operate(operator, firstNumber, secondNumber);
    if (typeof result === 'string') {
      updateDisplay(result);
      firstNumber = '';
    } else {
      firstNumber = result.toFixed(8).replace(/\.?0+$/, '');
      updateDisplay(firstNumber);
    }
    secondNumber = '';
    operator = '';
    resultDisplayed = true;
  }
});

// Handle clear
clearButton.addEventListener('click', () => {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  resultDisplayed = false;
  updateDisplay('0');
});

// Handle decimal
decimalButton.addEventListener('click', () => {
  if (resultDisplayed) {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    resultDisplayed = false;
  }
  if (!operator && !firstNumber.includes('.')) {
    firstNumber = firstNumber || '0';
    firstNumber += '.';
    updateDisplay(firstNumber);
  } else if (operator && !secondNumber.includes('.')) {
    secondNumber = secondNumber || '0';
    secondNumber += '.';
    updateDisplay(secondNumber);
  }
});

// Handle backspace
backspaceButton.addEventListener('click', () => {
  if (resultDisplayed) {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    resultDisplayed = false;
  }
  if (!operator) {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || '0');
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || '0');
  }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (/[0-9]/.test(e.key)) {
    document.querySelector(`.digit[data-key="${e.key}"]`)?.click();
  } else if (e.key === '.') {
    decimalButton.click();
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
    document.querySelector(`.operator[data-operator="${op}"]`)?.click();
  } else if (e.key === 'Enter' || e.key === '=') {
    equalsButton.click();
  } else if (e.key === 'Escape') {
    clearButton.click();
  } else if (e.key === 'Backspace') {
    backspaceButton.click();
  }
});

// Add data-key attributes to buttons for keyboard support
digitButtons.forEach(button => button.dataset.key = button.textContent);
operatorButtons.forEach(button => button.dataset.operator = button.dataset.operator);