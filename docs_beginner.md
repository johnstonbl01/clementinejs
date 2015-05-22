### [Beginner Boilerplate](docs_beginner.md)

#### About

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

##### MongoDB

MongoDB is what's known as a document-store database. Each record within the database is stored in an individual "document." This type of database is also known as a NoSQL database, which stands for Not only SQL (structured-query language).

SQL databases are very common and have been around for a very long time as the defacto type of data storage. The most common examples are MySQL and PostgreSQL. The NoSQL databases (of which there are a number) are an alternative to SQL.

MongoDB is used as part of the MEAN stack because it allows us to write queries (code that the database receives and interprets to retrieve data) using JavaScript syntax.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

##### Express.js

Express is a framework for Node.js that creates additional functionality for the creation of web application. A framework simply means that it is written based on another technology, and provides additional functionality through abstraction. Essentially, Express provides a number of very useful functions written for Node.js.

Without the Express framework, developers would have to write similar code for web applications every time they started a new project. Additionally, Express is unopinionated. This means that it isn't strict about how the functionality it provides is implemented. For an example of an opinionated framework, check out Ember.js.

For more information on express, check out their [website and documentation](http://expressjs.com/).

##### AngularJS

AngularJS is a front-end framework developed and backed by Google. That sentence alone should say a lot. It is one of two current front-end frameworks that are very popular (React/Flux being the other). AngularJS is a full MVC (model-view-controller) framework, meaning that it contains a lot of functionality out of the box. It is very powerful, and supports a modular approach to development.

One of the current downsides to AngularJS is performance when compared to a few other frameworks like Knockout and React. However, Google has noticed this and the next version of AngularJS (2.0) has huge performance gains to make it competitive with React.

For more about AngularJS, have a look at their [website and documentation](https://angularjs.org/). Google has also created a [site that showcases some of the new features coming in Angular 2.0](https://angular.io/).

##### Node.js

Node.js is a platform based on Google's V8 JavaScript run-time. This run-time is part of the reason JavaScript has risen to such heights. V8 made JavaScript fast.

Node is a platform built on top of this, and allows server-side code to be written in JavaScript. Until Node, server-side JavaScript was virtually unheard of. Node is extremley fast and performant, and has been widely adopted since its inception.

Node.js does not come with some of the common web application functionality out of the box, and that is why Express is often attached. However, Node is extremely powerful and can do many things, including custom CLIs (command-line interfaces). In the context of this application, Node handles simple routing.

For more information on Node, [try their site](https://nodejs.org/documentation/). I also recommend having a look at [NodeSchool](http://nodeschool.io/).

#### Installation

##### Node.js & NPM

##### MongoDB

#### Folder Structure

#### Tutorial

You can find a complete step-by-step tutorial on how to create this app from the ground up [here](docs_tutorial.md).