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
  return a / b;
}

function operate(a, operator, b) {
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

// Regex matching for numbers
function isNum(str) {
  return str.match(/[0-9]/);
}

// Regex matching for operators
function isOperator(str) {
  return str.match(/[+\-*/]/);
}

function buttonHandler(event) {
  let id = event.target.id;

  if (isNum(id)) {
    if (calcArr[idx] === undefined || calcArr[idx] === "0") {
      calcArr[idx] = id;
    } else if (isOperator(calcArr[idx])) {
      idx++;
      calcArr[idx] = id;
    } else {
      calcArr[idx] += id;
    }
  } else if (isOperator(id)) {
    if (isNum(calcArr[idx])) idx++;
    calcArr[idx] = id;
  } else if (id === "clear") {
    // Matches clear
    calcArr = ["0"];
    idx = 0;
  }
  display.textContent = calcArr.join(" ");
  console.log(calcArr);
}

let calcArr = [];
let idx = 0;

const display = document.querySelector("#display");

const buttons = document.querySelectorAll("#calculator button");
buttons.forEach((button) => button.addEventListener("click", buttonHandler));
