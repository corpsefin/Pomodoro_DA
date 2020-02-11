const Pomodoro = (min, sec) => {
    const timerText = document.getElementById('timerText');
    let isStarted = false;
    let minutes = min;
    let seconds = sec;
    setInterval(() => {
        if (isStarted) {
            seconds--;
            if (seconds < 10 && seconds >= 0) {
                seconds = `0${seconds}`
            }
            if (seconds < 0 && minutes > 0) {
                minutes--;
                seconds = 59;
            }
            printTime(minutes + ':' + seconds)
        }
    }, 1000);

    function start() {
        isStarted = true;
    }

    function pause() {
        isStarted = false;
    }

    function stop(){
        pause();
        reset();
        printTime(minutes + ':' + seconds);
    }

    function reset(){
        seconds = sec;
        minutes = min;
        printTime(minutes + ':' + seconds);
    }

    function printTime(time) {

        timerText.textContent = time;
        console.log(time)
    }

    return {
        start,
        pause,
        stop,
        reset
    }
}

export default Pomodoro;