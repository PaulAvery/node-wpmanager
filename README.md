wpmanager
=========
A wallpaper management application written in JavaScript.
It generates codes for your `.Xresources` and bash exports.

Installation
------------

	npm install -g wmpanager


CLI
---
### list
Print available wallpapers

### add src [src ...]
Add wallpapers. `src` can be a url or a local file path.

### change [name]
Change the current wallpaper to a random one, or to the given name.

### current
Prints the full path to the current wallpaper

	feh --bg-fill "$(wpmanager current)"

### currentx
Prints the full path to the current Xresources file

	cat "$(wpmanager currentx)" | xrdb -merge

### currentc
Prints the full path to the current bash colors file.

	source "$(wpmanager currentc)"

### colors file
Extracts hex color codes from a given file
