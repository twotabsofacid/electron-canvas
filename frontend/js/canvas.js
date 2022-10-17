'use strict';

/**
 * REQUIRED MODULES
 *
 * Require all your modules here.
 * Modules should be in the /modules folder.
 */
import Rectangles from './modules/rectangles.js';
import Lines from './modules/lines.js';
import Dots from './modules/dots.js';
import Image from './modules/image.js';
import CircleImage from './modules/circle-image.js';
import QuicksortImage from './modules/quicksort-image.js';

class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.width = null;
    this.height = null;
    this.addBindings();
    this.addListeners();
    this.update();
    this.run();
    new TakeScreenshotOnSpacebar();
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

  run() {
    new Rectangles(this.canvas, this.ctx, false);
    new Lines(this.canvas, this.ctx, false);
    new Dots(this.canvas, this.ctx);
    // new Image(this.canvas, this.ctx, 'public/img/zizek.png');
    // new CircleImage(this.canvas, this.ctx, 'public/img/corgi.png', 0, 0, 300, 50, 59);
    //new CircleImage(this.canvas, this.ctx, 'public/img/corgi.png', this.width, 0, 300, 50, 59);
    // new CircleImage(this.canvas, this.ctx, 'public/img/corgi.png', 0, this.height, 300, 50, 59);
    // new CircleImage(this.canvas, this.ctx, 'public/img/corgi.png', this.width, this.height, 300, 50, 59);
    // new CircleImage(this.canvas, this.ctx, 'public/img/tea.png', 260, 260, 300, 80, 80);
    // new CircleImage(this.canvas, this.ctx, 'public/img/tea.png', this.width - 260, 260, 300, 80, 80);
    // new CircleImage(this.canvas, this.ctx, 'public/img/tea.png', 260, this.height - 260, 300, 80, 80);
    // new CircleImage(this.canvas, this.ctx, 'public/img/tea.png', this.width - 260, this.height - 260, 300, 80, 80);
    // new CircleImage(this.canvas, this.ctx, 'public/img/corgi.png', this.width/2, this.height/2, 300, 100, 118);
    // new QuicksortImage(this.canvas, this.ctx, 'public/img/cat.png');
  }
}

new Renderer();
