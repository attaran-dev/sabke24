import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb://root:uN3g5AhqNsYqvfGbR6fv8GYJ@sabke24:27017/my-app?authSource=admin"
  );
  return client;
}
