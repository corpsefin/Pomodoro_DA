const electron = require('electron');

(function(){
    const { app, BrowserWindow } = require('electron');

    function createWindow(){
        let win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        })

        win.loadFile('index.html');
    }

    app.whenReady().then(createWindow);
    app.allowRendererProcessReuse = true;
    app.on('window-all-closed', () =>{
        app.quit();
    });
})();
