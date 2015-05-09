$(document).ready(function () {

	var sawtoothMountains = new Terrain(30,12);
	sawtoothMountains.renderLandscape();

	// $(document).on('keyup', function (e) {
	// 	if (e.keyCode === 13) {
	// 		var sawtoothMountains = new Terrain(30,12);
	// 		sawtoothMountains.printLandscape();
	// 		new Explorer(sawtoothMountains);
	// 	}
	// });

});