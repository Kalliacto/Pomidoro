import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";
import { showTodo , updateTodo } from "./todo.js";

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

const title = document.title;

export const startTimer = () => {
    const countdown = new Date().getTime() + (state.timeLeft * 1000);
    console.log('countdown: ', countdown);

    state.timerId = setInterval(() => {
        state.timeLeft -= 1;
        showTime(state.timeLeft);
    
        document.title = state.timeLeft;

        if(!(state.timeLeft % 5)) {
            const now = new Date().getTime();
            state.timeLeft = Math.floor((countdown - now) / 1000);
        }

        if(state.timeLeft > 0 && state.isActive) {
            return;
        } 

        document.title = title;

            if (state.status === 'work') {
            state.activeTodo.pomodoro += 1;
            updateTodo(state.activeTodo);
            
                if (state.activeTodo.pomodoro % state.count) {
                    state.status = 'break';
                } else {
                    state.status = 'relax';
                }
            } else {
                state.status = 'work';
                }       

        alarm();
        state.timeLeft = state[state.status] * 60;
        showTodo();
        changeActiveBtn(state.status);
        startTimer();
    }, 1000);

    
    // // Проверяем если state.timeLeft > 0 запускаем f(startTamer),т.e саму себя через 1 сек 
    // if(state.timeLeft > 0 && state.isActive) {
    //     state.timerId = setTimeout(startTimer, 1000);
    // }
    
};