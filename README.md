# Clementine.js Boilerplate

[![Join the chat at https://gitter.im/johnstonbl01/clementinejs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/johnstonbl01/clementinejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Overview

Clementine.js is a lightweight boilerplate for fullstack JavaScript development which utilizes MongoDB, Express and Node.js. Coming in at just under 32 KB, Clementine.js is a perfect alternative to more feature-dense boilerplates.

Clementine.js errs on the side of transparency and simplicity, making it an ideal starting point for beginner and seasoned developers alike. Note that this implementation assumes the developer wishes to perform implementation of more complex features him- or herself.

## Versions

There are 3 versions of Clementine.js:

- **Standard** (this version): the simplest version of Clementine.js. Intended for those who wish for the smallest and least intrusive footprint OR to implement features on their own.
- [**Angular**](https://github.com/johnstonbl01/clementinejs-angular): a slightly more complex version of the same application. This version employs the use of AngularJS as the front-end framework.
- [**Free Code Camp (FCC)**](https://github.com/johnstonbl01/clementinejs-fcc): A modified version of the standard boilerplate that is intended for use with the [Free Code Camp](http://freecodecamp.com/) curriculum.

## Quick Start Guide

### Prerequisites

In order to use Clementine.js, you must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Yeoman](http://yeoman.io/) (optional)

### Installation & Startup

There are 3 ways to install Clementine.js:

- Clone the GitHub Repository
- Clone using Mirror
- Install via Yeoman Generator

Both options are similar, and a matter of preference.

**Option 1 - Clone GitHub Repo**

```bash
$ git clone https://github.com/johnstonbl01/clementinejs.git your-project
```

This will install the Clementine.js components into the `your-project` directory.

**Option 2 - Clone using Mirror**

**Mirror** is a tool that does 1:1 clones of Github repos. Click on the button below to mirror this repo.

[![mirror this repo](http://mirror.therebelrobot.com/badge-large.svg)](http://mirror.therebelrobot.com/?source=johnstonbl01/clementinejs)

Alternatively, you can use the [mirror cli tool](https://github.com/therebelrobot/mirror-cli) to clone it from the command line:

```bash
npm install -g mirror-cli
mirror johnstonbl01/clementinejs to USER/REPO -u USERNAME -t ACCESS_TOKEN
```

**Option 3 - Yeoman Generator**

```bash
$ npm install -g generator-clementinejs
$ mkdir your-project
$ cd your-project
$ yo clementinejs
```

Note: `generator-clementinejs` must be installed globally.

To start the application, browse to the project directory and type: `$ node server` into the terminal window. Point a browser to `localhost:3000` and you're up and running!

### c9.io Setup

If you're using c9.io, please [reference the documentation](http://www.clementinejs.com/versions/standard.html#c9.ioSetup) for instructions to get Clementine.js working in the c9 environment.

## Contributing

This is an open-source project, and contributions are always welcome! To see ways to contribute, please review the [contribution guidelines](http://www.clementinejs.com/developers/contributing.html).

## Documentation

Complete documentation can be [found here](http://www.clementinejs.com).

### Tutorial

You can find a complete step-by-step tutorial on how to create this app from the ground up [here](http://www.clementinejs.com/tutorials/tutorial-beginner.html).

## Features

| Features           | Standard  | Angular   | FCC       |
|:---------          |:--------: |:--------: |:---------:|
| MongoDB            | _Yes_     | _Yes_     | _Yes_     |
| Express            | _Yes_     | _Yes_     | _Yes_     |
| AngularJS (1.x)    | _No_      | _Yes_     | _No_      |
| Node.js            | _Yes_     | _Yes_     | _Yes_     |
| Passport           | _No_      | _No_      | _Yes_     |
| Mongoose           | _No_      | _No_      | _Yes_     |

## License

MIT License. [Click here for more information.](LICENSE.md)
