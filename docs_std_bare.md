### Bare Boilerplate

#### About



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

#### Removing Components