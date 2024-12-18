export const initializeForm = () => {
  const form = document.querySelector('.content-section-create-tour__form');

  if (form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      form.reset();
    });
  }

  if (window.jQuery) {
    $('#phone').inputmask("+ 7 ( 9 9 9 ) 9 9 9 - 9 9 - 9 9");
    $("#date-from").inputmask("99.99.9999", { "placeholder": "ДД.ММ.ГГГГ" });
    $("#date-to").inputmask("99.99.9999", { "placeholder": "ДД.ММ.ГГГГ" });
    $("#email").inputmask("email");
  } else {
    console.error('jQuery не загружен. Маски ввода работать не будут.');
  }
};