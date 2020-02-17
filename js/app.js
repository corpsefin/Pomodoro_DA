import Pomodoro from './Pomodoro.js'
import {Project} from './Project.js'
import SaveFile from './SaveFile.js'

(function(){
    function init(){
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebar = document.getElementById('sidebar');
        const startButton = document.getElementById('startTimer');
        const pauseButton = document.getElementById('pauseTimer');
        const stopButton = document.getElementById('stopTimer');
        const resetButton = document.getElementById('resetTimer');
        const timerElement = document.getElementById('timerContent');
        const addTimerButton = document.getElementById('addTimer');
        const mainWindow = document.getElementById('mainWindow');
        const sidebarItems = document.getElementsByClassName('sidebarItem');

        let timerArray = [];
        let opened=true;
        let modalOpen = false;
        let timer = Pomodoro();
        let newProject = Project('perkele', 5, 'perkeleen projekti');

        //console.log(newProject.getName())

        closeSidebar.addEventListener('click', toggleSidebar);
        addTimerButton.addEventListener('click', (e)=>{
            e.preventDefault();
            toggleTimerModal();
        })

        addTimerButton.addEventListener('click', (e)=>{
            e.preventDefault();
            let newTimer = Pomodoro();
            let newTimerContent = document.createElement('div');
            const modalAddButton = document.getElementById('modalOk')
            newTimerContent.setAttribute('class', 'timerContent')
            modalAddButton.addEventListener('click', (e) =>{
                e.preventDefault();
                timerArray.push(newTimer);
                mainWindow.appendChild(newTimerContent);
                saveToFile(timerArray);
            })
        })

        function saveToFile(data){
            let dataJson = JSON.stringify(data);
            let dataBlob = new Blob([dataJson], {type: 'application/json'});
        }

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

        function setActiveButton(button){
            button.classList.add('active');
        }

        function removeActivePage(button){
            button.classList.remove('active');
        }

        function renderActivePage(){
            window.addEventListener('hashchange', () =>{
                console.log("ikkuna")
                let xhr = new XMLHttpRequest();
                let url = window.location.toString();
                let realUrl = url.split('#', url.length);

                xhr.open('GET', `${realUrl[1]}.html`, true);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        console.log('ready')
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
            })
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
            const time = timer.getTime();
            console.log(time)
            modalContent.setAttribute('id', 'modalContent');

            timerText.textContent = timer.getTime();

            if(!modalOpen){
                modalContent.style.display = 'block';
                modalOpen = true;
            }
            else{
                modalContent.style.display = 'none';
                modalOpen = false;
            }

        }
    };

init();

}());