import "./styles.css";

const inputEmail = document.getElementById("email");
const selectCountry = document.getElementById("country");
const inputPostalCode = document.getElementById("postal-code");
const inputPassword = document.getElementById("password");
const inputPasswordConfirm = document.getElementById("password-confirm");

const spanErrorEmail = document.getElementById("error-email");
const spanErrorCountry = document.getElementById("error-country");
const spanErrorPostal = document.getElementById("error-postal-code");

const regexPostal = {
  germany: /^\d{5}$/,
  france: /^\d{5}$/,
  us: /^\d{5}(?:-\d{4})?$/,
  canada: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
  uk: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/,
  netherlands: /^\d{4} ?[A-Z]{2}$/,
  sweden: /^S-\d{3} ?\d{2}$/,
};

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
  console.log("change select-country");
  validateInput(selectCountry);
});

selectCountry.addEventListener("blur", () => {
  console.log("blur select-country");
  validateInput(selectCountry);
});

inputPostalCode.addEventListener("input", () => {
  console.log("input postal code");
  validateInput(inputPostalCode);
});

inputPostalCode.addEventListener("blur", () => {
  console.log("blur postal code");
  validateInput(inputPostalCode);
});

inputPassword.addEventListener("input", () => {
  console.log("input password");
});

inputPasswordConfirm.addEventListener("input", () => {
  console.log("input password confirm");
});

const validateInput = (input) => {
  console.log("validateInput");

  if (input.id === "email") {
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
    return;
  }

  if (input.id === "country") {
    if (!input.validity.valid) {
      spanErrorCountry.textContent = "Please select a country.";
      spanErrorCountry.classList.add("show");
    } else {
      spanErrorCountry.textContent = "";
      spanErrorCountry.classList.remove("show");
      spanErrorPostal.textContent = "";
      spanErrorPostal.classList.remove("show");
    }
    return;
  }

  if (input.id === "postal-code") {
    console.log("postal code ma boi");
    const countrySelected = selectCountry.value;
    console.log(countrySelected);
    if (countrySelected === "") {
      spanErrorPostal.textContent = "Select a Country first.";
      spanErrorPostal.classList.add("show");
      return;
    }

    if (input.value.length === 0) {
      spanErrorPostal.textContent = "Enter n postal code.";
      spanErrorPostal.classList.add("show");
      return;
    }
    console.log(regexPostal[countrySelected]);

    const pattern = regexPostal[countrySelected];
    if (pattern && !pattern.test(input.value)) {
      console.log("wrong");
      spanErrorPostal.textContent = "Enter valid postal code.";
      spanErrorPostal.classList.add("show");
    } else {
      console.log("right");
      spanErrorPostal.textContent = "";
      spanErrorPostal.classList.remove("show");
    }
  }
};
