#!/usr/bin/env node
import co from 'co';
import app from 'commander';
import pkg from '../package.json';
import path from 'path';

import WallpaperManager from './WallpaperManager';

var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
var src = process.env.WPMANAGER_HOME || path.join(home, '.config/wpmanager');
var wp = new WallpaperManager(src);

app.version(pkg.version);

app.command('list')
	.description('Shows available Wallpapers')
	.action(co.wrap(function *() {
		var list = yield wp.list();
		console.log(list.join('\n'));
	}));

app.command('add <url|file...>')
	.description('Add from url or local file')
	.action(co.wrap(function *(srcs) {
		try {
			var files = yield wp.add(srcs);
			var colors = yield files.reduce((sum, file) => {
				sum[file] = wp.colors(file);
				return sum;
			}, {});

			console.log(JSON.stringify(colors));
		} catch(e) {
			console.error(e.stack);
		}
	}));

app.command('change [name]')
	.description('Change the currently used background')
	.action(co.wrap(function *(name) {
		try {
			console.log('Changed to: ' + (yield wp.change(name)));
		} catch(e) {
			console.error(e.stack);
		}
	}));

app.command('current')
	.description('Print the name the used background')
	.action(co.wrap(function *() {
		try {
			console.log(yield wp.current());
		} catch(e) {
			console.error(e.stack);
		}
	}));

app.command('currentp')
	.description('Print the full path to the used background')
	.action(co.wrap(function *() {
		try {
			console.log(wp.resolve(yield wp.current()));
		} catch(e) {
			console.error(e.stack);
		}
	}));

app.command('colors')
	.description('Print the colors for a given image')
	.action(co.wrap(function *(name) {
		try {
			console.log(JSON.stringify({
				name: yield wp.colors(name)
			}));
		} catch(e) {
			console.error(e.stack);
		}
	}));

app.parse(process.argv);
