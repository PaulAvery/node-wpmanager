var fs = require('fs');
var uri = require('valid-url');
var path = require('path');
var colors = require('./colors');
var request = require('urllib-sync').request;

module.exports = function(srcs) {
	return srcs.map(function(src) {
		var file = uri.isUri(src) ? importUrl(src) : importFile(src);

		fs.mkdirSync(path.join(wpdir, file.name));
		fs.writeFileSync(path.join(wpdir, file.name, 'img' + path.extname(file.name)), file.buffer);

		var color = colors(file.buffer);
		fs.writeFileSync(path.join(wpdir, file.name, 'colors'), color.map(function(color, i) {
			return 'export COLOR' + i + '="' + color.hexString() + '"';
		}).join('\n'));
		fs.writeFileSync(path.join(wpdir, file.name, 'Xres'), color.map(function(color, i) {
			return '*color' + i + ': ' + color.hexString();
		}).join('\n'));

		return file.name;
	});
};

function importUrl(url) {
	var res = request(url);
	if(res.status !== 200) throw new Error('URL returned ' + res.status);
	if(res.headers['content-type'].substr(0,5) !== 'image') throw new Error('URL did not provide an image');

	return {
		buffer: res.data,
		name: url.split('/').pop()
	};
}

function importFile(file) {
	return {
		buffer: fs.readFileSync(file),
		name: path.basename(file)
	};
}
