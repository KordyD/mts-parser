import { parser } from './parser.js';
import { startMongo } from './database.js';
import express from 'express';
import cors from 'cors';

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
const getCollection = async (client) => {
  try {
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

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/api/tariffs', async (req, res) => {
  const client = await mongo;
  const collection = await getCollection(client);
  const data = await getData(collection);
  res.json(data);
});
app.post('/api/tariffs', async (req, res) => {
  const client = await mongo;
  const collection = await clearCollection(client);
  await insertData(collection);
  const data = await getData(collection);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});
