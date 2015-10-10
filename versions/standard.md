---
layout: docs
---

# The Standard Boilerplate

## About

Clementine.js is a lightweight boilerplate for fullstack JavaScript development which utilizes MongoDB, Express and Node.js. Coming in at just under 32 KB, Clementine.js is a perfect alternative to more feature-dense boilerplates.

Clementine.js errs on the side of transparency and simplicity, making it an ideal starting point for beginner and seasoned developers alike. Note that this implementation assumes the developer wishes to perform implementation of more complex features him- or herself.

### MongoDB

MongoDB is a document-store (NoSQL) database. Queries are written in JavaScript, and that is the primary reason for its inclusion in Clementine.js.

For more information on MongoDB, please [have a look at their stellar documentation](http://docs.mongodb.org/manual/). In addition, once you have practiced your Node skills, I highly recommend taking [this free 7-week online course](https://university.mongodb.com/courses/M101JS/about) that MongoDB offers.

### Express

Express is an unopinionated framework for Node.js that creates additional functionality for the creation of web applications. 

For more information on express, check out their [website and documentation](http://expressjs.com/).

### Node.js

Node.js is a platform built on Google's V8 JavaScript run-time, allowing server-side code to be written in JavaScript. 

For more information on Node, [try their site](https://nodejs.org/documentation/). I also recommend having a look at [NodeSchool](http://nodeschool.io/).

## Installation

Prerequisites for Clementine.js:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)
- [Yeoman](http://yeoman.io/) (optional)

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

### Install MongoDB

MongoDB has great installation instructions for MAC OSX, Windows and Linux. [See this page.](http://docs.mongodb.org/manual/installation/)

### Install Git

Follow the [directions here to install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for the appropriate environment.

### Install Yeoman (optional)

Yeoman is offered as an optional method of installation. If installation via the Yeoman generator isn't desired, then feel free to skip this section.

```bash
$ npm install -g yeoman
```

Note: Yeoman must be installed globally.

### Install Clementine.js

There are 2 ways to install Clementine.js:

- Clone the GitHub Repository
- Install via Yeoman Generator

Both options are similar, and a matter of preference.

**Option 1 - Clone GitHub Repo**

```bash
$ git clone https://github.com/johnstonbl01/clementinejs.git your-project
```

This will install the Clementine.js components into the `your-project` directory.

**Option 2 - Yeoman Generator**

```bash
$ npm install -g generator-clementinejs
$ mkdir your-project
$ cd your-project
$ yo clementinejs
```

Note: `generator-clementinejs` must be installed globally.

### Starting the App

To start the app, make sure you're in the project directory and install the required NPM dependencies using `$ npm install`. Then, type `$ node server` into the terminal.

Next, open your browser and enter `http://localhost:3000/`. Congrats, you're up and running!

### c9.io Setup

Setup for the remote dev environment [c9.io](http://www.c9.io) differs from the traditional local environment setup. This section provides step-by-step instructions for setup in the c9 IDE.

- Create a workspace on c9.io
	- **Workspace Name**: The name of the project
	- **Description**: A description of the project
	- **Clone from Git Workspace**: Enter the Git URL for the Clementine.js repo. 

![c9 Setup Image 01](/clementinejs/img/docs_c9_clemjs_setup01.png)

- Next, open the `Window` menu and choose `Share...`.

![c9 Setup Image 02](/clementinejs/img/docs_c9_clemjs_setup02.png)

- Click on the application URL and choose `Copy`. This the URL for the application. Most often, this follows the pattern `https://projectname-username.c9.io/`.

_Note_: make sure you copy the `/` at the end of the URL.

![c9 Setup Image 03](/clementinejs/img/docs_c9_clemjs_setup03.png)

- Open the `clickController.client.js` file in the `/app/controllers` directory.
	- Replace `http://localhost:3000/` with the URL for the c9 workspace. It should now look like:

	```js
	 var apiUrl = 'https://projectname-username.c9.io/api/clicks';
	 ```

- Next, update the port number in `server.js` from `3000` to `8080`.
- In the terminal window at the bottom of the browser window, type `$ mongod --smallfiles`. This runs the `mongod` service required by MongoDB to run successfully.
- Open a new terminal window by clicking on the plus sign above the terminal window.

![c9 Setup Image 04](/clementinejs/img/docs_c9_clemjs_setup03.png)

- In this new terminal window, type `$ npm install` to install the Node dependencies. This will add a `node_modules` directory to your project.
- Once the installation has completed, type `$ node server` in the same terminal window.
- Finally, in a new browser tab or window, point it to the project url (`https://projectname-username.c9.io`). The app should be running in this window now.

![c9 Setup Image 05](/clementinejs/img/clemjstut03.png)

## Architecture

Clementine.js employs a very simple application architecture to promote transparency and simplicity. The application consists of:

- One view
- One client-side controller
- One server-side controller
- Node.js server file
- Route file
- CSS file

When installed, Clementine.js offers a very simple application demonstrating full stack JavaScript. This application follow the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern. 

### Folder Structure

```
+--	Project Folder
	+-- app
	|	\-- controllers
	|	\-- routes
	|
	+-- public
	|	\-- css
	|	\-- img
```

**Project / Root Folder** - The project directory. This directory contains:

- _.gitignore_ - A file specifying which directories git should ignore when pushing to the master
- _package.json_ - A file specifying which packages should be installed by NPM, in addition general application information (name, version, license, etc).
- _server.js_ - The Node.js server file. This file also contains the connection string to the MongoDB.

**app**

- **controllers** - Directory for client and server-side controller files. Controllers are used to either manipulate / modify the view or the model (i.e. the database).
	- _clickController.client.js_ - Client-side controller which creates event listeners for the button clicks and asynchronous data requests to the clicks API
	- _clickHandler.server.js_ - Server-side controller which handles database queries for the clicks API
- **routes** - This folder contains route files. Routes give directions on what to do when a particular URL or HTTP request is made from the client (i.e. browser) to the server.
	- _index.js_ - The file containing routes for the application and API.

**public**

- **css** - Contains the style sheet for the application
- **img** - Contains any images used in the view (i.e. the Clementine.js logo)

### Ports and MongoDB Collection

Clementine.js uses port 3000 for the application and the default MongoDB port of 27017. These can both be changed within the `server.js` file.

MongoDB will use the database `clementinejs` and the `clicks` collection. These can be amended in the `server.js` and `clickHandler.server.js` files respectively.

### Seeding Data

The `clickHandler` controller will determine if a document exists within the `getClicks` method. If no document exists within the Mongo collection, the application will insert a new document into the collection. The inserted document looks like: `{ 'clicks': 0 }`.

### Clicks API

The clicks API is located at `/api/clicks`, and has the following functionality:

- An HTTP GET request will query the database and return a JSON object mirroring the current document within the Mongo collection
- An HTTP POST request will increment the value of the `clicks` property in the database by one and return a JSON object with the updated value
- An HTTP DELETE request will update the current value of the `clicks` property, setting it equal to `0`.