const Pomodoro = (min=25, sec=`00`) => {

    let isStarted = false;
    let minutes = min;
    let seconds = sec;
    //printTime(minutes + ':' + seconds)
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
            //printTime(minutes + ':' + seconds)
            getTime()
        }
    }, 1000);

    function getTime(){
        console.log(seconds)
        return minutes + ':' + seconds;
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
        timer;
    }

    function reset(){
        //clearInterval(timer)
        seconds = sec;
        minutes = min;
        printTime(minutes + ':' + seconds);
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