const { app, BrowserWindow } = require('electron')
const dev = process.argv.includes('--development');
console.log(process.argv);

function createWindow () {
	const win = new BrowserWindow({
		width: 170,
		//the default size is just enough to show the timer, but if the menu is visible it's too small
		height: 90 + (dev ? 30 : 0),
		webPreferences: {
			nodeIntegration: true
		}
	})

	//for the production build remove the menu bar on the window, but we want it
	//for dev because it allows dev tools to be opened
	if (!dev) {
		win.removeMenu();
	}
	win.loadFile('index.html')
}

app.whenReady().then(createWindow)