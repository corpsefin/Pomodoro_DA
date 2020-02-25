const Pomodoro = (name='',seconds, rounds) => {
    const initialSeconds = seconds;
    const initialRounds = rounds;

    let counterSeconds = seconds%60;
    let minutes = Math.floor((seconds/60));
    let endSound = new Audio('../audio/bell.mp3');
    let isStarted = false;
    let timerText = document.createElement('h1');
    let roundsText = document.createElement('h3');
    let initialResult = `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
    setValue(initialResult, rounds);

    function breakTimer(breakTime){
        setInterval(()=>{

        })
    }

    setInterval(() => {
        /*if(breakTime){
            m
        }*/
        minutes = Math.floor((seconds/60));
        counterSeconds = seconds%60;
        let result = '';
        if (isStarted) { 
            seconds--;
            result += `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
        }
        if(seconds <= 0 && minutes <= 0){
            rounds--;
            console.log(rounds)
            endSound.play();
            //breakTimer();
            reset();
        }
        if(rounds === 0){
            stop();
        }
        setValue(result, rounds)
    }, 1000);

    function addLeadingZeros(time){
        return time < 10 ? `0${time}` : time;
    }

    function start() {
        isStarted = true;
    }

    function pause() {
        isStarted = false;
    }

    function stop(){
        pause();
        reset();
    }

    function reset(){
        let result = '';
        seconds = initialSeconds;
        counterSeconds = seconds%60;
        minutes = Math.floor((seconds/60));
        result += `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
        setValue(`${result}`)
    }

    function setValue(timerValue, roundsValue){
        timerText.textContent = timerValue;
        roundsText.textContent = roundsValue
    }

    function getValue(string){
        if(string === 'timer'){
            return timerText;
        }
        else if(string==='rounds'){
            return roundsText;
        }
        else{
            alert('error');
        }
    }

    return {
        start,
        pause,
        stop,
        reset,
        getValue
    }
}

export default Pomodoro;