import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');


const addZero = (num) => {
    return num < 10 ? '0' + num : num;
    // if (num < 10) {
    //     return '0' + num;
    // } else {
    //     return num;
    // }
};


export const showTime = (seconds) => {
    minutesElem.textContent = addZero(Math.floor(seconds / 60));
    secondsElem.textContent = addZero(seconds % 60);
};

export const startTimer = () => {
    state.timeLeft -= 1;

    showTime(state.timeLeft);

    // Проверяем если state.timeLeft > 0 запускаем f(startTamer),т.e саму себя через 1 сек 
    if(state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer, 1000);
    }
    // сигналилируем время окончено;
    if (state.timeLeft <= 0 ) {
        alarm();

        if (state.status === 'work') {
            state.activeTodo.pomodoro += 1;

            if (state.activeTodo.pomodoro % state.count) {
                state.status = 'break';
            } else {
                state.status = 'relax';
            }
        } else {
            state.status = 'work';
        }

        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        startTimer();
    }

};