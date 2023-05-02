import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const inputTime = document.querySelector('#datetime-picker');
const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const TIME_INTERVAL = 1000;
let intervalId = null;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()){
      inputTime.Time.setAttribute('disabled', 'disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future.');
    }
  }
});

function countdownTimer(value) {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const startDate = value;
    const ms = startDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(ms);
    dayEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    if ((ms - 1000) <= 0) {
      clearInterval(intervalId);
      Notiflix.Notify.warning('Time is out!!!');

   }
  }, TIME_INTERVAL);
}

startBtn.addEventListener('click', () => {
  const selectedDate = inputTime._flatpickr.selectedDates[0];
  if (selectedDate > new Date()) {
    Notiflix.Notify.success('We start the countdown!');
    countdownTimer(selectedDate);
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds }
};