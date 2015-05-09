function Dot (diameter) {
  this.$element = $("<div class='dot'></div>").css({
    width : diameter,
    height : diameter
  });
}

Dot.prototype.nibble = function () {
  this.$element.css({
    width: 0,
    height: 0
  });
  this.$element.parent().addClass('empty');
};

Dot.prototype.foodCount = function () {
  return this.$element.width();
};

Dot.prototype.isEmpty = function () {
  return this.foodCount() <= 0;
};