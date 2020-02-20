import Pomodoro from './Pomodoro.js'
import {Project} from './Project.js'

(function(){
    function init(){
        const mainWindow = document.getElementById('mainWindow');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebarItems = document.getElementsByClassName('sidebarItem');
        const modalAddButton = document.getElementById('modalOk');
        const addTimerButton = document.getElementById('addTimer');
        const addProjectButton = document.getElementById('addProjectButton');
        const timerValue = document.getElementById('timerValue');

        let opened=true;
        let modalOpen = false;
        let timerArray = [];


        closeSidebar.addEventListener('click', toggleSidebar);
        addTimerButton.addEventListener('click', (e)=>{
            e.preventDefault();
            toggleTimerModal();
        })

        

        modalAddButton.addEventListener('click', (e) =>{
            e.preventDefault();
            let timerMinutes = 25;
            let timerSeconds = 0;
            if(timerValue.value != ''){
                timerMinutes = timerValue.value.substr(0,2);
                timerSeconds = timerValue.value.substr(3,4);
            }
            let newTimer = Pomodoro('',timerMinutes, timerSeconds, 5);
            timerArray.push(newTimer);
            console.log(timerArray)
            localStorage.setItem('timers', JSON.stringify(newTimer));
            renderTimer(newTimer);
        })

        /*Array.from(JSON.parse(localStorage.getItem('timers'))).forEach(timer=>{
            renderTimer(timer);
        })*/

       /* Array.from(ls).forEach(timer =>{
            renderTimer(timer);
        })*/

        sidebar.addEventListener('click', (e)=>{
            Array.from(sidebarItems).forEach(target =>{
                if(target === e.target && target != closeSidebar){
                    setActiveButton(target);
                    renderActivePage();
                }
                else
                    removeActiveButton(target);
            })
        })

        //ADDING STYLING TO ACTIVE MENU BUTTON
        function setActiveButton(button){
            button.classList.add('active');
        }

        //REMOVING STYLING FROM INACTIVE MENU BUTTON
        function removeActiveButton(button){
            button.classList.remove('active');
        }

        //RENDERING THE ACTIVE PAGE
        function renderActivePage(){
            window.onhashchange = () =>{
                let xhr = new XMLHttpRequest();
                let url = window.location.toString();
                let realUrl = url.split('#', url.length);

                xhr.open('GET', `${realUrl[1]}.html`, true);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        if(xhr.status === 200){
                            if(realUrl[1] === 'index'){
                                let content = xhr.responseText.split('<main id="mainWindow">');
                                let realContent = content[1].split('</main>');
                                mainWindow.innerHTML = realContent[0];
                                init();
                            }
                            else{
                                init();
                                mainWindow.innerHTML = xhr.responseText;
                                addProjectButton.addEventListener('click', (e)=>{
                                    console.log(e.target)
                                })
                            }
                        }
                    }
                }
                xhr.send();
            }
        }

        function toggleSidebar(){
            if(opened){
                sidebar.style.width = '5vmin';
                Array.from(sidebarItems).forEach(sidebarItem => {
                    sidebarItem.style.left = '-10em';
                });
                opened = false;
            }
            else{
                sidebar.style.width = '35vmin';
                Array.from(sidebarItems).forEach(sidebarItem => {
                    sidebarItem.style.left = '0em';
                });
                opened=true;
            }
        }

        function toggleTimerModal(){
            const modalContent = document.getElementById('modalContent');
            const timerText = document.getElementById('modalTimer');
            modalContent.setAttribute('id', 'modalContent');

            if(!modalOpen){
                modalContent.style.display = 'block';
                modalOpen = true;
            }
            else{
                modalContent.style.display = 'none';
                modalOpen = false;
            }
        }

        function renderTimer(timer){
            const timerContent = document.createElement('div');
            const timerStartButton = document.createElement('button');
            const timerPauseButton = document.createElement('button');
            const timerStopButton = document.createElement('button');
            const timerResetButton = document.createElement('button');

            //timerText.textContent = timer.getTime();
            timerContent.appendChild(timer.renderTimerValue());
            timerContent.appendChild(timer.renderTimerRounds());


            timerStartButton.addEventListener('click', (e) =>{
                e.preventDefault();
                timer.start();
            })

            timerPauseButton.addEventListener('click', (e)=>{
                e.preventDefault();
                timer.pause();
            })

            timerStopButton.addEventListener('click', (e)=>{
                e.preventDefault();
                timer.stop();
            })

            timerResetButton.addEventListener('click', (e)=>{
                e.preventDefault();
                timer.reset();
            })

            timerStartButton.innerHTML = `<p>Start</p>`;
            timerPauseButton.innerHTML = `<p>Pause</p>`;
            timerStopButton.innerHTML = `<p>Stop</p>`;
            timerResetButton.innerHTML = `<p>Reset</p>`;

            timerContent.setAttribute('id', 'timerContent');
            timerStartButton.setAttribute('id', 'startTimer');
            timerPauseButton.setAttribute('id', 'pauseTimer');
            timerStopButton.setAttribute('id', 'stopTimer');
            timerResetButton.setAttribute('id', 'resetTimer');

            timerContent.append(timerStartButton, timerPauseButton, timerStopButton, timerResetButton);
            mainWindow.appendChild(timerContent);
        }
    };

init();
}());