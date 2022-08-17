require('dotenv').config();
const path = require('path');
const { spawn } = require('child_process');
const express = require('express');
const http = require('http');
const socket = require('socket.io');

// Constants
const port = process.env.PORT || 6969;
let playCount = 0;

console.log('what is ther server port', port);

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socket();
    this.setup();
    this.start();
  }
  setup() {
    this.app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    this.app.use('/js', express.static(path.join(__dirname, '../frontend/js')));
    this.app.use(
      '/styles',
      express.static(path.join(__dirname, '../frontend/styles'))
    );
    this.app.use(
      '/lib',
      express.static(path.join(__dirname, '../frontend/lib'))
    );
    this.app.use(
      '/public',
      express.static(path.join(__dirname, '../frontend/public'))
    );
    this.app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });
    this.io.on('connection', (socket) => {
      console.log('=========== Socket Connected! ===========');
      // Socket listeners...
      socket.on('disconnect', function () {
        console.log('=========== Socket Disconnected! ===========');
      });
      socket.on('RESTART', () => {
        console.log(path.join(__dirname, 'index.js'));
        spawn('touch', [path.join(__dirname, 'index.js')], { shell: true });
      });
      socket.on('ERROR', (data) => {
        console.log('ERROR', data);
      });
      socket.on('MESSAGE', (data) => {
        console.log('MESSAGE', data);
      });
      socket.on('GAME_PLAYED', () => {
        playCount++;
        console.log('GAME_PLAYED', playCount);
      });
    });
    this.io.attach(this.server, {
      cors: {
        origin: '*'
      }
    });
  }
  start() {
    this.server.listen(port, '0.0.0.0', () => {
      console.log(`Start Backend at Port ${port}`);
    });
  }
}

new Server();
