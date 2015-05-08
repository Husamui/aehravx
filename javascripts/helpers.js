function generateRandMatrix(size) {
  var matrix = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(Math.random());
    }
    matrix.push(row);
  }
  return matrix;
}