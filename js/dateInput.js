const dateInput = document.querySelector('.date-input');

const today = (new Date());
const thirtyDaysFromNow = new Date(today.setTime(today.getTime() + 30 * 86400000));

dateInput.min = (new Date()).toLocaleDateString();
dateInput.max = thirtyDaysFromNow.toLocaleDateString();
dateInput.value = (new Date()).toLocaleDateString();
