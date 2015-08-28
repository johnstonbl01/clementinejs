---
layout: site
---

# The Free Code Camp Boilerplate

## Contents

- [About](#about)
- [Versions](#versions)
- [Installation](#installation)
	- [Node.js](#install-node.js-and-npm)
	- [MongoDB](#install-mongodb)
	- [Yeoman](#install-yeoman)
	- [Clementine.js](#install-clementine.js)
	- [Twitter Authentication](#setup-twitter-authentication)
	- [Starting the App](#starting-the-app)
- [Folder Structure](#folder-structure)
- [Tutorial](#tutorial)

## About

The [Free Code Camp](http://www.freecodecamp.com) version of Clementine.js is meant for use when completing projects as part of the FCC curriculum. This version includes Twitter authentication through Passport.

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

#### Passport

[Passport](http://passportjs.org/) is middleware for Node.js / Express that enables easy integration of authentication and authorization. It includes extensions for the popular oAuth options, and is used for Twitter authentication in this version of the boilerplate.

[Back to top.](#top)

## Versions

- [Standard](https://github.com/johnstonbl01/clementinejs): A MEAN stack boilerplate -- this version has the most "bells and whistles."
- [Bare](https://github.com/johnstonbl01/clementinejs-bare): A stripped down version of the boilerplate for quick prototyping
- [Beginner](https://github.com/johnstonbl01/clementinejs-beginner): A simplified version of the boilerplate intended for developers new to JavaScript and the MEAN stack.

[Back to top.](#top)

## Installation

Installation of the boilerplate has three prerequisites: Node.js / NPM, MongoDB and Yeoman. The instructions for these are detailed below, followed by installation instructions for Clementine.js.

[Back to top.](#top)

### Install Node.js and NPM

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
$ brew install node
```

[Back to top.](#top)

### Install MongoDB

MongoDB has great installation instructutions for MAC OSX, Windows and Linux. [See this page.](http://docs.mongodb.org/manual/installation/)

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
$ yo clementinejs:fcc
```

It's that easy!

### Setup Twitter Authentication

Please follow [this guide](/clementinejs/tutorials/tutorial-passport.html#twitter-app-setup) to register the application with Twitter and get API keys / secrets. This API information will also need to be added to the `app/config/auth.js` file.

[Back to top.](#top)

### Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:
```
MongoDB successfully connected on port 27017.
Node.js listening on port 3000...
```
Next, open your browser and enter `http://localhost:3000/`. Congrats, you're up and running!

## Folder Structure

```
+--	Project Folder
	+--	app
	|	\--	config
	|	\--	controllers
	|	\--	factories
	|	\--	models
	|	\--	routes
	|
	+-- public
	|	\--	css
	|	\-- img
```

**Project / Root Folder** - The project directory. This directory contains:

- _.gitignore_ - A file specifying which directories git should ignore when pushing to the master
- _LICENSE.md_ - Text file containing license information
- _README.md_ - Readme file for GitHub
- _package.json_ - A file specifying which packages should be installed by NPM, in addition general application information (name, version, license, etc).
- _server.js_ - The primary Node file used to start the server and initialize necessary services / frameworks for the application (i.e. connecting to the Mongo database, intializing Express, etc).

**app** - The directory containing the "behind-the-scenes" (i.e. controllers) and server-side JavaScript files (i.e. routes).

- **config** - The directory containing configuration files for Passport's Twitter Authentication
	- _auth.js_ - File that contains the API key information. These are encrypted "tokens (passwords)" issued by Twitter and used to authenticate with Twitter's servers.
	- _passport.js_ - JavaScript file containing all setup information for Passport.
- **controllers** - Directory for client and server-side controller files. Controllers are used to either manipulate / modify the view or the model (i.e. the database).
	- _clickController.client.js_ - This is an Angular controller that instructs Angular how to interact with the view (i.e. the web page). In this case, events such as getting the number of times someone has clicked the button are handled through this controller.
	- _clickHandler.server.js_ - This is a server-side controller that tells Mongo what to do when a particular HTTP request is made (i.e. GET, POST, etc).
	- _userController.client.js_ - This is another server-side controller that retrieves user information from the Angular `userFactory` module and makes it available within the `$scope` object.
- **factories** - Directory for Angular factories. Factories are used by Angular to retrieve information from the model (i.e. API) and pass it to the controller for manipulation. This is a common Angular convention.
	- _userFactory.js_ - An Angular factory module which interacts with the API to retrieve user information and make it available to other Angular modules.
- **models** - Directory for database models. In this case, this is where the Mongoose schemas will be defined. These models are definitions of desired data structure that will be inserted into the database.
	- _clicks.js_ - The Mongoose model for the "clicks" portion of the application. 
	- _users.js_ - The Mongoose model for "users."
- **routes** - This folder contains route files. Routes give directions on what to do when a particular URL or HTTP request is made from the client (i.e. browser) to the server.
	- _index.js_ - contains route code for the application

**public** - This directory contains information used to render the view (i.e. css & images). Traditionally, this directory would also include a libary of any vendor code (i.e. AngularJS, jQuery, etc) used in the application. In this instance, we're simply linking directly to the Google CDN (content delivery network) for AngularJS.

- **css** - Contains the style sheet for the application
- **img** - Contains any images used in the view (i.e. the Clementine.js logo)
- _index.html_ - This file contains all HTML code to render the view for this single-page application.

[Back to top.](#top)

## Tutorial

You can find a complete step-by-step tutorial on how to create this app from the ground up [here](/clementinejs/tutorials/tutorial-passport.html).

[Back to top.](#top)