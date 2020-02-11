import Pomodoro from './Pomodoro.js'
(function(){
    const closeSidebar = document.getElementById('closeSidebar');
    const startButton = document.getElementById('startTimer');
    const pauseButton = document.getElementById('pauseTimer');
    const stopButton = document.getElementById('stopTimer');
    const resetButton = document.getElementById('resetTimer');
    let opened=true;

    let timer = Pomodoro(timerText.textContent.substr(0,2),timerText.textContent.substr(3,4));

    closeSidebar.addEventListener('click', toggleSidebar);

    startButton.addEventListener('click', (e)=>{
        e.preventDefault();
        timer.start();
    })
    pauseButton.addEventListener('click',(e)=>{
        e.preventDefault();
        timer.pause();
    })

    stopButton.addEventListener('click', (e)=>{
        e.preventDefault();
        timer.stop();
    })

    resetButton.addEventListener('click', (e)=>{
        e.preventDefault();
        timer.reset();
    })

    function toggleSidebar(){
        let sidebar = document.getElementById('sidebar');
        let sidebarItems = document.getElementsByClassName('sidebarItem');

        if(opened){
            sidebar.style.width = '3vw';
            Array.from(sidebarItems).forEach(sidebarItem => {
                sidebarItem.style.left = '-10em';
            });
            opened = false;
        }
        else{
            sidebar.style.width = '20vw';
            Array.from(sidebarItems).forEach(sidebarItem => {
                sidebarItem.style.left = '0em';
            });
            opened=true;
        }
    }
}());