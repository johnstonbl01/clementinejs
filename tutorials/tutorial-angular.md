---
layout: docs
---

# Clementine.js Angular Tutorial

## Prerequisites

This tutorial assumes that you have a working version of the application built in the [previous tutorial](/tutorials/tutorial-beginner.html).

## The Strategy

AngularJS is a powerful front-end framework developed and backed by Google. Angular is a complete framework in that it has a vast amount of built-in features and an opinionated development ideology. Development for Angular is a highly sought-after skill, and admittedly the learning curve is pretty steep. This tutorial will demonstrate how to integrate AngularJS functionality and conventions into the app created as part of the [previous tutorial](/tutorials/tutorial-beginner.html).

For more about AngularJS, check out their [website and documentation](https://angularjs.org).

In order to integrate AngularJS, we will first update our HTML file to include new Angular functionality. Then, we'll create a new AngularJS client-side controller that will retrieve information from the API and display it in the view. We will also need to make a small modification to the server-side controller so that the API is in a format that Angular prefers.

## AngularJS HTML Integration

To start our AngularJS integration, we need to update our HTML file to include Angular functionality. For starters, let's add a script tag that points to the Google CDN (Content Delivery Network), so that we can load AngularJS on our page.

To get the URL for this, head to `http://angularjs.org`. Click on the download button in the middle of the page, and copy the CDN URL to your clipboard.

![Tutorial Picture 03](/img/angtut01.png)

Next, let's include this in our `index.html` file:

```html
...
   <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
   <script type="text/javascript" src="/controllers/clickController.client.js"></script>  
</body>
```

Note that we want this link to occur before the `script` tag with our clickController. We do this because these files are loaded in the order in which they are included, and we'll soon rewrite our client-side controller to contain Angular functionality. This means that the `angular.min.js` file will become a dependency of the `clickController` and should be included first.

In addition to the traditional AngularJS source file, we need to use the [ngResource module](https://docs.angularjs.org/api/ngResource) as a dependency in our application. This module allows us to interact with an API by providing common data & API related functions.

To do this, return to the AngularJS site and click the download button again. This time, click on the "browse additional modules" link. (Alternatively, you can just click [here](https://code.angularjs.org/1.3.15/).) On this page, you'll need to find the `angular-resource.min.js` file and right-click on it. Choose "Copy link address." Return to the HTML file and we will now paste this location into another `<script>` tag.

Again note that the order is important. `clickController` depends upon `angular-resource` which in turn depends upon `angular`.

```html
   <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
   <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js"></script>
   <script type="text/javascript" src="/controllers/clickController.client.js"></script>  
</body>
```

AngularJS needs to know what Angular module to run when the website is loaded. This is done through the inclusion of the [`ng-app`](https://docs.angularjs.org/api/ng/directive/ngApp) directive. For small apps like this one, it's common to only use a single Angular module; therefore, we will include the `ng-app` directive in the `<html>` element so that it will encompass the entire page.

Wait - what's an [Angular directive](https://docs.angularjs.org/guide/directive)? Directives are essentially a marker within the HTML that instruct Angular to bind specific functionality to that HTML element. An example of this would be to have a text box that is only visible when certain criteria is met. In that case, the directive would be included in the element tag, and Angular would know to execute the "show" action based on the directive code that was provided to Angular.

In this app, we're only going to use the out-of-the-box Angular directives.

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
      <button type="submit" class="btn btn-add" ng-click="addClick()">CLICK ME!</button>
      <button class="btn btn-delete" ng-click="resetClicks()">RESET</button>
   </div>

</div>
```

Let's break down the new functionality we've included:

- `ng-controller` - This is another AngularJS directive that will allow us to define which controller to use within the current block of HTML elements. We will get to definiing this controller in detail soon enough.
- `ng-click` - A directive that allows us to specify the name of the controller function that is executed when the button is clicked. In this case, we have defined separate functions for the two buttons -- `addClick()` and `resetClicks()`.
- `{{ clicks }}` - We've removed `<span id="click-nbr"></span>` and replaced it with `{{ clicks }}`. This is the Angular syntax that allows us to bind a data value within our HTML code. In this case, the `{{ clicks }}` will be replaced by the clicks value within the scope. This value will first be defined within our controller, and eventually by the database.

This is likely a good time to expand on how Angular interacts with both the view, and how scope fits into the picture.

[Scope ($scope)](https://docs.angularjs.org/guide/scope) is an Angular object that binds the view to the controller. This object is where functions / methods and variable values (i.e. 'clicks') are stored and passed back and forth between the controller and the view.

![Angular Scope](/img/angtut02.png)

Now that our HTML view is ready for Angular, let's modify our client-side controller.

### AngularJS Scope Manipulation

Begin this process by removing all the code within the file named `clickController.client.js` in the `/app/controllers` directory. We'll completely re-write this controller.

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

First, `angular` is a global variable recognized by AngularJS that allows access to its built-in methods.

[`angular.module('clementineApp', [])`](https://docs.angularjs.org/api/ng/type/angular.Module) is the syntax used to define an Angular module. Note that the name of the application must match the name specified in the `ng-app` directive of the HTML. The empty array is where we will inject dependencies for this module.

Next, we define the name of our [Angular controller](https://docs.angularjs.org/guide/controller) using the syntax `angular.controller( ... )`. Again, note that the name of the controller defined as the first argument of this expression must match the name specified via the `ng-controller` directive included in the HTML file.

You'll notice that the dependency array isn't empty here. We bind include the `$scope` object as a dependency, and then pass it as the argument for the following call back function. This is what will allow us to access and manipulate information bound to the `$scope` object and make it available within the view of our application.

Lastly, we set the `clicks` variable within the scope to be equal to 1000. I chose an arbitrary number here that we will easily recognize when testing. Keep in mind that the name of the variable on the `$scope` object ('clicks'), must also match the name of the variable we placed inside the brackets on the HTML page ({{ clicks }}).

Next, let's test the application! In the terminal window, type `$ node server` from the project directory and browse to `localhost:3000`. You should now see, "You have clicked the button 1000 times." Congratulations, you've set up your first AngularJS controller!

However, neither of our buttons work when clicking on them. Hmm, let's fix that, shall we?

## AngularJS Interactivity

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

At this point, we have a fully functioning front-end application. However, wouldn't it be great if the browser would remember the number of times the button had been clicked? Currently, the number of clicks will reset to 0 every time the page is refreshed. This is happening because the number of clicks is not being stored anywhere. Every time the browser renders the page, it will set the number of clicks to the value we have defined in our controller (`$scope.getClicks = 0;`).

We can fix this by modifying the controller to connect to the MongoDB database.

## Integrating the API into AngularJS

To begin intregrating the API with Angular, we need to ensure that we update the Angular module and define `ngResource` as a dependency.

_clickController.client.js_:

```js
angular
   .module('clementineApp', ['ngResource'])
   ...
```

Next, the `$resource` object needs to be injected into the controller. Similar to the `$scope` object, this will let us access the `$resource` object and some of the built-in `ngResource` methods.

_clickController.client.js_:

```js
angular
   .module('clementineApp', ['ngResource'])
   .controller('clickController',
      ['$scope', '$resource', function ($scope, $resource) { ... }]
```

Now let's point Angular to where our resource data is - the API that's been set up at `/api/clicks`. We'll replace the `$scope.clicks = 0;` with the below:

_clickController.client.js_:

```js
angular
   .module('clementineApp', ['ngResource'])
   .controller('clickController',
      ['$scope', '$resource', function ($scope, $resource) {
         var Click = $resource('/api/clicks');
         ...
      }]
```

This new `$resource` object allows us to query this API, and will return the results to a field in the browser. However, before doing this, we'll need to create a new method to retrieve the current number of clicks from the API.

_clickController.client.js_:

```js
...
var Click = $resource('/api/clicks');

$scope.getClicks = function () {
   Click.get(function (results) {
      $scope.clicks = results.clicks;
   });
};
...
```

This code will bind a `getClicks` method to the $scope. The [`Click.get( ... )`](https://docs.angularjs.org/api/ngResource/service/$resource) will make an HTTP GET request to the API and return all of the results. This can then be either manipulated in some way before passing it on to the browser, or (as in our case) just pass it straight in to a variable on the `$scope`. This should look somewhat familiar, as it is mimicking the AJAX functionality from the previous tutorial, albeit with fewer lines of code.

This function needs to run whenever the controller is invoked (i.e. when the app is first started), so we should add `$scope.getClicks()` beneath the function definition. It's important to note that this function call needs to occur _after_ the function definition.

At this point, the controller file should look like:

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
            Click.get(function (results) {
               $scope.clicks = results.clicks;
            });
         };

         $scope.getClicks();
         
         $scope.addClick = function () {
            $scope.clicks += 1;
         };

         $scope.resetClicks = function () {
            $scope.clicks = 0;
         };
   }]);

})();
```
Let's update the two remaining methods in the controller to work with the: `addClick` and `resetClicks`.

_clickController.client.js_:

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

Here's what the entire file should look like at this point:

_clickController.client.js_:

```js
'use strict';

(function () {
   angular
      .module('clementineApp', ['ngResource'])
      .controller('clickController', ['$scope', '$resource', function ($scope, $resource) {
         var Click = $resource('/api/clicks');

         $scope.getClicks = function () {
            Click.get(function (results) {
               $scope.clicks = results.clicks;
            })
         }

         $scope.getClicks();

         $scope.addClick = function () {
            Click.save(function () {
               $scope.getClicks();
            });
         };

         $scope.resetClicks = function () {
            Click.remove(function () {
               $scope.getClicks();
            })
         };
      }]);
})();
```

Let's test these out in the browser! Start node and browse to `localhost:3000`. Click on all the buttons! Everything should update and reset appropriately. gratulations, you've just integrated AngularJS into your full stack JavaScript application! AngularJS has a lot of additional functionality, and this tutorial just scratches the surface. For more information on Angular, check out [this tutorial by Dan Wahlin](https://www.youtube.com/watch?v=i9MHigUZKEM&index=39&list=WL) -- it's great.

Happy coding!