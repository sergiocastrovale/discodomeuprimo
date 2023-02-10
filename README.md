# This project has been abandoned in favor of https://github.com/sergiocastrovale/dmp (Nuxt 3, Firestore, Typescript).

# About

Source code for https://discodomeuprimo.lol, a comprehensive and heavily biased list of music artists and bands worth knowing about.

## Why didn't you use a front-end framework?

I've been a long time Vue and Nuxt fan, but I wanted to use this small project as an excuse to go back to the barebone roots of Javascript and craft everything from scratch. The _only_ thing I didn't resist using was SCSS with `node-sass`.

## To do / wishlist

* Expanded mode
  * Parse catalogue of each artist and store it ✔
  * Open dialog with the catalogue when clicking on an artist
* Dark mode

# How to use

1. Set the BASE_PATH in your `.env` file. This should be an UNIX-formatted path, e.g. `/d/stuff/albums`
2. In the project directory, run `bash build.sh`. Use `bash build.sh no-deploy` if you want to skip committing and pushing the changes.
3. A new `list` file will be created, containing the contents of your `BASE_PATH` folder.
4. `index.html` will use these contents and format them in a pretty way 🙂

## Note for Windows users

If you are using `Git Bash` in Windows, you won't be able to natively run `tree`. Although Windows _does_ have a similar `tree`, I suggest using the "port" from GnuWin:

1. Download the zip from [GnuWin Tree](http://gnuwin32.sourceforge.net/packages/tree.htm)
2. Extract `bin/tree.exe` to `C:\Program Files\Git\usr\bin` (assuming you're using the default installation folders)
3. Restart your Git Bash
4. You should now be able to use tree (test it with `tree -d`).
