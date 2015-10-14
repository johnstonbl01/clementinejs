---
layout: docs
---

# Clementine.js Beginner Tutorial

## Prerequisites

This tutorial requires the following prerequisites:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)

An internet connection is required to successfully complete this tutorial. Additionally, this tutorial assumes basic knowledge of HTML, CSS and JavaScript.

### Install Node.js and NPM

_Note:_ The Node installation installs both Node & NPM.

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

### Install MongoDB

MongoDB has great installation instructions for MAC OSX, Windows and Linux. [See this page.](http://docs.mongodb.org/manual/installation/)

## NPM Package Installation

Once the prerequisites are installed, the next order of business is to install the necessary Node packages that will be used in the app.

The first step is to create a `package.json` file. This is a file that will store all NPM package prerequisites in addition to other information about the application.

In the terminal window and within the project directory, enter `$ npm init`. This will step you through a series of prompted questions and finally create a `package.json` file in the root directory of your project folder. If you don't know the answer to one of the questions prompted by NPM, just hit enter -- we'll be able to manually change these if necessary.

Open the file and it should look similar to the below:

```json
{
  "name": "beginner-app",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT"
}
```

Feel free to update this information to be whatever you'd like. The main thing that needs to change is "main" should be set to "server.js."

Now that we've initialized NPM in our project directory and checked out the `package.json` file, let's install the NPM packages that we'll need to create this application.

In the terminal window:
`$ npm install express mongodb --save`

This command will install Express and the MongoDB Node.js driver. In addition, you'll notice a new directory named `node_modules`. This is the directory where Node installs the packages locally. 

The `--save` command tells NPM to save the dependency in the `package.json` file. If you open that file, it's now possible to see these dependencies.

```json
{
  "name": "beginner-app",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.12.4",
    "mongodb": "^2.0.33"
  }
}
```

### About Express

Express is a framework for Node.js that creates additional functionality for the creation of web application. A framework simply means that it is written based on another technology, and provides additional functionality through abstraction. Essentially, Express provides a number of very useful functions written for Node.js.

Without the Express framework, developers would have to write similar code for web applications every time they started a new project. Additionally, Express is unopinionated. This means that it isn't strict about how the functionality it provides is implemented. For an example of an opinionated framework, check out Ember.js.

For more information on express, check out their [website and documentation](http://expressjs.com/).

### About MongoDB

MongoDB is what's known as a document-store database. Each record within the database is stored in an individual "document." This type of database is also known as a NoSQL database, which stands for Not only SQL (structured-query language).

SQL databases are very common and have been around for a very long time as the defacto type of data storage. The most common examples are MySQL and PostgreSQL. The NoSQL databases (of which there are a number) are an alternative to SQL.

MongoDB is used as part of the MEAN stack because it allows us to write queries (code that the database receives and interprets to retrieve data) using JavaScript syntax.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

The MongoDB Node.js driver will allow us to use Node to query the MongoDB database.

## .gitignore

It is often common to see a file named `.gitignore` in the root directory of projects. This file simply tells git (version control software) to ignore particular files. Many times, the content of this file contains the `node_modules` directory. This prevents the directory from being uploaded to GitHub (on large projects, this directory can become quite large).

Example .gitignore file:

```
node_modules/
```

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

**public** - This directory contains information used to render the view (i.e. css & images). Traditionally, this directory would also include a library of any vendor code (i.e. AngularJS, jQuery, etc) used in the application. 

- **css** - Contains the style sheet for the application
- **img** - Contains any images used in the view (i.e. the Clementine.js logo)

## App Architecture Overview

Before we begin writing actual code, it's helpful to think of the overall picture for the application and how the pieces fit together. We'll be using an MVC (model-view-controller) architecture for this particular app.

This is a common architecture in web development. The model manages the application and data / database logic. The view is the content that is visible to the user. The controller helps manage data between the view and the model. In many cases, the controller will accept data and manipulate it, passing the results to the view.

Here's a diagram of this:

![MVC](/img/mvc.png)

Additionally, for more information on the MVC architectural pattern, check out the [Wikipedia page](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

In this tutorial, we're going to create a small application that will have the following functionality:

- Count the number of times a button is clicked
	- Store this count within a database
- Reset the count to 0

In the context of our application, we will have the following:

- A Node / Express web server that responds to HTTP request and passes files to the browser
- A MongoDB database that stores the number of clicks
- A server-side controller that will add, reset and retrieve the number of clicks from the database
	- This data will be passed to an API (application program interface)
- A client-side controller that handles user input, retrieves and modifies click information via the exposed API
- A client-side view that the user interacts with and sees
	- This is our HTML page that includes a logo and the buttons for interaction

This should provide some general context that will be helpful as we proceed with development.

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

This command enables ["strict mode"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), which is a way to opt in to a more strict version of JavaScript. This is best practice because it enforces more secure syntax and best practices through stricter syntax constraints. The documentation above provides some great examples of this behavior and how strict mode enforces them.

**`var express = require('express');`**

This is the node syntax for including Express as a dependency of our application. We store this within a variable that we can use later in the Node application.

**`var app = express();`**

This line initializes Express and allows us to access all of its great web application functionality via the `app` variable. Express has a number of great and helpful methods (functions) that make web applications easier to program.

**`app.get( ... )`**

[App.get](http://expressjs.com/4x/api.html#app.get.method) is an Express method that is going to take a request (`req`) from the client (browser) for a root URL ('/' - think of www.google.com/ as a root URL - basically the default web address for a site) and respond (`res`) by sending ([`res.send`](http://expressjs.com/4x/api.html#res.send)) a message to the browser. This is an extremely common pattern in Express, and one you'll see a lot.

**`app.listen( ... )`**

Lastly, [app.listen](http://expressjs.com/4x/api.html#app.listen) is going to tell Node which port to listen on (3000). In this case, we're also providing a callback function (a function that gets called once the app.listen function has finished) that will tell us when Node is ready and the server has been started.

Let's test the application now, by typing `$ node server.js` in the terminal window (make sure you're within the project directory). You should see the following:

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
app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/index.html');
});
```

First, we instruct Express to respond by sending a file to the browser, and specifying the location and name of the file: `res.sendFile(process.cwd() + '/index.html');`. Node's [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd) method captures the current working directory (cwd) and allows us to append the location of the file so that it is a complete string. This ensures that Node will correctly locate the file.

Let's test the application now to ensure this is working correctly. Again from the project folder, type `$ node server.js` into the terminal.

Point the browser to `localhost:3000` and you should again see "Hello world!"

### Refactoring Routes

Our next step is going to be refactoring our routes by using another common Express & Node pattern. Web applications have a number of routes (the HTTP requests made to the server), and it's common to store these in separate directories and files. That's our goal for this portion of the tutorial.

Begin by creating a new file within the `/app/routes` directory named `index.js`. This will be the JavaScript file containing our routes.

Remove the following from the `server.js` file:

```js
app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/index.html');
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

routes(app);

app.listen(3000, function () {
	console.log('Listening on port 3000...');
});
```

Now, let's add some content to the `index.js` file. We're going to use the [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports) method in Node to extend this function and make it available to other Node files (i.e. our `server.js` file). This function will accept a single argument (`app`), which will be the Express app.

index.js:

```js
'use strict';

module.exports = function (app) {
	app.route('/')
		.get(function (req, res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});
};
```

Some of this will look familiar, but it's important to note that we're using a different routing method from Express: [`app.route`](http://expressjs.com/4x/api.html#app.route). This is an alternative to app.get, and let's us bundle together several types of routes for a single page request (this will become apparently later in the tutorial). The remainder of this code is exactly the same as our former `app.get` route.

Next, move the index.html file into the `/public` directory. This will be the permanent home of this file.

Let's test this update to ensure everything has been setup correctly. From the project folder, type `$ node server.js` into the terminal.

Point the browser to `localhost:3000` and you should again see "Hello world!"

Let's move on to giving some more pizazz to our HTML file.

### Adding Additional Elements to Index.html

In this section, we're going to update our HTML file to include more content and prepare to add interactivity. Here's the updated HTML code:

```html
<head>
	<title>Clementine.js - The elegant and lightweight full-stack boilerplate.</title>
</head>

<body>

	<div class="container">
      <img src="/public/img/clementine_150.png" />
      <br />
      <p class="clementine-text">Clementine.js</p>
   </div>

   <div class="container">
      <p>You have clicked the button <span id="click-nbr"></span> times.</p>   
      <br />
      <div class="btn-container">
         <button type="submit" class="btn btn-add">CLICK ME!</button>
         <button class="btn btn-delete">RESET</button>
      </div>
   </div>

</body>
```

I've added some Clementine features and text to the application, but feel free to modify however you like. If you'd like to include a copy of the Clementine logo, feel free to download a copy (right-click > Save Image As) from the [this GitHub page](https://github.com/johnstonbl01/clementinejs-beginner/blob/master/public/img/clementine_150.png). Make sure to save it within the `/public/img` directory.

What did we accomplish with the new HTML? We included two `div` elements that contain a top and bottom portion of our small application. The top portion includes a picture and the name of the application.

The bottom portion contains text telling us how many times the button has been clicked, and the two buttons: one button to add clicks, and one to reset the clicks. In general, our strategy will be to target the `<span>` element and update the content of that element with the number of times the button has been clicked.

Now let's ensure that everything still works. Test the app by starting up the Node server and checking it in the browser. You should see:

![Tutorial Picture 01](/img/clemjstut01.png)

Oh no! Why isn't our image loading? Well, when Node tries to access the `/public/img/` directory, it doesn't have any reference for how to find that file.

This can be solved by adding an additional line to the `server.js` file.

```js
app.use('/public', express.static(process.cwd() + '/public'));
```

Here we will use Express's [`app.use`](http://expressjs.com/4x/api.html#app.use) and [`express.static`](http://expressjs.com/4x/api.html#express.static) to bind the directory path for `/public` to a shortcut: `/public`. Now when `/public` is referenced within our HTML file, Express and Node should be able to locate the logo and pass it to the browser successfully.

Let's check to make sure that this is the case. Start the node server and point the browser to `localhost:3000`.

![Tutorial Picture 02](/img/clemjstut02.png)

Ahhh, that's better!

## Connecting to MongoDB

In order to pass data values between the database and the client, we'll use an API (Application Program Interface). The API will simply be a way for us make our database data available to the front-end of the application.

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

	app.use('/public', express.static(process.cwd() + '/public'));
	app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

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

## Setting Up the Server-Side Controller

Similar to how the app has a client-side controller that is helping with the data between the client (browser) and the API (model), we'll also implement a server-side controller that will handle the information between the database and the API.

This controller will query our database, and update the API with the results. The client-side controller will update the API results immediately in the browser.

Let's begin with the creation of this server-side controller. Begin by creating a file named `clickHandler.server.js` in the `/app/controllers` directory.

_clickHandler.server.js_:

```js
'use strict';

function clickHandler (db) {

	var clicks = db.collection('clicks');
	
	this.getClicks = function (req, res) {
	
		var clickProjection = { '_id': false };
    
		clicks.findOne({}, clickProjection, function (err, result) {
			if (err) {
			throw err;
			}
			
			res.json(result);
		})
	};
};

module.exports = clickHandler;
```

Again, some of this code will look familiar. We define which [MongoDB collection](http://docs.mongodb.org/manual/reference/glossary/#term-collection) ([`db.collection(...)`](https://mongodb.github.io/node-mongodb-native/api-generated/db.html#collection)) we would like to use within the database. Collections are analogous to tables in the relational database world, and there can be multiple collections for a single database. In this case, MongoDB is smart enough to create the collection for us if it doesn't already exist. Thanks, Mongo.

For this application, our collection is named `clicks`. Afterward, we need to create a method that will retrieve the current number of clicks from the database. This functionality will be contained within a `getClicks()` method of the `clickHandler` function object.

Let's break down each line of the `getClicks` method:

- `function (req, res)` - A request and response are arguments for this particular function. This is similar to other functions previously defined in this application.
- `clicks` - the name of our database collection, which we have stored in a variable thanks to `var clicks = ...`
- `var clickProjection ...` - Every document in MongoDB is [automatically assigned an '_id'](http://docs.mongodb.org/manual/reference/object-id/) when inserted into a collection, unless otherwise specified. It's possible to specify a value or field as the '_id', but in our case we're going to leave it as is. This argument is known as the projection, which allows us to manipulate & exclude fields from the query results before they're passed on. In this case, we don't want the '_id' field to show up in our results since it's not needed. Due to that, the value has been set to `false` for this field.
- [`.findOne`](http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#find-first-occurence-with-findone) - This is a MongoDB query that will find the first document (analgous to record or row in relational databases) that meet the query criteria. It's possible to also use the [`find()`](http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#making-queries-with-find) method, but our collection will only have one document, so that's not necessary.
- `{},` - This is the query argument for the `findOne()` method. If we had multiple documents in our collection, we could specify certain criteria within this object to filter down the results. `{}` will return all documents (in our case, this is just 1).
- `clickProjection` - The projection that we defined previously.
- `function (err, result) {` - This is the callback argument for the findOne method. This callback function will define what Node should do with the results once the query has finished.
- `if (err) { throw err; }` - If an error is passed to the callback, then it will interrupt the application and throw an error message.
- `res.json(results);` - Send a response to the browser with a [JSON](http://www.json.org/) version of the results array.

Whew! That's a lot of new information! Finally, we're [exporting](https://nodejs.org/api/modules.html#modules_module_exports) a function object named `clickHandler` to be used elsewhere in Node.

Our new server-side controller is well on its way, but there's a problem. What happens if there are no documents in our collection? MongoDB is great about creating database and collections for us automatically when needed, but the data must be populated by us. If it's the first time using the application, there will not be any documents in the collection. We should account for this within this controller by inserting a document if one does not already exist.

Let's update the `getClicks()` function:

```js
this.getClicks = function (req, res) {

  var clickProjection = { '_id': false };

  clicks.findOne({}, clickProjection, function (err, result) {
     if (err) {
        throw err;
     }

     if (result) {
        res.json(result);
     } else {
        clicks.insert({ 'clicks': 0 }, function (err) {
           if (err) {
              throw err;
           }

           clicks.findOne({}, clickProjection, function (err, doc) {
              if (err) {
                 throw err;
              }

              res.json(doc);
           });
        });
     }
  });
};
```

The first order of business is to check that the original `findOne()` query actually returns a result. If it does, then we proceed with the same as before by inserting the results into an array and passing that back to Node and the browser. This is done within the `if (result) { ... }` block above.

However, if no result is returned, then we need to insert a document into the database using the [`insert()`](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#insert) method. This method takes two arguments, the document to insert (`{ 'clicks': 0 }`) and a callback function. The callback function will tell Node what do with the results. If there is an error, we throw the error. Once the new document is inserted, we query the DB to find the newly inserted document and return it to the browser in JSON format.

Before we test this out, we will want to change our routes a little bit.

_index.js_:

```js
'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {

	var clickHandler = new ClickHandler(db);

	app.route('/')
		.get(function (req, res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});

	app.route('/api/clicks')
		.get(clickHandler.getClicks);
};
```

Let's take a look at the changes:

- `var ClickHandler...` - Here, we're storing the function object we created from the `clickHandler.server.js` file in a variable.
- `var clickHandler = new ClickHandler(db)` - On this line, we're instantiating a new instance of the ClickHandler function object, and passing in the MongoDB object as an argument. This is going to allow us to reference the methods we created in the `clickHandler.server.js` in addition to passing in the database information for use in those methods.
- `app.route('/api/clicks')` - We're defining a new route here for our API
- `.get(clickHandler.getclicks)` - The `getClicks` function will be executed anytime there is an HTTP GET request on the `/api/clicks` URL. This will tell the Node to execute the controller function we defined previously and get the results from the database.

Let's give this a test! If this is your first time through the tutorial, it's likely that you have no documents in your clicks collection. This will be a great test for our insert statement. Fire up the node server and point your browser to `localhost:3000/api/clicks`. When the site loads, you should see: `[{"clicks":0}]`. If that is what you see, then everything has been setup correctly!

### Testing the API via the Mongo Console

If you'd like to test this again, we can manually remove the document from the database with some help from the MongoDB console. Leave Node running and open a new terminal window. Type `$ mongo` in the terminal window to connect to the MongoDB console.

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

Great! Now let's remove this document so that when we refresh the page again, it should re-create this record. Enter `db.clicks.remove({})` into the console. This will remove all documents in the collection. If you go back to the browser and refresh the page, a new document should get inserted in the database. 

### Additional Methods and Routing

We now have a working query that will return the contents of the database. However, we still need to provide routes and logic to tell the application controller what to do when the two HTML buttons are clicked. Essentially, we're going to add more functionality that will update the database each time the appropriate button is clicked.

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

`addClick` uses the [`findAndModify`](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findAndModify) method. The first two arguments are similar to the `findOne` method: first identify what you want to find (`{}` - returns all documents) and then provide the sort order in which you'd like the documents returned (in our case, sort in ascending order by the id field with `'_id': 1` -- this parameter doesn't matter much since we only have a single document). Then, we tell Node & MongoDB how we'd like to update the record(s) that were found.

In this particular case, we've opted to use `{ $inc: { 'clicks': 1 } }`. This uses the [Mongo `$inc` method](http://docs.mongodb.org/manual/reference/operator/update/inc/). The `$inc` method takes the property we want to modify (`clicks`) and provides the number by which we want to increment (1). So every time the `addClick` function is run, the number of clicks will increment by 1.

We then provide a callback function which will throw an error if one occurs, else the results are updated and sent back to the browser in JSON format.

Lastly, we use the [Mongo `update` method](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#update) for the `resetClicks` method. This will take a query for the first parameter (`{}` will return all documents), and the updated value (`{ 'clicks': 0 }`) for any records found. In this case, the `resetClicks` method will update the `clicks` property of our document to 0. The result of this operation is then passed back to the browser in JSON format.

Here's what the file should look like after all of the above changes:

_clickHandler.server.js_:

```js
'use strict';

function clickHandler (db) {
   var clicks = db.collection('clicks');

   this.getClicks = function (req, res) {

      var clickProjection = { '_id': false };

      clicks.findOne({}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
            res.json(result);
         } else {
            clicks.insert({ 'clicks': 0 }, function (err) {
               if (err) {
                  throw err;
               }

               clicks.findOne({}, clickProjection, function (err, doc) {
                  if (err) {
                     throw err;
                  }

                  res.json(doc);
               });
            });
         }
      });
   };

   this.addClick = function (req, res) {
      clicks.findAndModify({}, { '_id': 1 }, { $inc: { 'clicks': 1 }}, function (err, result) {
         if (err) {
            throw err;
         }

         res.json(result);
      });
   };

   this.resetClicks = function (req, res) {
      clicks.update({}, { 'clicks': 0 }, function (err, result) {
         if (err) {
            throw err;
         }
         res.json(result);
      });
   };
}

module.exports = clickHandler;
```

Finally, let's add routes for the remainder of our new ClickHandler methods.

_index.js_:

```js
app.route('/api/clicks')
		.get(clickHandler.getClicks)
		.post(clickHandler.addClick)
		.delete(clickHandler.resetClicks);
```

When there is an HTTP GET request to the `/api/clicks` route, the server will respond by running the `getClicks` method. Similarly, a POST and DELETE request will run the corresponding methods from the server-side controller.

That brings us to the end of the server-side controller. Now, we need to work on the client-side controller.

## Adding Interactivity via the Client-side Controller

The client-side controller will be responsible for retrieving information from the API, and making it available within the view. Additionally, it will specify what action should be taken when one of the two buttons are clicked.

More specifically, the strategy will be:

- Load the current 'clicks' value when the page loads
- When the `CLICK ME` button is clicked, make a POST request to the API and update the data value in the view
- When the 'RESET' button is clicked, make a DELETE request to the API and update the data value in the view

Remember that the server-side controller will increment the `'clicks'` value in the database every time a POST request is made, and that a DELETE request updates the `'clicks'` value to be 0. Hopefully it's possible to begin seeing how all the pieces fit together.

### Create the Controller

Let's start by creating a new file named `clickController.client.js` in the `/app/controllers` directory. To begin, include `'use strict';` again at the top of the file. Then, we're going to wrap all of our controller code in what's called an [immediately invoked function express (IIFE)](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression). Let's start with that:

_clickController.client.js_:

```js
'use strict';

(function () {

})();
```

An IIFE is going to bind all the variables within to the local scope of that function. This means that any variables declared within this function will not conflict with other variables within the application that may share the same name or need to be re-used. 

Next, let's use a bit of JavaScript to store our HTML buttons, the `<span>` element and the API url within their own variables. We'll use each of these within our functions. In order for JavaScript to find and identify the HTML elements in the [DOM (document object model)](https://en.wikipedia.org/wiki/Document_Object_Model), we'll use the [`document.querySelector(cssSelector)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method.

This function will return the first HTML element in the DOM that matches the value of the CSS selector argument. Let's use this to store the 'CLICK ME' button, the 'RESET' button and the `<span>` element. Lastly, let's also store the URL of the API as a string within its own variable.

_clickController.client.js_:

```js
'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';
})();
```

The next step will be to create the functions that will be used in the event handlers for the buttons.

### Create Controller Functions

The first challenge we need to overcome is to retrieve the API data when the page loads, so that the `<span>` element will reflect the current database value. To do this, we'll create a function that will check that the DOM has loaded, and will execute another function once that condition has been met.

_clickController.client.js_:

```js
'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';

   function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
})();
```

Let's break down exactly what we've added here. We have a `ready` function that takes a single argument - `fn`. The first conditional `if` statement simply ensures that the argument provided is a function by calling the `typeof` operator. If the type of the `fn` argument is not a function, then the function simply `return`s, thereby not taking any action. This prevents elements like arrays and strings from being provided as arguments.

Then, if the `readyState` property of the document object is equal to `complete`, we're going to execute the function passed as an argument. This is done by adding the `();` after returning the argument.

Lastly, if the document has not yet loaded, we'll add an event listener with [`document.addEventListener(type, listener, useCapture)`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). This method takes 3 arguments: 

- `type`: a string representing the type of event to listen for. In our case, we're listening for the `DOMContentLoaded' event
- `listener`: the function that should be executed when the event occurs -- the `fn` argument in this case
- `userCapture`: a true/false value which specifies if all events of the specified `type` should be executed with the `listener` argument. This defaults to `false`

The next order of business is to create a function that will retrieve the data from the API. To do this, we're going to use an [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). This object will allow us to retrieve information without requiring the entire page to be refreshed. This is also referred to as [AJAX (Asynchronous JavaScript + XML)](https://developer.mozilla.org/en-US/docs/AJAX), and is a common convention of front-end development.

_clickController.client.js_:

```js
'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';

   function ready (fn) { ... }

   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
})();
```

Let's break down this new function into manageable bits.

`function ajaxRequest(method, url, callback) { ... }`: our new function will take 3 arguments:

- The HTTP `method` that we would like the request to use (i.e. GET / POST / DELETE)
- The `url` that the function make the HTTP request to
- A `callback` function that should be executed once the data has been retrieved.

`var xmlhttp = new XMLHttpRequest();`: here we are creating a new instance of the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object using [constructor notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Using_a_constructor_function). Doing this will allow us to access the methods (i.e. functionality) associated with this object. Think of this as essentially creating a "copy" of the XMLHttpRequest object for us to use.

`xmlhttp.onreadystatechange = function () { ... }`: Here we are assigning a callback funciton to the property [`onreadystatechange`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange). Every time the [`readyState`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties) property of the XMLHttpRequest object changes, it will execute the function that we're defining.

Essentially, this function will execute multiple times as the `readyState` changes during the data retrieval process. There are multiple values for `readyState`, which can be [found here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties). The one we're concerned about within the `if` statement is where `readyState === 4`. A `readyState` of 4 means that the operation (i.e. data retrieval) has been completed. Additionaly, we want to ensure that the `status` (which is simply an [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)) is equal to `200`, which signals that the request was OK (therefore no errors or issues).

If both of those conditions are met, then we are executing the `callback` function provided as an argument to the function, and also passing the `xmlhttp.response` property as an argument for use in that function. This `response` property is the piece that will contain the data from the AJAX request.

Now we get to the meat of the function. When the function is first called, we want to initiate the request. That's the purpose of the `xmlhttp.open(method, url, async)` method. [This method](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open()) takes 3 arguments:

- `method`: a string containing the HTTP method to use as part of the request (i.e. 'GET'/'POST'/etc). In this case, we are passing in our `method` argument from the `ajaxRequest` function.
- `url`: the URL to send the request to (again, in this case we're passing in the `url` argument from the `ajaxRequest` function)
- `async`: A boolean value which specifies if the request should be made asynchronously. In this case, we do want the request to be asynchronous, so we specify a value of `true`

Lastly, the `xmlhttp.send()` method executes the previously initiated request (from the `open()` method). That's it! You've written your first AJAX function!

Next, let's write a small function that will update the HTML `<span` element. 

_clickController.client.js_:

```js
'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';

   function ready (fn) { ... }

   function ajaxRequest (method, url, callback) { ... }

   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
})();
```

This small function will be extremely important for our app. Note that the `data` argument being passed in will actually be the data from the `xmlhttp.response` property mentioned above. The AJAX request will make the appropriate HTTP request, and return a string with the value from the API.

Unfortunately, we'd prefer it if this string were actually an object, so that we can reference the `clicks` property and return its associated value. Remember that our data object from the API looks like: `{ 'clicks': 0 }`. 

We'll convert the string from the `data` argument to an object using the [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method. This method merely takes a string as input and converts it to a JSON object. We'll store this newly created object in the `clicksObject` variable.

Next, we'll take the `clickNbr` element (which we defined by using `var clickNbr` earlier) and use the [`.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property to define the contents of the `<span` element and set it equal to the `clicks` property of our newly-created JSON object. 

Next, let's define what should happen when the page loads and each of our buttons are clicked.

### Listening for Events

The first hurdle to overcome is that we need to determine some way to retrieve the current number of clicks when the page loads. To accomplish this, we'll use the `ready` function we set up earlier which bound an event listener to the `'DOMContentLoaded'` event. 

Now we simply need to execute that function with the desired arguments. Remember that the `ready` function took another function (`fn`) as an argument.

_clickController.client.js_:

```js
'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';

   function ready (fn) { ... }

   function ajaxRequest (method, url, callback) { ... }

   function updateClickCount (data) { ... }

   ready(ajaxRequest('GET', apiUrl, updateClickCount));
})();
```

Now we are executing the `ready` function, but passing in our AJAX function with the relevant arguments. We want to `GET` the information from the `apiUrl`, and `updateClickCount` with the results of the request.

Similarly, we can now define what to do when our buttons are clicked by using the same pattern, and pieces of everything we've done so far! Let's begin by creating an event listener for the 'CLICK ME' button. Remember that the HTML element for the 'CLICK ME' button has been stored in the `addButton` variable.

_clickController.client.js_:

```js
'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';

   ...
   ...

   addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount)
      });

   }, false);
})();
```

The above should begin to look familiar. We're attaching an event listener to the `addButton` element, and listening for the `'click'` event. When that event occurs, we're executing the function. This function first makes a POST AJAX request, which increments the number of clicks. Once that request has completed, a GET request is made to update the 'clicks' value in the browser.

Next, we'll add a similar event listener for the 'RESET' button.

_clickController.client.js_:

```js
'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';

   ...
   ...

   addButton.addEventListener( ... );

   deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);
})();
```

Finally, we add a similar event listener to the 'RESET' button. Similar to the event listener for the 'CLICK ME' button, this function will listen for a `'click'` event. Once the event has been fired, the function will make an HTTP `'DELETE'` request to the `apiUrl`. This will reset the number of clicks to 0. Then, we'll update the value of the `<span>` element by making an HTTP GET request.

Lastly, we need to include this new controller in our HTML file so that it is included when the DOM loads.

_index.html_:

```html
<!DOCTYPE html>

<html>

   <head>
     ...
   </head>

   <body>
      <div class="container">
         ...
      </div>

      <div class="container">
         ...
      </div>

      <script type="text/javascript" src="/controllers/clickController.client.js"></script>   
   </body>

</html>
```

Now, it should be possible to test the application. Type `node server` in the terminal window, and point the browser to `localhost:3000`. Test the buttons to ensure they work.

It's great that our app works now, but it's pretty dull. Let's add some pretty colors!

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
	margin: 20px auto 0 auto;
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

	<title>Clementine.js - The elegant and lightweight full-stack boilerplate.</title>
	
	<link href="http://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" type="text/css">
	<link href="/public/css/main.css" rel="stylesheet" type="text/css">

</head>
```

The first `<link>` is referring to a Google Font CDN. This isn't required, but I really like the Roboto font. The second `<link>` is the link to our CSS file.

Let's start up the app. Wow! Your app should now look something like:

![Tutorial Picture 03](/img/clemjstut03.png)

## Next Steps

Congratulations on completing your first full stack JavaScript application! If you're a beginner, my advice is to build upon this knowledge by continuing build things -- a login application, a comment application, etc. Building will solidify your understanding of these concepts, and force you to learn new things as well. If you enjoyed this tutorial, please feel free to [let me know on Twitter](https://twitter.com/johnstonbl01)!

If you encounter any issues whatsoever, submit an issue here on GitHub, or let me know via Twitter.

## Additional Resources

**MongoDB**

- [Mongo University's Mongo101JS](https://university.mongodb.com/courses/M101JS/about) - This is a really great course for learning the power and functionality of MongoDB. The difficulty ramps up in Week 2, so make sure you're comfortable with Node.js.

**Express**

- Code School's [Building Blocks of Express.js](https://www.codeschool.com/courses/building-blocks-of-express-js) - Code School's courses are great supplemental material. Make sure to build something alongside the videos and exercises to really ensure you're learning the concepts.

**Node.js**

- Node School's [Learn You Node](http://nodeschool.io/#workshoppers) - A really great introdution to Node.
- Code School's [Real Time Web with Node.js](https://www.codeschool.com/courses/real-time-web-with-node-js) - Similar to the Express course, Code School offers a great primer on Node. Again, make sure you're building something alongside this tutorial for it to really pay off.
