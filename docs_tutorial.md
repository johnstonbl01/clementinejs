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

#### App Architecture Overview

Before we begin writing actual code, it's helpful to think of the overall picture for the application and how the pieces fit together. We'll be using an MVC (model-view-controller) architecture for this particular app.

This is a common architecture in web development. The model manages the application and data / database logic. The view is the content that is visible to the user. The controller helps manage data between the view and the model. In many cases, the controller will accept data and manipulate it, passing the results to the view.

Here's a diagram of this:

[insert picture here]

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

All together, this looks like:

[insert graphic]

This should provide some general contextthat will be helpful as we proceed with development.

#### Simple Node Server

To begin our application, let's start by standing up a simple Node server. This will serve as the foundation of our application, and we'll continue to build on top of this for the remainder of the tutorial.

Begin by creating a `server.js` file in the root project folder. Within this file:
```
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

`'use strict'`

This command enables ["strict mode"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), which is a way to opt in to a more strict version of JavaScript. This is best practice because it enforces more secure syntax and best practices through sticter syntax constraints. The documentation above provides some great examples of this behavior and how strict mode enforces them.

`var express = require('express');`

This is the node syntax for including Express as a dependency of our application. We store this within a variable that we can use later in the Node application.

`var app = express();`

This line initializes Express and allows us to access all of its great web application functionality via the `app` variable. Express has a number of great and helpful methods (functions) that make web applications easier to program.

`app.get( ... )`

[App.get](http://expressjs.com/4x/api.html#app.get.method) is an Express method that is going to take a request (`req`) from the client (browser) for a root URL ('/' - think of www.google.com/ as a root URL - basically the default web address for a site) and respond (`res`) by sending ([`res.send`](http://expressjs.com/4x/api.html#res.send)) a message to the browser. This is an extremely common pattern in Express, and one you'll see a lot.

`app.listen( ... )`

Lastly, [app.listen](http://expressjs.com/4x/api.html#app.listen) is going to tell Node which port to listen on (3000). In this case, we're also providing a callback function (a function that gets called once the app.listen function has finished) that will tell us when Node is ready and the server has been started.

Let's test the applicaton now, by typing `$ node server.js` in the terminal window (make sure you're within the project directory). You should see the following:
```
$ node server.js
Listening on port 3000...
```
Great!

Now, open a browser and point it to `localhost:3000`. Within the browser window you should see the "Hello world!" message.

Let's take this one step further and serve the browser an actual HTML file. Within the project folder, create an `index.html` file.

Within this file:
```
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
```
app.get('/', function (req, res) {
	res.send('Hello world!');
});
```

_After:_
```
var path = process.cwd();

app.get('/', function (req, res) {
	res.sendFile(path + '/index.html');
});
```

The first order of business is to capture the current directory path in a variable. For this, we use Node's [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd) method.

Next, we tell Express to respond by sending a file to the browser, and specifying the location and name of the file: `res.sendFile(path + '/index.html');`.

Let's test the application now to ensure this is working correctly. Again from the project folder, type `$ node server.js` into the terminal.

Point the browser to `localhost:3000` and you should again see "Hello world!"

#### Refactoring Routes

Our next step is going to be refactoring our routes by using another common Express & Node pattern. Web applications have a number of routes (the HTTP requests made to the server), and it's common to store these in separate directories and files. That's our goal for this portion of the tutorial.

Begin by creating a new file within the `/app/routes` directory named `index.js`. This will be the JavaScript file containing our routes.

Remove the following from the `server.js` file:
```
app.get('/', function (req, res) {
	res.sendFile(path + '/index.html');
});
```

The next order of business is to add our new route file as a dependency for the server.js file. At the top of the file:
```
var express = require('express'),
	routes = require('./app/routes/index.js');
```

Now we need to pass the Express application as an argument to our route function object. Essentially, we will export our routes, and that function object will accept one argument, `app`. This will allow us to use Express functionality within the scope of our new route function. Hang in there if this doesn't make sense right away.

Include the following code where our former route code was within the file:
```
routes(app);
```

Your `server.js` file should look like:
```
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
```
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

#### Adding Additional Elements to Index.HTML

In this section, we're going to update our HTML file to include more content and get it ready for AngularJS integration. Here's the updated HTML code:

```
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

[insert img here]

Oh no! Why isn't our image loading? Well, when Node tries to access the `/public/img/` directory, it doesn't have any reference for how to find that file.

This can be solved by adding an additional line to the `server.js` file.
```
var path = process.cwd();

app.use('/public', express.static(path + '/public'));
```

Here we will use Express's [`app.use`](http://expressjs.com/4x/api.html#app.use) and [`express.static`](http://expressjs.com/4x/api.html#express.static) to bind the directory path for `/public` to a shortcut: `/public`. Now when `/public` is referenced within our HTML file, Express and Node should be able to locate the logo and pass it to the browser successfully.

Let's check to make sure that this is the case. Start the node server and point the browser to `localhost:3000`.

[insert img here]

Ahhh, that's better!

Now let's begin integrating AngularJS into our application.

#### AngularJS HTML Integration

To start our AngularJS integration, we need to update our HTML file to include Angular functionality. For starters, let's add a script tag that points to the Google CDN (Content Delivery Network), so that we can load AngularJS on our page.

To get the URL for this, head to `http://angularjs.org`. Click on the download button in the middle of the page, and copy the CDN URL to your clipboard.

[insert cdn image here]

Next, let's include this in our index.HTML file:
```
...
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
</body>
```

In addition to the traditional AngularJS source file, we need to use the [ngResource module](https://docs.angularjs.org/api/ngResource) as a dependency in our application. This module allows us to interact with an API by providing common data & API related functions.

To do this, return to the AngularJS site and click the download button again. This time, click on the "browse additional modules" link. (Alternatively, you can just click [here](https://code.angularjs.org/1.3.15/).) On this page, you'll need to find the `angular-resource.min.js` file and right-click on it. Choose "Copy link address." Return to the HTML file and we will now paste this location into another `<script>` tag.

...
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js"></script>
</body>
```

AngularJS needs to know what Angular module to run when the website is loaded. This is done through the inclusion of the [`ng-app`](https://docs.angularjs.org/api/ng/directive/ngApp) directive. For small apps like this one, it's common to only use a single Angular module; therefore, we will include the `ng-app` directive in the `<html>` element so that it will encompass the entire page.

Wait - what's an [Angular directive](https://docs.angularjs.org/guide/directive)? Directives are essentially a marker within the HTML that instruct Angular to bind specific functionality to that HTML element. An example of this would be to have a text box that is only visible when certain criteria is met. In that case, the directive would be included in the element tag, and Angular would know to execute the "show" action based on the directive code that was provided to Angular.

In this app, we're only going to use the out-of-the-box Angular directives. However, if you'd like to see a custom directive in action, check out the standard Clementine.js app.

```
<html ng-app="clementineApp">
```

Including this directive will allow us to use other Angular directives on the page. Note that this is a required piece of an Angular application.

Next, let's assign a few more directives to the bottom portion of our site:
```
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

[insert scope picture here]

Now that our HTML view is ready for Angular, let's define our client-side controller.

#### AngularJS $scope Manipulation

Begin this process by creating a new file named `clickController.client.js` in the `/app/controllers` directory. In this file, we'll put all the client-side code to handle events in the browser, like clicking on one of the buttons.

To begin, we're going to include `'use strict';` again at the top of the file. Then, we're going to wrap all of our Angular code in what's called an [immediately invoked function express (IIFE)](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression). Let's start with that:

```
'use strict';

(function () {

})();
```
An IIFE is going to bind all the variables within to the local scope of that function. This means that functions declared within this function will not conflict with other variables within the application that may share the same name or need to be re-used. This is a common practice in Angular code (and JS in general), and a good best practice to use.

Within this, let's first define our Angular module (i.e. the app), and then the controller.

```
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

_index.html_
```
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js"></script>
	<script type="text/javascript" src="/controllers/clickController.client.js"></script>
</body>
```
Here, we have added our new JS file to the HTML so that it is included in the page and can be executed when called upon. Take note of the order of the files here -- it does matter. The clickController needs functionality from the ng-resource file, which in turn depends on functionality within the angular script.

_server.js_
```
app.use('/public', express.static(path + '/public'));
app.use('/controllers', express.static(path + '/app/controllers'));
```

We've added an additional static path so that when the browser makes a request for the `/controllers' directory, the server can correctly serve the appropriate file.

Once that has been completed, fire up the Node server and browse to `localhost:3000`. You should now see, "You have clicked the button 1000 times." Congratulations, you've set up your first AngularJS controller!

However, neither of our buttons work when clicking on them. Hmm, let's fix that, shall we?

#### AngularJS Interactivity via the Controller

The next step we need to take is to make something happen when one of the buttons is clicked. If you'll remember back to the HTML Angular section, we defined two separate functions for each of the button `ng-click` directives: `addClick()` and `resetClicks()`.

Let's add those functions to the scope by defining them within the newly created controller.

To start, we'll need to:
- Define the default value of clicks each time the browser is started
- Define what happens when we click the 'CLICK ME!' button

_clickController.client.js_:
```
.controller('clickController', ['$scope', function ($scope) {

		$scope.clicks = 0;

		$scope.addClick = function () {
			$scope.clicks += 1;
		};

}]);
```

Above we have defined the default value of the clicks property on the scope method, and then defined the `addClick()` method. This method will add 1 to the number of clicks every time the button is clicked. Feel free to test this out at this point if you'd like.

Next, let's add the `resetClicks()` method to the same controller.
```
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

#### API & MongoDB Setup



#### Integrating the API


/**************************************************************************/

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
