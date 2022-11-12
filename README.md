# About

Source code for https://discodomeuprimo.lol, a comprehensive and heavily biased list of music artists and bands worth knowing about.

# How to use

1. Set the BASE_PATH in your `.env` file. This should be an UNIX-formatted path, e.g. `/d/stuff/albums`
2. In the project directory, run `./build`. Use `./build no-deploy` if you want to skip committing and pushing the changes.
3. A new `list` file will be created, containing the contents of your `BASE_PATH` folder.
4. `index.html` will use these contents and format them in a pretty way 🙂

## Note for Windows users

If you are using `Git Bash` in Windows, you won't be able to natively run `tree`. Although Windows _does_ have a similar `tree`, I suggest using the "port" from GnuWin:

1. Download the zip from [GnuWin Tree](http://gnuwin32.sourceforge.net/packages/tree.htm)
2. Extract `bin/tree.exe` to `C:\Program Files\Git\usr\bin` (assuming you're using the default installation folders)
3. Restart your Git Bash
4. You should now be able to use tree (test it with `tree -d`).
