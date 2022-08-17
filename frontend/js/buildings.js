let buildings = [];
const totalBuildings = 40;
const buildingWidth = 40;
const buildingFloorHeight = 5;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fill(255);
  // noFill();
  stroke(0);
  rectMode(CENTER);
  createBuildings();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createBuildings();
}

function createBuildings() {
  buildings = [];
  let xMap = Array.from(Array(totalBuildings).keys());
  let yMap = Array.from(Array(totalBuildings).keys());
  for (let i = 0; i < totalBuildings; i++) {
    let x = xMap.splice(floor(random(0, xMap.length)), 1)[0];
    let y = yMap.splice(floor(random(0, yMap.length)), 1)[0];
    buildings.push(
      new Building(
        map(x, 0, totalBuildings, 0, width),
        map(y, 0, totalBuildings, 0, height),
        floor(random(10, 100)),
        floor(random(10, 50))
      )
    );
  }
  buildings = buildings.sort((a, b) => {
    return b.x - a.x;
  });
  buildings = buildings.sort((a, b) => {
    return a.y - b.y;
  });
}

function draw() {
  background(255);
  buildings.forEach((building) => {
    building.draw();
  });
}

class Building {
  constructor(_x, _y, _width, _height) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
  }
  draw() {
    for (let i = 0; i < this.height; i++) {
      quad(
        this.x,
        this.y - i * buildingFloorHeight,
        this.x - this.width,
        this.y - i * buildingFloorHeight - this.width / 2,
        this.x,
        this.y - i * buildingFloorHeight - this.width,
        this.x + this.width,
        this.y - i * buildingFloorHeight - this.width / 2
      );
    }
  }
}
