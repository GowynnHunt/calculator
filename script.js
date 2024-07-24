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

function operate(operator, a, b) {
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
  } else if (id === "=") {
    calculate(calcArr);
  }
  display.textContent = calcArr.join(" ");
  console.log(calcArr);
}

// Calculates by taking slices of calcArr. This way, the user can input
// as many operation as they want at once before choosing to calculate.

// It's worth mentioning that this won't properly calculate the value of
// more complex interactions.
//
// Example: 12 - 7 + 6 * 3 = 23, but my calculator will return 33
// because it strictly solves from left to right.
function calculate(arr) {
  // Guard against operation without enough operands
  if (arr.length < 3 || arr.length % 2 === 0) return;

  // Stage initial values
  let slice = [];
  let total = 0;

  //
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    if (i === 0) {
      // Initial slice
      slice = arr.slice(0, 3);
      total = operate(slice[1], slice[0], slice[2]);
    } else {
      // Every slice after the first will grab the next operation and
      // operand and use the previous total as its first value
      slice = arr.slice(i * 2 + 1, i * 2 + 3);
      total = operate(slice[0], total, slice[1]);
    }
  }

  // Needs string to display
  calcArr = [total.toString()];

  // Resetting idx for further operation
  idx = 0;
}

let calcArr = [];
let idx = 0;

const display = document.querySelector("#display");

const buttons = document.querySelectorAll("#calculator button");
buttons.forEach((button) => button.addEventListener("click", buttonHandler));
