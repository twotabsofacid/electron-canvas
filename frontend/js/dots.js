'use strict';

const CONSTANTS = {
	interval: 10,
	duration: 2000,
	width: 5
};

const TakeScreenshot = require('./../helpers/take-screenshot');

class Dots {
	constructor(canvas, ctx, shouldTakeScreenshots = false) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.colorSwitchCount = 0;
		this.width = null;
		this.height = null;
		this.interval = null;
		this.counter = 0;
		this.screenshot = shouldTakeScreenshots;
		this.addBindings();
		this.addListeners();
		this.update();
		this.beforeStart();
		this.makeDrawing();
	}

	addBindings() {
		this.update = this.update.bind(this);
		this.updateDrawing = this.updateDrawing.bind(this);
	}

	addListeners() {
		window.addEventListener('resize', this.update);
	}

	update() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
	}

	beforeStart() {
		this.ctx.fillStyle = '#ffffff';
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	makeDrawing() {
		this.interval = window.setInterval(this.updateDrawing, CONSTANTS.interval);
	}

	stopDrawing() {
		window.clearInterval(this.interval);
	}

	updateDrawing() {
		this.draw(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height));
		this.counter++;
		this.colorSwitchCount = (this.colorSwitchCount + 1) % 3;
		if (this.counter % 100 === 0 && this.screenshot) {
			this.takeScreenshot(this.counter / 100);
		}
		if (this.counter >= CONSTANTS.duration) {
			this.stopDrawing();
		}
	}

	draw(x, y) {
		let rgbString;
		this.ctx.beginPath();
		this.ctx.translate(this.width/2, this.height/2);
		this.ctx.rotate(1.2*Math.PI/180);
		this.ctx.translate(-this.width/2, -this.height/2);
		this.ctx.arc(x, y, CONSTANTS.width, 0, 2 * Math.PI, false);
		switch(this.colorSwitchCount) {
			case 0:
				rgbString = 'rgb(' + Math.floor((x/this.width)*255) + ', ' + Math.floor((y/this.height)*255) + ', 100)';
				break;
			case 1:
				rgbString = 'rgb(100, ' + Math.floor((x/this.width)*255) + ', ' + Math.floor((y/this.height)*255) + ')';
				break;
			case 2:
				rgbString = 'rgb(' + Math.floor((x/this.width)*255) + ', 100,' + Math.floor((y/this.height)*255) + ')';
				break;
			default:
				rgbString = 'rgb(' + Math.floor((x/this.width)*255) + ', ' + Math.floor((y/this.height)*255) + ', 100)';
		}
		this.ctx.fillStyle = rgbString;
		this.ctx.fill();
	}

	takeScreenshot(index) {
		new TakeScreenshot(index, 'screenshots/dots-');
	}
}

module.exports = Dots;