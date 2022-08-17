require('dotenv').config();
const net = require('net');
const port = process.env.PORT ? process.env.PORT : 6969;
require('./../server/index.js');

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => {
  console.log('trying connection to port', port);
  client.connect({ host: '0.0.0.0', port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const { spawn } = require('child_process');
      const mySpawn = spawn('yarn', ['electron'], { shell: true });
      mySpawn.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      mySpawn.on('close', (code) => {
        console.log('Child process was killed...');
        console.log('Respawning electron...');
        startedElectron = false;
        tryConnection();
      });
    }
  });
};

tryConnection();

client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});
