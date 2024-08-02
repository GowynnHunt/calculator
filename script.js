let firstNumber = null;
let secondNumber = null;
let operator = null;

const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", buttonHandler);

function buttonHandler(event) {
  let id = event.target.id;

  // firstNumber handling
  if (isNum(id) && operator === null) {
    if (firstNumber === null) {
      firstNumber = id;
    } else {
      firstNumber += id;
    }
    display(firstNumber);
  }

  // secondNumber handling
  if (isNum(id) && operator !== null) {
    if (secondNumber === null) {
      secondNumber = id;
    } else {
      secondNumber += id;
    }
    display(secondNumber);
  }

  // operator handling
  if (isOperator(id)) {
    if (secondNumber === null) {
      operator = id;
    } else {
      calculate();
      operator = id;
    }
  }

  if (id === "clear") {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    display("0");
  }

  if (id === "=") {
    calculate();
  }
}

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
    return "Doh!";
  }
  return a / b;
}

function operate(a, operator, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Doh!";
  }
}

function calculate() {
  firstNumber = operate(firstNumber, operator, secondNumber).toFixed(2);
  secondNumber = null;
  operator = null;
  display(firstNumber);
}

// Regex matching for numbers
function isNum(str) {
  return str.match(/[0-9]/);
}

// Regex matching for operators
function isOperator(str) {
  return str.match(/[+\-*/]/);
}

function display(str) {
  document.querySelector("#display").textContent = str;
}
