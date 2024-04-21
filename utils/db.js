import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb://root:pzUo5KGRpvf33THxXtfoexhJ@siah-kaman.liara.cloud:31914/my-app?authSource=admin"
  );
  return client;
}
