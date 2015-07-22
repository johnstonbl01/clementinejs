---
layout: site
---

# Clementine.js Beginner Tutorial - Passport Integration

## Contents

- [Prerequisites](#prerequisites)

## Prerequisites

This tutorial assumes that you have a working version of the application built in the [previous tutorial](tutorial.html).

## Attack of the Auth

Let's assume that we only want people to see our coveted click-counting application who have registered on the site using their Twitter handle. After all, the app is super secret and anonymous users aren't allowed!

In order to accomplish, we'll need to integrate some sort of authorization and authentication system into our application. Additionally, we'll want to give users the option to sign up for the site if they haven't already. It's important to understand that although authorization and authentication sound similar, they have very different meanings:

- authorization is the set of rules put in place that determine what a user can do within the application based on his or her credentials (i.e. an admin often has more functionality at her fingertips than a normal user)
- authentication is the act of identifying and verifying users (i.e. username / password verfication, etc)

Normally, this requires worrying about securing and encrypting passwords, but luckily we're going to use a very common JavaScript library named [Passport.js](http://passportjs.org/). As an extension of this library, we're going to focus on a feature known as [OAuth](https://en.wikipedia.org/wiki/OAuth). OAuth is an open standard for authentication that allows 3rd-party sites (like ours) to use Twitter (Microsoft, Google and Facebook are also included) credentials to log into the 3rd party site.

This advanced tutorial, created specifically for [Free Code Camp](http://www.freecodecamp.com/) students, will walk you through integrating this library with the Clementine.js demo application.