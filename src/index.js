import "./styles.css";

const inputEmail = document.getElementById("email");
const selectCountry = document.getElementById("country");
const inputPostalCode = document.getElementById("postal-code");
const inputPassword = document.getElementById("password");
const inputPasswordConfirm = document.getElementById("password-confirm");

const spanErrorEmail = document.getElementById("error-email");
const spanErrorCountry = document.getElementById("error-country");
const spanErrorPostal = document.getElementById("error-postal-code");
const spanErrorPassword = document.getElementById("error-password");
const spanErrorPasswordConfirm = document.getElementById(
  "error-confirm-password",
);
const spanSuccess = document.getElementById("success");

const form = document.getElementById("form");

const regexPostal = {
  germany: /^\d{5}$/,
  france: /^\d{5}$/,
  us: /^\d{5}(?:-\d{4})?$/,
  canada: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
  uk: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/,
  netherlands: /^\d{4} ?[A-Z]{2}$/,
  sweden: /^S-\d{3} ?\d{2}$/,
};

const specialSigns = /[!@#$%^&*]/;
const numbers = /\d/;

const passwordChecks = {
  hasNumber: false,
  hasSign: false,
  passwordsMatch: false,
};

const messages = {
  email: {
    empty: "Email is required.",
    invalid: "Enter a valid email.",
  },
  country: {
    invalid: "Country is required.",
  },
  postal: {
    country: "Select a country first.",
    empty: "Postal code is required.",
    invalid: "Enter a valid postal code.",
  },
  password: {
    invalid: "Enter a valid password.",
    numSign: "Use a number and special character.",
    number: "Number is required.",
    sign: "Special character is required.",
  },
  passwordConfirm: {
    nomatch: "Passwords don't match.",
    invalid: "Enter a valid password.",
  },
  success: {
    submit: "High Five!",
  },
};

document.querySelectorAll("input").forEach((input) => {
  console.log(input);
  input.addEventListener("input", () => {
    validateInput(input);
  });
  input.addEventListener("blur", () => {
    validateInput(input);
  });
});

selectCountry.addEventListener("input", () => {
  inputPostalCode.value = ""; // clear postal code input if country value changes
  validateInput(selectCountry);
});

selectCountry.addEventListener("blur", () => {
  validateInput(selectCountry);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(form);
  validateForm(form);
});

const validateInput = (input) => {
  if (input.id === "email") {
    if (!input.validity.valid) {
      if (input.value.length === 0) {
        spanErrorEmail.textContent = messages.email.empty;
      } else {
        spanErrorEmail.textContent = messages.email.invalid;
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
      spanErrorCountry.textContent = messages.country.invalid;
      spanErrorCountry.classList.add("show");
    } else {
      // inputPostalCode.value = "";
      spanErrorCountry.textContent = "";
      spanErrorCountry.classList.remove("show");
      spanErrorPostal.textContent = "";
      spanErrorPostal.classList.remove("show");
    }
    return;
  }

  if (input.id === "postal-code") {
    const countrySelected = selectCountry.value;
    console.log(countrySelected);
    if (countrySelected === "") {
      spanErrorPostal.textContent = messages.postal.country;
      spanErrorPostal.classList.add("show");
      return;
    }

    if (input.value.length === 0) {
      spanErrorPostal.textContent = messages.postal.empty;
      spanErrorPostal.classList.add("show");
      return;
    }

    const pattern = regexPostal[countrySelected];
    if (pattern && !pattern.test(input.value)) {
      spanErrorPostal.textContent = messages.postal.invalid;
      spanErrorPostal.classList.add("show");
    } else {
      console.log("right");
      spanErrorPostal.textContent = "";
      spanErrorPostal.classList.remove("show");
    }
    return;
  }

  if (input.id === "password") {
    if (!input.validity.valid) {
      spanErrorPassword.textContent = messages.password.invalid;
      spanErrorPassword.classList.add("show");
    } else {
      if (!numbers.test(input.value) && !specialSigns.test(input.value)) {
        spanErrorPassword.textContent = messages.password.numSign;
        spanErrorPassword.classList.add("show");
        passwordChecks.hasNumber = false;
        passwordChecks.hasSign = false;
      } else if (!numbers.test(input.value) && specialSigns.test(input.value)) {
        spanErrorPassword.textContent = messages.password.number;
        spanErrorPassword.classList.add("show");
        passwordChecks.hasNumber = false;
        passwordChecks.hasSign = true;
      } else if (numbers.test(input.value) && !specialSigns.test(input.value)) {
        spanErrorPassword.textContent = messages.password.sign;
        spanErrorPassword.classList.add("show");
        passwordChecks.hasNumber = true;
        passwordChecks.hasSign = false;
      } else {
        spanErrorPassword.textContent = "";
        spanErrorPassword.classList.remove("show");
        passwordChecks.hasNumber = true;
        passwordChecks.hasSign = true;
      }
      console.log(passwordChecks);
    }
  }

  if (input.id === "password-confirm") {
    const firstPasswordValue = inputPassword.value;
    if (input.value !== firstPasswordValue) {
      passwordChecks.passwordsMatch = false;
      spanErrorPasswordConfirm.textContent = messages.passwordConfirm.nomatch;
      spanErrorPasswordConfirm.classList.add("show");
    } else {
      passwordChecks.passwordsMatch = true;
      if (!input.validity.valid) {
        spanErrorPasswordConfirm.textContent = messages.passwordConfirm.invalid;
        spanErrorPasswordConfirm.classList.add("show");
      } else {
        spanErrorPasswordConfirm.textContent = "";
        spanErrorPasswordConfirm.classList.remove("show");
      }
    }
    console.log(passwordChecks);
  }
};

const validateForm = (form) => {
  const inputFields = document.querySelectorAll("input, select");
  inputFields.forEach((input) => {
    validateInput(input);
  });

  if (
    form.checkValidity() &&
    passwordChecks.hasNumber &&
    passwordChecks.hasSign &&
    passwordChecks.passwordsMatch
  ) {
    spanSuccess.textContent = messages.success.submit;
    spanSuccess.classList.add("show");
    setTimeout(() => {
      form.submit();
    }, 3000);
  }
};
