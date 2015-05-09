function Dot (diameter) {
  this.$element = $("<div class='dot'></div>").css({
    width : diameter,
    height : diameter
  });
}

Dot.prototype.nibble = function () {
  var newDiameter = this.$element.width() - 1;
  this.$element.css({
    width : newDiameter,
    height : newDiameter
  });
  if (this.isEmpty) {
    this.$element.css({
      backgroundColor : "#FF3D2E"
    });
  }
};

Dot.prototype.isEmpty = function () {
  return this.$element.width() <= 0;
};