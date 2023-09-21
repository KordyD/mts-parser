import { parser } from './parser.js';
import { startMongo } from './database.js';
import express from 'express';

const app = express();
const port = 3001;

const clearCollection = async (client) => {
  try {
    await client.db().dropCollection('tariffs');
    await client.db().createCollection('tariffs');
    return client.db().collection('tariffs');
  } catch (error) {
    console.log(error);
  }
};

const insertData = async (collection) => {
  try {
    const data = await parser();
    await collection.insertMany(data);
  } catch (error) {
    console.log(error);
  }
};

const getData = async (collection) => {
  try {
    return await collection.find().toArray();
  } catch (error) {
    console.log(error);
  }
};

const mongo = startMongo();

app.get('/api/tariffs', async (req, res) => {
  const client = await mongo;
  const collection = await clearCollection(client);
  await insertData(collection);
  const data = await getData(collection);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});
