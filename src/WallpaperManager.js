import fs from 'co-fs';
import uri from 'valid-url';
import path from 'path';
import Thief from '@paulavery/color-thief';
import mkdirp from 'mkdirp';
import {request} from 'urllib';

export default class WallpaperManager {
	constructor(dir) {
		//Create directory if missing
		try {
			mkdirp.sync(dir);
		} finally {
			this.dir = dir;
		}
	}

	resolve(file) {
		return path.join(this.dir, file);
	}

	*add(srcs) {
		return yield srcs.map(function *(src) {
			var file = yield (uri.isUri(src) ? this.importUrl(src) : this.importFile(src));

			yield fs.mkdir(this.resolve(file.name));
			yield fs.writeFile(this.resolve(file.name), file.buffer);

			return file.name;
		}, this);
	};

	*importUrl(url) {
		var res = yield request(url);

		if(res.status !== 200) throw new Error('URL returned ' + res.status);
		if(res.headers['content-type'].substr(0, 5) !== 'image') throw new Error('URL did not provide an image');

		return {
			buffer: res.data,
			name: url.split('/').pop()
		};
	}

	*importFile(file) {
		return {
			buffer: fs.readFile(file),
			name: path.basename(file)
		};
	}

	*change(name) {
		var ls = yield this.list();

		name = name || ls[Math.floor(Math.random() * ls.length)];
		if(ls.indexOf(name) === -1) throw new Error('Wallpaper does not exist');

		fs.writeFile(path.join(this.dir, '.current'), name);
		return name;
	}

	*list() {
		var dirs = yield fs.readdir(this.dir);
		return dirs.filter((wp) => wp[0] !== '.');
	}

	*current() {
		var name;

		try {
			name = yield fs.readFile(path.join(this.dir, '.current'), 'utf8');
		} catch(e) {
			throw new Error('No wallpaper set');
		}

		var ls = yield this.list();
		if(ls.indexOf(name) === -1) throw new Error('Invalid wallpaper set');

		return name;
	}

	*colors(file) {
		var thief = new Thief();
		var colors = thief.getPalette(this.resolve(file), 16, 1);

		return colors.map(color => {
			return {
				rgb: color,
				hex: color.map(v => ('00' + v.toString(16)).slice(-2))
			};
		});
	}
}
