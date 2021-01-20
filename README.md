# A Simple TODO Application

This is a command-line-based TODO application for Linux-based and
similar systems. You can create new TODO notes, list your TODOs, mark
them done and finally delete them.

## Prerequisites

You need to have the `npm` and `tsc` binaries globally installed to
follow the rest of the installation instructions.

## Installation

Starting from this directory:

Make sure that `todo` and `install` have execution permissions:

```
chmod +x todo
chmod +x install
```

Then:

```
$ npm i
$ tsc
$ ./install
```

### Optional installation steps

To make using the application easier, create a symlink from a location
that is already in your PATH, to the `todo` script file. For example:

```
$ ln -s /home/yourusername/PATH/TO/todo-app/todo ~/.local/bin/
```

## Usage

- Create new note `todo new My new note`
- List notes `todo list`
- Mark note done `todo done NOTE_ID`
- Delete note `todo delete NOTE_ID`
