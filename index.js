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
        input.checked = false;
    });

    form.insertBefore(newFieldset, addDrinkButton.parentElement);
});
