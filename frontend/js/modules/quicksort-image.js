'use strict';

const CONSTANTS = {
};

class QuicksortImage {
	constructor(canvas, ctx, imgSrc = 'public/img/cat.png') {
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = new Image();
		this.image.src = imgSrc;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.beforeStart();
		this.image.onload = () => {
			this.start();
		}
	}

	beforeStart() {
		this.ctx.fillStyle = '#ffffff';
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	start() {
		this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
		//this.testRedraw();
		this.runTest();
	}

	testRedraw() {
		let imageData = this.ctx.getImageData(10, 10, 1, 1);
		imageData.data[0] = 0;
		imageData.data[1] = 200;
		imageData.data[2] = 250;
		this.ctx.putImageData(imageData, 10, 10);
	}

	runTest() {
		console.log('we trying');
		let i = 0, j = 0;
		for (let i = 0; i < this.height; i++) {
			console.log('we trying more');
			for (let j = 0; j < this.width; j++) {
				console.log('hi');
				let imageData = this.ctx.getImageData(j, i, 1, 1);
				imageData.data[0] = 255 - imageData.data[0];
				imageData.data[1] = 255 - imageData.data[1];
				imageData.data[2] = 255 - imageData.data[2];
				this.ctx.putImageData(imageData, j, i);
			}
		}
	}

}

export default QuicksortImage;
