import { MongoClient } from 'mongodb';

export const loadDb = async () => {
  const dbUrl = process.env.DB_URL;
  if (dbUrl === undefined) {
    console.error('DB_URL is undefined');
  }

  const mongoClientPromise = MongoClient.connect(dbUrl as string).catch(
    (e: Error) => {
      console.log('Cannot connect to database ' + dbUrl, e);
    },
  );
  const client = <MongoClient>await mongoClientPromise;

  return client.db('urlstore');
};

export const fetchUrls = async (): Promise<Array<any>> => {
  const db = await loadDb();
  return await db
    .collection('urls')
    .find({})
    .sort({ code: -1 })
    .toArray();
};
