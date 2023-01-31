import { alarm } from "./alarm.js";
import { state } from "./state.js"

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');


const showTime = (seconds) => {
    minutesElem.textContent = Math.floor(seconds / 60);
    secondsElem.textContent = seconds % 60;
};


export const startTimer = () => {
    state.timeLeft -= 1;

    showTime(state.timeLeft);

    // Проверяем если state.timeLeft > 0 запускаем f(startTamer),т.e саму себя через 1 сек 
    if(state.timeLeft > 0) {
        state.timerId = setTimeout(startTimer, 1000);
    }
    // сигналилируем время окончено;
    if(state.timeLeft <= 0 && state.isActive) {
        alarm();
    }
};