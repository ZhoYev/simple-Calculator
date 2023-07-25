let firstValue = ""; // Перше число ;
let secondValue = ""; // Друге число ;
let operator = ""; // Кнопка операції ;
let solution = false;

let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let action = ["-", "+", "*", "/", "%"];

// Екран виведення;
const screen = document.querySelector(".calc-screen p");

function allClear() {
  firstValue = "";
  secondValue = "";
  operator = "";
  solution = false;
  updateScreen(0);
}

// Клавіша АС;
document.getElementById("ac").addEventListener("click", allClear);

// Відображення на екрані;
function updateScreen(value) {
  document.querySelector(".calc-screen p").textContent = value;
}

// Розрахунки за допомогою клавіш операцій;
function calculate() {
  switch (operator) {
    case "+":
      return (parseFloat(firstValue) + parseFloat(secondValue)).toString();
    case "-":
      return (parseFloat(firstValue) - parseFloat(secondValue)).toString();
    case "*":
      return (parseFloat(firstValue) * parseFloat(secondValue)).toString();
    case "/":
      if (parseFloat(secondValue) === 0) {
        return "Error";
      } else {
        return (parseFloat(firstValue) / parseFloat(secondValue)).toString();
      }
    case "%":
      return (
        (parseFloat(firstValue) * parseFloat(secondValue)) /
        100
      ).toString();
  }
}

// Уникнення помилкових кліків між кнопками;
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.onclick = (event) => {
    if (!event.target.classList.contains("btn")) return;
    // Збереження в змінній нажатого символу;
    const clickedBtn = event.target.textContent;

    if (/[0-9.]/.test(clickedBtn)) {
      if (operator === "") {
        firstValue += clickedBtn;
        updateScreen(firstValue);
      } else {
        secondValue += clickedBtn;
        updateScreen(secondValue);
      }
    }

    // Присвоєння вибраного символу змінній;
    if (/[+\-*/%]/.test(clickedBtn)) {
      if (operator !== "" && secondValue !== "") {
        const result = calculate();
        if (result === undefined) {
          updateScreen("Error");
        } else {
          updateScreen(result);
          firstValue = result;
          secondValue = "";
        }
      }
      operator = clickedBtn;
    }

    // Дод функція калькулятора при виборі 1 символу та оператора, якщо не буде обрано
    // 2 - го символу буде присвоїно 2 - му символу значення 1
    if (clickedBtn === "=") {
      if (secondValue === "") {
        secondValue = firstValue;
      }
      const result = calculate();
      if (result === undefined) {
        updateScreen("Error");
      } else {
        updateScreen(result);
        firstValue = result;
        secondValue = "";
        operator = "";
        solution = true;
      }
    }
  };
});
