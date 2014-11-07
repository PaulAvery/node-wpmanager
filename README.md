wpmanager
=========
A wallpaper management application written in JavaScript.
It generates codes for your `.Xresources` and bash exports.

Installation
------------

	npm install -g wmpanager


CLI
---
### wpmanager list
Print available wallpapers

### wpmanager add src [src ...]
Add wallpapers. `src` can be a url or a local file path.

### wpmanager change [name]
Change the current wallpaper to a random one, or to the given name.

### wpmanager current
Prints the full path to the current wallpaper

	feh --bg-fill "$(wpmanager current)"

### wpmanager currentx
Prints the full path to the current Xresources file

	cat "$(wpmanager currentx)" | xrdb -merge

### wpmanager currentc
Prints the full path to the current bash colors file.

	source "$(wpmanager currentc)"

### wpmanager colors file
Extracts hex color codes from a given file

Inspiration
-----------
Inspiration was taken (well, I basically copied large parts of his script) from Caleb Everett's [wp](https://github.com/everett1992/wp) bash script.

He in turn took code from [this blog post](http://charlesleifer.com/blog/using-python-and-k-means-to-find-the-dominant-colors-in-images/) so I am listing it here as well.

I may switch to using Charles Leifer's palette generation via k-means in the future, for now this application uses [color-thief](https://www.npmjs.org/package/color-thief);
