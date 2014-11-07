var fs = require('fs');
var path = require('path');
var list = require('./list');

module.exports = function() {
	var name;

	try {
		name = fs.readFileSync(path.join(wpdir, '.current'), 'utf8');
	} catch(e) {
		throw new Error('No wallpaper set');
	}

	var ls = list();
	if(ls.indexOf(name) === -1) throw new Error('Invalid wallpaper set');

	return {
		colors: path.join(wpdir, name, 'colors'),
		xres: path.join(wpdir, name, 'Xres'),
		img: path.join(wpdir, name, 'img'+path.extname(name))
	};
};
