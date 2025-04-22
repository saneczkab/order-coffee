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
        newFieldset.remove(); 
        updateRemoveButtons();
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

const closeButtons = document.querySelectorAll(".close-button");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const beverage = button.closest("fieldset.beverage");
    beverage.remove();
    updateRemoveButtons(); 
  });
});

updateRemoveButtons();

