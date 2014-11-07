#!/usr/bin/env node
var wp = require('..');
var pkg = require('../package.json');

var fs = require('fs');
var app = require('commander');

app.version(pkg.version);

app.command('list')
	.description('Shows available Wallpapers')
	.action(function() {
		console.log(wp.list().join('\n'));
	});

app.command('add <url|file...>')
	.description('Add from url or local file')
	.action(function(srcs) {
		try {
			var added = wp.add(srcs);

			added.forEach(function(file) {
				console.log('Added ' + file);
			});
		} catch(e) {
			console.log(e.message);
		}
	});

app.command('change [name]')
	.description('Change the currently used background')
	.action(function(name) {
		try {
			console.log('Changed to: ' + wp.change(name));
		} catch(e) {
			console.log(e.message);
		}
	});

app.command('current')
	.description('Print the full path to the used background')
	.action(function(name) {
		try {
			console.log(wp.current().img);
		} catch(e) {
			console.log(e.message);
		}
	});

app.command('currentx')
	.description('Print the full path to the used Xres file')
	.action(function(name) {
		try {
			console.log(wp.current().xres);
		} catch(e) {
			console.log(e.message);
		}
	});

app.command('currentc')
	.description('Print the full path to the used colors file')
	.action(function(name) {
		try {
			console.log(wp.current().colors);
		} catch(e) {
			console.log(e.message);
		}
	});

app.command('colors <file>')
	.description('Print resulting colors to terminal')
	.action(function(file) {
		var buffer = fs.readFileSync(file);
		console.log(
			wp.colors(buffer)
				.map(function(color) {
					return color.hexString();
				})
				.join('\n'));
	});

app.parse(process.argv);
