import { MongoClient } from 'mongodb';

const client = new MongoClient(
  'mongodb+srv://kordyd:qwertyuiop@cluster-test.zhcqzxk.mongodb.net/?retryWrites=true&w=majority'
);

export const startMongo = async () => {
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.log(error);
  }
};
