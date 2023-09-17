import { MongoClient } from 'mongodb';
import { parser } from './index.js';

const client = new MongoClient(
  'mongodb+srv://kordyd:qwertyuiop@cluster-test.zhcqzxk.mongodb.net/?retryWrites=true&w=majority'
);

const start = async () => {
  try {
    await client.connect();
    await client.db().dropCollection('tariffs');
    await client.db().createCollection('tariffs');
    const tariffs = client.db().collection('tariffs');
    await tariffs.insertMany(await parser());
  } catch (error) {
    console.log(error);
  }
};

start();
