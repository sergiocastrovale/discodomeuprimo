# About

Source code for https://discodomeuprimo.lol, a comprehensive and heavily biased list of music artists and bands worth knowing about.

# How to use

1. Set the BASE_PATH in your `.env` file. This should be an UNIX-formatted path, e.g. `d/stuff/albums`
2. In the project directory, run `./build`. Use `./build deploy` if you want to automatically commit and push the changes.
3. A new `list` file will be created, containing the contents of your `BASE_PATH` folder.
4. `index.html` will use these contents and format them in a pretty way 🙂
