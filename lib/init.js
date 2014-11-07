var fs = require('fs');
var path = require('path');

// Set directory
global.wpdir = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.wpmanager');

//Create directory if missing
if(!fs.existsSync(wpdir)) fs.mkdirSync(wpdir);
