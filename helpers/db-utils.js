import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://pashootan:<password>@cluster0.9lsnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocument(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
