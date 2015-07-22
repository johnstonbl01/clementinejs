---
layout: site
---

# Clementine.js Beginner Tutorial

## Contents

- [Prerequisites](#prerequisites)
	- [Install Node.js and NPM](#install-node.js-and-npm)
	- [Install MongoDB](#install-mongodb)
- [NPM Package Installation](#npm-package-installation)
	- [About Express](#about-express)
	- [About MongoDB](#about-mongodb)
- [.gitignore](#.gitignore)
- [Folder Creation](#folder-creation)
- [App Architecture Overview](#app-architecture-overview)
- [Simple Node Server](#simple-node-server)
	- [Refactoring Routes](#refactoring-routes)
	- [Adding Additional Elements to Index.HTML](#adding-additional-elements-to-index.html)
- [AngularJS HTML Integration](#angularjs-html-integration)
	- [AngularJS Scope Manipulation](#angularjs-scope-manipulation)
- [AngularJS Interactivity via the Controller](#angularjs-interactivity-via-the-controller)
- [Connecting to MongoDB](#connecting-to-mongodb)
- [Setting Up the Server-Side Controller](#setting-up-the-server-side-controller)
- [Integrating the API into AngularJS](#integrating-the-api-into-angularjs)
- [Adding CSS Styling](#adding-css-styling)
- [Next Steps](#next-steps)
- [Additional Resources](#additional-resources)

## Prerequisites

Installation of the boilerplate has two prerequisites: Node.js / NPM and MongoDB. The instructions for these are detailed below, followed by installation instructions for Clementine.js.

_Note:_ An internet connection is required to successfully complete this tutorial. Additionally, this tutorial assumes basic knowledge of HTML, CSS and JavaScript.

[Back to top.](#top)

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

## NPM Package Installation

Once the prerequisites are installed, the next order of business to get install the necessary Node packages that will be used in the app.

The first step is to create a `package.json` file. This is a file that will store all NPM package prerequisites in addition to other information about the application.

In the terminal window and within the project directory, enter `$ npm init`. This will step you through a series of prompted questions and finally create a `package.json` file in the root direcotry of your project folder.

Open the file and it should look similar to the below:

```json
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

```json
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

[Back to top.](#top)

### About Express

Express is a framework for Node.js that creates additional functionality for the creation of web application. A framework simply means that it is written based on another technology, and provides additional functionality through abstraction. Essentially, Express provides a number of very useful functions written for Node.js.

Without the Express framework, developers would have to write similar code for web applications every time they started a new project. Additionally, Express is unopinionated. This means that it isn't strict about how the functionality it provides is implemented. For an example of an opinionated framework, check out Ember.js.

For more information on express, check out their [website and documentation](http://expressjs.com/).

[Back to top.](#top)

### About MongoDB

MongoDB is what's known as a document-store database. Each record within the database is stored in an individual "document." This type of database is also known as a NoSQL database, which stands for Not only SQL (structured-query language).

SQL databases are very common and have been around for a very long time as the defacto type of data storage. The most common examples are MySQL and PostgreSQL. The NoSQL databases (of which there are a number) are an alternative to SQL.

MongoDB is used as part of the MEAN stack because it allows us to write queries (code that the database receives and interprets to retrieve data) using JavaScript syntax.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

The MongoDB Node.js driver will allow us to use Node to query the MongoDB database.

[Back to top.](#top)

## .gitignore

It is often common to see a file named `.gitignore` in the root directory of projects. This file simply tells git (version control software) to ignore particular files. Many times, the content of this file contains the `node_modules` directory. This prevents the directory from being uploaded to GitHub (on large projects, this directory can become quite large).

Example .gitignore file:

```
node_modules/
```

[Back to top.](#top)

## Folder Creation

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

[Back to top.](#top)

## App Architecture Overview

Before we begin writing actual code, it's helpful to think of the overall picture for the application and how the pieces fit together. We'll be using an MVC (model-view-controller) architecture for this particular app.

This is a common architecture in web development. The model manages the application and data / database logic. The view is the content that is visible to the user. The controller helps manage data between the view and the model. In many cases, the controller will accept data and manipulate it, passing the results to the view.

Here's a diagram of this:

![MVC](/clementinejs/img/mvc.png)

Additionally, for more information on the MVC architectural pattern, check out the [Wikipedia page](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

In this tutorial, we're going to create a small application that will have the following functionality:

- Count the number of times a button is clicked
	- Store this count within a database
- Reset the count to 0

In the context of our application, we will have the following:

- A Node / Express web server that responds to HTTP request and passes files to the browswer
- A MongoDB database that stores the number of clicks
- A server-side controller that will add, reset and retrieve the number of clicks from the database
	- This data will be passed to an API (application program interface)
- A client-side controller that handles user input, retrieves and modifies click information via the exposed API
- A client-side view that the user interacts with and sees
	- This is our HTML page that includes a logo and the buttons for interaction

This should provide some general contextthat will be helpful as we proceed with development.

[Back to top.](#top)

## Simple Node Server

To begin our application, let's start by standing up a simple Node server. This will serve as the foundation of our application, and we'll continue to build on top of this for the remainder of the tutorial.

Begin by creating a `server.js` file in the root project folder. Within this file:

```js
'use strict';

var express = require('express');

var app = express();

app.get('/', function (req, res) {
	res.send('Hello world!');
});

app.listen(3000, function () {
	console.log('Listening on port 3000...');
});
```

Let's discuss what the above code is doing:

**`'use strict'`**

This command enables ["strict mode"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), which is a way to opt in to a more strict version of JavaScript. This is best practice because it enforces more secure syntax and best practices through sticter syntax constraints. The documentation above provides some great examples of this behavior and how strict mode enforces them.

**`var express = require('express');`**

This is the node syntax for including Express as a dependency of our application. We store this within a variable that we can use later in the Node application.

**`var app = express();`**

This line initializes Express and allows us to access all of its great web application functionality via the `app` variable. Express has a number of great and helpful methods (functions) that make web applications easier to program.

**`app.get( ... )`**

[App.get](http://expressjs.com/4x/api.html#app.get.method) is an Express method that is going to take a request (`req`) from the client (browser) for a root URL ('/' - think of www.google.com/ as a root URL - basically the default web address for a site) and respond (`res`) by sending ([`res.send`](http://expressjs.com/4x/api.html#res.send)) a message to the browser. This is an extremely common pattern in Express, and one you'll see a lot.

**`app.listen( ... )`**

Lastly, [app.listen](http://expressjs.com/4x/api.html#app.listen) is going to tell Node which port to listen on (3000). In this case, we're also providing a callback function (a function that gets called once the app.listen function has finished) that will tell us when Node is ready and the server has been started.

Let's test the applicaton now, by typing `$ node server.js` in the terminal window (make sure you're within the project directory). You should see the following:

```bash
$ node server.js
Listening on port 3000...
```

Great!

Now, open a browser and point it to `localhost:3000`. Within the browser window you should see the "Hello world!" message.

Let's take this one step further and serve the browser an actual HTML file. Within the project folder, create an `index.html` file.

Within this file:

```html
<!DOCTYPE html>
	<html>
	<head>
		<title>First Node App</title>
	</head>
	<body>
		<p>Hello, world!</p>
	</body>
</html>
```

This is an extremely simple HTML file, but will allow us to begin returning a file to the browser rather than a message.

Let's update the `server.js` file to accomplish this.

_Before:_

```js
app.get('/', function (req, res) {
	res.send('Hello world!');
});
```

_After:_

```js
var path = process.cwd();

app.get('/', function (req, res) {
	res.sendFile(path + '/index.html');
});
```

The first order of business is to capture the current directory path in a variable. For this, we use Node's [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd) method.

Next, we tell Express to respond by sending a file to the browser, and specifying the location and name of the file: `res.sendFile(path + '/index.html');`.

Let's test the application now to ensure this is working correctly. Again from the project folder, type `$ node server.js` into the terminal.

Point the browser to `localhost:3000` and you should again see "Hello world!"

[Back to top.](#top)

### Refactoring Routes

Our next step is going to be refactoring our routes by using another common Express & Node pattern. Web applications have a number of routes (the HTTP requests made to the server), and it's common to store these in separate directories and files. That's our goal for this portion of the tutorial.

Begin by creating a new file within the `/app/routes` directory named `index.js`. This will be the JavaScript file containing our routes.

Remove the following from the `server.js` file:

```js
app.get('/', function (req, res) {
	res.sendFile(path + '/index.html');
});
```

The next order of business is to add our new route file as a dependency for the `server.js` file. At the top of the file:

```js
var express = require('express'),
	routes = require('./app/routes/index.js');
```

Now we need to pass the Express application as an argument to our route function object. Essentially, we will export our routes, and that function object will accept one argument, `app`. This will allow us to use Express functionality within the scope of our new route function. Hang in there if this doesn't make sense right away.

Include the following code where our former route code was within the file:

```js
routes(app);
```

Your `server.js` file should look like:

```js
'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js');

var app = express();

var path = process.cwd();

routes(app);

app.listen(3000, function () {
	console.log('Listening on port 3000...');
});
```

Now, let's add some content to the `index.js` file. We're going to use the [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports) method in Node to extend this function and make it available to other Node files (i.e. our `server.js` file). This function will accept a single argument (`app`), which will be the Express app.

index.js:

```js
'use strict';

var path = process.cwd();

module.exports = function (app) {
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
};
```

Some of this will look familiar, but it's important to note that we're using a different routing method from Express: [`app.route`](http://expressjs.com/4x/api.html#app.route). This is an alternative to app.get, and let's us bundle together several types of routes for a single page request (this will become apparently later in the tutorial). The remainder of this code is exactly the same as our former `app.get` route.

Next, move the index.html file into the `/public` directory. This will be the permanent home of this file.

Let's test this update to ensure everything has been setup correctly. From the project folder, type `$ node server.js` into the terminal.

Point the browser to `localhost:3000` and you should again see "Hello world!"

Let's move on to giving some more pizazz to our HTML file.

[Back to top.](#top)

### Adding Additional Elements to Index.HTML

In this section, we're going to update our HTML file to include more content and get it ready for AngularJS integration. Here's the updated HTML code:

```html
<head>
	<title>Clementine.js - A beginner level MEAN stack application</title>
</head>

<body>

	<div class="container">
		<img src="/public/img/clementine_150.png" />
		<br />
		<p class="clementine-text">Clementine.js</p>
	</div>

	<div class="container">

		<p>You have clicked the button X times.</p>
		<br />
		<div class="btn-container">
			<button type="submit" class="btn">CLICK ME!</button>
			<button class="btn btn-delete">RESET</button>
		</div>

	</div>

</body>
```

I've added some Clementine features and text to the application, but feel free to modify however you like. If you'd like to include a copy of the clementine logo, feel free to download a copy (right-click > Save Image As) from the [this GitHub page](https://github.com/johnstonbl01/clementinejs-beginner/blob/master/public/img/clementine_150.png). Make sure to save it within the `/public/img` directory.

What did we accomplish with the new HTML? We included two `div` elements that contain a top and bottom portion of our small application. The top portion includes a picture and the name of the application.

The bottom portion contains text telling us how many times the button has been clicked, and the two buttons: one button to add clicks, and one to reset the clicks.

Now let's ensure that everything still works. Test the app by starting up the Node server and checking it in the browser. You should see:

![Tutorial Picture 01](/clementinejs/img/clemjstut01.png)

Oh no! Why isn't our image loading? Well, when Node tries to access the `/public/img/` directory, it doesn't have any reference for how to find that file.

This can be solved by adding an additional line to the `server.js` file.

```js
var path = process.cwd();

app.use('/public', express.static(path + '/public'));
```

Here we will use Express's [`app.use`](http://expressjs.com/4x/api.html#app.use) and [`express.static`](http://expressjs.com/4x/api.html#express.static) to bind the directory path for `/public` to a shortcut: `/public`. Now when `/public` is referenced within our HTML file, Express and Node should be able to locate the logo and pass it to the browser successfully.

Let's check to make sure that this is the case. Start the node server and point the browser to `localhost:3000`.

![Tutorial Picture 02](/clementinejs/img/clemjstut02.png)

Ahhh, that's better!

Now let's begin integrating AngularJS into our application.

[Back to top.](#top)

## AngularJS HTML Integration

To start our AngularJS integration, we need to update our HTML file to include Angular functionality. For starters, let's add a script tag that points to the Google CDN (Content Delivery Network), so that we can load AngularJS on our page.

To get the URL for this, head to `http://angularjs.org`. Click on the download button in the middle of the page, and copy the CDN URL to your clipboard.

![Tutorial Picture 03](/clementinejs/img/clemjstut03.png)

Next, let's include this in our index.HTML file:

```html
...
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
</body>
```

In addition to the traditional AngularJS source file, we need to use the [ngResource module](https://docs.angularjs.org/api/ngResource) as a dependency in our application. This module allows us to interact with an API by providing common data & API related functions.

To do this, return to the AngularJS site and click the download button again. This time, click on the "browse additional modules" link. (Alternatively, you can just click [here](https://code.angularjs.org/1.3.15/).) On this page, you'll need to find the `angular-resource.min.js` file and right-click on it. Choose "Copy link address." Return to the HTML file and we will now paste this location into another `<script>` tag.

```html
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js"></script>
</body>
```

AngularJS needs to know what Angular module to run when the website is loaded. This is done through the inclusion of the [`ng-app`](https://docs.angularjs.org/api/ng/directive/ngApp) directive. For small apps like this one, it's common to only use a single Angular module; therefore, we will include the `ng-app` directive in the `<html>` element so that it will encompass the entire page.

Wait - what's an [Angular directive](https://docs.angularjs.org/guide/directive)? Directives are essentially a marker within the HTML that instruct Angular to bind specific functionality to that HTML element. An example of this would be to have a text box that is only visible when certain criteria is met. In that case, the directive would be included in the element tag, and Angular would know to execute the "show" action based on the directive code that was provided to Angular.

In this app, we're only going to use the out-of-the-box Angular directives. However, if you'd like to see a custom directive in action, check out the standard Clementine.js app.

```html
<html ng-app="clementineApp">
```

Including this directive will allow us to use other Angular directives on the page. Note that this is a required piece of an Angular application.

Next, let's assign a few more directives to the bottom portion of our site:

```html
<div class="container" ng-controller="clickController">

	<p>You have clicked the button {{ clicks }} times.</p>
	<br />
	<div class="btn-container">
		<button type="submit" class="btn" ng-click="addClick()">CLICK ME!</button>
		<button class="btn btn-delete" ng-click="resetClicks()">RESET</button>
	</div>

</div>
```

Let's break down the new functionality we've included:

- `ng-controller` - This is another AngularJS directive that will allow us to define which controller to use within the current block of HTML elements. We will get to definiing this controller in detail soon enough.
- `ng-click` - A directive that allows us to specify the name of the controller function that is executed when the button is clicked. In this case, we have defined separate functions for the two buttons -- `addClick()` and `resetClicks()`.
- `{{ clicks }}` - This is the Angular syntax that allows us to bind a data value within our HTML code. In this case, the `{{ clicks }}` will be replaced by the clicks value within the scope. This value will first be defined within our controller, and eventually by the database.

This is likely a good time to expand on how Angular interacts with both the view, and how scope fits into the picture.

[Scope ($scope)](https://docs.angularjs.org/guide/scope) is an Angular object that binds the view to the controller. This object is where functions / methods and variable values (i.e. 'clicks') are stored and passed back and forth between the controller and the view.

![Angular Scope](/clementinejs/img/angular_scope.png)

Now that our HTML view is ready for Angular, let's define our client-side controller.

[Back to top.](#top)

### AngularJS Scope Manipulation

Begin this process by creating a new file named `clickController.client.js` in the `/app/controllers` directory. In this file, we'll put all the client-side code to handle events in the browser, like clicking on one of the buttons.

To begin, we're going to include `'use strict';` again at the top of the file. Then, we're going to wrap all of our Angular code in what's called an [immediately invoked function express (IIFE)](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression). Let's start with that:

```js
'use strict';

(function () {

})();
```

An IIFE is going to bind all the variables within to the local scope of that function. This means that functions declared within this function will not conflict with other variables within the application that may share the same name or need to be re-used. This is a common practice in Angular code (and JS in general), and a good best practice to use.

Within this, let's first define our Angular module (i.e. the app), and then the controller.

```js
(function () {

angular
	.module('clementineApp', [])
	.controller('clickController', ['$scope', function ($scope) {
		$scope.clicks = 1000;
	}]);

})();
```

First, `angular` is a global variable recognized by AngularJS that allows its built-in methods.

[`angular.module('clementineApp', [])`](https://docs.angularjs.org/api/ng/type/angular.Module) is the syntax used to define an Angular module. Note that the name of the application must match the name specified in the `ng-app` directive of the HTML. The empty array is where we will inject dependencies for this module.

Next, we define the name of our [Angular controller](https://docs.angularjs.org/guide/controller) using the syntax `angular.controller( ... )`. Again, note that the name of the controller defined as the first argument of this expression must match the name specified via the `ng-controller` directive included in the HTML file.

You'll notice that the dependency array isn't empty here. We bind include the `$scope` object as a dependency, and then pass it as the argument for the following call back function. This is what will allow us to access and manipulate information bound to the `$scope` object and make it available within the view of our application.

Lastly, we set the `clicks` variable within the scope to be equal to 1000. I chose an arbitrary number here that we will easily recognize when testing. Keep in mind that the name of the variable on the `$scope` object ('clicks'), must also match the name of the variable we placed inside the brackets on the HTML page ({{ clicks }}).

Before we test this, there are a few additional adjustments we need to make to the `index.html` and `server.js` files.

_index.html_:

```html
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js"></script>
	<script type="text/javascript" src="/controllers/clickController.client.js"></script>
</body>
```

Here, we have added our new JS file to the HTML so that it is included in the page and can be executed when called upon. Take note of the order of the files here -- it does matter. The clickController needs functionality from the ng-resource file, which in turn depends on functionality within the angular script.

_server.js_:

```js
app.use('/public', express.static(path + '/public'));
app.use('/controllers', express.static(path + '/app/controllers'));
```

We've added an additional static path so that when the browser makes a request for the `/controllers` directory, the server can correctly serve the appropriate file.

Once that has been completed, fire up the Node server and browse to `localhost:3000`. You should now see, "You have clicked the button 1000 times." Congratulations, you've set up your first AngularJS controller!

However, neither of our buttons work when clicking on them. Hmm, let's fix that, shall we?

[Back to top.](#top)

## AngularJS Interactivity via the Controller

The next step we need to take is to make something happen when one of the buttons is clicked. If you'll remember back to the HTML Angular section, we defined two separate functions for each of the button `ng-click` directives: `addClick()` and `resetClicks()`.

Let's add those functions to the scope by defining them within the newly created controller.

To start, we'll need to:

- Define the default value of clicks each time the browser is started
- Define what happens when we click the 'CLICK ME!' button

_clickController.client.js_:

```js
.controller('clickController', ['$scope', function ($scope) {

		$scope.clicks = 0;

		$scope.addClick = function () {
			$scope.clicks += 1;
		};

}]);
```

Above we have defined the default value of the clicks property on the scope method, and then defined the `addClick()` method. This method will add 1 to the number of clicks every time the button is clicked. Feel free to test this out at this point if you'd like.

Next, let's add the `resetClicks()` method to the same controller.

```js
.controller('clickController', ['$scope', function ($scope) {

	$scope.clicks = 0;

	$scope.addClick = function () {
		$scope.clicks += 1;
	};

	$scope.resetClicks = function () {
		$scope.clicks = 0;
	};

}]);
```

The app should now function as intended. When the 'CLICK ME!' button is clicked, it will add one to the number of times the button was clicked. Additionally, when the 'RESET' button is clicked, the number of clicks should reset iteslf to 0.

At this point, we have a fully functioning front-end application. However, wouldn't it be great if the browser would remember the number of times the button had been clicked? Currently, the number of clicks will reset to 0 every time the page is refreshed. This is happening because the number of clicks is not being stored anywhere. Every time the browser renders the page, it will set the number of clicks to the value we have defined in our controller (0).

We can fix this by storing our data somewhere -- in a MongoDB database!

[Back to top.](#top)

## Connecting to MongoDB

In order to pass data values between the database and the client, we'll use an API. In this case, the API will be exposed via the browser, but that doesn't always have to be the case.  We're going to do it this way because it is an illustrative example. Traditionally, this would be done if you want to expose particular app information to the public for others to use in some way.

Using an API in this way adds a little bit of complexity, but it's worth it to be able to see the actual data values being passed around via the API. 

To begin, we will need to set up our MongoDB database. This is done within the `server.js` file. We're going to have to do a bit of shuffling around to get everything in the correct place. Here's the way the file should look:

```js
'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) {

	if (err) {
		throw new Error('Database failed to connect!');
	} else {
		console.log('MongoDB successfully connected on port 27017.');
	}

	var path = process.cwd();

	app.use('/public', express.static(path + '/public'));
	app.use('/controllers', express.static(path + '/app/controllers'));

	routes(app, db);

	app.listen(3000, function () {
		console.log('Listening on port 3000...');
	});

});
```

There are a few changes here. Most notably, many lines of our previous `server.js` code have been wrapped inside a MongoDB connectivity function. It's important to note that we had to begin by requiring the MongoDB Node.js driver with `require('mongodb').MongoClient`. [`MongoClient()`](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html) is an object that allows use to use functionality like `connect`. 

Additionally, it's important to initialize Express _before_ connecting to the database. In this case, we want to ensure that Express is ready to go when we call upon its functionality within the connect function.

Next, we connect to the MongoDB database using the [`connect`](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html#connect) method of the MongoClient object. The first argument is the connection string. Port 27017 is the default port that MongoDB uses, but this can be easily changed if needed. `clementinejs` is the actual name of the database within MongoDB that we would like to use. If this database does not exist, MongoDB is smart enough to create it for us.

The second argument of the `connect` method is a callback function. This function takes an err as the first argument, and the database object as the second argument.

The first order of business within this function is to tell Node.js what to do if there is an error when trying to connect to the database. Here, we have opted to throw a custom error message if there is an issue with connection using [`throw new Error( ... )`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

If there is no error, then 'MongoDB successfully connected on Port 27017.' is logged to the console. The remainder of the code within this function is the same as before except for one line:

```js
routes(app, db);
```

Here, we are passing the database object to our routes in addition to the Express `app` object. We're going to use this to to help pass data between the database on the client-side of our application.

Feel free to test the application at this point. Everything should work as before, and a successful MongoDB connection message should show up in the console when the application is started.

[Back to top.](#top)

## Setting Up the Server-Side Controller

Similar to how the app has a client-side controller that is helping with the data between the client (browser) and the API (model), we'll also implement a server-side controller that will handle the information between the database and the API.

This controller will query our database, and update the API with the results. The client-side controller will update the API results immediately in the browser.

Let's begin with the creation of this server-side controller. Begin by creating a file named `clickHandler.server.js` in the `/app/controllers` directory.

_clickHandler.server.js_:

```js
'use strict';

module.exports.clickHandler = function (db) {

	var clicks = db.collection('clicks');

	this.getClicks = function (req, res) {
		clicks
			.findOne(
				{},
				{ '_id': false },
				function (err, result) {
					if (err) { throw err; }

					var clickResults = [];

					clickResults.push(result);
					res.json(clickResults);
				}
			);
	};
};
```

Again, some of this code will look familiar. We're [exporting](https://nodejs.org/api/modules.html#modules_module_exports) a function object named `clickHandler` to be used elsewhere in Node. 

Next, we define which [MongoDB collection](http://docs.mongodb.org/manual/reference/glossary/#term-collection) ([`db.collection(...)`](https://mongodb.github.io/node-mongodb-native/api-generated/db.html#collection)) we would like to use within the database. Collections are analagous to tables in the relational database world, and there can be multiple collections for a single database. In this case, MongoDB is smart enough to create the collection for us if it doesn't already exist. Thanks, Mongo.

For this application, our collection is named `clicks`. Afterward, we need to create a method that will retrieve the current number of clicks from the database. This funtionality will be contained within a `getClicks()` method of the `clickHandler` function object.

Let's break down each line of the `getClicks` method:

- `function (req, res)` - A request and response are arguments for this particular function. This is similar to other functions previously defined in this application.
- `clicks` - the name of our database collection, which we have stored in a variable thanks to `var clicks = ...`
- [`.findOne`](http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#find-first-occurence-with-findone) - This is a MongoDB query that will find the first document (analgous to record or row in relational databases) that meet the query criteria. It's possible to also use the [`find()`](http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#making-queries-with-find) method, but our collection will only have one document, so that's not necessary.
- `{},` - This is the query argument for the `findOne()` method. If we had multiple documents in our collection, we could specify certain criteria within this object to filter down the results. `{}` will return all documents (in our case, this is just 1).
- `{ '_id': false }` - Every document in MongoDB is [automatically assigned an '_id'](http://docs.mongodb.org/manual/reference/object-id/) when inserted into a collection, unless otherwise specified. It's possible to specify a value or field as the '_id', but in our case we're going to leave it as is. This argument is known as the projection, which allows us to manipulate & exclude fields from the query results before they're passed on. In this case, we don't want the '_id' field to show up in our results since it's not needed. Due to that, the value has been set to `false` for this field.
- `function (err, result) {` - This is the callback argument for the findOne method. This callback function will define what Node should do with the results once the query has finished.
- `if (err) { throw err; }` - If an error is passed to the callback, then it will interrupt the application and throw an error message.
- `var clickResults = []` - The Angular ngResource query parameters require that the API data is within an array. This can be changed, but for the sake of this example, we will simply create an array and push the results to that array.
- `clickResults.push(result);` - Push the results from the query to the clickResults array.
- `res.json(clickResults);` - Send a response to the browser with a [JSON](http://www.json.org/) version of the clickResults array.

Whew! That's a lot of new information!

Our new server-side controller is well on its way, but there's a problem. What happens if there are no documents in our collection? MongoDB is great about creating database and collections for us automatically when needed, but the data must be populated by us. If it's the first time using the application, there will not be any documents in the collection. We should account for this within this controller by inserting a document if one does not already exist.

Let's update the `getClicks()` function:

```js
this.getClicks = function (req, res) {
	clicks
		.findOne(
			{},
			{ '_id': false },
			function (err, result) {
				if (err) { throw err; }

				var clickResults = [];

				if (result) {

					clickResults.push(result);
					res.json(clickResults);

				} else {

					clicks.insert({ 'clicks': 0 }, function (err) {
						if (err) { throw err; }

						clicks.findOne(
							{},
							{'_id': false},
							function (err, doc) {
								if (err) { throw err; }

								clickResults.push(doc);
								res.json(clickResults);
						});

					});

				}
			}
		);
	};
```

The first order of business is to check that the original `findOne()` query actually returns a result. If it does, then we proceed with the same as before by inserting the results into an array and passing that back to Node and the browser. This is done within the `if (result) { ... }` block above.

However, if no result is returned, then we need to insert a document into the database using the [`insert()`](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#insert) method. This method takes two arguments, the document to insert (`{ 'clicks': 0 }`) and a callback function. The callback function will tell Node what do with the results. If there is an error, we throw the error. Once the new document is inserted, we query the DB to find the newly inserted document and return it to the browswer in JSON format.

Before we test this out, we will want to change our routes a little bit.

_index.js_:

```js
'use strict';

var path = process.cwd();

var ClickHandler = require(path + '/app/controllers/clickHandler.server.js').clickHandler;

module.exports = function (app, db) {

	var clickHandler = new ClickHandler(db);

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/clicks')
		.get(clickHandler.getClicks);
};
```

Let's take a look at the changes:

- `var ClickHandler...` - Here, we're storing the function object we created from the `clickHanlder.server.js` file in a variable. It's important to note the `.clickHandler` at the end, which will ensure that the exported `clickHandler` method for the exported function from the `clickHandler.server.js` file.
- `var clickHandler = new ClickHandler(db)` - On this line, we're instantiating a new instance of the ClickHandler function object, and passing in the MongoDB object as an argument. This is going to allow us to reference the methods we created in the `clickHandler.server.js` in addition to passing in the database information for use in those methods.
- `app.route('/api/clicks')` - We're defining a new route here for our API
- `.get(clickHandler.getclicks)` - The `getClicks` function will be executed anytime there is an HTTP GET request on the `/api/clicks` URL. This will tell the Node to execute the controller function we defined previously and get the results from the database.

Let's give this a test! If this is your first time through the tutorial, it's likely that you have no documents in your clicks collection. This will be a great test for our insert statement. Fire up the node server and point your browser to `localhost:3000/api/clicks`. When the site loads, you should see: `[{"clicks":0}]`. If that is what you see, then everything has been setup correctly!

If you'd like to test this again, we can manually remove the document from the database with some help from the MongoDB console. Leave Node running and open a new terminal window. Type `$ mongo` in the terminal window to connect to the MongDB console.

If successful, you should see something along the lines of:

```
Mongo Shell Version: 3.0.3
connecting to: test
>
```

At the prompt, type `use clementinejs`. This tells the MongoDB console which database we want to use. Now, type `db.clicks.find({})`. This command tells the console to use the current database and find all results within the clicks collection. After pressing enter, you should see the result of the query, which is a single object looking something like:

```
{ "_id": ObjectId(randomNumber), "clicks": 0 }
```

Great! Now let's remove this document so that when we refresh the page again, it should re-create this record. Enter `db.remove({})` into the console. This will remove all documents in the collection. If you go back to the browser and refresh the page, a new document should get inserted in the database. 

We now have a working query that will return the contents of the database. However, we still need to provide routes and logic to tell the application controller what to do when the two HTML buttons are clicked.

Let's update our controller with a few more methods.

_clickHandler.server.js_:

```js
this.addClick = function (req, res) {
	clicks
		.findAndModify(
			{},
			{ '_id': 1 },
			{ $inc: { 'clicks': 1 } },
			function (err, result) {
				if (err) { throw err; }

				res.json(result);
			}
		);
};

this.resetClicks = function (req, res) {
	clicks
		.update(
			{},
			{ 'clicks': 0 },
			function (err, result) {
				if (err) { throw err; }

				res.json(result);
			}
		);
};
```

These two new methods, `addClick` and `resetClicks` are very similar to our original `getClicks` method. However, each of them uses a different MongoDB method.

`addClick` uses the [`findAndModify`](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findAndModify) method. The first two arguments are simlar to the `findOne` method: first identify what you want to find (`{}` - returns all documents) and then provide the sort order in which you'd like the documents returned (in our case, sort in ascending order by the id field with `'_id': 1` -- this parameter doesn't matter much since we only have a single document). Then, we tell Node & MongoDB how we'd like to update the record(s) that were found.

In this particular case, we've opted to use `{ $inc: { 'clicks': 1 } }`. This uses the [Mongo `$inc` method](http://docs.mongodb.org/manual/reference/operator/update/inc/). The `$inc` method takes the property we want to modify (`clicks`) and provides the number by which we want to increment (1). So every time the `addClick` function is run, the number of clicks will increment by 1.

Lasly, we provide a callback function which will throw an error if one occurs, else the results are updated and sent back to the browser in JSON format.

Lastly, we use the [Mongo `update` method](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#update) for the `resetClicks` method. This will take a query for the first parameter (`{}` will return all documents), and the updated value (`{ 'clicks': 0 }`) for any records found. In this case, the `resetClicks` method will update the `clicks` property of our document to 0. The result of this operation is then passed back to the browser in JSON format.

Finally, let's add routes for the remainder of our new ClickHandler methods.

_index.js_:

```js
app.route('/api/clicks')
		.get(clickHandler.getClicks)
		.post(clickHandler.addClick)
		.delete(clickHandler.resetClicks);
```

That brings us to the end of the server-side controller. Now, we need to hook our API up in Angular.

[Back to top.](#top)

## Integrating the API into AngularJS

To begin intregrating the API with Angular, we need to ensure that we update the Angular module and define `ngResource` as a dependency.

```js
angular
	.module('clementineApp', ['ngResource'])
```

Next, the `$resource` object needs to be injected into the controller. Similar to the `$scope` object, this will let us access the `$resource` object and some of the built-in `ngResource` methods.

```js
.controller('clickController',
	['$scope', '$resource', function ($scope, $resource) { ... }]
```

Now let's point Angular to where our resource data is - the API that's been set up at `/api/clicks`.

```js
var Click = $resource('/api/clicks');
```

This new $resource object allows us to query this API, and will return the results to a field in the browser. However, before doing this, we'll need to create a new method that does this:

```js
$scope.getClicks = function () {
	Click.query(function (results) {
		$scope.clicks = results[0].clicks;
	});
};
```

This code will bind a `getClicks` method to the $scope. The [`Click.query( ... )`](https://docs.angularjs.org/api/ngResource/service/$resource) will query the API and return all of the results. This can then be either manipulated in some way before passing it on to the browser, or (as in our case) just pass it straight in to a variable on the `$scope`. Because the API is an array, we're going to bind the first element's (`[0]`) clicks property to `$scope.clicks`.

This function needs to run whenever the controller is invoked (i.e. when the app is first started), so we should add `$scope.getClicks()` beneath the function definition. At this point, the controller file should look like:

_clickController.client.js_:

```js
'use strict';

(function () {

angular
	.module('clementineApp', ['ngResource'])
	.controller('clickController',
		['$scope', '$resource', function ($scope, $resource) {

			var Click = $resource('/api/clicks');

			$scope.getClicks = function () {
				Click.query(function (results) {
					$scope.clicks = results[0].clicks;
				});
			};

			$scope.getClicks();
		
	}]);

})();
```

Let's test the application. Start the Node server, and browse to `localhost:3000`. Ensure everything loads correctly, and that the text says, "You have clicked the button 0 times."

Now we need to update the two additional methods in the controller: `addClick` and `resetClicks`.

```js
$scope.addClick = function () {
	Click.save(function () {
		$scope.getClicks();
	});
};

$scope.resetClicks = function () {
	Click.remove(function () {
		$scope.getClicks();
	});
};
```

We're doing something a bit tricky here. For `addClick`, we're instructing Angular to use [`$resource.save`](https://docs.angularjs.org/api/ngResource/service/$resource), which will prompt an [HTTP POST](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) request. This in turn will get routed by our `index.js` file and run the clickHandler.addClick method on the database. Once that action has been performed, we query the API via `$scope.getClicks`, therefore forcing the `$scope.clicks` variable to update and represent the new number of clicks.

Lastly, we perform something similar with the `resetClicks` method. Instead of an HTTP POST method, we use Angular's [`$resource.remove`](https://docs.angularjs.org/api/ngResource/service/$resource) method to prompt an [HTTP DELETE](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) request. Again, the `index.js` file will know to route this request using the `clickHandler.resetClicks` method.

Let's test these out in the browser! Start node and browse to `localhost:3000`. Click on all the buttons! Everything should update and reset appropriately. You've so close to finishing your first MEAN application! 

We'll finish up with a little bit of styling to make it look nice.

[Back to top.](#top)

## Adding CSS Styling

The end is nigh! If you've stuck with the tutorial this long -- congratulations! We're almost done. Let's make the application look a bit more modern, and less like something from the 1990's.

Create a new file named `main.css` in the `/public/css` directory. Here the contents of that file:

_main.css_:

```css
/****** Main Styling ******/

body {
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
}

p {
	margin: 8px 0 0 0;
}

.container p {
	text-align: center;
	padding: 0;
}

/****** Logo Div Styling ******/

img {
	margin: 0 auto;
	display: block;
}

.clementine-text { /* Styling for the Clementine.js text */
	padding: 0;
	margin: -25px 0 0 0;
	font-weight: 500;
	font-size: 60px;
	color: #FFA000;
}

/****** Click Styling ******/

.btn-container {	/* Styling for the div that contains the buttons */
	margin: -10px auto 0 auto;
	text-align: center;
}

.btn {	/* Styling for buttons */
	margin: 0 8px;
	color: white;
	background-color: #00BCD4;
	display: inline-block;
	border: 0;
	font-size: 14px;
	border-radius: 3px;
	padding: 10px 5px;
	width: 100px;
	font-weight: 500;
}

.btn:focus {	/* Remove outline when hovering over button */
	outline: none;
}

.btn:active {	/* Scale the button down by 10% when clicking on button */
	transform: scale(0.9, 0.9);
	-webkit-transform: scale(0.9, 0.9);
	-moz-transform: scale(0.9, 0.9);
}

.btn-delete {	/* Styling for delete button */
	background-color: #ECEFF1;
	color: #212121;
}
```

Each of the styles are commented in case something is confusing. Now, let's integrate this file into our HTML page.

_index.html_:

```html
<head>

	<title>Clementine.js - A beginner level MEAN stack application</title>
	
	<link href="http://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" type="text/css">
	<link href="/public/css/main.css" rel="stylesheet" type="text/css">

</head>
```

The first `<link>` is referring to a Google Font CDN. This isn't required, but I really like the Roboto font. The second `<link>` is the link to our CSS file.

Let's start up the app. Wow! Your app should now look something like:

![Tutorial Picture 04](/clementinejs/img/clemjstut04.png)

[Back to top.](#top)

## Next Steps

Congratulations on completing your first MEAN stack application! If you're a beginner, my advice is to build upon this knowledge by continuing build things -- a log-in application, a comment application, etc. Building will solidify your understanding of these concepts, and force you to learn new things as well. If you enjoyed this tutorial, please feel free to [let me know on Twitter](https://twitter.com/johnstonbl01)!

If you encounter any issues whatsoever, submit an issue here on GitHub, or let me know via Twitter.

[Back to top.](#top)

## Additional Resources

**MongoDB**

- [Mongo University's Mongo101JS](https://university.mongodb.com/courses/M101JS/about) - This is a really great course for learning the power and functionality of MongoDB. The difficulty ramps up in Week 2, so make sure you're comfortable with Node.js.

**Express**

- Code School's [Building Blocks of Express.js](https://www.codeschool.com/courses/building-blocks-of-express-js) - Code School's courses are great supplemental material. Make sure to build something alongside the videos and exercises to really ensure you're learning the concepts.

**AngularJS**

- Dan Wahlin's [AngularJS Fundamentals in 60-ish Minutes](https://www.youtube.com/watch?v=i9MHigUZKEM&index=39&list=WL) - A really great video demonstrating slightly more in-depth Angular functionality than this tutorial. Dan does an excellent job of illustrating how Angular works and explainging the building blocks of the framework.
- [ng-book](https://www.ng-book.com/) - A fantastic read. Make sure to purchase this book from the website to get free updates. If you purchase from another vendor, the free updates aren't included.

**Node.js**

- Node School's [Learn You Node](http://nodeschool.io/#workshoppers) - A really great introdution to Node.
- Code School's [Real Time Web with Node.js](https://www.codeschool.com/courses/real-time-web-with-node-js) - Similar to the Express course, Code School offers a great primer on Node. Again, make sure you're building something alongside this tutorial for it to really pay off.

**General**

- [Free Code Camp](http://www.freecodecamp.com/) - If you're just starting out and want a free resource to help you learn to code, I highly suggest checking out FCC. The community is wonderful and extremely helpul.
- [JavaScript Is Sexy](http://javascriptissexy.com/) - A wonderful blog with treasure troves of useful explanations regarding some of JavaScript's more difficult subject areas.

[Back to top.](#top)