$(document).ready(function () {

	var ready = true;
	var barrenWasteland = new Terrain(40,8);
	barrenWasteland.renderEmptyLandscape();

	$(document).on('keyup', function (e) {
		if (e.keyCode === 13 && ready) {
			ready = false;
			var sawtoothMountains = new Terrain(40,8);
			sawtoothMountains.renderLandscape();
			var explorer = new Explorer(sawtoothMountains);
			var explorerInterval = setInterval(function () {
				if (!explorer.finished) {
					explorer.lookAround();
					explorer.chooseDirection();
					explorer.move();
				} else {
					clearInterval(explorerInterval);
					ready = true;
				}
			}, 10);
		}
	});

});