---
layout: site
---

# The Beginner Boilerplate

## Contents

- [About](#about)
	- [MongoDB](#mongodb)
	- [Express](#express)
	- [AngularJS](#angularjs)
	- [Node.js](#node.js)
- [Installation](#installation)
	- [Install Node.js and NPM](#install-node.js-and-npm)
	- [Install MongoDB](#install-mongodb)
	- [Install Clementine.js](#install-clementine.js)
	- [Starting the App](#starting-the-app)
- [Folder Structure](#folder-structure)
- [Tutorial](#tutorial)

## About

The beginner version of Clementine.js is meant for those that are new to coding. This is a stripped down version of the boilerplate with fewer featured libaries, fully commented code and a tutorial.

When I first began learning to code, I wish something like this boilerplate existed. There are several tutorials and guides out there that demonstrate functionality of a single part of the MEAN stack, but many of them provide too much detail or functionality too quickly for a beginner.

The beginner version of Clementine.js aims to alleviate some of these issues by providing a simpler, stream-lined experience.

The following features are absent from this version of the boilerplate:

- Jade
- Mongoose
- Gulp
- Sass
- Bower
- Angular custom directive example

I believe that the MEAN stack is a great place for new developers to begin learning. Why? Using this stack, a novice can gain exposure to the entire stack without having to learn another programming langugae. Eventually, it will be useful to pick up additional languages (i.e. SQL), but in the beginning it's really appealing to learn the ropes using a single language.

Also - JavaScript is awesome!

The ubiquity of JavaScript adds to its appeal, and is also a reason for the popularity of the MEAN stack. Each of the platforms and frameworks included in the MEAN stack use JavaScript only. It's easy to see the appeal, and the ease of standing up a new project using this stack makes for an additional bonus.

If you are completely new to programming, and wish to understand how these pieces fit together, there is a tutorial included in this beginner version that will walk you through creating this demo application one step at a time.

[Back to top.](#top)

### MongoDB

MongoDB is what's known as a document-store database. Each record within the database is stored in an individual "document." This type of database is also known as a NoSQL database, which stands for Not only SQL (structured-query language).

SQL databases are very common and have been around for a very long time as the defacto type of data storage. The most common examples are MySQL and PostgreSQL. The NoSQL databases (of which there are a number) are an alternative to SQL.

MongoDB is used as part of the MEAN stack because it allows us to write queries (code that the database receives and interprets to retrieve data) using JavaScript syntax.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

[Back to top.](#top)

### Express

Express is a framework for Node.js that creates additional functionality for the creation of web application. A framework simply means that it is written based on another technology, and provides additional functionality through abstraction. Essentially, Express provides a number of very useful functions written for Node.js.

Without the Express framework, developers would have to write similar code for web applications every time they started a new project. Additionally, Express is unopinionated. This means that it isn't strict about how the functionality it provides is implemented. For an example of an opinionated framework, check out Ember.js.

For more information on express, check out their [website and documentation](http://expressjs.com/).

[Back to top.](#top)

### AngularJS

AngularJS is a front-end framework developed and backed by Google. That sentence alone should say a lot. It is one of two current front-end frameworks that are very popular (React/Flux being the other). AngularJS is a full MVC (model-view-controller) framework, meaning that it contains a lot of functionality out of the box. It is very powerful, and supports a modular approach to development.

One of the current downsides to AngularJS is performance when compared to a few other frameworks like Knockout and React. However, Google has noticed this and the next version of AngularJS (2.0) has huge performance gains to make it competitive with React.

For more about AngularJS, have a look at their [website and documentation](https://angularjs.org/). Google has also created a [site that showcases some of the new features coming in Angular 2.0](https://angular.io/).

[Back to top.](#top)

### Node.js

Node.js is a platform based on Google's V8 JavaScript run-time. This run-time is part of the reason JavaScript has risen to such heights. V8 made JavaScript fast.

Node is a platform built on top of this, and allows server-side code to be written in JavaScript. Until Node, server-side JavaScript was virtually unheard of. Node is extremley fast and performant, and has been widely adopted since its inception.

Node.js does not come with some of the common web application functionality out of the box, and that is why Express is often attached. However, Node is extremely powerful and can do many things, including custom CLIs (command-line interfaces). In the context of this application, Node handles simple routing.

For more information on Node, [try their site](https://nodejs.org/documentation/). I also recommend having a look at [NodeSchool](http://nodeschool.io/).

[Back to top.](#top)

## Installation

Installation of the boilerplate has two prerequisites: Node.js / NPM and MongoDB. The instructions for these are detailed below, followed by installation instructions for Clementine.js.

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

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should see the following messages within the terminal window:

```
MongoDB successfully connected on port 27017.
Node.js listening on port 3000...
```

Next, open your browser and enter `http://localhost:3000/`. Congrats, you're up and running!

[Back to top.](#top)

## Folder Structure

```
+--	Project Folder
	+--	app
	|	\--	controllers
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

- **controllers** - Directory for client and server-side controller files. Controllers are used to either manipulate / modify the view or the model (i.e. the database).
	- _clickController.client.js_ - This is an Angular controller that instructs Angular how to interact with the view (i.e. the web page). In this case, events such as getting the number of times someone has clicked the button are handled through this controller.
	- _clickHandler.server.js_ - This is a server-side controller that tells Mongo what to do when a particular HTTP request is made (i.e. GET, POST, etc).
- **routes** - This folder contains route files. Routes give directions on what to do when a particular URL or HTTP request is made from the client (i.e. browser) to the server.
	- _index.js_ - contains route code for the application

**public** - This directory contains information used to render the view (i.e. css & images). Traditionally, this directory would also include a libary of any vendor code (i.e. AngularJS, jQuery, etc) used in the application. In this instance, we're simply linking directly to the Google CDN (content delivery network) for AngularJS.

- **css** - Contains the style sheet for the application
- **img** - Contains any images used in the view (i.e. the Clementine.js logo)
- _index.html_ - This file contains all HTML code to render the view for this single-page application.

[Back to top.](#top)

## Tutorial

You can find a complete step-by-step tutorial on how to create this app from the ground up [here]({{ site.baseurl }}/tutorial/tutorial.html).

[Back to top.](#top)