function Explorer(terrain) {
  var terrain = terrain;
  var grid = terrain.landscape;
  var size = grid.length;
  var x = size / 2;
  var y = size / 2;
  var options = { up: 0, right: 0, down: 0, left: 0};
  var direction = null;
  var finished = false;

  var opposite = function(dir) {
    var oppositeDir;
    switch(dir) {
      case "up":
        oppositeDir = "down";
        break;
      case "down":
        oppositeDir = "up";
        break;
      case "left":
        oppositeDir = "right";
        break;
      case "right":
        oppositeDir = "left";
        break;
    }
    return oppositeDir;
  }

  var chooseDirection = function() {
    var highestAltitude = 0;
    var newDir = "stop"
    for (var dir in options) {
      var altitude = options[dir];
      if (dir !== opposite(direction) && altitude > highestAltitude) {
        highestAltitude = altitude;
        newDir = dir;
      }
    }
    direction = newDir;
  };

  var move = function(dir) {
    grid[y][x] = 0;
    switch(dir) {
      case "up":
        y--;
        break;
      case "right":
        x++;
        break;
      case "down":
        y++;
        break;
      case "left":
        x--;
        break;
      default:
        finished = true;
    }
  };

  var blockedAt = function(dir) {
    var blocked = false;
    switch(dir) {
      case "up":
        blocked = y === 0;
        break;
      case "right":
        blocked = x === size - 1;
        break;
      case "down":
        blocked = y === size - 1;
        break;
      case "left":
        blocked = x === 0;
        break;
    }
    return blocked;
  };

  var look = function(dir) {
    if (blockedAt(dir)) {
      altitude = 0;
    } else {
      switch(dir) {
        case "up":
          altitude = grid[y-1][x];
          break;
        case "right":
          altitude = grid[y][x+1];
          break;
        case "down":
          altitude = grid[y+1][x];
          break;
        case "left":
          altitude = grid[y][x-1];
          break;
      }
    }
    options[dir] = altitude;
  };

  var lookAround = function() {
    for (var dir in options) {
      look(dir);
    }
  };

  var explore = setInterval(function() {
    resetIfDone();
    lookAround();
    chooseDirection();
    move(direction);
    terrain.printLandscape();
  }, 10);

  var resetIfDone = function() {
    if (finished) {
      clearInterval(explore);
    }
  };
};