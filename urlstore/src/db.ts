import { MongoClient } from 'mongodb';

export const loadMongoClient = () => {
  const dbUrl = process.env.DB_URL;
  if (dbUrl === undefined) {
    console.error('DB_URL is undefined');
  }

  const mongoClientPromise = MongoClient.connect(dbUrl as string).catch(
    (e: Error) => {
      console.log('Cannot connect to database ' + dbUrl, e);
    },
  );

  return mongoClientPromise;
};
