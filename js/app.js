import Pomodoro from './Pomodoro.js'
import {Project} from './Project.js'
(function(){
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const startButton = document.getElementById('startTimer');
    const pauseButton = document.getElementById('pauseTimer');
    const stopButton = document.getElementById('stopTimer');
    const resetButton = document.getElementById('resetTimer');
    const timerElement = document.getElementById('timerContent');
    const modalAddButton = document.getElementById('modalOk')
    const addTimerButton = document.getElementById('addTimer');
    const mainWindow = document.getElementById('mainWindow');
    const sidebarItems = document.getElementsByClassName('sidebarItem');

    let opened=true;
    let modalOpen = false;
    let timer = Pomodoro(timerText.textContent.substr(0,2),timerText.textContent.substr(3,4));
    let newProject = Project('perkele', 5, 'perkeleen projekti');

    //console.log(newProject.getName())

    closeSidebar.addEventListener('click', toggleSidebar);
    addTimerButton.addEventListener('click', (e)=>{
        e.preventDefault();
        toggleTimerModal();
    })

    modalAddButton.addEventListener('click', (e)=>{
        e.preventDefault();
        let newTimer = Pomodoro(timerText.textContent.substr(0,2),timerText.textContent.substr(3,4));
        let newTimerContent = document.createElement('div');
    })

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
            if(target === e.target && target != closeSidebar)
                setActivePage(target);
            else
                removeActivePage(target);
        })
    })

    function setActivePage(page){
        page.classList.add('active');
    }

    function removeActivePage(page){
        page.classList.remove('active');
    }

    function renderActivePage(url){
        //mainWindow.innerHTML = 
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

    window.addEventListener('hashchange', () =>{
        let xhr = new XMLHttpRequest();


        let url = window.location.toString();
        let realUrl = url.split('#', url.length);
        //console.log(realUrl[1])
        xhr.open('GET', `${realUrl[1]}.html`, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                console.log('ready')
                if(xhr.status === 200){
                    if(realUrl[1] === 'index')
                    //FIXME: Write code here that gets the mainWindow elements content from index.html
                        console.log('index')
                    mainWindow.innerHTML = xhr.responseText;
                }
            }
            //console.log(xhr);
        }
        xhr.send();

    })
}());