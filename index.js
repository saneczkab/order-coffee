let drinkNum = 1;

const form = document.querySelector("form");
const addDrinkButton = document.querySelector(".add-button");
const submitButton = document.querySelector(".submit-button");
addDrinkButton.addEventListener("click", () => {
    const lastFieldset = form.querySelector("fieldset.beverage");
    const newFieldset = lastFieldset.cloneNode(true);

    drinkNum++;
    newFieldset.querySelector(".beverage-count").textContent = "Напиток №" + drinkNum;

    const milkInputs = newFieldset.querySelectorAll('input[type="radio"]');
    milkInputs.forEach(input => {
        input.name = `milk-${drinkNum}`;
        input.checked = false;
    });

    const checkboxInputs = newFieldset.querySelectorAll('input[type="checkbox"]');
    checkboxInputs.forEach(input => {
        input.name = `options-${drinkNum}`;
        input.checked = false;
    });
    const closeButton = newFieldset.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        drinkNum--;
        newFieldset.remove();
        updateRemoveButtons();
        updateDrinkNums();
    });
    form.insertBefore(newFieldset, addDrinkButton.parentElement);
    updateRemoveButtons();
});


function updateRemoveButtons() {
    const beverages = document.querySelectorAll("fieldset.beverage");
    beverages.forEach((beverage) => {
      const closeButton = beverage.querySelector(".close-button");
      if (closeButton) {
        closeButton.disabled = beverages.length === 1;
      }
    });
  }

  function updateDrinkNums() {
    const beverages = document.querySelectorAll("fieldset.beverage");
    beverages.forEach((beverage, index) => {
      beverage.querySelector(".beverage-count").textContent = "Напиток №" + (index + 1);
    });
  }

const closeButtons = document.querySelectorAll(".close-button");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const beverage = button.closest("fieldset.beverage");
    beverage.remove();
    drinkNum--;
    updateRemoveButtons();
    updateDrinkNums();
  });
});

updateRemoveButtons();
updateDrinkNums();

function getWordByNum(num) {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return 'напиток';
    }
    return (lastTwoDigits < 11 || lastTwoDigits > 14) && lastDigit >= 2 && lastDigit <= 4 ? 'напитка' : 'напитков';
}

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const modalOverlay = document.createElement("div");
    modalOverlay.className = "overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const closeButton = document.createElement("button");
    closeButton.className = "modal-close";
    closeButton.textContent = "X";

    const modalContent = document.createElement("div");
    modalContent.textContent = `Заказ принят! Вы заказали ${drinkNum} ${getWordByNum(drinkNum)}.`;

    modal.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    document.body.appendChild(modal);

    closeButton.addEventListener("click", () => {
        document.body.removeChild(modalOverlay);
        document.body.removeChild(modal);
    });
});