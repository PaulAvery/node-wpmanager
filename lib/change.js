var fs = require('fs');
var path = require('path');
var list = require('./list.js');

module.exports = function(name) {
	var ls = list();

	name = name || ls[Math.floor(Math.random() * ls.length)];
	if(ls.indexOf(name) === -1) throw new Error('Wallpaper does not exist');

	fs.writeFileSync(path.join(wpdir, '.current'), name);
	return name;
};
