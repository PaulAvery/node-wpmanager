var fs = require('fs');

module.exports = function() {
	return fs.readdirSync(wpdir).filter(function(wp) {return wp[0] !== '.'; });
};
