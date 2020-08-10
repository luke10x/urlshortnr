import * as express from 'express';
import * as cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get( "/", ( req, res ) => {
  res.send([
    {"code": "luke10xx", "url": "https://luke10x.dev"},
    {"code": "githubxx", "url": "https://github.com/luke10x"},
    {"code": "youtube1", "url": "https://www.youtube.com/watch?v=9JrQP90c45E"},
  ]);
});

app.post( "/", ( req, res ) => {
  console.log(req);
  res.send({"code": (new Date()).getTime(), "url": "https://luke10x.com"})
});

const port = 9090;
app.listen( port, () => {
  console.log( `🔗 server running on http://localhost:${ port }` );
});