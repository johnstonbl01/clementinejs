---
layout: static
---

# FAQ

This FAQ covers some general questions that might appear when you first approach full-stack development. Some questions/answers cover broad topics while others will be more specific to using Clementine.js.

### WHAT IS AN MVC?

An [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) provides [design pattern](https://en.wikipedia.org/wiki/Software_design_pattern) to efficiently organize your code. MVC stands for *Model*,  *View*, *Controller*. The notion of using an MVC suggests that when writing code, the developer separates the code into different categories based on the code's purpose (also known as [separation of concern's](https://en.wikipedia.org/wiki/Separation_of_concerns). Let's take a look at each category:

Paraphrased from [developer.google](https://developer.chrome.com/apps/app_frameworks):

- *Model:* This is where an application's data is stored. The model is unaware of what goes on in the view, as it does not connect directly to the View (that's what the controller is for!)

- *View:* The view is what is presented to users, and includes how the user interacts with your application. This includes HTML, CSS and JavaScript.

- *Controller:* The go-betweeen for the Model and the Views. When data changes in the model, the controller will update the view to reflect it.

If that doesn't quite make sense, consider a *To-Do* list as an example.  Let's look at how an MVC architecture would organize data in our list:

*Model:* The model would hold the all the tasks that you have assigned yourself to do. The model also contains additional information regarding each task (ex. the due date, whether the task is complete or not).

*View:* The view shows you your task list. You can type in new tasks, drag tasks around and assign due-dates. Neat.

*Controller:* You just finished a task - "Mop Up Spilt Milk" it's time to check it off. When you click the checkbox, the Controller modifies the model to indicate that the task is now complete. Next the controller will update the view based on the status of the data in the model.

### The Controllers of Clementine.js

- Clementine.js has a client controller and a server controller.
	- The *client controller* is used as an interface between the API and the DOM; it controls the visible data available in the client (the browser).
	- The *server controller* is used for querying the database for the API. Keeping this separate is important for keeping private / sensitive information away from your HTML file.

### What is MongoClient?

MongoClient is the NodeJS driver written by MongoDB. It is the simplest and closest to the actual MongoDB console. As an example, when you want to find one document in a collection, you use .findOne(), which is the same syntax you can use to query the database directly from the MongoDB console.

### What is Mongoose?

**Note**: Mongoose is only included in the FCC version of Clementine.js.

From the [Mongoose site](http://mongoosejs.com/)

> Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

In the case of Clementine.js, mongoose makes things like authentication easier as it enforces restrictions on what's being inserted into the database.

### What is an API Endpoint?

The URL in which a server sends data to the URL that the client (typically a browser) uses to retrieve it. Essentially, it is a URL that an application can retrieve data from.

### What is CRUD?/ A CRUD App?

[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) is an acronym for Create, Read, Update, Delete. CRUD refers to all the major functions of working with a database.

### What is Middleware?

You can think of middleware as an "add-on" or "plugin" that will allow additional functionality for a tool. Clementine's use of Express is extended with the middleware `session` : `npm install express-session --save`. Read more about [Middleware and Express](http://expressjs.com/guide/using-middleware.html).

### What is `require?`

`require` is used to retrieve modules that are defined either in a library or manually in your code. 

### What are Routes?

A route is a part of the application which specifies what action should be taken by the server when a particular type of HTTP request is made to a specific URL (i.e. a GET request to /api/books). This typically returns a file or the result of a function call. It can also be used to send server-side generated files using a template engine (like Jade).

### What are Modules?

Modules are very common in Node. Modules provide a means to breakdown code into sizeable and understandeable chunks that can then be later imported into a master document (in the case of Clementine.js - `server.js`).
