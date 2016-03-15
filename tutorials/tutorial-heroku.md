---
layout: docs
---

# Clementine.js Deploying to Heroku Tutorial

_A simple step by step guide to deploying your Clementine.js app to Heroku_

## Why Heroku?

Cloud 9(C9) is a great online [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment). However on the C9 free plan your app is shutdown after a period of inactivity. You need to login to your C9 workspace to reactivate your app. This means that visitors to your app when it is offline will see something like this -

![c9 Page not found](/img/cloud9notfound.jpg)

Heroku solves this problem. On the Heroku free plan your app will always be accessible. Your app will sleep after 30 minutes of inactivity but once a user visits your Heroku app it will reactivate.

Of course there are other limitations associated with the free plan. You can read more about those at the [Heroku Dyno Types page](https://devcenter.heroku.com/articles/dyno-types). In particular your app will `sleep` for a minimum of 6 hours per day. If that starts to become a problem you might want to consider upgrading to one of Heroku's paid plans.

All in all Heroku is an excellent platform for deploying apps to the Interweb. Another benefit is that you will get hands on experience with a widely used professional hosting platform.

## Prerequisites

This tutorial requires the following prerequisites:

- Clementine.js Standard or Free Code Camp(FCC) running on your local machine or Cloud 9. See these tutorials for information on how to setup:
  - [Clementine.js Standard](/tutorials/tutorial-beginner.html)
  - [Clementine.js FCC](/tutorials/tutorial-passport.html)
- An account on Heroku - heroku.com
- Git installed
- A working knowledge of using the Command Line / Terminal

## Let's get started
_When working in the Command Line / Terminal always be in the root folder of your app_

### Install Heroku Toolbelt and Login to Heroku

1. Download and install the Heroku Toolbelt.

    You can get the latest version of the Heroku Toolbelt here - [Heroku Toolbelt](https://toolbelt.heroku.com/)

2. Once the Toolbelt is installed login to Heroku by entering:

    `heroku login`

     in the Command Line / Terminal. You will need your **Heroku username & password**.

### Deploy the app to Heroku

1. Create an app on Heroku by entering the following in the Command Line / Terminal:

    `heroku create`

    Note the name Heroku gives to your app.

2. Now deploy your code to Heroku with:

    `git push heroku master`

### Setup a MongoDB

1. Go to the heroku.com dashboard for your app.

2. In the **Resources** tab type `Mongo` in the input box under **Add-ons**

3. Choose **mLab MongoDB**

4. Provision a **Sandbox - Free** DB

### Setup Config Variables

1. Still in your app's dashboard on Heroku click on the **Settings** tab

2. Click on **Reveal Config Vars**

3. There should be a Key/Value setting here for your MongoDB

4. Create a new Key called `Mongo_URI`

5. Copy the Value from the **Mongolab_URI** setting to the Value for your new **Mongo_URI** setting

6. You can now **Add** this new setting and delete the **Mongolab_URI** setting

7. If you are using GitHub for authentication to your app you will need to create new credentials at GitHub and add the **GitHub_Key** and **GitHub_Secret** settings.

    You can recap how to get these GitHub API keys at [GitHub app setup](http://www.clementinejs.com/tutorials/tutorial-passport.html#GitHubAppSetup)

8. Add an **APP_URL** Key with the URL of your app on Heroku as the Value.

    Your app's url will be something like this - `https://<app-name>.herokuapp.com/`

9. Any other settings that you have defined in your **.env** file should go in here too.

    The only exception is the **PORT** setting, this is taken care of by Heroku.

## Next Steps

That's it! You can now visit your app on Heroku.

### Troubleshooting

If your app isn't working Heroku will not output any error messages other than a simple Application Error which directs you to check your logs.

You can check your logs from the Command Line / Terminal by entering:

`heroku logs`

By adding the `--tail` option to that command you will get live updates of the log as you interact with your app.

#### Common issues

- Missing or misconfigured Config Vars
    Check the config vars in your app's dashboard. Compare them to the settings in the .env file on your local app.

- MongoDB not setup correctly
    Your MongoDB will be empty at the start. If your app doesn't automatically create collections if they are missing then you will need to manually create any needed collections in the MongoLab admin interface.

If you encounter any issues whatsoever, submit an issue here on GitHub, or let me know via Twitter.

## Additional Resources

**Heroku**

Heroku has some excellent docs to help you get started using the platform.

In particular the [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) is a great article.
