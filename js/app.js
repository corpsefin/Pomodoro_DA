import Timer from './Timer.js'
(function(){
    let closeSidebar = document.getElementById('closeSidebar');
    let opened=true;

    closeSidebar.addEventListener('click', toggleSidebar);

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

    function render(url){
        
    }

    function renderTimerPage(){

    }

    function renderProjectsPage(){

    }
})();