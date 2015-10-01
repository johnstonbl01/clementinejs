---
layout: docs
---

# Code Conventions

This guide is based on the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/es5) and the [ESLint code conventions](http://eslint.org/docs/developer-guide/code-conventions.html). Some modifications have been made and detailed below based on personal preferences. If a subject is unclear, please err on the side of the Airbnb style guide, or feel free to [open an issue](https://github.com/johnstonbl01/clementinejs/issues/new) and ask.

## Indentation

Each endentation level is made up of 3 spaces. Please do not use tabs.

```js
// good
function eatFruit () {
   console.log('Yum');
}
```

## Quotes

Use single quotes `''` for strings.

```js
// good
var fruit = 'Clementine';

// bad
var fruit = "Clementine";
```

## Operator Spacing

Separate operators with spaces for legibility.

```js
// good
if (x > 0) {
   eatFruit();
}

// good
small + delicious = clementine;

// good
for (var i = 0; i < 5; i++) {
   doSomething();
}

// bad
if (x>0) {
   eatFruit();
}

// bad 
small+delicious=clementine;

// bad
for (var i=0;i<5;i++) {
   doSomething();
}
```

## Parentheses Spacing

When parentheses are used, there should be no space after the opening parentheses or before the closing parentheses.

```js
// good
if (x > 0) {
   eatFruit();
}

// bad
if ( x > 0 ) {
   eatFruit();
}
```

## Undefined

Please do not use the special value undefined. To see if a variable has been defined, use the `typeof` operator:

```js
// good
if (typeof variable == "undefined") {
    doSomething();
}

// bad
if (variable == undefined) {
    doSomething();
}
```

## Objects

Use literal syntax for object creation.

```js
// good
var clementine = {};

// bad
var clementine = new Object();
```

Additionally, object literals should have the following format:

- The opening brace should be on the same line as the containing statement.
- Each property-value pair should be indented one level with the first property appearing on the next line after the opening brace.
- Each property-value pair should have an unquoted property name, followed by a colon (no space preceding it), followed by the value and a comma (if necessary).
- Additional empty lines may be inserted to group related properties or otherwise improve readability.
- The closing brace should be on a separate line.

```js
// good
var clementine = {
   color: 'orange',
   size: 'small',
   
   eat: function eat () {
      console.log('Yum!');
   },

   smell: 'citrus'
};

// bad
var clementine = {
    'color': 'orange'
   ,'size': 'small'
};
```

When an object literal is passed as an argument for a function, the beginning and ending curly braces should be on the same line. There should be a space after the first brace, and before the final curly brace.

```js
// good
describeClementine({
   color: 'orange',
   smell: 'citrus'
});

//bad
describeClementine({ color: 'orange', smell: 'citrus' });

```

## Variable Declaration

Always use `var` to declare variables. Use one `var` per variable declaration.

```js
// good
var fruit = 'clementine';

// bad
fruit = 'clementine';

// good
var fruit = 'clementine';
var smell = 'citrus';
var taste = 'yummy';

// bad
var fruit   =  'clementine',
    smell   =  'citrus',
    taste   =  'yummy';
```

## Naming

Please follow the below rules when naming:

- Be descriptive
- Avoid single letter names
- Use camelCase when naming objects, functions and variables
- Use PascalCase when naming constructors

```js
// good
function query () {
  doSomething();
}

// bad
function q () {
  doSomething();
}

// good
var clementineFruit = {};

// bad
var ClementineFruit = {};
var clementine_fruit = {};
var clementine-fruit = {};
var c = {};

// good
var clementine = new Fruit();

// bad
var clementine = new fruit();
```

## Strict Mode

Always declare `'use strict';` within a module.

```js
'use strict';

(function () {
   eatFruit();
})();
```

## Equality

Always use `===` and `!==` instead of `==` and `!=`. This avoids issues with type coercion.

```js
// good
var result = (1 === '1');

// bad
var result = (1 == '1');
```

## if Statement

If statements should always use the below form:

```js
// example 1
if (test) {
  statements
}

// example 2
if (test) {
  statements
} else {
  statements
}

// example 3

if (test) {
  statements
} else if (test) {
  statements
} else {
  statements
}
```

Curly braces should never be ommitted.

```js
// good
if (test) {
  eatFruit();
}

// bad
if (test)
  doSomething();

// bad
if (test) { doSomething(); }
```

## for Statement

For statements should use the following format:

```js
// example 1
for (initialize; condition; update) {
  statements
}

// example 2
for (property in object) {
  statements
}
```

Variables should be declared within the initialize section of the `for` loop.

```js
// good
for (var i = 0; i < 3; i++) {
  doSomething();
}

// bad
var i;
for (i = 0; i < 3; i++) {
  doSomething();
}
```

## White Space

Place one space before the leading brace:

```js
// good
function clementineFruit (color) {
  doSomething();
}

// bad
function clementineFruit (color){
  doSomething();
}
```

Use one space before the opening parentheses in control statements.

```js
// good
if (test) {
  doSomething();
}

// bad
if(test) {
  doSomething();
}
```

When defining functions, place a space between the function name and the arguments. When calling the function, do not use a space between the function name and the parentheses.

```js
// good
function test (argument) {
  doSomething();
}

// bad
function test(argument) {
  doSomething();
}

// good
eatFruit(type);

// bad
eatFruit (type);
```

use a blank line after blocks before the next statement.

```js
// good
if (test) {
  doSomething();
}

eatFruit();

// bad
if (test) {
  doSomething();
}
eatFruit();
```

## Do Not Use

- Never use the primitive wrapper types, such as `String`, to create new objects.
- Never use `eval()`.
- Never use the `with` statement.