wpmanager
=========
A wallpaper management application written in JavaScript.

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
Prints the id of the current wallpaper

### wpmanager currentp
Prints the full path to the current Xresources file

	feh --bg-fill "$(wpmanager currentp)"
