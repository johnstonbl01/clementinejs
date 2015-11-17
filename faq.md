---
layout: static
---

# FAQ

This FAQ covers some general questions that might appear when you first approach full-stack development. Some questions/answers cover broad topics while others will be more specific to using Clementine.js.

### WHAT IS AN MVC?

An MVC provides a means ("design pattern") to effeciently organize your code. MVC stands for *Model*,  *View*, *Controller*. The notion of using an MVC suggests that when writing code, the developer separate the code into different categories based on the code's purpose. Let's take a look at each category:

Paraphrased from [developer.google](https://developer.chrome.com/apps/app_frameworks):

- *Model:* This is where an application's data is stored. The model is unaware of what goes on in the view, as it does not connect directly to the View (that's what the controller is for!)

- *View:* The view is what is presented to users, and includes how the user interacts with your application. This includes HTML, CSS and JavaScript.

- *Controller:* The go-betweeen for the Model and the Views. When data changes in the model, the controller will update the view to reflect it.

If that doesn't quite make sense, consider a *To-Do* list as an example.  Let's look at how an MVC architecture would organize data in our list:

*Model:* The model would hold the all the tasks that you have assigned yourself to do. The model also contains additional information regarding each task (ex. the due date, whether the task is complete or not).

*View:* The view shows you your task list. You can type in new tasks, drag tasks around and assign due-dates. Neat.

*Controller:* You just finished a task - "Mop Up Spilt Milk" it's time to check it off. When you click the checkbox, the Controller modiefies the model to indicate that the task is now complete. Next the controller will update the view based on the status of the data in the model.

### The Controllers of Clementine.js

- Clementine.js has a client controller and a server controller.
	- The *client controller* is used as an interface between the API and the DOM; it controls the visible data immmediately available to the client (the person looking at the data!)
	- The *server controller* is used for querying the database. Keeping this separate is important for keeping private / sensitive information away from your HTML file.

### What is MongoClient?

MongoClient is the NodeJS driver written by MongoDB. It is the simplest and closest to the actual MongoDB console. As an example, when you want to find one document in a collection, you use .findOne(), which is the same sytanx you can use to query the database directly from the MongoDB console.

### What is Mongoose?

note: Mongoose is only included in the FCC version of Clementine.js.

From the [Mongoose site](http://mongoosejs.com/)

> Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

In the case of Clementine.js, mongoose makes things like authentication easier as it enforces resetrictions on what's being inserted into the database.

### What is an API Endpoint?

The URL in which a server sends data to the URL that a client (you, the user) uses to retrieve it. Essentially, it is a URL in which a user can access data from.

### What is CRUD?/ A CRUD App?

CRUD is an acronym for Create, Read, Update, Delete. CRUD refers to all the major functions of working with a database.

### What is Middleware?

You can think of middleware as an "add-on" or "plugin" that will allow additional functionality for a tool. Clementin's use of express is extended with the middleware `session` : `npm install express-session --save`

### What is `require?`

`require` is used to retrieve modules that are defined either in a library or manually in your code. This is similar to having file's dependencies.

### What are Routes?

A route is any method that tells the server which view to feed to the browser. `get` and `put` are routes -- they are routes to somewhere in the directory ( such as `'/home.html`).

Essentially, a route is any method that carries out a function based on a URL it recieves from the browser.

### What are Modules?

Modules are very common in Node. Modules provides a means to breakdown code into sizeable and understandeable chunks (similar to how SASS files can be imported into a "master / main" sass stylesheet) that can then be later imported into a master document (in the case of Clementine.js - server.js).
