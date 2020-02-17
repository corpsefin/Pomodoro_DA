const Pomodoro = (min=25, sec=`00`) => {
    const timerText = document.getElementById('timerText');
    
    const defaultTime = 25;
    let isStarted = false;
    let minutes = min;
    let seconds = sec;
    printTime(minutes + ':' + seconds)
    const timer = setInterval(() => {
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

    function getTime(){
        let newTime = timerText.textContent;
        return newTime;
    }

    function start() {
        isStarted = true;
        console.log('start')
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
        //clearInterval(timer)
        seconds = sec;
        minutes = min;
        printTime(minutes + ':' + seconds);
    }

    function printTime(time) {
        timerText.textContent = time;
    }

    function setTimer(min, sec){
        minutes = min;
        seconds = sec;
    }

    return {
        getTime,
        start,
        pause,
        stop,
        reset,
        setTimer,
    }
}

export default Pomodoro;