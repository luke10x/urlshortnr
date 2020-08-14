import express from 'express';
import { handleRedirectAction } from './actions';

const app = express();

app.get('/:code', async (req, res) => {
  console.log('🎯 GET');
  try {
    handleRedirectAction(req, res);
  } catch (e) {
    console.error('Error hile handling GET /', e);
    res.status(500).send({ error: 'Unexpected error' });
  }
});

const port = process.env.PORT || 7070;
app.listen(port, () => {
  console.log(`🎯 server running on http://localhost:${port}`);
});
