'use strict';

const CONSTANTS = {
  radius: 300
};

class CircleImages {
  constructor(canvas, ctx, imgSrc = 'public/img/corgi.png', x, y, radius, w, h) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = imgSrc;
    this.width = null;
    this.height = null;
    this.update();
    this.x = x;
    this.y = y;
    this.radius = radius || CONSTANTS.radius;
    this.w = w;
    this.h = h;
    this.beforeStart();
    this.makeDrawing();
  }

  addBindings() {
    this.update = this.update.bind(this);
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
    let i = 20;
    let x = 0;
    let y = 0;
    let radians = null;
    this.image.onload = () => {
      while (i--) {
        radians = ((i / 20) * 360 * Math.PI) / 180;
        x = this.x + this.radius * Math.cos(radians);
        y = this.y + this.radius * Math.sin(radians);
        this.draw(x, y, this.w, this.h);
      }
    };
  }

  draw(x, y, w, h) {
    this.ctx.beginPath();
    this.ctx.drawImage(this.image, x - w / 2, y - h / 2, w, h);
  }
}

export default CircleImages;
