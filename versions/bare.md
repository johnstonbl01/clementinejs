---
layout: site
---

# The Bare Boilerplate

## Contents

- [About](#about)
- [Installation](#installation)
	- [Node.js and NPM](#install-node.js-and-npm)
	- [MongoDB](#install-mongodb)
	- [Clementine.js](#install-clementine.js)
	- [Yeoman](#install-yeoman)
	- [Starting the App](#starting-the-app)
- [Folder Structure](#folder-structure)
- [Gulp Tasks](#gulp-tasks)
	- [Minify](#minify)
	- [Watch](#watch)
- [Removing Components](#removing-components)
	- [Removing Jade](#removing-jade)
	- [Removing Mongoose](#removing-mongoose)
	- [Removing Gulp](#removing-gulp)
	- [Removing Bower](#removing-bower)
	- [Removing Sass](#removing-sass)

## About

Clementine.js is a lightweight MEAN stack boilerplate. In addition to MongoDB, Express, AngularJS and Node.js, Clementine.js uses Jade, Mongoose, Gulp, Bower and Sass. The purpose of this boilerplate is to offer a lightweight alternative to other boilerplates. This version of Clementine.js is stripped down to only include the essentials, and a small app template.

If you're just learning how to code, I suggest checking out the beginner version of Clementine.js. 

If you're looking for a demonstration of these technologies for a simple website, check out the standard version of Clementine.js.

#### MongoDB

MongoDB is a document-store (NoSQL) database. Queries are written in JavaScript, and that is the primary reason for its inclusion in the MEAN stack.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

#### Express.js

Express is an unopinionated framework for Node.js that creates additional functionality for the creation of web applications. 

For more information on express, check out their [website and documentation](http://expressjs.com/).

#### Angular.js

AngularJS is a front-end framework developed and backed by Google. Angular is a complete framework, meaning it has a great amount of built-in functionality for building web applications.

For more about AngularJS, have a look at their [website and documentation](https://angularjs.org/). Google has also created a [site that showcases some of the new features coming in Angular 2.0](https://angular.io/).

#### Node.js

Node.js is a platform built on Google's V8 JavaScript run-time, allowing server-side code to be written in JavaScript. 

For more information on Node, [try their site](https://nodejs.org/documentation/). I also recommend having a look at [NodeSchool](http://nodeschool.io/).

#### Jade

Jade is a Node templating engine that uses terse syntax to render HTML pages. This syntax is similar to Sass in that it interprets white space and indentation when rendering.

More info can be found on the [Jade website](http://jade-lang.com/).

#### Mongoose

Mongoose is an object modeling tool for MongoDB that allows for definition of schemas. This helps ensure data consistency in the MongoDB database.

The Mongoose docs can be [found here](http://mongoosejs.com/index.html).

#### Gulp

Gulp is a build system that uses the idea of streams to automate workflow (similar to Grunt). Clementine.js utilizes Gulp to automate watch, refresh and Sass pre-processing.

Here's a link to the [Gulp documentation](http://gulpjs.com/).

#### Bower

Bower is a package manager for client-side frameworks, libraries, etc. In the case of Clementine.js, Bower is used to manage installation of the necessary AngularJS files.

Check out the [Bower site](http://bower.io/) for more info.

#### Sass

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
$ brew install node
```

[Back to top.](#top)

### Install MongoDB

MongoDB has great installation instructions for MAC OSX, Windows and Linux. [See this page.](http://docs.mongodb.org/manual/installation/)

[Back to top.](#top)

### Install Yeoman

Yeoman is simple to install:

```bash
$ npm install -g yo
```

Note that it should be installed globally.

[Back to top.](#top)

### Install Clementine.js

Clementine.js is easy to setup in the project directory of your choice! In the terminal:

```bash
$ mkdir your-project
$ cd your-project
$ yo clementinejs:bare
```

It's that easy!

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
	|	\-- models
	|	\--	routes
	|	\-- views
	|
	+-- public
	|	\--	css
	|	\-- img
	|	\-- lib
	|	\--scripts
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
	- _clickController.client.js_ - This is an Angular controller that instructs Angular how to interact with the view. In this case, events such as getting the number of times someone has clicked the button are handled through this controller.
	- _clickHandler.server.js_ - This is a server-side controller that tells Mongo what to do when a particular HTTP request is made (i.e. GET, POST, etc).
- **css** - Folder for Sass CSS files
	- **partials** - Folder containing the modular Sass files for different portions of the application
		- __base.sass - Contains base CSS styles and variables for elements used in different sections of the app
		- __buttons.sass_ - CSS for the buttons
		- __logo.sass_ - Styling for the logo portion of the app
	- _main.sass_ - A file that has links to all of the partial files and links to the Google fonts uesd in the application
- **models** - Directory which contains model-specific files
	- _clicks.js_ - A Mongoose schema file used to define the type of data objects (documents) that can be pushed to the MongoDB.
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

## Gulp Tasks

The Bare version of Clementine.js includes a few pre-configured Gulp build tasks for use during development.

## Minify

The minify task has two parts:

- Pre-process and compress all Sass files in the `app/css` directory into a single file, minified file named `main.min.css` in the `public/css` directory
- Compress all `.client.js` files in the `app/controllers` directory into a single JS file named `site.min.js`. This file is located in the `public/scripts` directory

Simply type `gulp minify` in the terminal window of your project to use this task.

## Watch

The default gGulp task will start the server and watch for any updates to Jade or JavaScript files. If any files with extension `.jade` or `.js` are updated, Gulp will restart the server, and output the time restarted in the server console.

Simply type `gulp` in the terminal window to start this task.

[Back to top.](#top)

## Removing Components

Occasionally, it may be desirable to strip out certain components of the boilerplate. This section will detail how to remove some of these additional libraries and provide options for proceeding without their integration.

_Note_: This section will not include information on how to remove any of the integral parts of the MEAN stack (MongoDB, Express.js, AngularJS and Node.js).

[Back to top.](#top)

### Removing Jade

Jade is intergrated into a few places within the boilerplate. The first step should be to remove the `index.jade` file contianed in the `/app/views/` directory. This file can easily be converted to HTML. For an example of what the Jade file looks like in HTML, see the beginner version of Clementine.js.

The following row should be removed from the package.json:

```json
"jade": "^1.9.2"
```

In addition to changing the type of view file, Node must be directed to use another rendering engine or to send an HTML file to the browser when requested.

If another view engine is being used, the `server.js` snippet below should be updated:

```js
// View engine config
app.set('view engine', 'jade');
app.set('views', './app/views');
```

Additionally, the routes must be configured to send an HTML file, if no rendering engine is being used.

Current _index.js_:

```js
app.route('/')
	.get(function (req, res) {
		res.render('index'); // This renders the jade file
	});
```

Updated _index.js:

```js
var path = process.cwd();

app.route('/')
	.get(function (req, res) {
		res.sendFile(path + '/public/index.html');
	});
```

[Back to top.](#top)

### Removing Mongoose

Mongoose is the most difficult component to remove. However, it is possible. Without Mongoose, another ODM can be used or the MongoDB Node.js driver can be used. To see an example of this application using the MongoDB Node.js driver instead of Mongoose, check out the beginner Clementine.js application.

The following rows should be removed from the `package.json` file:

```json
"mongoose": "^4.0.2"
```

When this is done, the `/app/models` directory and its contents can be removed. Here are the changes that must be accounted for if the MongoDB Node.js driver is used in place of Mongoose:

- Connection string must be handled using the Node.js driver
- The database object must be passed as an argument to the routes (for use when creating a new controller object)
- The database object must be passed to the server-side controller
- The ClickHandler controller functions must be updated to use MongoDB Node.js syntax.
- Validation / error handling must be done independently (Mongoose does some of this automatically)

Again, for an example of what this application would look like using the Node.js driver, check out the beginner version of Clementine.js. 

[Back to top.](#top)

### Removing Gulp

Gulp servers a few functions within the boilerplate: minification (CSS & JavaScript), watching (auto server restarts) and pre-processing for Sass files. In order to remove Gulp, the `gulpfile.js` file can be removed within the project folder.

The following information should be removed from the `package.json` file:

```json
"gulp": "^3.8.11",
"gulp-concat": "^2.5.2",
"gulp-minify-css": "^1.0.0",
"gulp-nodemon": "^1.0.5",
"gulp-rename": "^1.2.2",
"gulp-sass": "^1.3.3",
"gulp-uglify": "^1.1.0"
```

If no build system is desired, then the `index.jade` file must be updated to point to a new css and client-side controller file. Since the minification step will be ommitted, it's possible to simply point to the non-minified versions of these files (moving the CSS file to the `/public/css/` directory is recommended).

This would mean changing the Jade or HTML file to:

_index.jade_:

```jade
head
	title Clementine.js - A lightweight MEAN stack boilerplate
	link(rel="stylesheet" type="text/css" href="/public/css/main.css")

...
...

script(type="text/javascript" src="/public/lib/angular/angular.min.js")
script(type="text/javascript" src="/public/lib/angular-resource/angular-resource.min.js")
script(type="text/javascript" src="/app/controllers/clickController.client.js")

```

Additionally, there will still need to be some method of Sass pre-processing implemented. This can be done via another build system (i.e. Grunt) or a stand-alone app (like [CodeKit](http://incident57.com/codekit/)).

[Back to top.](#top)

### Removing Bower

Bower can be easily removed from the project. Start by removing the `"bower": "^1.3.12"` line from the `package.json` file. Additionally, the `.bowerrc` and `bower.json` files should be removed.

Bower is used to integrate the standard AngularJS module and the ng-resource module. It's possible to include these files by linking to the Google CDN (this method is demonstrated in the beginner version of the boilerplate) or to download the files manually and place them inside the `/public/lib/angular` and `/public/lib/angular-resource` respectively.

[Back to top.](#top)

### Removing Sass

Removing Sass from Clementine.js is relatively straight-forward. First, the decision must be made to continue using Gulp or not.

If Gulp should remain within the application, then a slighly different approach is required for removing Sass. Begin by removing the `"gulp-sass": "^1.3.3"` line from the `package.json` file. Next, the Gulp setup file should be amended. Specifically, the minify task should be changed to remove the Sass functionality. See below for a revised version of this task.

_gulpfile.js_:

```js
gulp.task('minify', function () {
	gulp.src(['./app/controllers/clickController.client.js'])
		.pipe(uglify())
		.pipe(rename('site.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});
```

_Note_: The above will also remove the step that minifies CSS.

Next, the `/app/css/` directory and all of its contents can be removed. The final step to remove Sass from the boilerplate is to store all styling within a `/public/css/` directory. The `index.jade` file will need to be amended to point to this new, non-minified CSS file.

If Gulp is also being removed, use the Gulp removal steps above followed by the Sass removal steps after the `gulpfile.js` update (i.e. beginning with the removal of the `/app/css/` directory).

[Back to top.](#top)