'use strict';

const CONSTANTS = {
	interval: 10,
	duration: 2000,
	width: 2
};



class Lines {
	constructor(canvas, ctx) {
		console.log('we load the lines');
		this.canvas = canvas;
		this.ctx = ctx;
		this.width = null;
		this.height = null;
		this.interval = null;
		this.counter = 0;
		this.addBindings();
		this.addListeners();
		this.update();
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

	makeDrawing() {
		this.interval = window.setInterval(this.updateDrawing, CONSTANTS.interval);
	}

	stopDrawing() {
		window.clearInterval(this.interval);
	}

	updateDrawing() {
		this.draw(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height));
		this.counter++;
		if (this.counter >= CONSTANTS.duration) {
			this.stopDrawing();
		}
	}

	draw(x, y) {
		this.ctx.beginPath();
		this.ctx.translate(this.width/2, this.height/2);
		this.ctx.rotate(1.2*Math.PI/180);
		this.ctx.translate(-this.width/2, -this.height/2);
		this.ctx.rect(x, 0, CONSTANTS.width, this.height);
		var rgbString1 = 'rgb(' + Math.floor((x/this.width)*255) + ', ' + Math.floor((y/this.height)*255) + ', 100)';
		var rgbString2 = 'rgb(100, ' + Math.floor((x/this.width)*255) + ', ' + Math.floor((y/this.height)*255) + ')';
		var rgbString3 = 'rgb(' + Math.floor((x/this.width)*255) + ', 100,' + Math.floor((y/this.height)*255) + ')';
		this.ctx.fillStyle = rgbString1;
		this.ctx.fill();
	}
}

module.exports = Lines;