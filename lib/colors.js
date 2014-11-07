var Color = require('color');
var Thief = require('color-thief');

module.exports = function(buffer) {
	var thief = new Thief();
	var colors = thief.getPalette(buffer, 16).map(convert);

	colors.sort(sort);
	normalize(colors);

	return colors;
};

function convert(color) {
	return new Color({
		r: color[0],
		g: color[1],
		b: color[2]
	});
}

function sort(a, b) {
	a = a.values.hsv;
	b = b.values.hsv;

	if(a[2] === b[2]) {
		if(a[1] === b[1]) {
			return a[0] - b[0];
		} else {
			return a[1] - b[1];
		}
	} else {
		return a[2] - b[2];
	}
}

function normalize(colors) {
	for(var x = 0; x < colors.length; x++) {
		if(x === 0) {
			normalizeOne(colors[x], 0, 32);
		} else if(x === 8) {
			normalizeOne(colors[x], 128, 192);
		} else if(x < 8) {
			normalizeOne(colors[x], 160, 224);
		} else {
			normalizeOne(colors[x], 200, 256);
		}

		normalizeOne(colors[x], 32, 224);
	}
}

function normalizeOne(color, minv, maxv) {
	var hsv = color.values.hsv;
	if(hsv[2] < minv) color.hsv(hsv[0], hsv[1], minv);
	if(hsv[2] > maxv) color.hsv(hsv[0], hsv[1], maxv);
}
