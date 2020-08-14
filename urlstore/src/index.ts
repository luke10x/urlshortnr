import express from 'express';
import cors from 'cors';
import { loadDb } from './db';
import { handleUrlListAction } from './actions';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (_, res) => {
  console.log('🔗 GET');
  try {
    handleUrlListAction(res);
  } catch (e) {
    console.log(e);
  }
});

app.post('/', async (req, res) => {
  console.log('🔗 POST: ', req.body);

  const newEntry = {
    code: new Date().getTime().toString(36),
    url: req.body.url,
  };

  const db = await loadDb();
  const urlCollection = db.collection('urls');
  urlCollection
    .insertOne(newEntry)
    .then(result => {
      console.log(result);
    })
    .catch(error => console.error(error));

  res.status(201).send(newEntry);
});

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`🔗 server running on http://localhost:${port}`);
});
