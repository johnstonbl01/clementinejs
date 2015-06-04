### Bare Boilerplate

#### About

Clementine.js is a lightweight MEAN stack boilerplate. In addition to MongoDB, Express, AngularJS and Node.js, Clementine.js uses Jade, Mongoose, Gulp, Bower and Sass. The purpose of this boilerplate is to offer a lightweight alternative to other boilerplates. This version of Clementine.js is stripped down to only include the essentials, and a small app template.

If you're just learning how to code, I suggest checking out the beginner version of Clementine.js. 

If you're looking for a demonstration of these technologies for a simple website, check out the standard version of Clementine.js.

##### MongoDB

MongoDB is a document-store (NoSQL) database. Queries are written in JavaScript, and that is the primary reason for its inclusion in the MEAN stack.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

##### Express.js

Express is an unopinionated framework for Node.js that creates additional functionality for the creation of web applications. 

For more information on express, check out their [website and documentation](http://expressjs.com/).

##### Angular.js

AngularJS is a front-end framework developed and backed by Google. Angular is a complete framework, meaning it has a great amount of built-in functionality for building web applications.

For more about AngularJS, have a look at their [website and documentation](https://angularjs.org/). Google has also created a [site that showcases some of the new features coming in Angular 2.0](https://angular.io/).

##### Node.js

Node.js is a platform built on Google's V8 JavaScript run-time, allowing server-side code to be written in JavaScript. 

For more information on Node, [try their site](https://nodejs.org/documentation/). I also recommend having a look at [NodeSchool](http://nodeschool.io/).

##### Jade

Jade is a Node templating engine that uses terse syntax to render HTML pages. This syntax is similar to Sass in that it interprets white space and indentation when rendering.

More info can be found on the [Jade website](http://jade-lang.com/).

##### Mongoose

Mongoose is an object modeling tool for MongoDB that allows for definition of schemas. This helps ensure data consistency in the MongoDB database.

The Mongoose docs can be [found here](http://mongoosejs.com/index.html).

##### Gulp

Gulp is a build system that uses the idea of streams to automate workflow (similar to Grunt). Clementine.js utilizes Gulp to automate watch, refresh and Sass pre-processing.

Here's a link to the [Gulp documentation](http://gulpjs.com/).

##### Bower

Bower is a package manager for client-side frameworks, libraries, etc. In the case of Clementine.js, Bower is used to manage installation of the necessary AngularJS files.

Check out the [Bower site](http://bower.io/) for more info.

##### Sass

Sass (Syntactically Awesome Style Sheets) is an extension language for CSS. It employs terse syntax (similar to Jade) that encourages the use of white space and indentation to write style sheets. Sass requires a pre-processor to compile it into traditional CSS. Additionally, Sass allows for the use of variables and a few other features that don't exist in traditional CSS.

More information about [Sass can be found here](http://sass-lang.com/).

#### Installation

Installation of Clementine.js has two prerequisites: Node.js / NPM and MongoDB. The instructions for these are detailed below, followed by installation instructions for the boilerplate.

##### Node.js & NPM

_Note:_ The Node insallation installs both Node & NPM.

**MAC OSX & Windows**

Head to the [Node.js install page](https://nodejs.org/download/). Download the appropriate file follow the installation instructions.

**Linux**

_Option 1_ - Install via PPA
```
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
```

_Option 2_ - Install via LinuxBrew

First, ensure [LinuxBrew](http://brew.sh/linuxbrew/) is installed. Then, enter the below into the Linux terminal:
```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
```

##### MongoDB

MongoDB has great installation instructions for MAC OSX, Windows and Linux. [See this page.](http://docs.mongodb.org/manual/installation/)

##### Clementine.js

To install the boilerplate, first create a new directory for your project and cd into that directory from the terminal. Then type:
```
https://github.com/johnstonbl01/clementinejs.git .
```
_Note:_ The period at the end is important. If the period is excluded, git will create a new directory named clementinejs in your current directory.

##### Starting the App

To start the app, make sure you're in the project directory and type `gulp` into the terminal. This will instruct Gulp to start the Node server and watch files in the directory for changes.

Next, open your browser and enter `http://localhost:3000/`. Congrats, you're up and running!

#### Folder Structure

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
		- _base.sass - Contains base CSS styles and variables for elements used in different sections of the app
		- _buttons.sass_ - CSS for the buttons
		- _logo.sass_ - Styling for the logo portion of the app
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

#### Removing Components