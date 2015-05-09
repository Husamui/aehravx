function Terrain(size, cell_size) {
  this.things = size * size;
  this.size = size;
  this.cell_size = cell_size;
  this.$element = $('#terrain');
  this.dotArray = [];
}

Terrain.prototype.renderLandscape = function () {
  for (var r = 0; r < this.size; r++) {
    var dotRow = [];
    var $row = this.generateRow(this.cell_size);
    for (var c = 0; c < this.size; c++) {
      var dot = new Dot(diameter);
      var diameter = Math.round(Math.random() * this.cell_size);
      dotRow.push(dot);
      var $cell = this.generateCell(this.cell_size);
      this.$element.append($row.append($cell.append(dot.$element)));
    }
    this.dotArray.push(dotRow);
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

Terrain.prototype.updateCounter = function (diameter) {
  // this.things
}