'use strict';

const remote = require('electron').remote;
const fs = require('fs-jetpack');

class TakeScreenshotOnSpacebar {
	constructor() {
		this.index = 0;
		this.browserWindow = remote.getCurrentWindow();
		this.directory = 'screenshots/take-';
		this.addListeners();
	}
	addListeners() {
		document.body.addEventListener('keydown', this.onKeypressed.bind(this));
	}
	onKeypressed(e) {
		if (e.keyCode === 32) {
			this.takeScreenshot();
		}
	}
	takeScreenshot() {
		this.index++;
		this.browserWindow.capturePage((img) => {
			fs.writeAsync(this.directory + this.index + '.jpg', img.toJpeg(80));
		});
	}
}

module.exports = TakeScreenshotOnSpacebar;