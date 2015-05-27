### Clementine.js Beginner Tutorial

#### Prerequisites

Installation of the boilerplate has two prerequisites: Node.js / NPM and MongoDB. The instructions for these are detailed below, followed by installation instructions for Clementine.js.

_Note:_ An internet connection is required to successfully complete this tutorial. Additionally, this tutorial assumes basic knowledge of HTML, CSS and JavaScript.

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

#### NPM Package Installation

Once the prerequisites are installed, the next order of business to get install the necessary Node packages that will be used in the app.

The first step is to create a `package.json` file. This is a file that will store all NPM package prerequisites in addition to other information about the application.

In the terminal window and within the project directory, enter `$ npm init`. This will step you through a series of prompted questions and finally create a `package.json` file in the root direcotry of your project folder.

Open the file and it should look similar to the below:

```
{
  "name": "beginner-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
Feel free to update this information to be whatever you'd like. The main thing that needs to change is "main" should be set to "server.js."

Now that we've initialized NPM in our project directory and checked out the `package.json` file, let's install the NPM packages that we'll need to create this application.

In the terminal window:
`$ npm install express mongodb --save`

This command will install Express and the MongoDB Node.js driver. In addition, you'll notice a new directory named `node_modules`. This is the directory where Node installes the packages locally. 

The `--save` command tells NPM to save the dependency in the `package.json` file. If you open that file, it's now possible to see these dependencies.
```
{
  "name": "beginner-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.12.4",
    "mongodb": "^2.0.33"
  }
}
```
##### About Express

Express is a framework for Node.js that creates additional functionality for the creation of web application. A framework simply means that it is written based on another technology, and provides additional functionality through abstraction. Essentially, Express provides a number of very useful functions written for Node.js.

Without the Express framework, developers would have to write similar code for web applications every time they started a new project. Additionally, Express is unopinionated. This means that it isn't strict about how the functionality it provides is implemented. For an example of an opinionated framework, check out Ember.js.

For more information on express, check out their [website and documentation](http://expressjs.com/).

##### About MongoDB

MongoDB is what's known as a document-store database. Each record within the database is stored in an individual "document." This type of database is also known as a NoSQL database, which stands for Not only SQL (structured-query language).

SQL databases are very common and have been around for a very long time as the defacto type of data storage. The most common examples are MySQL and PostgreSQL. The NoSQL databases (of which there are a number) are an alternative to SQL.

MongoDB is used as part of the MEAN stack because it allows us to write queries (code that the database receives and interprets to retrieve data) using JavaScript syntax.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

The MongoDB Node.js driver will allow us to use Node to query the MongoDB database.

#### .gitignore

It is often common to see a file named `.gitignore` in the root directoyr of projects. This file simply tells git (version control software) to ignore particular files. Many times, the content of this file contains the `node_modules` directory. This prevents the directory from being uploaded to GitHub (on large projects, this directory can become quite large).

Example .gitignore file:
```
node_modules/
```

#### Folder Creation

Now let's spend a few moments to create the file structure we'll be using.
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
- _package.json_ - A file specifying which packages should be installed by NPM, in addition general application information (name, version, license, etc).

**app** - The directory containing the "behind-the-scenes" (i.e. controllers) and server-side JavaScript files (i.e. routes).
- **controllers** - Directory for client and server-side controller files. Controllers are used to either manipulate / modify the view or the model (i.e. the database).

- **routes** - This folder contains route files. Routes give directions on what to do when a particular URL or HTTP request is made from the client (i.e. browser) to the server.

**public** - This directory contains information used to render the view (i.e. css & images). Traditionally, this directory would also include a libary of any vendor code (i.e. AngularJS, jQuery, etc) used in the application. In this instance, we're simply linking directly to the Google CDN (content delivery network) for AngularJS.
- **css** - Contains the style sheet for the application
- **img** - Contains any images used in the view (i.e. the Clementine.js logo)

#### Simple Node Server

/**************************************************************************/

- prerequisite installation
	- note on internet connection
- npm init
- install modules
	- express
	- mongodb node driver
- .gitignore
	- don't forget note about eslint file
- folder creation
	- app
		- controllers
		- routes
	- public
		- css
		- img
- simple node server (server.js)
- simple hello world html (index.html)
- test app
- refactor route to own directory (index.js)
- test app
- update html file
	- top div
	- bottom div
		- p
		- button
- test app
- add angular file
	- standard
	- resource
- add angular functionality
	- html
		- ng-app
		- ng-click
		- ng-controller()
		- {{ clicks }}
	- controller
		- controller js file
		- controller file in html
		- controller directory (app.use) in node
- test app
- add mongodb functionality
	- require in node
	- connection
	- setup API
		- server click handler
			- get clicks
			- test app
			- add clicks
			- test app
			- reset clicks
			- test app
		- update click controller
			- get clicks
			- test app
			- add clicks
			- test app
			- reset clicks
			- test app
		- routes
- test app
- add clementine img to html
	- update static /public in server.js
- add css file; update html file
- test app
- done!
