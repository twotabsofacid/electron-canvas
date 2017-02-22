'use strict';

const Lines = require('./modules/lines');
const Dots = require('./modules/dots');
const Image = require('./modules/image');

class Renderer {
	constructor() {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.width = null;
		this.height = null;
		this.addBindings();
		this.addListeners();
		this.update();
		new Lines(this.canvas, this.ctx, false);
		//new Dots(this.canvas, this.ctx);
		new Image(this.canvas, this.ctx, true, 'img/corgi.png');
	}

	addBindings() {
		this.update = this.update.bind(this);
	}

	addListeners() {
		window.addEventListener('resize', this.update);
	}

	update() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}
}

new Renderer();