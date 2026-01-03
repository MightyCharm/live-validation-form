import "./styles.css";

const inputEmail = document.getElementById("email");
const selectCountry = document.getElementById("country");
const inputPostalCode = document.getElementById("postal-code");
const inputPassword = document.getElementById("password");
const inputPasswordConfirm = document.getElementById("password-confirm");

const spanErrorEmail = document.getElementById("error-email");

inputEmail.addEventListener("input", () => {
  console.log("input email");
  console.log(inputEmail.validity.valid);
  validateInput(inputEmail);
});

inputEmail.addEventListener("blur", () => {
  console.log("blur email");
  validateInput(inputEmail);
});

selectCountry.addEventListener("change", () => {
  console.log("select country");
});

inputPostalCode.addEventListener("input", () => {
  console.log("input postal code");
});

inputPassword.addEventListener("input", () => {
  console.log("input password");
});

inputPasswordConfirm.addEventListener("input", () => {
  console.log("input password confirm");
});

const validateInput = (input) => {
  if (!input.validity.valid) {
    if (input.value.length === 0) {
      spanErrorEmail.textContent = "Enter an email address.";
    } else {
      spanErrorEmail.textContent = "Enter a valid email address.";
    }
    spanErrorEmail.classList.add("show");
  } else {
    spanErrorEmail.textContent = "";
    spanErrorEmail.classList.remove("show");
  }
};
