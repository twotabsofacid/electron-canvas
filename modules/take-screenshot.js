'use strict';

const remote = require('electron').remote;
const fs = require('fs-jetpack');

class TakeScreenshot {
	constructor(index, dir) {
		this.browserWindow = remote.getCurrentWindow();
		this.directory = dir || 'screenshots/take-';
		this.takeScreenshot(index);
	}
	takeScreenshot(index) {
		this.browserWindow.capturePage((img) => {
			fs.writeAsync(this.directory + index + '.png', img.toPng());
		});
	}
}

module.exports = TakeScreenshot;