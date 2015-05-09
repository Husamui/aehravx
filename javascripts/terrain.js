function Terrain(size, cell_size) {
  this.things = size * size;
  this.size = size;
  this.cell_size = cell_size;
  this.$element = $('#terrain');
};

Terrain.prototype.renderLandscape = function () {
  for (var r = 0; r < this.size; r++) {
    var $row = this.generateRow(this.cell_size);
    for (var c = 0; c < this.size; c++) {
      var $cell = this.generateCell(this.cell_size);
      var diameter = Math.round(Math.random() * this.cell_size);
      var $dot = this.generateDot(diameter);
      this.$element.append($row.append($cell.append($dot)));
    }
  }
};

Terrain.prototype.generateRow = function (height) {
  return $("<div class='row'></div>").height(height);
};

Terrain.prototype.generateCell = function (size) {
  return $("<div class='cell'></div>").css({
    width : size,
    height : size
  });
};

Terrain.prototype.generateDot = function (diameter) {
  return $("<div class='dot'></div>").css({
    width : diameter,
    height : diameter
  });
};