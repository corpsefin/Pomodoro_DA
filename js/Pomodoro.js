const Pomodoro = (name='',seconds, rounds) => {
    seconds;
    rounds;

    let counterSeconds = seconds%60;
    let minutes = Math.floor((seconds/60));
    let endSound = new Audio('../audio/bell.mp3');
    let isStarted = false;
    let currentRounds=rounds;


    const countdown = setInterval(() => {
        minutes = Math.floor((seconds/60));
        counterSeconds = seconds%60;
        if (isStarted) {
            let result = '';
            seconds--;
            addLeadingZeros()

            result += `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
            console.log(result)
        }
    }, 1000);

    function addLeadingZeros(time){
        return time < 10 ? `0${time}` : time;
    }

    function start() {
        isStarted = true;
    }

    function pause() {
        isStarted = false;
        //renderTimerValue()
    }

    function stop(){
        pause();
        reset();
    }

    function reset(){
        seconds = seconds;
        minutes = Math.floor((seconds/60));
    }

    return {
        start,
        pause,
        stop,
        reset,
    }
}

export default Pomodoro;