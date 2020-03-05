import Pomodoro from './Pomodoro.js'
import {Project} from './Project.js'

(function(){
    function init(){
        const mainWindow = document.getElementById('mainWindow');
        const timerList = document.getElementById('timerList');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebarItems = document.getElementsByClassName('sidebarItem');
        const addTimer = document.getElementById('modalOk');
        const toggleTimerModalButton = document.getElementById('addTimer');
        const saveTimers = document.getElementById('saveTimers');
        const timeContainer = document.getElementsByClassName('timeContainer');

        let addProjectButton = null;
        let activePage = '';
        let opened=true;
        let timerModalOpen = false;
        let projectModalOpen = false;
        let timerArray = [];
        let projectArray = [];

        saveTimers.addEventListener('click', (e)=>{
            e.preventDefault();
        })

        closeSidebar.addEventListener('click', toggleSidebar);
        toggleTimerModalButton.addEventListener('click', (e)=>{
            e.preventDefault();
            toggleTimerModal();
        })

        addTimer.addEventListener('click', (e) =>{
            e.preventDefault();
            const timerValue = document.getElementById('timerValue');
            const timerName = document.getElementById('timerName');
            const roundsValue = document.getElementById('roundsValue');
            const breakTimeValue = document.getElementById('breakValue');
            const longBreakValue = document.getElementById('longBreakValue');
            const longBreakGap = document.getElementById('longBreakGapValue');
            addNewTimer(timerName.textContent, timerValue, roundsValue, breakTimeValue,longBreakValue, longBreakGap);
        })

        Array.from(timeContainer).forEach(container =>{
            let minutes=0;
            let targetTimerArr = [];
            let targetTimer;
            container.addEventListener('click', (e)=>{
                if(e.target.matches('button')){
                    if(e.target.id.includes('Increment')){
                        targetTimerArr = e.target.id.split('Increment');
                        targetTimer= document.getElementById(`${targetTimerArr[0]}Value`);
                        minutes++;
                        minutes < 10 ? minutes = `0${minutes}` : minutes = minutes;  
                        targetTimer.value = `${minutes}:00`
                    }
                    else if(e.target.id.includes('Decrement')){
                        targetTimerArr = e.target.id.split('Decrement');
                        targetTimer= document.getElementById(`${targetTimerArr[0]}Value`);
                        minutes--;
                        if(minutes < 0){
                            minutes = 0;
                        }
                        minutes < 10 ? minutes = `0${minutes}` : minutes = minutes;
                        targetTimer.value = `${minutes}:00`
                    }                                     
                }
            })
        })

        function addNewTimer(nameInput, timeInput, roundsInput, breakTimeInput, longBreakInput, longBreakGapInput){
            let timerMinutes = 25;
            let timerSeconds = 0;
            let breakTimeMinutes = 5;
            let breakTimeSeconds = 0;
            let longBreakMinutes = 10;
            let longBreakSeconds = 0;
            let longBreakGap = 4;
            if(timeInput.value != ''){
                timerMinutes = parseInt(timeInput.value.substr(0,2));
                timerSeconds = parseInt(timeInput.value.substr(3,4));
            }
            if(breakTimeInput.value != ''){
                breakTimeMinutes = parseInt(breakTimeInput.value.substr(0,2));
                breakTimeSeconds = parseInt(breakTimeInput.value.substr(3,4));
            }
            if(longBreakInput.value != ''){
                longBreakMinutes = parseInt(longBreakInput.value.substr(0,2));
                longBreakSeconds = parseInt(longBreakInput.value.substr(3,4));
            }
            if(longBreakGapInput.value != ''){
                longBreakGap = longBreakGapInput.value;
            }
            let newTimer = Pomodoro(nameInput,((timerMinutes*60)+timerSeconds), roundsInput.value,(breakTimeMinutes*60)+breakTimeSeconds, (longBreakMinutes*60)+longBreakSeconds, longBreakGap);
            timerArray.push(newTimer);

            renderTimer(newTimer)
        }

        function addNewProject(projectName, pomodoroCount,projectDescription){
            const projectTimerValue = document.getElementById('projectTimerValue');
            let newProject = Project(projectName, pomodoroCount, projectDescription);
            addNewTimer(projectName + 'Timer', projectTimerValue);
            projectArray.push(newProject);
        }

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
                            if(realUrl[1] === 'index' || realUrl === null){
                                activePage = realUrl[1];
                                let content = xhr.responseText.split('<main id="mainWindow">');
                                let realContent = content[1].split('</main>');
                                mainWindow.innerHTML = realContent[0];
                                init();
                                dragModalElement(document.getElementById('timerModalContainer'));
                            }
                            else{
                                console.log('projects')
                                activePage = realUrl[1];
                                init();
                                mainWindow.innerHTML = xhr.responseText;
                                addProjectButton = document.getElementById('addProjectButton');
                                addProjectButton.addEventListener('click', (e)=>{
                                    console.log('click')
                                    e.preventDefault();
                                    toggleProjectModal();
                                })
                                dragModalElement(document.getElementById('projectModalContainer'));
                            }
                        }
                    }
                }
                xhr.send();
            }
        }
        
        //READ THROUGH AND TRY TO UNDERSTAND
        function dragModalElement(element){
            let pos1=0,
                pos2=0,
                pos3=0,
                pos4=0;

                if(document.getElementById(element.id + 'Header')){
                    document.getElementById(element.id + 'Header').onmousedown = dragMouseDown;
                }

                function dragMouseDown(e){
                    e=e || window.event;
                    e.preventDefault();
                    pos3=e.clientX;
                    pos4=e.clientY;
                    document.onmouseup = closeDragElement;
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e){
                    e=e || window.event;
                    e.preventDefault();
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;

                    element.style.top = (element.offsetTop - pos2)+'px';
                    element.style.left = (element.offsetLeft - pos1)+'px';
                }

                function closeDragElement(){
                    document.onmouseup = null;
                    document.onmousemove = null;
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
            const timerModalContainer = document.getElementById('timerModalContainer');
            timerModalContainer.setAttribute('id', 'timerModalContainer');

            if(!timerModalOpen){
                timerModalContainer.style.display = 'block';
                timerModalOpen = true;
            }
            else{
                timerModalContainer.style.display = 'none';
                timerModalOpen = false;
            }
        }

        function toggleProjectModal(){
            const timerModalContainer = document.getElementById('projectModalContainer');
            timerModalContainer.setAttribute('id', 'projectModalContainer');

            if(!projectModalOpen){
                timerModalContainer.style.display = 'block';
                projectModalOpen = true;
            }
            else{
                timerModalContainer.style.display = 'none';
                timerModalOpen = false;
            }
        }

        function removeObject(object){
            timerList.removeChild()
            timerArray.pop(object);
        }

        function renderTimer(timer){
            const timerContent = document.createElement('div');
            const timerStartButton = document.createElement('button');
            const timerPauseButton = document.createElement('button');
            const timerStopButton = document.createElement('button');
            const timerResetButton = document.createElement('button');
            const removeTimerButton = document.createElement('button');
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

            removeTimerButton.addEventListener('click', (e)=>{
                e.preventDefault();
                removeObject(e.target)
            })

            timerStartButton.innerHTML = `<p>Start</p>`;
            timerPauseButton.innerHTML = `<p>Pause</p>`;
            timerStopButton.innerHTML = `<p>Stop</p>`;
            timerResetButton.innerHTML = `<p>Reset</p>`;
            removeTimerButton.innerHTML = `<p>X</p>`
            projectName.innerHTML = timer.getTimer();

            timerContent.setAttribute('class', 'timerContent');
            timerStartButton.setAttribute('id', 'startTimer');
            timerPauseButton.setAttribute('id', 'pauseTimer');
            timerStopButton.setAttribute('id', 'stopTimer');
            timerResetButton.setAttribute('id', 'resetTimer');
            removeTimerButton.setAttribute('id', 'removeTimerButton');
            projectName.setAttribute('class', 'projectNameTimerBackground');

            timerContent.append(timer.getTimer(),projectName,projectName,timerStartButton, timerPauseButton, timerStopButton, timerResetButton, removeTimerButton);
            timerList.appendChild(timerContent);
        }
    };
init();
}());