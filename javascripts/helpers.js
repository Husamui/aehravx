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

function opposite (dir) {
  var oppositeDir;
  switch(dir) {
    case "up":
      oppositeDir = "down"; break;
    case "down":
      oppositeDir = "up"; break;
    case "left":
      oppositeDir = "right"; break;
    case "right":
      oppositeDir = "left"; break;
  }
  return oppositeDir;
}