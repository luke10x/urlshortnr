import express from 'express';
import cors from 'cors';
import { loadMongoClient } from './db';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

app.get( "/", async ( req, res ) => {
  console.log("🔗 GET");

  const mongoClient = await loadMongoClient() as MongoClient;
  const db = mongoClient.db('urlstore')
  const urls = await db.collection('urls').find({}).toArray();

  res.send(urls);
});

app.post( "/", async ( req, res ) => {
  console.log("🔗 POST: ", req.body);


  const newEntry = {
    code: (new Date()).getTime().toString(36),
    url: req.body.url
  };

  const mongoClient = await loadMongoClient() as MongoClient;
  const db = mongoClient.db('urlstore')
  const urlCollection = db.collection('urls')
  urlCollection.insertOne(newEntry)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))

  res.send(newEntry)
});

const port = process.env.PORT || 9090;
app.listen( port, () => {
  console.log( `🔗 server running on http://localhost:${ port }` );
});