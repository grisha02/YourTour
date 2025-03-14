export const initializeForm = () => {
  const form = document.querySelector(".create-tour__form");
  const phoneInput = document.querySelector("#phone");
  const dateFromInput = document.querySelector("#date-from");
  const dateToInput = document.querySelector("#date-to");
  const emailInput = document.querySelector("#email");
  const nameInput = document.querySelector("#name");
  const select = document.querySelector("#direction");

  function updateOptionColors() {
    const options = select.options;
    for (let i = 1; i < options.length; i++) {
      options[i].style.color = "#1B1F2B";
    }
  }

  updateOptionColors();
  select.addEventListener("change", updateOptionColors);

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const validateDate = (input) => {
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!datePattern.test(input.value)) {
      input.setCustomValidity("Введите дату в формате ДД.ММ.ГГГГ");
      return;
    }

    let [day, month, year] = input.value.split(".").map(Number);
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month < 1 || month > 12) {
      input.setCustomValidity("Месяц должен быть от 01 до 12");
    } else if (day < 1 || day > daysInMonth[month - 1]) {
      input.setCustomValidity(`В ${month}-м месяце нет ${day}-го числа`);
    } else if (year > 2050) {
      input.setCustomValidity("Максимально допустимый год - 2050");
    } else {
      input.setCustomValidity("");
    }
  };

  const validateDateRange = () => {
    if (!dateFromInput.value || !dateToInput.value) return;

    const [dayFrom, monthFrom, yearFrom] = dateFromInput.value.split(".").map(Number);
    const [dayTo, monthTo, yearTo] = dateToInput.value.split(".").map(Number);

    const dateFrom = new Date(yearFrom, monthFrom - 1, dayFrom);
    const dateTo = new Date(yearTo, monthTo - 1, dayTo);

    if (dateTo < dateFrom) {
      dateToInput.setCustomValidity("Дата окончания не может быть раньше даты начала");
    } else {
      dateToInput.setCustomValidity("");
    }
  };

  phoneInput.addEventListener("input", (e) => {
    let phone = e.target.value.replace(/\D/g, "");
    if (phone.startsWith("7")) phone = phone.substring(1);

    let formattedPhone = "+7 (" + phone.substring(0, 3);
    if (phone.length > 3) formattedPhone += ") " + phone.substring(3, 6);
    if (phone.length > 6) formattedPhone += "-" + phone.substring(6, 8);
    if (phone.length > 8) formattedPhone += "-" + phone.substring(8, 10);

    e.target.value = formattedPhone;
    phoneInput.setCustomValidity(phone.length < 10 ? "Введите полный номер телефона" : "");
  });

  phoneInput.addEventListener("blur", () => {
    if (!phoneInput.value.trim() || phoneInput.value === "+7 (") {
      phoneInput.value = "";
    }
  });

  const formatDateInput = (e) => {
    let date = e.target.value.replace(/\D/g, "");
    let formattedDate = date.substring(0, 2);
    if (date.length > 2) formattedDate += "." + date.substring(2, 4);
    if (date.length > 4) formattedDate += "." + date.substring(4, 8);

    e.target.value = formattedDate;
    validateDate(e.target);
    validateDateRange();
  };

  dateFromInput.addEventListener("input", formatDateInput);
  dateToInput.addEventListener("input", formatDateInput);

  emailInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.trim().replace(/[^a-zA-Z0-9@._-]/g, "");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.target.setCustomValidity(emailPattern.test(e.target.value) ? "" : "Введите корректный email");
  });

  nameInput.addEventListener("input", (e) => {
    const value = e.target.value;
    const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
    e.target.value = lettersOnly;
  });

  form?.addEventListener("submit", (e) => {
    validateDate(dateFromInput);
    validateDate(dateToInput);
    validateDateRange();

    if (!form.checkValidity()) {
      e.preventDefault();
    } else {
      e.preventDefault();
      form.reset();
    }
  });
};