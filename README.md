# Url shortener

## Setup

To run this project for the first time:

    make up install up logs

Later is enough to run:

    make up logs

Before running this on a Chromebook:

    export $(cat .env.penguin.linux.test | xargs)

### MongoDb shell

To enter mongo shell run `make into-mongo-db`,
in this shell we can select all the links like:

    > db.urls.find({});
    { "_id" : ObjectId("5f33e3a9e44ea00233319bf8"), "code" : "kdrd5n2h", "url" : "https://luke10x.dev" }

