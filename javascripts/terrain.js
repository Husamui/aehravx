function Terrain(size, cell_size) {
  this.things = size * size;
  this.size = size;
  this.cell_size = cell_size;
  this.landscape = generateRandMatrix(this.size);
  this.$element = $('#terrain');
};

Terrain.prototype.printLandscape = function() {
  this.clearLandscape();
  for (var r = 0; r < this.size; r++) {
    var $row = $("<div class='row'></div>").height(this.cell_size)
    this.$element.append($row);
    for (var c = 0; c < this.size; c++) {
      var $cell = $("<div class='cell'></div>").css({
        width : this.cell_size,
        height : this.cell_size
      });
      var diameter = Math.round(this.landscape[r][c] * this.cell_size);
      var $dot = $("<div class='dot'></div>").css({
        width : diameter,
        height : diameter
      });
      if (this.landscape[r][c] === 0) {
        cell.style.background = "#FF3D2E";
      }
      $cell.append($dot);
      $row.append($cell);
    }
  }
  var $counter = $('#counter');
  $counter.text(this.things + " unconsumed things");
  this.things--;
};

Terrain.prototype.clearLandscape = function () {
  this.$element.empty();
};