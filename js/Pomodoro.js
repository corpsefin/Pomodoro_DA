const Pomodoro = (name='', min=1, sec=`00`, rounds) => {
    let timerText = document.createElement('h1');
    let roundText = document.createElement('h2');
    let endSound = new Audio('../audio/bell.mp3');
    let isStarted = false;
    let minutes = min;
    let seconds = sec;
    rounds;
    let currentRounds=rounds;

    function countDownTimer(timerType){
        if(timerType === basicTimer){
            
        }
        else{
            breakTimer();
        }
    }

    renderTimerValue()

    const countdownTimer = setInterval(() => {
        if (isStarted) {
            let result = '';
            seconds--;
            addLeadingZeros()
            if (seconds < 0 && minutes > 0) {
                minutes--;
                seconds = 59;
            }
            if(seconds === `00` && minutes === `00` && currentRounds != 0){
                endSound.play();
                currentRounds--;
                reset();
            }
            else if(seconds === `00` && minutes === `00` && currentRounds === 0){
                stop();
            }
            result += `${addLeadingZeros(minutes)}:${addLeadingZeros(seconds)}`;
            renderTimerValue(result)
            renderTimerRounds()
        }
    }, 1000);

    function addLeadingZeros(time){
        return time < 10 ? `0${time}` : time;
    }

    function setProject(project){

    }

    function setBreakTime(breakMin, breakSec){

    }

    function breakTimer(breakMinutes, breakSeconds){
        setInterval(()=>{
            breakSeconds--;
        },1000)
    }

    function start() {
        isStarted = true;
    }

    function pause() {
        isStarted = false;
        renderTimerValue()
    }

    function stop(){
        pause();
        reset();
        renderTimerValue()
    }

    function reset(){
        seconds = sec;
        minutes = min;
        renderTimerValue()
    }

    function getTime(){
        return minutes + ':' + seconds;
    }

    function setTimer(min, sec){
        minutes = min;
        seconds = sec;
    }

    function renderTimerValue(time){
        timerText.textContent = time;
        return timerText;
    }

    function renderTimerRounds(){
        roundText.textContent = `${currentRounds}/${rounds}`;
        return roundText;
    }

    return {
        getTime,
        start,
        pause,
        stop,
        reset,
        setTimer,
        renderTimerValue,
        renderTimerRounds
    }
}

export default Pomodoro;