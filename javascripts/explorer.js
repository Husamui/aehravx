function Explorer(terrain) {
  this.terrain = terrain;
  this.grid = terrain.grid;
  this.size = this.grid.length;
  this.x = this.size / 2;
  this.y = this.size / 2;
  this.options = { up: 0, right: 0, down: 0, left: 0 };
  this.direction = null;
  this.finished = false;
}

Explorer.prototype.chooseDirection = function() {
  var highestAltitude = 0;
  var newDir = 'stop';
  for (var dir in this.options) {
    var altitude = this.options[dir];
    if (dir !== opposite(this.direction) && altitude > highestAltitude) {
      highestAltitude = altitude;
      newDir = dir;
    }
  }
  this.direction = newDir;
};

Explorer.prototype.move = function() {
  this.grid[this.y][this.x].nibble();
  this.terrain.decrementCounter();
  switch(this.direction) {
    case 'up':
      this.y--; break;
    case 'right':
      this.x++; break;
    case 'down':
      this.y++; break;
    case 'left':
      this.x--; break;
    default:
      this.finished = true;
  }
};

Explorer.prototype.blockedAt = function(dir) {
  var blocked = false;
  switch(dir) {
    case 'up':
      blocked = this.y === 0; break;
    case 'right':
      blocked = this.x === this.size - 1; break;
    case 'down':
      blocked = this.y === this.size - 1; break;
    case 'left':
      blocked = this.x === 0; break;
  }
  return blocked;
};

Explorer.prototype.look = function(dir) {
  var altitude;
  if (this.blockedAt(dir)) {
    altitude = 0;
  } else {
    switch(dir) {
      case 'up':
        altitude = this.grid[this.y-1][this.x].foodCount(); break;
      case 'right':
        altitude = this.grid[this.y][this.x+1].foodCount(); break;
      case 'down':
        altitude = this.grid[this.y+1][this.x].foodCount(); break;
      case 'left':
        altitude = this.grid[this.y][this.x-1].foodCount(); break;
    }
  }
  this.options[dir] = altitude;
};

Explorer.prototype.lookAround = function() {
  for (var dir in this.options) {
    this.look(dir);
  }
};