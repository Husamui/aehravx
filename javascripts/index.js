$(document).ready(function () {
	var board = document.getElementById('terrain')
	var body = document.body

	function terrain(size, cell_size) {
		this.things = size * size;
		this.size = size;
		this.cell_size = cell_size;
		var generateLandscape = function(size) {
			var landscape = [];
			for (var i = 0; i < size; i++) {
				var row = [];
				for (var j = 0; j < size; j++) {
					row.push(Math.random());
				}
				landscape.push(row);
			}
			return landscape;
		};
		this.landscape = generateLandscape(size);
		this.printLandscape = function() {
			this.clearLandscape();
			for (var r = 0; r < this.size; r++) {
				var row = document.createElement('div')
				row.className = "row";
				row.style.height = this.cell_size + "px";
				board.appendChild(row);
				for (var c = 0; c < this.size; c++) {
					var cell = document.createElement('div');
					cell.className = "cell";
					cell.style.width = this.cell_size + "px";
					cell.style.height = this.cell_size + "px";
					var dot = document.createElement('div');
					dot.className = "dot";
					var diameter = Math.round(this.landscape[r][c] * this.cell_size);
					dot.style.width = diameter + "px";
					dot.style.height = diameter + "px";
					if (this.landscape[r][c] === 0) {
						cell.style.background = "#FF3D2E";
					}
					cell.appendChild(dot);
					row.appendChild(cell);
				}
			}
			var counter = document.getElementById('counter');
			counter.innerHTML = this.things + " unconsumed things";
			this.things--;
		};
		this.clearLandscape = function() {
			while (board.firstChild) {
				board.removeChild(board.firstChild);
			}
		};
	};

	function explorer(terrain) {
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

	document.addEventListener("DOMContentLoaded", function(event) {
		var sawtoothMountains = new terrain(30,12);
		sawtoothMountains.printLandscape();
	});

	document.body.onkeyup = function(e) {
		if(e.keyCode == 13) {
			var sawtoothMountains = new terrain(30,12);
			sawtoothMountains.printLandscape();
			new explorer(sawtoothMountains);
		}
	}

});

