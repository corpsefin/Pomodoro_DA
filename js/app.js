import Pomodoro from './Pomodoro.js'
import {Project} from './Project.js'

(function(){
    function init(){
        const mainWindow = document.getElementById('mainWindow');
        const timerList = document.getElementById('timerList');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebarItems = document.getElementsByClassName('sidebarItem');
        const modalAddButton = document.getElementById('modalOk');
        const addTimerButton = document.getElementById('addTimer');
        const saveTimers = document.getElementById('saveTimers');
        const timerValue = document.getElementById('timerValue');

        let opened=true;
        let modalOpen = false;
        let timerArray = [];

        saveTimers.addEventListener('click', (e)=>{
            e.preventDefault();
        })

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
                timerMinutes = parseInt(timerValue.value.substr(0,2));
                timerSeconds = parseInt(timerValue.value.substr(3,4));
            }
            let newTimer = Pomodoro('',((timerMinutes*60)+timerSeconds), 5);
            timerArray.push(newTimer);
            if(localStorage.getItem('timers') === null)
                localStorage.setItem('timers', JSON.stringify(newTimer));
            renderTimer(newTimer);

            console.log(timerArray)
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
                                const addProjectButton = document.getElementById('addProjectButton');
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

        mainWindow.addEventListener('click', (e)=>{
            dragElement(e.target)
        })

        function dragElement(element){
            let pos1 = 0;
            let pos2 = 0;
            let pos3 = 0;
            let pos4 = 0;

            console.log(element.id)
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
            const projectName = document.createElement('h1');

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
            projectName.innerHTML = 'PREJCT';

            timerContent.setAttribute('class', 'timerContent');
            timerStartButton.setAttribute('id', 'startTimer');
            timerPauseButton.setAttribute('id', 'pauseTimer');
            timerStopButton.setAttribute('id', 'stopTimer');
            timerResetButton.setAttribute('id', 'resetTimer');
            projectName.setAttribute('class', 'projectNameTimerBackground');

            timerContent.append(projectName,timer.getValue('timer'),timer.getValue('rounds'),timerStartButton, timerPauseButton, timerStopButton, timerResetButton);
            timerList.appendChild(timerContent);
        }
    };

init();
}());