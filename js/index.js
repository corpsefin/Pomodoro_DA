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

        win.loadFile('./views/index.html');
    }

    app.whenReady().then(createWindow);
    app.allowRendererProcessReuse = true;
    app.getPath
    app.on('window-all-closed', () =>{
        app.quit();
    });
})();
