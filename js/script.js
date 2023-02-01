import { initControl } from "./control.js";
import { state } from "./state.js";

const initPomidoro = () => {
    initControl();

    state.activeTodo = {
        id: 'defoult',
        pomodoro: 2,
        title: 'pomodoro',
    }
};

initPomidoro();