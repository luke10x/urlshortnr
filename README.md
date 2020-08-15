# Url shortener

Web browsers can open URLs containing up to 2000 characters,
but sending such long link can be sometimes problematic,-
some applications have limmits on maximum message length.
And short URLs simply look more aesthetically pleasing🌼

The URL shortening service provides short links redirecting
to long target urls, so that a relatively short link can be
passed around until it is actually opened.

The software in this repository includes both:

- a short link creation web application,
  where users can create short links for their long URLs;
- a service to run a redirection domain, that is acessed using
  shortened links, and redirects browser to the original long URL.

## Setup

To run this software locally, you need Docker.
If you want to start all the services it for the first time,
simply run:

    make up install up logs

Later is enough to run:

    make up logs

This will start development version of the web application on
[localhost:8080](http://localhost:8080).
The "short" domain will be [localhost:7070](http://localhost:7070).

These local URLs are configurable through environment variables,
For example [this configuration](./env.penguin.linux.test), 
will make it possible to run this application on a Chromebook,
where "localhost" is not really pointing to the Docker host.
To enable this configuration simply run this command:

    export $(cat .env.penguin.linux.test | xargs)

before running `make up`.

the same way environment variables could be used to deploy this software
on production hosts. For example this software has been deployed on:
shortnor.herokuapp.com [heroku](https://shortnor.herokuapp.com),
using "u.luke10x.com" as a short domain (it is not that short,
I know, but this is the best what I currently have).

## Overview

URL shortener platform consists of several services:

- [SHORTNR](./shortnr) - A frontend application, built with VUE,
  providing the UI for users to create short links for their long URLs,
  and displays a list of previously created short URLs.
- [URLSTORE](./urlstore) - A backend-for-the-frontent (BFF) service
  that can generate a short link pointing to a given long URL, 
  then it would store the combination into the database.
  This service could also rerieve the full list
  of the short and long URL pairs from that database.
- [XLINK](./xlink): the short links consist of the *short domain*,
  and a *hash code*. Xlink is a service that serves HTTP queries
  acessing the short domain.
- [MongoDb]: A database to store URLs and their short links.
  This repository has setup required to run a local MongoDb instance.

![urlshortnr diagram](./docs/urlshortnr-diagram.svg)

### MongoDb shell

To enter mongo shell run `make into-mongo-db`,
in this shell we can select all the links like:

    > db.urls.find({});
    { "_id" : ObjectId("5f33e3a9e44ea00233319bf8"), "code" : "kdrd5n2h", "url" : "https://luke10x.dev" }

