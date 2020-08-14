import express from 'express';
import cors from 'cors';
import { handleUrlListAction, handleCreateUrlAction } from './actions';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (_, res) => {
  console.log('🔗 GET');
  try {
    handleUrlListAction(res);
  } catch (e) {
    console.error(e);
  }
});

app.post('/', async (req, res) => {
  console.log('🔗 POST: ', req.body);
  try {
    handleCreateUrlAction(req, res);
  } catch (e) {
    console.error(e);
  }
});

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`🔗 server running on http://localhost:${port}`);
});
