---
layout: site
---

# Clementine.js Beginner Tutorial - Passport Integration

## Contents

- [Prerequisites](#prerequisites)

## Prerequisites

This tutorial assumes that you have a working version of the application built in the [previous tutorial](tutorial.html).

_Note_: This tutorial assumes that you have a Twitter account.

## Attack of the Auth

Let's assume that we only want people to see our coveted click-counting application who have registered on the site using their Twitter handle. After all, the app is super secret and anonymous users aren't allowed!

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
$ npm install passport-twitter --save
```

This will install the Twitter "Strategy" for Passport. Strategies are Passport's term for different methods of authentication. As an example, there's a Facebook Strategy and a Google Strategy as well.

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
  "license": "ISC",
  "dependencies": {
    "express": "^4.12.4",
    "express-session": "^1.11.3",
    "mongoose": "^4.1.0",
    "passport": "^0.2.2",
    "passport-twitter": "^1.0.3"
  }
}
```

### Updating the Folder Structure

Let's go ahead and modify the folder structure to include some of the new functionality we'll be convering. 

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

- **app/config** - The directory containing configuration files for Passport.
- **app/factories** - Directory for Angular factories. Factories are used by Angular to retrieve information from the model (i.e. API) and pass it to the controller for manipulation. This is a common Angular convention.
- **app/models** - Directory for database models. In this case, this is where the Mongoose schemas will be defined.

The remainder of the folders are the same.

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

var port = 3000;
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
First, we move the `.clickHandler` from the end of the `require` statement. We're doing this because rather than export an anonymous function object from the clickHandler file, we will export the entire object. The `.clickHandler` specification is there because using the `module.exports.clickHandler` syntax creates `clickHandler` as a method on the `module.exports` object. This must specifically be referenced in the `require` statement. As we'll see in just a moment, there is another way to accomplish this without requiring the `.clickHandler` expression.

We've removed the `db` argument from both the `module.exports = function (app) {... }` line and the `new ClickHandler()`. We've done this because the database information itself is inherent in using a Mongoose schema. The model we created earlier gets exported for use within our controllers. We'll see this shortly. For now, these are the only changes required to the route file. Wasn't that easy?

### Refactor Server-Side Controller

This is where we're going to see the majority of Mongoose changes. In general, these changes are due to Mongoose's similar-but-different query syntax for MongoDB. Additionally, as alluded to in the previous section, we'll now be importing our Mongoose model here for manipulation. Let's walk through the changes one at a time.

The first change we'll make is including (importing) our Mongoose model for use within the controller file. In the `/app/controllers` directory.

_clickHandler.server.js_:

```js
'use strict';

var Clicks = require('../models/clicks.js');

module.exports.clickHandler = function (db) {...}
```

We're importing and storing our `mongoose.model` within the `Clicks` variable, so that we can update the clickHandler methods to query this collection. Remember that Mongoose will automatically find the correct collection in the database (it looks for the plural version of the model name we provided in the `mongoose.model(...)` function). Additionally, keep in mind that MongoDB will create the collection if it does not already exist.

Next, we need to remove the `db` argument from the clickHandler function, as well as the `module.exports.clickHandler`. As mentioned above, we're going to export our clickHandler object slightly differently. At this point, we'll simply define the clickHandler as a named function without any arguments.

```js
function clickHandler () {...}
```

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

				var clickResults = [];

				if (result) {
					clickResults.push(result);
					res.json(clickResults);
				} else {
					var newDoc = new Click({ 'clicks': 0 });
					newDoc.save(function (err, doc) {
						if (err) { throw err; }

						clickResults.push(doc);
						res.json(clickResults);
					});

				}
			});
};
```

Let's breakdown each of the changes:

- `clicks` replaced with `Click`
	- this is to accomodate our newly imported Mongoose model.
- `findOne({}, { '_id': false } function (err, result) {...})` replaced by `findOne({}, { '_id': false }).exec(function (err, result) {...})`
	- This is simply different syntax that will accomplish the same result. The Mongoose [`.exec()`](http://mongoosejs.com/docs/api.html#query_Query-exec) function simply executes the query when called. 
	- This is different from the MongoDB driver in that it does not execute the query immediately. Mongoose will execute the function only when the `.exec` method is called.
- Conditional `else {...}` changes
	- The biggest change is in the conditional else, where we are inserting data into the database if no results are found. All of the former code is removed, and replaced by new (and much easier to read) Mongoose code.
	- `var newDoc ...` creates a new document using the parameters defined within the Click model and stores it in the `newDoc` variable
	- We're then saving the `newDoc` using the Mongoose [`.save()`](http://mongoosejs.com/docs/api.html#model_Model-save) method. This method simply saves the current document to the database. The contents of this function are similar to the old function, except that we're pushing our newly created document to the `clickResults` array.

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

This syntax should be familiar now. Let's test that the application still works. In the terminal window of the project directory, type `node server`, and then browse to `localhost:3000`. The app should function just as it did before -- adding and resetting clicks!

## Passport Server-Side Integration

### Twitter App Setup

Before getting to the coding portion, we need to register our app with Twitter and obtain an API key. An API key is like a password between your app and Twitter, so they can identify who is using the API and ensure that the program has permission.

Head to `https://apps.twitter.com/` and ensure that you're logged in to Twitter.

1. Click the 'Create New App' button.
2. Fill out the form.
	- Name: Whatever you'd like to name your app. Mine says 'Clementinejs', of course. This app name needs to be unique.
	- Description: A short description of your app.
	- Website: Since we're using localhost, simply use `http://127.0.0.1:3000/`. `127.0.0.1` is the default IP address for localhost. For some reason, simply entering 'localhost' instead wouldn't work for me.
	- Callback: `http://127.0.0.1:3000/auth/twitter/callback`. This will be the URL that gets passed in when we're authenticated. We'll add a route for this URL later.
3. Agree to the Terms of Service.
4. Click 'Create your Twitter Application'.

Once this is done, it will take you to a page with information about your application. At the top, click on Keys and Access Tokens. Make note of the Consumer Key (API Key) and the Consumer Secret (API Secret). We'll use these later in our app.

[image of keys and access tokens]

The difference between the API Key and the API Secret is that the key is considered _public_, while the secret is known only to the vendor (Twitter in this case) and you.

### Create the User Model

To begin, let's work on defining our user model. Create a new file in the `/app/models` directory named `users.js`.

_users.js_:

```js
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String
	}
});

module.exports = mongoose.model('User', User);
```

Most of this code should be familiar from the Click model we defined previously. Inside our Schema, we're defining the fields to be stored in the database after we authenticate with Twitter. These are put in their own object because it's common to have a model with several types of authentication: Facebook, Twitter, etc. Each of these would store their information within different objects of the User model.

The [fields that Twitter provides](http://passportjs.org/docs/profile) are:

- id: The numeric ID associated with your Twitter username
- token: The Twitter-generated access token for your account.
- displayName: This corresponds to the real name in your Twitter profile -- aka 'John Doe'.
- username: Your Twitter username, aka the username that follows the @ symbol (@johndoe_1234).

Next we'll move on to setting up our authorization file.

### Authorization Configuration

We need a way to store our app-specific Twitter authentication information so that Twitter can authenticate that our application can access its API and retrieve user information. Previously, we registered our app on `https://apps.twitter.com` and noted our token and secret.

It's common practice to store this type of authorization information in its own Node.js module. We'll use this information when we contact the Twitter API, so we'll export it and make it available to `require` in other parts of our app. Create a new file named `auth.js` in the `/app/config` directory.

_auth.js_:

```js
'use strict';

module.exports = {
	'twitterAuth': {
		'consumerKey': 'your-key-here',
		'consumerSecret': 'your-secret-here',
		'callbackURL': 'http://localhost:3000/auth/twitter/callback'
	}
};
```

The `'callbackURL'` is the URL we entered when registering our app, and this is where Twitter will send information once the user has been authenticated. We'll handle this callback in our routes later. For now, just know that Twitter first authenticates the user, then sends information back to to our application via the `'callbackURL'`.

### Passport Configuration

passport.js
require TwitterStrategy
require User model
require config
export module - pp arg
serialize user
deserialize user
pp.use twitter strategy
	key
	secret
	callback
function (token, tokensecret, profile, done)
	process.nextTick
		User.findOne

### Update and Create Routes

- routes/index.js
	- add routes for:
		- /login
			- get
			- post
		- /register
			- get
			- post
		- /logout
			- get
		- /profile
			- get
	- logged in function

### Updating the Server File

require passport
require express-session
require config file
app.use factories
app.use session info
app.use passport-init
app.use passport-session
update routes - incl passport

## Passport Client-Side Integration

### Creating Views

- views
	- login
	- register
	- logout

### Make It Pretty

## Conclusion




Part 3 - Refactor Current App to use Angular Routes
Part 4 - Tests
Part 5 - Integrate Gulp
Don't forget to rename first tutorial