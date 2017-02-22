'use strict';

const CONSTANTS = {
	interval: 40,
	duration: 500
};

const TakeScreenshot = require('./take-screenshot');

class Images {
	constructor(canvas, ctx, shouldTakeScreenshots = false, imgSrc = 'img/corgi.png') {
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = new Image();
		this.image.src = imgSrc;
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
		this.ctx.beginPath();
		this.ctx.translate(this.width/2, this.height/2);
		this.ctx.rotate(1.2*Math.PI/180);
		this.ctx.translate(-this.width/2, -this.height/2);
		this.ctx.drawImage(this.image, x, y);
	}

	takeScreenshot(index) {
		new TakeScreenshot(index, 'screenshots/image-');
	}
}

module.exports = Images;