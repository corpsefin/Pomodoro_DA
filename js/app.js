import Pomodoro from './Pomodoro.js'
import {Project} from './Project.js'

(function(){
    function init(){
        const mainWindow = document.getElementById('mainWindow');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebarItems = document.getElementsByClassName('sidebarItem');
        const modalAddButton = document.getElementById('modalOk')

        let opened=true;
        let modalOpen = false;
        let timerArray = [];
        localStorage.setItem('timers',timerArray);

        //let defaultTimer = Pomodoro();

        //timerArray.push(defaultTimer);
        let ls = localStorage.getItem('timers');
        console.log(ls)
        console.log(timerArray)

        /*localStorage.getItem('timers').forEach(timer =>{
            renderTimer(timer);
            console.log('a')
        })*/

        const startButton = document.getElementById('startTimer');
        const pauseButton = document.getElementById('pauseTimer');
        const stopButton = document.getElementById('stopTimer');
        const resetButton = document.getElementById('resetTimer');
        const addTimerButton = document.getElementById('addTimer');
        const timerContent = document.getElementById('timerContent');

        closeSidebar.addEventListener('click', toggleSidebar);
        addTimerButton.addEventListener('click', (e)=>{
            e.preventDefault();
            toggleTimerModal();
        })

        addTimerButton.addEventListener('click', (e)=>{
            e.preventDefault();
            console.log(timerArray)
        })

        modalAddButton.addEventListener('click', (e) =>{
            e.preventDefault();
            let newTimer = Pomodoro();
            timerArray.push(newTimer);
            console.log('timeeerin lissä')
            renderTimer(newTimer);
            //saveToFile(timerArray);
        })



       /* function saveToFile(data){
            let dataJson = JSON.stringify(data);
            let dataBlob = new Blob([dataJson], {type: 'application/json'});
        }*/


        sidebar.addEventListener('click', (e)=>{
            Array.from(sidebarItems).forEach(target =>{
                if(target === e.target && target != closeSidebar){
                    setActiveButton(target);
                    renderActivePage();
                }
                else
                    removeActivePage(target);
            })
        })

        //ADDING STYLING TO ACTIVE MENU BUTTON
        function setActiveButton(button){
            button.classList.add('active');
        }

        //REMOVING STYLING FROM INACTIVE MENU BUTTON
        function removeActivePage(button){
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
                                mainWindow.innerHTML = xhr.responseText;
                                const asdasd = document.getElementById('perke');
                                asdasd.style.color = "red";  
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

        function updateTimer(timer){
            timerText.textContent = timer.getTime();
        }

        function renderTimer(timer){
            const timerContent = document.createElement('div');
            const timerStartButton = document.createElement('button');
            const timerPauseButton = document.createElement('button');
            const timerStopButton = document.createElement('button');
            const timerResetButton = document.createElement('button');

            timerStartButton.addEventListener('click', (e) =>{
                e.preventDefault();
                timer.start();
            })

            let timerText = document.createElement('h1');

            timerText.setAttribute('id', 'timerText');

            timerText.textContent = timer.getTime();
            timerStartButton.innerHTML = `<p>Start</p>`;
            timerPauseButton.innerHTML = `<p>Pause</p>`;
            timerStopButton.innerHTML = `<p>Stop</p>`;
            timerResetButton.innerHTML = `<p>Reset</p>`;

            timerContent.setAttribute('id', 'timerContent');
            timerStartButton.setAttribute('id', 'startTimer');
            timerPauseButton.setAttribute('id', 'pauseTimer');
            timerStopButton.setAttribute('id', 'stopTimer');
            timerResetButton.setAttribute('id', 'resetTimer');

            timerContent.append(timerText,timerStartButton, timerPauseButton, timerStopButton, timerResetButton);
            mainWindow.appendChild(timerContent);
        }
    };

init();

}());