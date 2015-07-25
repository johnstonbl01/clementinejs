---
layout: site
---

# The Standard Boilerplate

## Contents

- [About](#about)
	- [MongoDB](#mongodb)
	- [Express.js](#express.js)
	- [AngularJS](#angularjs)
	- [Node.js](#node.js)
	- [Jade](#jade)
	- [Mongoose](#mongoose)
	- [Gulp](#gulp)
	- [Bower](#bower)
	- [Sass](#sass)
- [Installation](#installation)
	- [Install Node.js and NPM](#install-node.js-and-npm)
	- [Install MongoDB](#install-mongodb)
	- [Install Clementine.js](#install-clementine.js)
	- [Starting the App](#starting-the-app)
- [Folder Structure](#folder-structure)
- [AngularJS Directive](#angularjs-directive)
- [Sass Pre-processing](#sass-pre-processing)

## About

Clementine.js is a lightweight MEAN stack boilerplate. In addition to MongoDB, Express, AngularJS and Node.js, Clementine.js uses Jade, Mongoose, Gulp, Bower and Sass. The purpose of this boilerplate is to offer a lightweight alternative to other boilerplates. This version of Clementine.js includes a sample website with all of the technologies pre-configured.

If you're just learning how to code, I suggest checking out the beginner version of Clementine.js. 

If you're looking for a simpler and more stripped down of the boilerplate without the sample application, there's a version for that.

### MongoDB

MongoDB is a document-store (NoSQL) database. Queries are written in JavaScript, and that is the primary reason for its inclusion in the MEAN stack.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

[Back to top.](#top)

### Express.js

Express is an unopinionated framework for Node.js that creates additional functionality for the creation of web applications. 

For more information on express, check out their [website and documentation](http://expressjs.com/).

[Back to top.](#top)

### AngularJS

AngularJS is a front-end framework developed and backed by Google. Angular is a complete framework, meaning it has a great amount of built-in functionality for building web applications.

For more about AngularJS, have a look at their [website and documentation](https://angularjs.org/). Google has also created a [site that showcases some of the new features coming in Angular 2.0](https://angular.io/).

[Back to top.](#top)

### Node.js

Node.js is a platform built on Google's V8 JavaScript run-time, allowing server-side code to be written in JavaScript. 

For more information on Node, [try their site](https://nodejs.org/documentation/). I also recommend having a look at [NodeSchool](http://nodeschool.io/).

[Back to top.](#top)

### Jade

Jade is a Node templating engine that uses terse syntax to render HTML pages. This syntax is similar to Sass in that it interprets white space and indentation when rendering.

More info can be found on the [Jade website](http://jade-lang.com/).

[Back to top.](#top)

### Mongoose

Mongoose is an object modeling tool for MongoDB that allows for definition of schemas. This helps ensure data consistency in the MongoDB database.

The Mongoose docs can be [found here](http://mongoosejs.com/index.html).

[Back to top.](#top)

### Gulp

Gulp is a build system that uses the idea of streams to automate workflow (similar to Grunt). Clementine.js utilizes Gulp to automate watch, refresh and Sass pre-processing.

Here's a link to the [Gulp documentation](http://gulpjs.com/).

[Back to top.](#top)

### Bower

Bower is a package manager for client-side frameworks, libraries, etc. In the case of Clementine.js, Bower is used to manage installation of the necessary AngularJS files.

Check out the [Bower site](http://bower.io/) for more info.

[Back to top.](#top)

### Sass

Sass (Syntactically Awesome Style Sheets) is an extension language for CSS. It employs terse syntax (similar to Jade) that encourages the use of white space and indentation to write style sheets. Sass requires a pre-processor to compile it into traditional CSS. Additionally, Sass allows for the use of variables and a few other features that don't exist in traditional CSS.

More information about [Sass can be found here](http://sass-lang.com/).

[Back to top.](#top)

## Installation

Installation of Clementine.js has two prerequisites: Node.js / NPM and MongoDB. The instructions for these are detailed below, followed by installation instructions for the boilerplate.


### Install Node.js and NPM

_Note:_ The Node insallation installs both Node & NPM.

**MAC OSX & Windows**

Head to the [Node.js install page](https://nodejs.org/download/). Download the appropriate file follow the installation instructions.

**Linux**

_Option 1_ - Install via PPA

```bash
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
```

_Option 2_ - Install via LinuxBrew

First, ensure [LinuxBrew](http://brew.sh/linuxbrew/) is installed. Then, enter the below into the Linux terminal:

```bash
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
```

[Back to top.](#top)

### Install MongoDB

MongoDB has great installation instructions for MAC OSX, Windows and Linux. [See this page.](http://docs.mongodb.org/manual/installation/)

[Back to top.](#top)

### Install Clementine.js

To install the boilerplate, simply type the following in the terminal:

```bash
$ npm install clementinejs
$ cd clementinejs
$ npm install
```

Note: `$ npm install` will install all dependencies for the boilerplate. 

[Back to top.](#top)

### Starting the App

To start the app, make sure you're in the project directory and type `gulp` into the terminal. This will instruct Gulp to start the Node server and watch files in the directory for changes.

Next, open your browser and enter `http://localhost:3000/`. Congrats, you're up and running!

[Back to top.](#top)

## Folder Structure

```
+--	Project Folder
	+--	app
	|	\--	controllers
	|	\-- css
	|	\-- directives
	|	\-- models
	|	\--	routes
	|	\--	views
	|
	+-- public
	|	\--	css
	|	\-- img
	|	\--	lib
	|	\-- scripts
```

**Project / Root Folder** - The project directory. This directory contains:

- _.bowerrc_ - A bower file that specifies an alternate location for Bower to install dependencies. In this case, these are routed to `/public/lib`.
- _.gitignore_ - A file specifying which directories git should ignore when pushing to the master
- _LICENSE.md_ - Text file containing license information
- _README.md_ - Readme file for GitHub
- _bower.json_ - Bower package management file
- _gulpfile.js_ - Gulp task automation file
- _package.json_ - A file specifying which packages should be installed by NPM, in addition general application information (name, version, license, etc).
- _server.js_ - The primary Node file used to start the server and initialize necessary services / frameworks for the application (i.e. connecting to the Mongo database, intializing Express, etc).

**app** - The directory containing the "behind-the-scenes" (i.e. controllers) and server-side JavaScript files (i.e. routes).

- **controllers** - Directory for client and server-side controller files.
	- _commentCtrlr.client.js_ - A client-side controller for the comment section of the application. This Angular controller handles requests between the view and the API.
	- _commentCtrlr.server.js_ - A server-side controller handling communication between the database and the API
	- _linkCtrlr.client.js_ - A client-side controller that works in conjunction with the `materialRipple` directive to delay links from working until after the directive animation has completed
- **css** - Folder for Sass CSS files
	- **partials** - Folder containing the modular Sass files for different portions of the application
		- __banner.sass_ - Contains CSS for the top banner of the page (where the logo is located)
		- __base.sass_ - Contains base CSS styles and variables for elements used in different sections of the app
		- __buttons.sass_ - CSS for the social buttons
		- __comments.sass_ - Styling specifically for the comments demonstration
		- __features.sass_ - Contains styles for the features section of the application
		- __maincontent.sass_ - Styles for the main part of the page where the majority of the text and explanations are found
		- __navbar.sass_ - CSS for the navbar at the top of the page
	- _main.css_ - This is the pre-minifed version of the CSS file after it has been compiled by Gulp. This file contains all the CSS for the entire site.
	- _main.sass_ - A file that has links to all of the partial files and links to the Google fonts uesd in the application
- **directives** - Directory containing custom AngularJS directives
	- _materialRipple.js_ - A custom Angular directive which mimics the Google material design ripple effect
- **models** - Directory which contains model-specific files
	- _comment.js_ - A Mongoose schema file used to determine the type of information that can be stored in the MongoDB.
- **routes** - This folder contains route files. 
	- _index.js_ - contains routing code for the application
- **views** - View files are contained within this directory
	- _index.jade_ - The Jade file which is processed and compiled into HTML by Node. This file contains all the HTML code for the Clementine.js application.

**public** - This directory contains information used to render the view (i.e. css & images).

- **css** - Contains the style sheet for the application
	- _main.min.css_ - Post Sass processing and minified CSS file for the entire application
- **img** - Contains any images used in the view (i.e. the Clementine.js logo)
- **lib** - Contains Bower-installed dependencies (i.e. AngularJS)
- **scripts** - This folder contains minified versions of the all the JavaScript files used in the application

[Back to top.](#top)

## AngularJS Directive

This version of Clementine.js includes an example of a custom Angular directive. The directive here is an attempt to mimic the [Google Material Design ripple effect](https://material.angularjs.org/latest/#/demo/material.components.button).

The code for this directive borrows heavily from [this repository](https://github.com/nelsoncash/angular-ripple).

At a high level, the strategy for achieving this effect is:

- Create a `<span>` element inside the target element. This `<span>` element is created to be slightly larger than the target element to ensure that the animation extends to the edge of the target element.
- Find the start position for the animation based on mouse position relative to the target element.
- Clear any previous animation attributes (in the event that the button is clicked multiple times)
- Add the CSS animation attribute to the target element, creating the animation to occur.

[Back to top.](#top)

## Sass Pre-processing

Sass pre-processing in Clementine.js is handled through Gulp. The process will look at the `main.sass` file and compile each of the imported files into a single file in the `/app/css` directory named `main.css`. This file is then minified and copied into the `/public/css` directory.

To re-compile the Sass files after changes are made, simply type `gulp minify` into the terminal.

_Note_: This task minifies the javascript files in addition to compiling the Sass files.

[Back to top.](#top)