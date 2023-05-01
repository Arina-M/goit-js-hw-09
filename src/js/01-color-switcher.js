const TIME_COLOR_CHANGES = 1000;
let changeColorTime = null;

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtn.addEventListener('click', onClickStartBtn);
stopBtn.addEventListener('click', onClickStopBtn);


function onClickStartBtn() {
    changeColorTime = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        startBtn.setAttribute('disabled', 'disabled');
        stopBtn.removeAttribute('disabled');
    }, TIME_COLOR_CHANGES);
}

function onClickStopBtn() {
    clearInterval(changeColorTime);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
}
