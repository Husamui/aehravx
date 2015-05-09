function Terrain(size, cell_size) {
  this.things = Math.pow(size, 2);
  this.size = size;
  this.cell_size = cell_size;
  this.$element = $('#terrain');
  this.grid = [];
}

Terrain.prototype.renderEmptyLandscape = function () {
  for (var r = 0; r < this.size; r++) {
    var $row = this.generateRow(this.cell_size);
    for (var c = 0; c < this.size; c++) {
      var dot = new Dot(0);
      var $cell = this.generateCell(this.cell_size);
      this.$element.append($row.append($cell.append(dot.$element)));
    }
  }
}

Terrain.prototype.renderLandscape = function () {
  this.$element.empty();
  for (var r = 0; r < this.size; r++) {
    var dotRow = [];
    var $row = this.generateRow(this.cell_size);
    for (var c = 0; c < this.size; c++) {
      var diameter = Math.round(Math.random() * this.cell_size);
      var dot = new Dot(diameter);
      dotRow.push(dot);
      var $cell = this.generateCell(this.cell_size);
      this.$element.append($row.append($cell.append(dot.$element)));
    }
    this.grid.push(dotRow);
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

Terrain.prototype.decrementCounter = function () {
  this.things--;
  $('#counter').text(this.things);
};