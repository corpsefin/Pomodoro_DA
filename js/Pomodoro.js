const Pomodoro = (name='',seconds, rounds, breakSeconds) => {

    name;

    const initialSeconds = seconds;
    const intialBreakSeconds = breakSeconds;
    const initialRounds = rounds;

    let counterSeconds = seconds%60;
    let minutes = Math.floor((seconds/60));
    let breakMinutes = Math.floor((breakSeconds/60));
    let endSound = new Audio('../audio/bell.mp3');
    let isStarted = false;
    let breakTimer = false;
    let timerText = document.createElement('h1');
    let roundsText = document.createElement('h3');
    let initialResult = `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
    setValue(initialResult, rounds);

    setInterval(() => {
        minutes = Math.floor((seconds/60));
        counterSeconds = Math.floor(seconds%60);
        breakMinutes = Math.floor((breakSeconds/60));
        let result = '';
        if (isStarted) {
            if(!breakTimer){
                seconds--;
                result += `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
            }
            else{
                breakSeconds--;
                counterSeconds = Math.floor((breakSeconds%60));
                result += `${addLeadingZeros(breakMinutes)}:${addLeadingZeros(counterSeconds)}`;
            }
        }
        if(seconds < 0 && minutes < 0){
            rounds--;
            console.log(rounds)
            endSound.play();
            reset();
            breakTimer = true;
        }
        else if(breakSeconds <= 0 && breakMinutes <= 0){
            breakTimer = false;
            endSound.play();
            reset();
        }
        if(rounds <= 0){
            stop();
        }
        setValue(result, rounds)
    }, Math.floor(1000));

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
        breakSeconds = intialBreakSeconds;
        counterSeconds = seconds%60;
        minutes = Math.floor((seconds/60));
        breakMinutes = Math.floor(breakSeconds/60);
        result += `${addLeadingZeros(minutes)}:${addLeadingZeros(counterSeconds)}`;
        setValue(`${result}`)
    }

    function setValue(timerValue, roundsValue){
        timerText.textContent = timerValue;
        roundsText.textContent = roundsValue;
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

    function getName(){
        return name;
    }

    return {
        start,
        pause,
        stop,
        reset,
        getValue,
        getName
    }
}

export default Pomodoro;