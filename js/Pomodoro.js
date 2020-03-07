const Pomodoro = (name='',seconds, rounds=1, breakSeconds,longBreakSeconds, longBreakGap=4) => {

    name;
    longBreakGap;

    console.log(name)
    console.log(longBreakGap)

    const initialSeconds = seconds;
    const initialBreakSeconds = breakSeconds;
    const initialLongBreakSeconds = longBreakSeconds;
    const initialRounds = rounds;
    
    let counterSeconds = seconds%60;
    let minutes = Math.floor((seconds/60));
    let breakMinutes = Math.floor((breakSeconds/60));
    let longBreakMinutes = Math.floor(longBreakSeconds/60);
    let endSound = new Audio('../audio/bell.mp3');
    let isStarted = false;
    let isBreak = false;
    let longBreakCounter = 1;
    let timerText = document.createElement('h1');
    let roundsText = document.createElement('h3');
    let initialResult = `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
    let interval = null;
    let result = '';

    function timer(){
        seconds--;
        minutes = Math.floor(seconds/60);
        counterSeconds = Math.floor(seconds%60);

        if(seconds === 0){
            endSound.play();
            if(isBreak){
                if(longBreakCounter % longBreakGap === 0){
                    resetVariables(longBreakSeconds);
                }
                else{
                    resetVariables(breakSeconds);
                }
                isBreak = false;
            }
            else{
                resetVariables(initialSeconds);
                longBreakCounter++;
                rounds--;
                isBreak = true;
            }

            if(rounds === 0){
                stop();
            }
        }
        result = `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;

        setTimer(result);
    }

    function addLeadingZeros(time){
        return time < 10 ? `0${time}` : time;
    }

    function resetVariables(time){
        seconds = time;
    }

    function start() {
        interval = setInterval(timer, Math.floor(1000));
    }

    function pause() {
        if(!isStarted){
            clearInterval(interval);
            isStarted = true;
        }
        else{
            clearInterval(interval)
            start();
            isStarted = false;
        }
    }

    function stop(){
        pause();
        reset();
    }

    function reset(){
        seconds = initialSeconds;
        timer();
    }

    function setTimer(result){
        timerText.innerHTML = `${result}`;
    }

    function getTimer(){
        return timerText;
    }

    return {
        start,
        pause,
        stop,
        reset,
        timer,
        getTimer
    }
}

export default Pomodoro;