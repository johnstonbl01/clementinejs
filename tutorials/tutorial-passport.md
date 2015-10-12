---
layout: docs
---

# Clementine.js Passport Authentication Tutorial

## Prerequisites

This tutorial assumes that you have a working version of the application built in the [previous tutorial](/tutorials/tutorial-beginner.html).

_Note_: This tutorial assumes that you have a GitHub account.

_Additional Note_: The previous tutorial used port `3000`, but this tutorial will use port `8080` instead. This change was made to align this tutorial with the Free Code Camp version of Clementine.js. Port `8080` makes setup a bit easier when using c9.io.

## Attack of the Auth

Let's assume that we only want people to see our coveted click-counting application who have registered on the site using their GitHub Account. After all, the app is super secret and anonymous users aren't allowed!

In order to accomplish this, we'll need to integrate some sort of authorization and authentication system into our application. Additionally, we'll want to give users the option to sign up for the site if they haven't already. It's important to understand that although authorization and authentication sound similar, they have very different meanings:

- _authorization_ is the set of rules put in place that determine what a user can do within the application based on his or her credentials (i.e. an admin often has more functionality at her fingertips than a normal user)
- _authentication_ is the act of identifying and verifying users (i.e. username / password verfication, etc)

Normally, this requires worrying about securing and encrypting passwords, but luckily we're going to use a very common JavaScript library named [Passport.js](http://passportjs.org/). As an extension of this library, we're going to focus on a feature known as [OAuth](https://en.wikipedia.org/wiki/OAuth).

OAuth is an open standard for authentication that allows 3rd-party sites (like ours) to use Twitter (Microsoft, Google and Facebook are also included) credentials to log into the 3rd party site. This is great because we don't have to worry about securely storing the passwords or managing any of the encryption.

This advanced tutorial, created specifically for [Free Code Camp](http://www.freecodecamp.com/) students, will walk you through integrating this library with the Clementine.js demo application created during [part 1 of the tutorial](/tutorial-beginner.md).

## Setup

### Install NPM Packages

Before we get started in earnest, let's install some of the packages we'll require throughout the installation.

```bash
$ npm install passport --save
```

Passport is the authentication and authorization library that will be used to validate users.

```bash
$ npm install passport-github --save
```

This will install the GitHub "Strategy" for Passport. Strategies are Passport's term for different methods of authentication. As an example, there's a Facebook Strategy and a Google Strategy as well.

```bash
$ npm install express-session --save
```

This package is [middleware](https://en.wikipedia.org/wiki/Middleware) for the Express framework. You can think of middleware as an "add-on" or "plugin" that will allow additional functionality within Express. In this case, it's going to allow us to use [sessions](http://stackoverflow.com/questions/3804209/what-are-sessions-how-do-they-work). 

Sessions are essentially server-side storage where information like a user ID are stored and persist through interaction with a website. This essentially means that the site "remembers" your user ID and that you've been authenticated. In the case of this app, it will allow us to interact with the website without having to constantly re-authenticate.

```bash
$ npm install mongoose --save
```

[Mongoose](http://mongoosejs.com/) is an object modeling tool for MongoDB. It sits on top of the database and provides additional querying and validaiton support for the database. Most importantly, it allows for the definition of [database schemas](https://en.wikipedia.org/wiki/Database_schema). 

Think of a database schema as a set of rules that determine the type of data that can be inserted into the database. As an example, we could set up a schema so that a username in the database will always be a string, and that it is a required field. If someone were to try and insert a number or any other data type, an error would be thrown.

It's extremely common to see Mongoose paired with Passport, and even more common to see Mongoose used in place of the default MongoDB Node.js driver. This, in part is due to the schemas mentioned above, but also due to the enhanced syntax. We'll see some of that a bit later.

```bash
$ npm uninstall mongodb --save
```

This will uninstall the MongoDB Node driver used in the last tutorial, since we'll be using Mongoose in its place.

```bash
$ npm install dotenv --save
```

The [dotenv](https://www.npmjs.com/package/dotenv) package will allow us to store our private GitHub API information without it being exposed when uploading to a remote repository.

The `package.json` file should now look like:

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
   "license": "MIT",
   "dependencies": {
      "dotenv": "^1.2.0",
      "express": "^4.12.4",
      "express-session": "^1.11.3",
      "mongoose": "^4.1.0",
      "passport": "^0.2.2",
      "passport-github": "^1.0.0"
   }
}
```

### Updating the Folder Structure

Let's go ahead and modify the folder structure to include some of the new functionality we'll be convering. 

```
+--	Project Folder
	+--	app
	|	\-- common
	|	\-- config
	|	\-- controllers
	|	\-- models
	|	\-- routes
	|
	+-- public
	|	\-- css
	|	\-- img
```

**Project / Root Folder** - The project directory. This directory contains:

- **app/common** - This directory will contain common JS functions that will be used across more than one of our controllers.
- **app/config** - The directory containing configuration files for Passport.
- **app/models** - Directory for database models. In this case, this is where the Mongoose schemas will be defined. These models are definitions of desired data structure that will be inserted into the database.

The remainder of the folders are the same as the previous version of the app.

## Mongoose Integration

Before we begin the integrating Passport and authentication, we need to update the current app to work with Mongoose instead of the MongoDB Node.js driver. This will require a bit of refactoring in our current code.

### Server.js Cleanup

The first step will be to update the current `server.js` file so that it connects to the database using Mongoose instead of the current MongoDB Node.js driver.

_server.js_:

```js
'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/clementinejs');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);

var port = 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
```

There are 3 changes to the code:

1. Remove the `mongo = require(...)` statement and replace it by requiring Mongoose instead.
2. Remove the `mongo.connect(...)` wrapping function, including the conditional `if` statement. This gets replaced with a Mongoose connection function.
3. Remove the `db` argument for the routes, as we will no longer need to provide that information since Mongoose will do it for us via the schema. Don't worry if this part doesn't make too much sense, we'll go into more detail once we get to that part.

### Create a Mongoose Model

To start, we need to define a schema for the clicks document in the database. Think back to the previous tutorial. The API looked something like:

```js
[{ 'clicks': 0 }]
```

In terms of a schema, we're going to define the properties within the object and its corresponding data type. In this case, the property is `'clicks'` and the data type is `Number`. Defining this will prevent a `String` data type being passed as a value to the `'clicks'` property.

Begin by creating a new file named `clicks.js` in the `/app/models` directory.

_clicks.js_:

```js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Click = new Schema(
	{ clicks: Number },
	{ versionKey: false }
	);

module.exports = mongoose.model('Click', Click);
```

First, Mongoose is included in the file with `require('mongoose');`. Next, we're creating a new Schema object with `mongoose.Schema`. Each Mongoose schema corresponds to a MongoDB collection. In turn, each key in the schema defines and casts its corresponding property in the MongoDB document.

The `Click` object is our Mongoose Schema. Predictably, we're defining the `clicks` property and casting its value as a `Number` type. Mongoose automatically adds a property to every schema called `__v`. This property is used for versioning. In this particular case, we've disabled this using `versionKey: false`.

Finally, we must convert our schema to a Mongoose [model](http://mongoosejs.com/docs/models.html). The model is an object [constructor](https://en.wikipedia.org/wiki/Constructor_(object-oriented_programming)) that represents documents within the database. 

The `mongoose.model` method accepts two arguments:

- The first is the _singular_ name of the collection in the database. For example, ours is named 'Click' which corresponds to our 'clicks' collection in the database. It's important to note that Mongoose will automatically search for the plural version of this argument in the database.
- The second argument is the name of the schema to be converted to the model. In this case, it's our `Click` schema.

This model is exported with [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports), which is a Node function that exports the function or object for use within another file using the `require` function. This is a common Node pattern.

### Updating the Routes

Next, let's move on to our route file in the `/app/routes` directory. There are only a few small changes here.

_index.js_:

```js
'use strict';

var path = process.cwd();

var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app) {

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/clicks')
		.get(clickHandler.getClicks)
		.post(clickHandler.addClick)
		.delete(clickHandler.resetClicks);
};
```

We've removed the `db` argument from both the `module.exports = function (app) {... }` line and the `new ClickHandler()`. We've done this because the database information itself is inherent in using a Mongoose schema. The model we created earlier gets exported for use within our controllers. We'll see this shortly. For now, these are the only changes required to the route file. Wasn't that easy?

### Refactor Server-Side Controller

This is where we're going to see the majority of Mongoose changes. In general, these changes are due to Mongoose's similar-but-different query syntax for MongoDB. Additionally, as alluded to in the previous section, we'll now be importing our Mongoose model here for manipulation. Let's walk through the changes one at a time.

The first change we'll make is including (importing) our Mongoose model for use within the controller file. In the `/app/controllers` directory.

_clickHandler.server.js_:

```js
'use strict';

var Clicks = require('../models/clicks.js');

function clickHandler (db) {...}
```

We're importing and storing our `mongoose.model` within the `Clicks` variable, so that we can update the clickHandler methods to query this collection. Remember that Mongoose will automatically find the correct collection in the database (it looks for the plural version of the model name we provided in the `mongoose.model(...)` function). Additionally, keep in mind that MongoDB will create the collection if it does not already exist.

Next, we need to remove the `db` argument from the clickHandler function. 
In addition, we want to remove the `var clicks = db.collection('clicks');` line because that's no longer needed. Our database model is already being stored in the `Clicks` variable. Now we'll move on to modifying each of the methods within this file.

**getClicks Method**

The `getClicks` method will need a number of modifications. Again, these modifications are due to Mongoose syntax, which is a bit easier to read than the default MongoDB Node.js driver.

_clickHandler.server.js_:

```js
this.getClicks = function (req, res) {
	Clicks
		.findOne({}, { '_id': false })
		.exec(function (err, result) {
				if (err) { throw err; }

				if (result) {
					res.json(result);
				} else {
					var newDoc = new Click({ 'clicks': 0 });
					newDoc.save(function (err, doc) {
						if (err) { throw err; }

						res.json(doc);
					});

				}
			});
};
```

Let's breakdown each of the changes:

- Remove `var clickProjection = { ... };`. Removal of the `_id` field is inherent in the Mongoose schema, so this statement is no longer needed.
- `clicks` replaced with `Click`
	- this is to accomodate our newly imported Mongoose model.
- `findOne({}, { '_id': false } function (err, result) {...})` replaced by `findOne({}, { '_id': false }).exec(function (err, result) {...})`
	- This is simply different syntax that will accomplish the same result. The Mongoose [`.exec()`](http://mongoosejs.com/docs/api.html#query_Query-exec) function simply executes the query when called. 
	- This is different from the MongoDB driver in that it does not execute the query immediately. Mongoose will execute the function only when the `.exec` method is called.
- Conditional `else {...}` changes
	- The biggest change is in the conditional else, where we are inserting data into the database if no results are found. All of the former code is removed, and replaced by new (and much easier to read) Mongoose code.
	- `var newDoc ...` creates a new document using the parameters defined within the Click model and stores it in the `newDoc` variable
	- We're then saving the `newDoc` using the Mongoose [`.save()`](http://mongoosejs.com/docs/api.html#model_Model-save) method. This method simply saves the current document to the database.

**addClick Method**

The remaining two methods in our clickHandler function object require fewer changes. For the `addClick` method, we simply change the function from `clicks.findAndModify()` to `Clicks.findOneAndUpdate()`. The [`findOneAndUpdate()`](http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate) Mongoose function will find the first result from the query parameter (`{}` in our case will pull back all records). 

Since our collection only has a single document, it will return the appropriate record. Again, we're using the Mongoose `exec()` function to execute the query. And lastly, we remove the `{ '_id': 1 }` projection from the query. Removing the projection here is not required, because by default Mongoose will not return the `_id` field.

_clickHandler.server.js_:

```js
this.addClick = function (req, res) {
	Clicks
		.findOneAndUpdate({}, { $inc: { 'clicks': 1 } })
		.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			}
		);
};
```

**resetClicks Method**

Now, we make similar changes to the `addClick` method.

_clickHandler.server.js_:

```js
this.resetClicks = function (req, res) {
	Clicks
		.findOneAndUpdate({}, { 'clicks': 0 })
		.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			}
		);
};
```

As you'll notice, the above method is nearly identical to the `addClick` method. The only difference is that we're resetting the 'clicks' value in the document to be 0 rather than incrementing it by 1.

Finally, it's time to export our clickHandler function object:

_clickhandler.server.js_:

```js
'use strict';

var Clicks = require('../models/clicks.js');

function ClickHandler () {

	...
	...

}

module.exports = ClickHandler;
```

This syntax should be familiar now. Let's test that the application still works. In the terminal window of the project directory, type `node server`, and then browse to `localhost:8080`. The app should function just as it did before -- adding and resetting clicks!

## Passport Server-Side Integration

### GitHub App Setup

Before getting to the coding portion, we need to register our app with GitHub and obtain an API key. An API key is like a password between your app and GitHub, so they can identify who is using the API and ensure that the program has permission to view/modify information from the site.

Head to GitHub and log in.

1. Click your profile picture in the top right corner and choose the 'Settings' option.
2. On the left-hand side, click on 'Applications'.
3. At the top of the page, click on 'Developer applications'.
4. Click the 'Register new application' button.

![GitHub Settings](/img/passporttut01.png)

5. Fill out the form:
	- Name: Whatever you'd like to name your app. Mine says 'clementinejs-fcc', of course. This app name needs to be unique.
	- Homepage URL: Since we're using localhost, simply use `http://127.0.0.1:8080/`. `127.0.0.1` is the default IP address for localhost. For some reason, simply entering 'localhost' instead wouldn't work for me.
	- Description: A short description of your app.
	- Authorization callback URL: `http://127.0.0.1:8080/auth/github/callback`. This will be the URL that gets passed in when we're authenticated. We'll add a route for this URL later.
4. Click 'Register application'.

![GitHub App Registration](/img/passporttut02.png)

Once this is done, it will take you to a page with information about your application. On the top right, there will be codes for Client ID (API Key) and the Client Secret (API Secret). We'll use these later in our app.

![GitHub API Keys](/img/passporttut03.png)

The difference between the API Key and the API Secret is that the key is considered _public_, while the secret is known only to the vendor (GitHub in this case) and you.

### Create Environmental Variables

Now let's take advantage of the dotenv module we installed earlier. Begin by creating a new file named `.env` in the root project directory. Within this file, we will define variables which will be kept private. When the dotenv module is initialized (we'll get to this shortly), it stores these values on Node's `process.env` object. Each value in the `.env` file will create a new property on the object.

In our case, we need to store 3 variables for GitHub authentication:

1. The GitHub API Client ID
2. The GitHub API Client Secret
3. The URL for our app

The URL isn't private information, but is used by Passport to determine the callback URL for authentication.

In the `.env` file:

```
GITHUB_KEY=your-client-id-here
GITHUB_SECRET=your-client-secret-here
APP_URL=http://localhost:8080/
```

You'll simply need to paste the keys GitHub provides as part of the app registration into this file.

next, we need to include this `.env` file as part of our `.gitignore` file so that this file does not get tracked by Git. This is an important step to ensure that these private keys remain private.

_.gitignore_

```
node_modules/
.eslintrc
.env
```

### Create the User Model

One new feature of our application will be to store the number of clicks for each user instead of inside a global document within MongoDB. This means that each user will have their own number of clicks, and will also allow us to show of some of Express' parameter routing (more on this later).

To begin, let's work on defining our user model. Create a new file in the `/app/models` directory named `users.js`.

_users.js_:

```js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   }
});

module.exports = mongoose.model('User', User);
```

Most of this code should be familiar from the Click model we defined previously. Inside our Schema, we're defining the fields to be stored in the database after we authenticate with GitHub. These are put in their own object because it's common to have a model with several types of authentication: Facebook, Twitter, etc. Each of these would store their information within different objects of the User model.

The GitHub API allows us to view quite a bit of information. You can see the [full specification here](https://developer.github.com/v3/users/), but we'll just be focusing on these fields:

- id: The numeric ID associated with the GitHub account.
- displayName: The full name (i.e. first and last) for the GitHub account.
- username: The GitHub username for the account
- public_repos: The number of public repositories associated with the GitHub account

Next we'll move on to setting up our authorization file.

### Authorization Configuration

We need a way to reference the app-specific GitHub authentication information so that GitHub can confirm the application has permission to access its API and retrieve user information. Previously, we created a `.env` file and stored our private keys within. We'll need to reference the Node `process.env` object somewhere in our to retrieve this information.

We'll use this information when we contact the GitHub API with Passport, so we'll export it and make it available to `require` in other parts of our app. Create a new file named `auth.js` in the `/app/config` directory.

_auth.js_:

```js
'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	}
};
```

The `'callbackURL'` is the URL we entered when registering our app, and this is where GitHub will send information once the user has been authenticated. We'll handle this callback in our routes later. For now, just know that GitHub first authenticates the user, then sends information back to to our application via the `'callbackURL'`.

For the other two properties, we simply reference the values provided by dotenv and the `.env` file. Again, these are created as object properties and values on the Node `process.env` object, so it's in that manner that we reference those values.

While this file is uploaded when committed to a remote Git repository, the actual values associated with these fields are hidden in a private `.env` file that is not tracked by Git. This keeps our information safe.

### Passport Configuration

The next step in integrating Passport will be to set up the actual authentication portion of the application. Let's begin by creating a new file named `passport.js` in the `/app/config` directory.

During the setup phase for this project, we installed `passport-github` via NPM. This is the module that will install the code necessary to authenticate with GitHub. In Passport, this is referred to as a "strategy" as noted above.

Let's start by requiring the Node modules we'll need:

_passport.js_:

```js
'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');
```

We're importing the Passport GitHub strategy object, our user model and our authorization configuration (i.e. GitHub API keys). Next, we'll create an exported function object that will take `passport` as an argument, and allow us to use Passport's methods inside our Node module. This will require us to pass in Passport to as an argument when calling this module, but we'll get to that in a bit. For right now, let's just define the function.

```js
module.exports = function (passport) {
	
};
```

This function will contain all of our Passport code. To begin, we'll serialize and deserialize our users. What's serialization? [Serialization](https://en.wikipedia.org/wiki/Serialization) is the process of taking information and transforming it into a state (a series of bytes) that can be stored in persistant storage and streamed across a network. This information can then be deserialized into a copy of the original object. 

In the case of authentication, we're transforming our user object into a format that can be stored within the session. The bulk of this is done by Passport, but it's important to understand what's happening conceptually. More information on this can be found within the [configure documentation on the Passport site](http://passportjs.org/docs/configure).

_passport.js_:

```js
module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
```

In `serializeUser`, we're passing in a callback function with the user object and `done` as arguments. `done` is a function native to Passport, which tells Passport to proceed in the authentication process. When `done(null, user.id)` is called, Passport takes this information and passes it to the authenticate function. The information is stored in the `req.session.passport.user` user object.

When subsequent calls are made, Passport will deserialize this information, and search our `User` model for the deserialized ID. This information is then stored in the `req.user` object. 

Serialization is not an easy subject -- especially in the beginning. For now, it's mostly just important to understand:

- Information sent over the network is compressed into bytes (serialization) and stored within a session (a small amount of persistant storage)
- The user information submitted via serialization must then be de-compressed
- Afterward, the database is searched to find the user information that corresponds to the matching user ID and provided back to the browser

Now we need to tell Passport what type of strategy we're going to use for authentication, and define what information we will get back from GitHub's API.

_passport.js_:

```js
module.exports = function (passport) {
	...
	...

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	}));
};
```

In the above code, we're instantiating a new [GitHub Strategy](https://github.com/jaredhanson/passport-github) object, and setting the authorization properties of that object to the configuration file we completed earlier. Passport will use this information to authorize that our application has the privilege of accessing the GitHub API.

Next we need to implement what Passport refers to as the ["verify callback."](http://passportjs.org/docs/configure) This is a callback function required by each type of strategy which will ensure the validity of the credentials and supply Passport with the user information that authenticated.

_passport.js_:

```js
module.exports = function (passport) {
	...
	...

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				}
			});
		});
	}));
};
```

The first 3 argumentions for this function (`token`, `refreshToken`, `profile`) contain objects with information provided back from the GitHub API. Once we receive this information back, it's Passport's job to determine whether or not this user exists in the application database.

Let's take a look at what this function is doing so far:

- [`process.nextTick()`](https://nodejs.org/api/process.html#process_process_nexttick_callback) is Node syntax that makes the code asynchronous. Node will wait until the current "tick" of the [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) completes before executing the callback function. This essentially makes Node wait until the user information comes back from GitHub before processing the results

- `User.findOne({...})` will search the database for a username where `github.id` is equal to the `profile.id` from the arguments passed back from GitHub. This should look really familiar to the queries in the `clickHandler` object we modified earlier.

- `function (err, user) {...}` is a callback function which will execute only when the database query has been completed.

- `if (err) {...}`: if the query returns an error, then pass the `done` argument to Passport with the `err` object.

- `if (user) {...}`: if a user is found, then return that user object to the Passport authentication function.

But what happens if a user is not found? What if the user is new, and he or she isn't in the database yet? Let's add some additional functionality to this to handle such a case.

_passport.js_:

```js
module.exports = function (passport) {
	...
	...

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
```

Here, we're creating a new instance of our User model, and then mapping database object properties like `newUser.github.id` to the information sent back by the GitHub API (`profile.id`). Note that we are setting the `nbrClicks.clicks` value to `0` so that every new user begins with the 0 clicks property. Finally, we insert this information into the database with `newUser.save(...)`, passing our user information back to Passport with `return done(null, newUser)`.

This is far and away the most complicated part of integrating authentication and authorization. If it's still a bit fuzzy, please reach out to me on Twitter or via Email and we can discuss. Let's move on, shall we?

### Further Server-Side Controller Modifications

There are a few additional changes that we need to make to the server-side controller. These changes are primarily due to the fact that in our new application, the number of clicks will be coming from the user model instead of the old Clicks model.

Begin by deleting the `clicks.js` file from `/app/models`. We'll no longer need this Mongoose model, as it has been replaced with `users.js`.

Now let's take care of the changes in the `clickHandler.server.js` file:

_clickHandler.server.js_:

```js
'use strict';

var Users = require('../models/users.js');

...
```

Here we have simply replaced the `Clicks` variable with `Users`. Because we are now looking for a specific user when we are updating the click count, we must provide a query condition for Mongo to find the appropriate user in the database. In this case, we'll be searching by the GitHub ID for the account (these IDs are numeric and unique to each account).

_clickHandler.server.js_:

```js
'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

}
```

Now we update the `this.getClicks()` method by changing `Clicks` to the new `Users` variable we just defined. This will execute queries using the `Users` model rather than the old `Clicks` model. Additionally, the `.findOne()` method arguments are updated to include the `{ 'github.id': req.user.github.id }` query parameter.

Previously, this was simply set to `{}`, which will return all results in the database. That was a fine solution when we only had one document in the database. Now that we potentially have multiple users in the database, we have to ensure that the `findOne` query will return the appropriate record. As mentioned above, we want to match the record where the `'github.id'` field in the database matches the `req.user.github.id` object property from the request object. The properties and values of this request object are populated by passport once the authentication has completed.

Also note that we have completely removed the conditional `if` statement that checks for a result from the query and inserts a new document if none exists. Remember that this functionality has now been added to our `passport.js` file, and is no longer needed as part of this method.

Lastly, we updated the response query to _only_ return the `nbrClicks` object for the user. next, let's perform some these updates for the two other methods.

_clickHandler.server.js_:

```js
'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

	this.getClicks = function (req, res) { ... };

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}
```

The changes for these two additional methods are nearly identical to the changes for the `getClicks` method. For `addClick`, we've updated `Clicks` to `Users` and added the same query parameter as a condition of the `.findOneAndUpdate()` method. Additionally, we've update the field to increment each time this method is called from simply `clicks` to `nbrClicks.clicks`. Again, this change is becaues the `clicks` object is now embedded within the user object. And lastly, we change the respones to send `result.nbrClicks` -- just like the `getClicks` method.

The changes for the `resetClicks` method are similar to the changes for `addClick`:

- Change `Clicks` to `Users`
- Add `{ 'github.id': req.user.github.id }` as the query parameter to the Mongoose method
- Change object property from `clicks` to `nbrClicks.clicks` in the function parameters
- Update result response to `result.nbrClicks`

That's it for the server-side controller. We won't touch it again, I promise! 

### Update and Create Routes

We're introducing a lot of new functionality on our site, and that means we need to update and define additional routes for our users. Let's take a step back to examine the overall strategy for our routes:

- The `/` or `/index.html` route will be the default route, but should only be accessible if a user has been authenticated. After all, we don't want unauthorized users seeing our awesome button-click app!
- We need to create a `/login` route that will authenticate users with GitHub.
- Additionally, we'll want a `/profile` page that shows a user's information
- A user will also want to `/logout`.
- We'll want to include a few application specific routes to post user information via an API, and define the previously mentioned `/auth/github` and `/auth/github/callback` routes

Let's start by including passport as an argument for our function. This will allow us access to Passport's internal methods and functionality within our routes.

_app/routes/index.js_:

```js
'use strict';

var path = process.cwd();
var ClickHandler = require(...);

module.exports = function (app, passport) {

	...
	...

};
```

Next, let's create a function that we can use in our routes that will determine if the user is authenticated.

```js
module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	...
	...
};
```

This function is what's known as [Express middleware](http://expressjs.com/guide/using-middleware.html). Essentially, Express itself is simply a series of middleware calls (i.e. the routing in Express is considered middleware).

It's going to take the `req` and `res` objects as arguments along with `next`. Next is a common convention used to tell Express to pass control to the next handler (or middleware) in the process. This can be found in the [Express routing docs](http://expressjs.com/guide/routing.html).

So what is this function doing?

`if (req.isAuthenticated()) {...}`: [`req.isAuthenticated()`](https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74) is a Passport method which will return a `true` or `false` value if the user has been authenticated. 

If this method returns `true`, then we are returning the `next()` function, which returns control to the next middleware. This entire statement is saying, "if the user has been verified, then carry on."

If the user is _not_ authenticated, then we are redirecting them back to the login page with `res.redirect('/login')`. Now let's add our additional authentication routes.

**/index**

These routes will look very similar to the routes from the previous tutorial, with a small amount of added functionality. Don't worry, we'll break each one down step-by-step.

Before moving onto new routes, we must first make a small edit to our `/` route. Since this is the default route for our application, and users shouldn't see this unless authenticated, we need Express to call the `isLoggedIn` function when a `get` request is made to the server.

_index.js_:

```js
...

function isLoggedIn (req, res, next) { ... }

var clickHandler = new clickHandler();

app.route('/')
	.get(isLoggedIn, function (req, res) {
		res.sendFile(path + '/public/index.html');
	});

...
```

You'll notice that immediately after the get request, we're going to check that a user is authenticated and logged in via the `isLoggedIn` function. Remember that if the user is not authenticated, this function will redirect to the `/login` route. However, if the user _is_ authenticated, then Express passes control back to the app.route middleware and proceeds processing the route.

**/login**

This route will be one of the only routes in our application that does not require a user to be logged in. In essence, this becomes the default URL when a user has not been authenticated.

_index.js_:

```js
...

app.route('/')
	.get(...)

app.route('/login')
	.get(function (req, res) {
		res.sendFile(path + '/public/login.html');
	});

...
```

This route is fairly straightforward. We don't need to check to see if the user is logged in, since this will be our view which asks the user to authenticate with GitHub.

**/logout**

This is the route that will be used when a user would like to log out of the application. Once logged out, the user will be redirected back to the `/login` page.

_index.js_:

```js
...

app.route('/')
	.get(...)

app.route('/login')
	.get(...);

app.route('/logout')
	.get(function (req, res) {
		req.logout();
		res.redirect('/login');
	});
...
```

Here, we're introducing a bit of new functionality. When a `get` request is made to the `/logout` route, we are calling the `logout()` function, which [Passport includes](http://passportjs.org/docs/logout) on the `req` object. This function will remove the `req.user` property and clear out any sessions that are present.

Once the session has been cleared and the `req.user` property removed, the app is then redirected to the `/login` route.

**/profile**

This will be a very small profile page that will show the user's GitHub information. Of course, the user must be authenticated in order to see this content.

_index.js_:

```js
...

app.route('/')
	.get(...)

app.route('/login')
	.get(...);

app.route('/logout')
	.get(...);

app.route('/profile')
	.get(isLoggedIn, function (req, res) {
		res.sendFile(path + '/public/profile.html');
	});

...
```

There's not any new functionality here, so this should look really familiar by this point.

**/api/user**

This route will be our user API that will store the user's GitHub information for us to retrieve on the front end.

_index.js_:

```js
...

app.route('/')
	.get(...)

app.route('/login')
	.get(...);

app.route('/logout')
	.get(...);

app.route('/profile')
	.get(...);

app.route('/api/:id')
	.get(isLoggedIn, function (req, res) {
		res.json(req.user.github);
	});

...
```
Here we're introducing some new Express functionality. We've added `:id` to the API route. This is known as a route parameter. When the `/auth/github` route is requested and Passport authenticates successfully with GitHub, Passport creates a `user` property on the Express `req` object. This object contains all of the fields requested from the GitHub API (i.e. username, display name, number of repos, ID, etc.). 

When the route is requested, the ID from this user object is passed as part of the URL (i.e. the URL would look like `/api/1234567`). This makes these requested URLs unique to each user.

When a `get` request is made to this route, Express should reply with a JSON object that contains the `req.user.github` object from Passport. This is the object which contains all the relevant user information, and we will query this from the front end later for the profile page.

**/auth/github**

This is the route that will be used when the user clicks the "Login" button and will initiate authentication with GitHub via Passport.

_index.js_:

```js
...

app.route('/')
	.get(...)

app.route('/login')
	.get(...);

app.route('/logout')
	.get(...);

app.route('/profile')
	.get(...);

app.route('/api/:id')
	.get(...);

app.route('/auth/github')
	.get(passport.authenticate('github'));

...
```

Again, this route will call the Passport [`authenticate`](http://passportjs.org/docs/authenticate) function, which will authenticate using the appropriate strategy (in this case, `'github'`).

**/auth/github/callback**

Remember setting up the GitHub app configuration and specifying a callback URL? Now we're going to specify what should be done when this URL is called by GitHub. This route will only be called after GitHub authentication has completed, and thus we need to be able to handle both success and failure conditions.

_index.js_:

```js
...

app.route('/')
	.get(...)

app.route('/login')
	.get(...);

app.route('/logout')
	.get(...);

app.route('/profile')
	.get(...);

app.route('/api/:id')
	.get(...);

app.route('/auth/github')
	.get(...);

app.route('/auth/github/callback')
	.get(passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

...
```

In addition to the Passport authentication, we're passing an object that will tell Passport where to redirect to pending both a successful and failed authentication attempt.

In the case of successful authentication, the user should be redirected to our click application (`/`), but should be [redirected](http://passportjs.org/docs/authenticate) back to the login page (`/login`) if the authentication is unsuccessful.

Next, let's update the routes that get the click information. We'll be posting the number of user clicks to a separate API. This is done mostly for illustrative purposes, and it's completely fine to simply take the number of clicks from the current user API instead.

_index.js_:

```js
...

...

app.route('/auth/github/callback')
	.get(...);

app.route('/api/:id/clicks')
	.get(isLoggedIn, clickHandler.getClicks)
	.post(isLoggedIn, clickHandler.addClick)
	.delete(isLoggedIn, clickHandler.resetClicks);
```

We're making the clicks API user specific by inserting the `:id` parameter into the API. Additionally, we're ensuring that the user is logged in and authenticated by including our `isLoggedIn` function as part of the route.

Finally, here's the full `index.js` file:

```js
'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
```

That's all of the routes for our application! Let's move on to modifying our server file and finishing up the backend modifications.

### Updating the Server File

Now we'll begin making the final server-side modifications. The first step is to include our additional NPM modules (express-session and passport) in the `server.js` file.

_server.js_:

```js
var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');
```

Next, we need to pass in this `passport` NPM Module to the Passport configuration file we created earlier (`app/config/passport.js`). Remember that the exported module from that file takes `passport` as an argument, so we're essentially intializing the Passport functionality when the `server.js` file is run by Node.

In addition, here me initialize the dotenv Node module, which will add our GitHub API information from `.env` to the Node `process.env` object.

_server.js_:

```js
var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);
```

The next step is to setup the Express session information and initialize Passport and the Passport session.

_server.js_:

```js
...

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

...
```

Here we're using the Express [app.use](http://expressjs.com/4x/api.html#app.use) function to configure the session options.

`secret` is our session secret. This is essentially a "password" that is used to create the session and prevent it from being hijacked. This makes hacking session information harder to hack and helps prevent others from impersonating specific users.

The newest version of Express-Session requires settings for `resave` and `saveUninitialized`. [`resave`](https://github.com/expressjs/session#resave) simply tells Express if you want to re-save the session to storage even when it has not been modified. This value is typically set to `false`, and we're using that setting as well. [`saveUninitialized`](https://github.com/expressjs/session#saveuninitialized) will force a new session (which has not been modified) to be created and stored. The default setting is `true`, so that's what we're using in our app.

[`passport.initialize`](http://passportjs.org/docs/configure) is required by Passport in order to initialize the Passport application. Similar to the Express initialization, this will instantiate the Passport functionality. Additionally, we use the [`passport.session()`](http://passportjs.org/docs/configure) middleware to enable the usage of session storage.

Lastly, we need to pass the Passport object into our routes file as an argument. Remember that we used Passport functionality within our routes, so we need to ensure that we enable the use of the Passport methods by passing it into our routes module.

_server.js_:

```js
...

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

...
```

The full `server.js` file:

```js
'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/clementinejs');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
```

Let's run a quick test. Within the project directory, start the application using `node server`. Then, point a browser to `localhost:8080`. There should be an error message referencing the `/login` route. This means that the app is working as intended at the moment - we tried to access the `/` route, but were redirected to `/login`. Since we've yet to create the view for that page, we get an error.

## Passport Client-Side Integration

To integrate our newly created authentication routines on the client side, we'll take the following approach:

- Refactor our common AJAX controller functions into their own file
- Update click controller to pull from new user-specific click API
- Create a user controller to retrieve user information and pass it to the view
- Create views for each of the routes
- Apply CSS

### Refactor Common AJAX Functions

Since we'll have multiple controllers in our application making AJAX requests, we'll be reusing a bit of functionality. It's best to follow the DRY (don't repeat yourself) principle as much as possible when coding. In this case, let's take these common functions make them available across each of our controllers without having to type them out more than once.

Let's start by creating a new file in `/app/common` named `ajax-functions.js`. Begin by creating a new variable with our app URL and anobject named `ajaxFunctions`:

_ajax-functions.js_:

```js
var appUrl = 'http://localhost:8080/';
var ajaxFunctions = {};
```

The `appUrl` will prevent us from having to type out the information multiple times and allow us to simply concatenate this string value with API information in our client-side controllers. 

Let's now expand upon this object by adding our functions as methods! We'll extract these functions from the `clickController.client.js` file.

_ajax-functions.js_:

```js
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
};
```

The functions themselves should be familiar from the previous tutorial. We can now remove these functions from our `clickController.client.js` file, which should now look like:

_clickController.client.js_:

```js
'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:8080/api/clicks';

   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }

   ready(ajaxRequest('GET', apiUrl, updateClickCount));

   addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

})();
```

We'll come back to this file momentarily to make a few additional modifications. First, let's ensure that the new common functions are included in the `index.html` file and we provide a static path to file in the `server.js` file. It's important that the common function file comes _before_ the other controller files.

_index.html_:

```html
		...
		<script type="text/javascript" src="common/ajax-functions.js"></script>
		<script type="text/javascript" src="controllers/clickController.client.js"></script>
	</body>
```

_server.js_:

```js
...
...

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

...
````

In `server.js`, we've added an additional static path for the `/app/common` folder.

### Updating the Click Controller

Since we moved the location of our `clicks` property to be within the user object, we need to make a few additional small modifications to the current `clickController`.

The first modification should be to update the `apiURL` variable. We created a global variable named `appurl` with the base URL of our app. Here we'll use that and concatentate it with the API information to create the entire API URL. Additionally, we've moved the location of our clicks API to `/api/:id/clicks`, so this variable should reflect that.

_clickController.client.js_:

```js
'use strict';

(function () {
...
var apiUrl = appUrl + 'api/:id/clicks';

...
})();
```

Next, we need to update where we're calling our AJAX functions from, since they've been moved to their own object. This can be done by using [dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors#Dot_notation) for the function calls using the syntax `objectname.method()`. As an example, we'll update the `ready(...)` function call to be `ajaxFunctions.read(...)`. This needs to be done any time a method is invoked. Here's what the revised file should look like:

_clickController.client.js_:

```js
'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = appUrl + 'api/:id/clicks';

   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

   addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

})();
```

That's the last of the click controller modifications. Let's work on the views next.

### Creating New Views

#### Login View

Let's begin by creating the view for our login page. Create a new file named `login.html` in the `/public` directory. Next, create the "template" HTML site we've used previously:

_login.html_:

```html
<!DOCTYPE html>

<html>

	<head>
		<title>Clementine.js - The elegant and lightweight full stack JavaScript boilerplate.</title>
		
		<link href="http://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" type="text/css">
		<link href="/public/css/main.css" rel="stylesheet" type="text/css">
	</head>

	<body>
		
	</body>

</html>
```

I'm not going to go into the specifics of the above snippet since it's been covered previously in the tutorial. We'll use this again for our other HTML pages.

Before moving forward, head to [this URL](https://github.com/johnstonbl01/clementinejs-fcc/blob/master/public/img/github_32px.png) and download a copy of the GitHub logo. Save it within the `/public/img` directory.

Now, let's create a container `div` in the `body` with the remainder of our functionality.

_login.html_:

```html
<body>
	<div class="container">	
		<div class="login">
			<img src="/public/img/clementine_150.png" />
			<br />
			<p class="clementine-text">Clementine.js</p>
			<a href="/auth/github">
				<div class="btn" id="login-btn">
					<img src="/public/img/github_32px.png" alt="github logo" />
					<p>LOGIN WITH GITHUB</p>
				</div>
			</a>
		</div>
	</div>
</body>
```

Ignore the CSS classes, as the stylesheet will be provided for these pages as it was in the previous tutorial. We create a `<div>` element for our login components, followed by inserting the Clementine.js logo. Next, the title `Clementine.js` is added in a `<p>` element.

Finally, we're going to create an anchor element (`<a>`) and point the hyperlink to our `/auth/github` route. Remember that this is the route that will prompt authentication with GitHub. 

Inside the anchor element, we're including a `<div>` with the GitHub logo and the phrase, "LOGIN WITH GITHUB". After CSS is applied, this anchor element will wrap the `<div>`. We do this so that whenever a user clicks anywhere on the `div`, it will fire the anchor element.

That's it for the login page. We're keeping it extremely simple.

#### Profile View

Next, let's create a new view for our GitHub profile information. Again, this page will be extremely simple, but will illustrate how to pull information from the API into our application.

Create a new file named `profile.html` in the `/public` directory. Start with the same beginning template as last time:

_profile.html_:

```html
<html>

	<head>
		<title>Clementine.js - The elegant and lightweight full stack JavaScript boilerplate.</title>
		
		<link href="http://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" type="text/css">
		<link href="/public/css/main.css" rel="stylesheet" type="text/css">
	</head>

	<body>
		
	</body>

</html>
```

Next, we need to create the "profile card." This will be a simple box with the GitHub logo and the user's GitHub profile information. Again, head to [this link](https://github.com/johnstonbl01/clementinejs-fcc/blob/master/public/img/gh-mark-32px.png) to download the GitHub logo (this one is black instead of white). Save it in the `/public/img/` directory.

_profile.html_:

```html
<body>
	<div class="container">
		<div class="github-profile">
			<img src="/public/img/gh-mark-32px.png" alt="github logo" />
			<p><span>ID: </span><span id="profile-id" class="profile-value"></span></p>
			<p><span>Username: </span><span id="profile-username" class="profile-value"></span></p>
			<p><span>Display Name: </span><span id="display-name" class="profile-value"></span></p>
			<p><span>Repositories: </span><span id="profile-repos" class="profile-value"></span></p>
			<a class="menu" href="/">Home</a>
			<p id="menu-divide">|</p>
			<a class="menu" href="/logout">Logout</a>
		</div>
	</div>
</body>
```

We begin by creating a container div for the profile. The following `div` element will be the actual profile card (`<div class="github-profile">`). The first element within the card will be the black GitHub logo we used inside our login page button. Afterward, we'll add paragraph elements which will contain the name of the field (i.e. `ID:`) followed by a `<span>` element that will be used to emphasize the names of the field names in the profile cards (i.e. making them bold instead of normal font weight).

The next `<span>` element that we will target with our AJAX calls to fill with the profile information (i.e. `<span id="profile-username" class="profile-value">`). Lastly, we will add links at the bottom of the menu to return to the Home (`index.html` page or to logout). Notice that when we're using anchor (`<a>`) elements again, and in order for a user to log out, we're simply directing them to our `/logout` route as the `href` attribute value.

Finally, the last step for this view will be to add links to all of our JavaScript files (we'll create the user controller shortly).

_profile.html_:

```html
<!DOCTYPE html>

<html>

	<head>
		<title>Clementine.js - The elegant and lightweight full stack JavaScript boilerplate.</title>
		
		<link href="http://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" type="text/css">
		<link href="/public/css/main.css" rel="stylesheet" type="text/css">
	</head>

	<body>
		<div class="container">
			<div class="github-profile">
				<img src="/public/img/gh-mark-32px.png" alt="github logo" />
				<p><span>ID: </span><span id="profile-id" class="profile-value"></span></p>
				<p><span>Username: </span><span id="profile-username" class="profile-value"></span></p>
				<p><span>Display Name: </span><span id="display-name" class="profile-value"></span></p>
				<p><span>Repositories: </span><span id="profile-repos" class="profile-value"></span></p>
				<a class="menu" href="/">Home</a>
				<p id="menu-divide">|</p>
				<a class="menu" href="/logout">Logout</a>
			</div>
		</div>
		
		<script type="text/javascript" src="common/ajax-functions.js"></script>
		<script type="text/javascript" src="controllers/userController.client.js"></script>
	</body>

</html>
```

#### Updating Index.html

The last step in creating the views is to update our existing `index.html` to include a few new features. We want to display the user's name when they log in, and provide a way for them to visit the profile page and log out.

Let's put the user information and navigation at the top of the page. We'll want to wrap this within a `<header>` element between the `<head>` and `<body>` sections of the page.

_index.html_:

```html
<head>
	...
</head>

<header>
	<p>Welcome, <span id="display-name"></span>!</p>
	<a class="menu" href="/profile">Profile</a>
	<p>|</p>
	<a class="menu" href="/logout">Logout</a>
</header>

<body>
	...
</body>
```

We're creating a paragraph element with another `<span>` element that we'll use to target with AJAX from the user controller. Next, we create another simple, text-based means of navigation for the user to reach the profile page and logout.

_index.html_:

```html
<!DOCTYPE html>

<html>

	<head>
		<title>Clementine.js - The elegant and lightweight full stack JavaScript boilerplate.</title>
		
		<link href="http://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" type="text/css">
		<link href="/public/css/main.css" rel="stylesheet" type="text/css">
	</head>

	<header>
		<p>Welcome, <span id="display-name"></span>!</p>
		<a class="menu" href="/profile">Profile</a>
		<p>|</p>
		<a class="menu" href="/logout">Logout</a>
	</header>

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
		
		<script type="text/javascript" src="common/ajax-functions.js"></script>
		<script type="text/javascript" src="controllers/clickController.client.js"></script>
		<script type="text/javascript" src="controllers/userController.client.js"></script>
	</body>

</html>
```

### Create the User Controller

The next problem we need to solve is to write a controller which will retrieve the user information from the API and update the appropriate values in the view. This controller is slightly different in that we want to be able to use this controller for both the `index.html` and `profile.html` views. 

The profile page will have fields that we don't want to show on the `index.html` page, so we have to think about how to write the code so that it is dynamic enough to not produce errors a page is missing certain HTML elements. We'll work through this problem shortly.

Fist, create a new file in the `/app/controllers/` directory named `userController.client.js`. Then, let's begin simlar to the click controller, by specifing strict mode with `'use strict';` and creating an [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression).

_userController.client.js_:

```js
'use strict';

(function () {
	
})();
```

Next, let's store our HTML elements and API URL within variables for use within the AJAX functions.

_userController.client.js_:

```js
'use strict';

(function () {
   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + 'api/:id';
})();
```

Notice that for the `profileId`, `profileUsername` and `profileRepos`, we're adding the `|| null` condition at the end of the statement. What is this doing? JavaScript will interpret this [logical OR](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_OR) expression in the following way:

- If what's left of the `||` evaluates to `true`, then that value is returned
- If what's left of the `||` evaluates to `false` and the expression to the right evaluates to true, then the value on the right is returned.
- If both expressions are true, then the left value is returned.
- If both expressions are false, then neither value is returned.

Our `var` statements will set the variable value equal to the HTML element if it exists, and if not it will set it equal to [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null). We don't do this for the `displayName` variable because it will be used in both the `profile` and `index` views. We'll take advantage of this HTML element or null value within our AJAX function.

Before doing that, we have also created the `apiUrl` similar to the `clickController`, which references the API for our user information as defined in the routes file (`index.js`). Again, we're referencing the global variable created in `ajax-functions.js` to prevent us form typing the URL multiple times.


Now, let's create the function that will be called as the callback for the AJAX functions. This function will need to update the HTML elements, but also be flexible enough so that we can re-use it without writing a new function for every element.

_userController.client.js_:

```js
'use strict';

(function () {
   ...

   function updateHtmlElement (data, element, userProperty) {
   	element.innerHTML = data[userProperty];
   }
})();
```

This new function will take 3 arguments:

- `data` will be the object containing the user information from the API
- `element` will be the variable of the HTML element we want to update
- `userProperty` will be a string representing the property on the user object

Then we're setting the [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) value of the element passed in as an argument to the value of the `userProperty` arguement on the `data` object. We have to use [bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors#Bracket_notation) because we are passing in a string as the property name. It's not possible to use dot notation with a string as the property name.

Next we'll create the AJAX function to query the API and return the user information. This will be very similar to the AJAX function within the click controller.

_userController.client.js_:

```js
'use strict';

(function () {
   ...

   function updateHtmlElement (data, element, userProperty) { ... }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {

   })
})();
```

This should look familiar so far. The only difference is that rather than passing a named callback function, we're passing in an anonymous function (`function (data) {...}`). We're doing this so that we can make multiple changes to the DOM with this one request since it contains all the information we need.

We'll start by parsing the AJAX data and storing the object in a variable that we can pass into subsequent functions. We'll then update the value of the `displayName` elements, and then move to making conditional statements for our other HTML elements. 

These are the elements that may or may not exist depending on the page. We'll create `if` blocks that will test if the variable is equal to `null`. If it's not, then we'll update the HTML element. If the variable is equal to `null`, then no action will be taken.

_userController.client.js_:

```js
'use strict';

(function () {
   ...

   function updateHtmlElement (data, element, userProperty) { ... }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
		var userObject = JSON.parse(data);

      updateHtmlElement(userObject, displayName, 'displayName');

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if (profileRepos !== null) {
         updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      }
   })
})();
```

And that's it for user controller. All we have left to do is make it pretty!

## Make It Pretty

As in the previous tutorial, I'm simply going to provide the CSS file in its entirety. If you have specific questions about why something within the file was done in a particular way, feel free to reach out to me!

_public/css/main.css_:

```css
/****** Main Styling ******/

body {
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
	margin: 0;
	padding: 0;
}

header {
	color: #00BCD4;
	height: 56px;
	margin: 0 0 14px 0;
	text-align: center;
}

p {
	margin: 8px 0 0 0;
}

.container p {
	text-align: center;
	padding: 0;
}

/****** Header Styling ******/

header p {
	margin: 16px 0 5px 0;
}

.menu {
	text-decoration: none;
	padding: 6px;
	margin: 0;
	color: #727272;
}

.menu:visited {
	color: #727272;
}

.menu:hover {
	color: #FFA000;
}

.menu:active {
	color: #FF630D;
}

header a ~ p {
	margin: 0;
	padding: 0;
	display: inline;
	color: #ECEFF1;
}

#display-name {
	font-weight: 400;
}

/****** Login Styling ******/

.login {
	margin: 86px auto 0 auto;
	text-align: center;
}

#login-btn {
	width: 225px;
	padding: 7px 5px;
}

.btn p {
	margin: 8px 0 0 0;
	padding: 0;
}

.btn > img {
	float: left;
	margin-left: 10px
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

#click-nbr {
	font-weight: 400;
}

/****** Profile Styling ******/

.github-profile {
	width: 350px;
	height: 200px;
	border-radius: 3px;
	margin: 86px auto 0 auto;
	background-color: #EEE;
	text-align: center;
	color: #000;
}

.github-profile p:first-child {
	padding-top: 16px;
}

.github-profile p:nth-child(5) {
	margin-bottom: 16px
}

.github-profile p {
	margin: 0 0 0 16px;
	text-align: left;
}

.profile-value {
	font-weight: 400;
}

span {
	font-weight: 500;
}

.github-profile > img {
	padding-top: 16px;
	margin-bottom: 16px;
}

.github-profile .menu:hover {
	color: #FFA000;
}

.github-profile .menu:active {
	color: #FF630D;
}

#menu-divide {
	color: #FFFFFF;
	display: inline;
	margin: 0;
}
```

You can now re-run the app. It should look much more organized! Here's what each screen of our application should look like:

_/login_:

![Login Screenshot](/img/passporttut04.png)

_/index_:

![Index Screenshot](/img/passporttut05.png)

_/profile_:

![Profile Screenshot](/img/passporttut06.png)

## Conclusion

And that's it! Congratulations, you've just integrated authentication into your application using Passport! You definitely deserve a pat on the back. If you run into any issues or have any questions, feel free to [reach out to me on Twitter](https://twitter.com/johnstonbl01). The source code for this application can be [found on GitHub](https://github.com/johnstonbl01/clementinejs-fcc).

Happy coding!
